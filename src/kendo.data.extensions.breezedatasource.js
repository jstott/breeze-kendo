(function ($, kendo, breeze) {
	'use strict';
	
	var breezeEntityManager, endpoint;

	kendo.data.extensions = kendo.data.extensions || {};

	var readFromBreeze = function (options) {
		var orderVal = "",
				sortOps = options.data.sort;

			if (sortOps) {
				orderVal = sortOps.field + " " + sortOps.dir;
			}

			var query = new breeze.EntityQuery(endpoint)
				.orderBy(orderVal)
				.skip(options.data.skip)
				.take(options.data.take);

			breezeEntityManager.executeQuery(query).then(function(xhr){
				options.success(xhr.results);
			});
	};

	// Specify a CRUD transport object for our custom Kendo DataSource
	var breezeTransports = {
		read: function (options) {
			readFromBreeze(options);
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
	};

	// Create the custom DataSource by extending a kendo.data.DataSource
	// and specify an init method that wires up needed functionality.
	kendo.data.extensions.BreezeDataSource = kendo.data.DataSource.extend({
		init: function (options) {
			breezeEntityManager = options.entityManager;
			endpoint = options.endpoint;

			// The endpoint and entityManager fields are required. If not specified, throw an error
			if (!breezeEntityManager) {
				throw new Error('A Breeze EntityManager object is required in order to use the DataSource with Breeze. Please specify an "entityManager" property in your options object.');
			} 

			if (!endpoint) {
				throw new Error('An "endpoint" option is required in order to work with Breeze. Please specify an "endpoint" property in your options object.');
			}

			// Call the "base" DataSource init function and provide our custom transport object
			kendo.data.DataSource.fn.init.call(this, $.extend(true, {}, { transport: breezeTransports }, options));
		}
	});
})($, kendo, breeze);