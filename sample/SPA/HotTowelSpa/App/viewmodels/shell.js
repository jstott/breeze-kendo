define(['durandal/system', 'durandal/plugins/router', 'services/logger', 'services/datacontext'],
    function (system, router, logger, datacontext) {
        var shell = {
            activate: activate,
            router: router
        };
        
        return shell;

        function activate() {
          return boot()
            .then(function () {
              log('Hot Towel SPA Loaded!', null, true);
              return true;
            });
          
        }

        function boot() {
          return datacontext.manager.fetchMetadata()
            .then(function() {
              router.mapNav('home');
              router.mapNav('grid');
              router.mapNav('gauge');
              return router.activate('home');
            });
        }

        function log(msg, data, showToast) {
           logger.log(msg, data, system.getModuleId(shell), showToast);
        }

    });