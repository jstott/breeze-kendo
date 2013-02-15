$(function(){

  var manager = new breeze.EntityManager({
    dataService: new breeze.DataService({
      serviceName: 'data/',
      hasServerMetadata: false
    })
  });

  var ds = new kendo.data.extensions.BreezeDataSource({
    entityManager: manager,
    endpoint: "products.json",
    pageSize: 1,
    serverPaging: true,
    serverSorting: true,
    serverFiltering: true
  });

  $("#grid").kendoGrid({
    columns: [
      { field: 'ProductName', title: 'Name'},
      { field: 'Supplier.SupplierName', title: 'Supplier'},
      { field: 'Category.CategoryName', title: 'Category' }
    ],
    dataSource: ds,
    pageable: true,
    sortable: true,
    filterable: true
  });

});

