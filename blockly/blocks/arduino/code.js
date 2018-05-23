/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Tone generation
 *     The Arduino function syntax can be found at
 *     https://www.arduino.cc/en/Reference/tone
 *
 */
'use strict';

goog.provide('Blockly.Blocks.code');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.code.HUE = 0;

Blockly.Blocks['raw_func'] = {
  /**
   * Block for entering raw code
   * @this Blockly.Block
   */
  init: function () {

    this.appendDummyInput()
      .appendField(
        new Blockly.FieldTextArea(
          '// Enter your code here'),
        'CODE');

    this.setColour(Blockly.Blocks.code.HUE);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Number block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function () {
      return Blockly.Msg.RAW_CODE_TOOLTIP;
    });
  },
  /**
   * Reads the numerical value from the block and assigns a block type.
   * @this Blockly.Block
   */
  getBlockType: function () {
    return Blockly.Types.RAWCODE;
  }
};

Blockly.Blocks['raw_code'] = {
  /**
   * Block for entering raw code
   * @this Blockly.Block
   */
  init: function () {

    this.appendDummyInput()
      .appendField(
        new Blockly.FieldTextArea(
          '// Enter your code here'),
        'CODE');

    this.setPreviousStatement(true);
    this.setNextStatement(true);

    this.setColour(Blockly.Blocks.code.HUE);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Number block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function () {
      return Blockly.Msg.RAW_CODE_TOOLTIP;
    });
  },
  /**
   * Reads the numerical value from the block and assigns a block type.
   * @this Blockly.Block
   */
  getBlockType: function () {
    return Blockly.Types.RAWCODE;
  }
};

Blockly.Blocks['raw_output'] = {
  /**
   * Block for entering raw code
   * @this Blockly.Block
   */
  init: function () {

    this.appendDummyInput()
      .appendField(
        new Blockly.FieldTextInput(
          '// Enter your code here'),
        'CODE');

    this.setOutput(true);

    this.setColour(Blockly.Blocks.code.HUE);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Number block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function () {
      return Blockly.Msg.RAW_CODE_TOOLTIP;
    });
  },
  /**
   * Reads the numerical value from the block and assigns a block type.
   * @this Blockly.Block
   */
  getBlockType: function () {
    return Blockly.Types.RAWCODE;
  }
};