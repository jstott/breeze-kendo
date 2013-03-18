define(['services/logger'], function (logger) {
    var vm = {
        activate: activate,
        title: 'Kendo MVVM Form',
        koModel: kendo.observable({
            firstName: "John",
            lastName: "Doe",
            genders: ["Male", "Female"],
            gender: "Male",
            agreed: false,
            confirmed: false,
            register: function(e) {
                e.preventDefault();

                this.set("confirmed", true);
                logger.log('Confirmed registration!', null, 'kendo', true);
                vm.koModel.startOver();
            },
            startOver: function() {
                this.set("confirmed", false);
                this.set("agreed", false);
                this.set("gender", "Male");
                this.set("firstName", "John");
                this.set("lastName", "Doe");
            }
        })
    };

    return vm;

    //#region Internal Methods
    function activate() {
        logger.log('Kendo View Activated', null, 'kendo', true);
        return true;
    }
    //#endregion
});