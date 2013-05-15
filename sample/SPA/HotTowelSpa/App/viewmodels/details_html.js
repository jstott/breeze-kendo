define(['services/logger', 'services/datacontext'], function (logger, datacontext) {
  var vm = function () {
    var self = this;

    this.activate = function () {
      logger.log('Details View Activated', null, 'details', true);

      // override ko.kendo plug-in - to 
      ko.kendo.setDataSource = function (widget, fnCall, options) {
        fnCall(widget, options);
      };
      return true;
    };
    
    this.viewAttached = function (view) {
      logger.log('viewAttached', this.title, 'parts', false);
    };
    this.datacontext = datacontext;
    this.title = 'Kendo Grid View - via BreezeDataSource';
    this.gridProductDataSource = new kendo.data.extensions.BreezeDataSource({
      entityManager: self.datacontext.manager,
      endPoint: "Products",
      defaultSort: "productName asc",
      autoMapToJS: true,
      onFail: function(error) {
        logger.logError('Ouch - Product grid query failed...', error, 'details', true);
      },
      schema: {
        model: {
          fields: {
            unitPrice: { type: "number" },
            unitsInStock: { type: "number" },
            unitsOnOrder: {type: "number"}
          }
        }
      },
    });
    this.gridNumericFilter = function(element, options) {
      options = options || {format:'n0'}; // default 0 dec.
      element.kendoNumericTextBox(options);
    };
    this.gridProductOptions = function(widget, options) {
      widget.setDataSource(self.gridProductDataSource);
    };
  };

  return vm;


});