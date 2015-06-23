var click = require('@jameslnewell/click');
var assert = require('assert');
var radiogroup = require('..');

var element;

function el(selected) {
  var inputs = [];
  for (var i=0; i<4; ++i) {
    var input = '<input type=radio name=test value='+String.fromCharCode(65+i)+' '+(selected === String.fromCharCode(65+i) ? 'checked ' : '')+'/>';
    inputs.push(input)
  }
  var el = element = document.createElement('div');
  el.innerHTML = inputs.join();
  document.body.appendChild(el);
  return el;
}

describe('radiogroup', function() {

  afterEach(function() {
    if (element) {
      document.body.removeChild(element);
      element = null;
    }
  });

  describe('constructor', function() {

    it('should create a new instance when called as a constructor', function() {
      var rg = new radiogroup();
      assert(rg instanceof radiogroup);
    });

    it('should create a new instance when called as a fn', function() {
      var rg = radiogroup();
      assert(rg instanceof radiogroup);
    });

    it('should create a new instance with an options object', function() {

    });

    it('should create a new instance with an element', function() {

    });

  });

  describe('.values', function() {

    it('should be an array', function() {
      var rg = new radiogroup(el());
      assert.deepEqual(rg.values, ['A', 'B', 'C', 'D']);
    });

  });

  describe('.value', function() {

    it('should be null', function() {
      var rg = new radiogroup(el());
      assert.equal(rg.value, null);
    });

    it('should be C', function() {
      var rg = new radiogroup(el('C'));
      assert.equal(rg.value, 'C');
    });

  });

  describe('.select(null)', function() {

    it('should unselect the selected item', function() {
      var rg = new radiogroup(el());

      rg.select(0);
      rg.select(null);
      assert.equal(rg.value, null);

    });

  });

  describe('.select(index)', function() {

    it('should throw an error when the index is out of range', function() {
      var rg = new radiogroup(el());

      assert.throws(function() {
        rg.select(-1);
      });

      assert.throws(function() {
        rg.select(4);
      });

    });

    it('should select the 2nd item', function() {
      var rg = new radiogroup(el());

      assert.equal(rg.value, null);
      rg.select(1);
      assert.equal(rg.value, 'B');

    })

  });

  describe('.select(value)', function() {

    it('should throw an error when the value is not valid', function() {
      var rg = new radiogroup(el());

      assert.throws(function() {
        rg.select('abcde');
      });

    });

    it('should select the 2nd item', function() {
      var rg = new radiogroup(el());

      assert.equal(rg.value, null);
      rg.select('B');
      assert.equal(rg.value, 'B');

    });

  });

  describe('<>selected', function() {

    it('should be emitted when I call .select(value)', function(done) {
      var rg = new radiogroup(el());
      rg
        .on('selected', function(value) {
          assert.equal(value, 'A');
          done();
        })
        .select('A')
      ;
    });


    it('should be emitted when I click an input', function(done) {
      var rg = new radiogroup(el());
      rg
        .on('selected', function(value) {
          assert.equal(value, 'A');
          done();
        })
      ;
      click(rg.el.firstChild);
    });

  });

  describe('<>changed', function() {

    it('should be emitted when I call .select(value)', function(done) {
      var rg = new radiogroup(el());
      rg
        .on('changed', function(value, prev) {
          assert.equal(value, 'A');
          assert.equal(prev, null);
          done();
        })
        .select('A')
      ;
    });


    it('should be emitted when I click an input', function(done) {
      var rg = new radiogroup(el());
      rg
        .on('changed', function(value, prev) {
          assert.equal(value, 'A');
          assert.equal(prev, null);
          done();
        })
      ;
      click(rg.el.firstChild);
    });

  });

});