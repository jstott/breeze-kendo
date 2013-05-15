define(['services/logger','durandal/system'], function (logger,system) {
    var vm = {
        activate: activate,
        title: 'Home View',
    };

    return vm;

    //#region Internal Methods
    function activate() {
      logger.log('Home View Activated', null, 'home', true);
        return true;
    }
 
    //#endregion
});