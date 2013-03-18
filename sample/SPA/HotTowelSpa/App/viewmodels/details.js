define(['services/logger','services/datacontext'], function (logger,datacontext) {
    var vm = function () {
        var self = this;
        this.activate = function() {
            logger.log('Details View Activated', null, 'details', true);
           
            return true;
        };
        this.viewAttached = function (view) {
            logger.log('viewAttached', this.title, 'parts', false);
            $('#gridProducts').kendoGrid(this.gridProductOptions);
        };
        this.datacontext = datacontext;
        this.title = 'Details View';
        this.gridProductOptions = {
            columns: [
                { field: 'productName', title: 'Product' },
                { field: 'unitPrice', title: 'Unit Price', format: '{0:c}' },
                { field: 'quantityPerUnit', title: 'QtyPerUnit' },
                { field: 'unitsInStock', title: 'In-Stock', format: '{0:n0}'},
    { field: 'unitsOnOrder', title: 'On-Order',format: '{0:n0}' }
            ],
            dataSource: new kendo.data.extensions.BreezeDataSource({
                entityManager: self.datacontext.manager,
                endPoint: "Products",
                defaultSort: "productName asc",
                pageSize: 10,
                autoConvertToJS: true,
                serverPaging: true,         // includes inlineCount from breeze query
                serverSorting: true,
                serverFiltering: true,
                schema: {
                    data: "data",
                    total: "total",
                    error: "error"
                }
            }),
            pageable: true,
            sortable: true,
            filterable: false
            
        };
    };

    return vm;

    
});