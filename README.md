# radiogroup

A thin wrapper around a group of radio inputs. 

Makes event handling easier (e.g. for emitting custom GA events).
 
## Installation

Browserify:

    npm install --save-dev @nib/radiogroup
    
Component:

    component install nib-health-funds/radiogroup

## Usage

HTML:

    <div class="js-radiogroup">

        <label for="red">Red</label>
        <input type="radio" id="red" name="color" value="red"/>

        <label for="green">Green</label>
        <input type="radio" id="green" name="color" value="green"/>

        <label for="blue">Blue</label>
        <input type="radio" id="blue" name="color" value="blue"/>

        <label for="brown">Brown</label>
        <input type="radio" id="brown" name="color" value="brown"/>
        
    </div>


JavaScript:

    var radiogroup = require('radiogroup');

    radiogroup(document.querySelector('.js-radiogroup'))
      .on('selected', function() {
        console.log('selected:', this.value, this.values);
      })
      .on('changed', function() {
        console.log('changed:', this.value, this.values);
      })
      .select(3)
    ;

## API

### Methods

#### radiogroup(el: HTMLElement) : RadioGroup

Create a new radio group.

#### .value : string|null

Get the value of the selected radio input.

#### .values : Array.<string>

Get all the values of the radio inputs.

#### .select(index : number)

Select a radio input by index.

#### .select(value : string)

Select a radio input by value.

### Events

#### <>selected(value : string)

Emitted when a value is selected.

#### <>changed(value : string, previousValue : string|null)

Emitted when the selected value is different to the previously selected value.
