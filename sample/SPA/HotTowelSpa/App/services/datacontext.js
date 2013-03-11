/*global _ */
define(['durandal/system', 'durandal/plugins/router', 'services/logger'],
    function(system, router, logger) {

        var manager = new breeze.EntityManager("api/Northwind"),
            breezQueryFailure = function(error) {
                logger.log('Error retrieving data', error, 'datacontext', true);
            },
            parts = {
                getPartsList: function(options) {
                    options = options || {};
                    options.entityManager = manager;
                    return data.parts.get(options);
                    //return dataservice.parts.get(manager, queryParams).always(function () {
                    //    presenter.log('getPartsList completed', null, 'datacontext', false);
                    //});
                }
            };

        return {
            metadataStore: manager.metadataStore,
            manager: manager,
            parts: parts,
        };
    });
    