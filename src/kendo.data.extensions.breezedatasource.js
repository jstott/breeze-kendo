(function ($, kendo, breeze) {
	'use strict';
	
	kendo.data.extensions = kendo.data.extensions || {};

  function BreezeTransport(entityManager, endpoint){
    this.entityManager = entityManager;
    this.endPoint = endPoint;
  }

	$.extend(BreezeTransport.prototype, {
		read: function (options) {
      var orderVal = "",
          sortOps = options.data.sort;

			if (sortOps) {
				orderVal = sortOps.field + " " + sortOps.dir;
			}

			var query = new breeze.EntityQuery(this.endpoint)
				.orderBy(orderVal)
				.skip(options.data.skip)
				.take(options.data.take);

			this.entityManager.executeQuery(query).then(function(xhr){
				options.success(xhr.results);
			});
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

			if (!options.endpoint) {
				throw new Error('An "endpoint" option is required in order to work with Breeze. Please specify an "endpoint" property in your options object.');
			}

      // build the transport and final options objects
      var breezeTransport = new BreezeTransport(options.entityManager, options.endpoint);
      options = $.extend({}, { transport: breezeTransport }, options)

			// Call the "base" DataSource init function and provide our custom transport object
			kendo.data.DataSource.fn.init.call(this, options);
		}
	});
})($, kendo, breeze);
