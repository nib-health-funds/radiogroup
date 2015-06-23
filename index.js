var View = require('view');

module.exports = View.extend({

  events: {
    'click input[type=radio]': 'onClick'
  },

  elements: {
    'input[type=radio]': 'all:inputs'
  },

  /**
   * Construct the view
   * @param   {Object|HTMLElement} options
   * @returns {module.exports}
   */
  construct: function(options) {

    if (!(this instanceof View)) {
      return new module.exports(options);
    }

    if (options instanceof HTMLElement) {
      options = {el: options};
    }

    View.call(this, options);
  },

  /**
   * Select an option
   * @param   {string|number|null} value
   * @returns {exports}
   */
  select: function(value) {

    if (value === null) {

      for (var i=0; i<this.inputs.length; ++i) {
        this.inputs[i].checked = false;
      }

      //fire the events
      this.onClick({delegateTarget: null});

    } else if (typeof value === 'number') {

      //select the input
      if (value >= 0 && value < this.inputs.length) {
        this.inputs[value].checked = true;
      } else {
        throw new RangeError();
      }

      //fire the events
      this.onClick({delegateTarget: this.inputs[value]});

    } else {

      //select the input
      var found = false;
      for (var i=0; i<this.inputs.length; ++i) {
        if (this.inputs[i].value === value) {
          this.inputs[i].checked = true;
          found = true;
          break;
        }
      }

      if (!found) {
        throw new RangeError();
      }

      //fire the events
      this.onClick({delegateTarget: this.inputs[i]});

    }
    return this;
  },

  /**
   * Handle change events
   * @param event
   */
  onClick: function(event) {
    var input = event.delegateTarget;

    if (!input) {
      return;
    }

    this.emit('selected', input.value);

    if (this.previous !== input.value) {
      this.emit('changed', input.value, this.previous);
      this.previous = input.value;
    }

  }

});

Object.defineProperties(module.exports.prototype, {

  /**
   * Get the selected value
   * @returns {string|null}
   */
  value: {
    get: function() {
      var input = this.el.querySelector('input[type=radio]:checked');
      if (input) {
        return input.value;
      } else {
        return null;
      }
    }
  },

  /**
   * Get the values
   * @returns {Array.<string>}
   */
  values: {
    get: function() {
      return Array.prototype.map.call(this.inputs, function(input) {
        return input.value;
      });
    }
  }

});