define(['services/logger', 'services/datacontext','durandal/system'], function(logger, datacontext, system) {
  var gaugeVM = function() {
    var self = this;
    this.title = 'Kendo DataViz Gauge';
    this.activate = function() {
      logger.log('Gauge Activated', null, 'gauge', true);

      return true;
    };
    this.maxLoop = 6;
    this.viewAttached = function(view) {
      logger.log('viewAttached', this.title, 'gauge', false);
      loop(this);
    };
    this.rosterCount = ko.observable(14);

    this.myValue = ko.observable(25);
    this.myMaxValue = ko.observable(40);

    this.gaugeData = {
      value: ko.computed(function() {
         return this.myValue();
      }, this),
      scaleOptions: ko.computed(function() { 
        return { minorUnit: 5,
          majorUnit: 10,
          vertical: false,
          max: this.myMaxValue()
        };
      }, this),
      pointerOptions : {color: 'red',shape: 'arrow'}
    };
    
  };
  return gaugeVM;
  
  function loop(that) {

    if (that.maxLoop > 0) {
      setTimeout(function () {
        that.myValue(getRandomInt(1, that.myMaxValue()));
       
        system.log('update: ' + that.myValue());
        that.maxLoop--;
        loop(that);

      }, 2000);
    } 
  }
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});
