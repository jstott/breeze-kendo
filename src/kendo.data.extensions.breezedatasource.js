/* Usage Example 
var manager = new breeze.EntityManager("api/Island");

  $("#grid").kendoGrid({
    columns: [
      { field: 'ProductName', title: 'Name'},
      { field: 'Supplier.SupplierName', title: 'Supplier'},
      { field: 'Category.CategoryName', title: 'Category' }
    ],
    dataSource: new kendo.data.extensions.BreezeDataSource({
        entityManager: manager,
        endpoint: "Parts",
        pageSize: 10,
        autoConvertToJS : true,
        serverPaging: true,         // includes inlineCount from breeze query
        serverSorting: true,
        serverFiltering: true
    }),
    pageable: true,
    sortable: true,
    filterable: true
  });
*/

(function ($, kendo, breeze) {
    'use strict';

    kendo.data.extensions = kendo.data.extensions || {};

    function BreezeTransport(config) {
        this.entityManager = config.entityManager;
        this.endPoint = config.endPoint;
        this.defaultSort = config.defaultSort || "";
        this.autoMapToJS = config.autoMapToJS || true;  // Breeze entities contain recursive properties (ugh!) - eliminate those
        this.inlineCount = config.serverPaging || true;
    }

    $.extend(BreezeTransport.prototype, {
        read: function (options) {
            var orderVal = this.defaultSort,
                sortOps = options.data.sort,
                self = this;

            if (sortOps && sortOps.length > 0) {
                orderVal = ''; // reset orderBy
                    for (var i = 0; i < sortOps.length; i++) {
                        if (i > 0) {
                            orderVal += ",";
                        }
                        orderVal += sortOps[i].field + " " + sortOps[i].dir;
                    }
            }
            var payload = { data: [], total: 0 },
                query = new breeze.EntityQuery(this.endPoint)
				.orderBy(orderVal)
				.skip(options.data.skip)
				.take(options.data.take)
                .inlineCount(this.inlineCount);
            
            this.entityManager.executeQuery(query)
                .then(function (xhr) {
                    if (self.autoMapToJS) { // Breeze entities contain recursive properties (ugh!) - eliminate those
                        payload.data = ko.mapping.toJS(xhr.results, {
                            ignore: ['entityAspect', 'entityType']
                        });
                    } else {
                        payload.data = xhr.results;
                    }
                    if (self.inlineCount) {
                        payload.total = xhr.inlineCount;
                    }
                    options.success(payload); // notify the DataSource that the operation is complete
                })
                .fail(function (rejected) {
                    payload.error = rejected;
                })
                .done(); // terminate chain of promises
        },

        create: function (options) {
            options.success(options.data);
        },
        update: function (options) {
            options.success(options.data);
        },
        destroy: function (options) {
            options.success(options.data);
        }
    });

    // Create the custom DataSource by extending a kendo.data.DataSource
    // and specify an init method that wires up needed functionality.
    kendo.data.extensions.BreezeDataSource = kendo.data.DataSource.extend({
        init: function (options) {
            // The endpoint and entityManager fields are required. If not specified, throw an error
            if (!options.entityManager) {
                throw new Error('A Breeze EntityManager object is required in order to use the DataSource with Breeze. Please specify an "entityManager" property in your options object.');
            }

            if (!options.endPoint) {
                throw new Error('An "endpoint" option is required in order to work with Breeze. Please specify an "endpoint" property in your options object.');
            }

            // build the transport and final options objects
            var breezeTransport = new BreezeTransport(options);
            options = $.extend({}, { transport: breezeTransport }, options);

            // Call the "base" DataSource init function and provide our custom transport object
            kendo.data.DataSource.fn.init.call(this, options);
        }
    });
})($, kendo, breeze);