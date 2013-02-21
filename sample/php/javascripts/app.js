$(function(){

  // Breeze assumes asp.net mvc4 w/ WebAPI as the default
  // data services. To not use that, we have to create a
  // DataService instance and tell it where our end-point is,
  // and also tell it not to use any metadata
  var dataService = new breeze.DataService({
      serviceName: 'api/todos.php',
      hasServerMetadata: false
  });

  var manager = new breeze.EntityManager({
    dataService: dataService
  });

  // ---------------------------------------------
  
  var transport = {

    read: function(options){
      console.log("reading", options);

      var query = new breeze.EntityQuery("todos")
        .skip(options.data.skip)
        .take(options.data.take);

      manager.executeQuery(query).then(function(xhr){
        options.success(xhr.results);
      });
    }

  };

  var ds = new kendo.data.DataSource({
    transport: transport,
    autoSync: true,
    pageSize: 1,
    serverPaging: true,
    serverSorting: true,
    serverFiltering: true
  });

  $("#grid").kendoGrid({
    columns: [ 
      { field: "id" },
      { field: "description" }
    ],
    dataSource: ds,
    pageable: true,
    sortable: true,
    filterable: true
  });

});

