define(['services/logger', 'services/datacontext','durandal/system'], function(logger, datacontext, system) {
  var gaugeVM = function() {
    var self = this;

    this.activate = function() {
      logger.log('Details View Activated', null, 'details', true);

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

    // nope - Problem parsing d="MNaN NaN NaN NaN NaN NaN z" 
    this.signedOnStats3 = {
      value: this.myValue(),
      scale: {
        minorUnit: 10,
        majorUnit: 20,
        vertical: false,
        max: 40
      },
      pointer: {
        color: 'red',
        shape: 'arrow',
        value: ko.computed({
          read: function() {
            return {
              color: 'red',
              shape: 'arrow',
              value: this.myValue()
            };
          },
          owner: this
        })
      }
    };
    // gauge will display - but not update
    this.signedOnStats2 = ko.computed(function() {
      var value = this.myValue(),
          scale = {
            minorUnit: 10,
            majorUnit: 20,
            vertical: false,
            max: 40
          },
          pointer = ko.computed(function() {
            return {
              color: 'red',
              shape: 'arrow',
              value: this.myValue()
            };
          }, this);
      return {
        value: value,
        scale: scale,
        pointer: pointer
      };
    }, this);

    // gauge displays - does not display initial value, and gets Problem parsing d="MNaN NaN NaN NaN NaN NaN z"
    this.signedOnStats = {      
      total: ko.computed({
        read: function() {
          system.log('read:total: ' + this.myValue());
          return this.myValue() || 4;
        },
        deferEvaluation: true,
        owner: this
      }),
      scale: {
        minorUnit: 10,
        majorUnit: 20,
        vertical: false,
        max: 40
      },
      gaugeArea: { background: 'white' },
      pointer: {
        color: 'red',
        shape: 'arrow',
        value: ko.computed({
          read: function() {
            system.log('read:pointer: ' + this.myValue());
            return this.myValue() || 4;
          },
          deferEvaluation: true,
          owner: this
        })
      }
    };

    this.signOn = {
      value: ko.computed(function() { return this.myValue(); }, this),
      scaleOptions: ko.computed(function() { 
        return { minorUnit: 5,
          majorUnit: 20,
          vertical: false,
          max: this.myMaxValue()
        };
      }, this),
      pointerOptions : {color: 'red',shape: 'arrow'}
    };
    
    this.backgroundColor = ko.observable('white');
    this.pointerColor = ko.observable('black');

    this.gaugeOptions = ko.computed(function () {
      return { background: self.backgroundColor() };
    });
    this.scaleOptions = ko.computed(function () {
      return { minorUnit: 5, majorUnit: 20, vertical: false, max: this.myMaxValue() };
    },this);
    this.pointerOptions = ko.computed(function () {
      return { color: 'red',
        shape: 'arrow', value: self.myValue() };//
    });
    
    
  };
  return gaugeVM;
  
  function loop(that) {

    if (that.maxLoop > 0) {
      setTimeout(function () {
        that.myMaxValue(55);
        that.myValue(getRandomInt(1, 55));
       
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
