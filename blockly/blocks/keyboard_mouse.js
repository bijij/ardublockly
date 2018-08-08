
/**
 * @fileoverview Keyboard and Mouse blocks for Blockly.
 * @author mrundle@gmail.com (Matt Rundle)
 */
'use strict';
goog.provide('Blockly.Blocks.keyboard_mouse');
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/**
 * Common HSV hue for all blocks in this category.
 */
 
Blockly.Blocks.keyboard_mouse.KEYB_HUE = 200;
Blockly.Blocks.keyboard_mouse.MOUSE_HUE = 100;

Blockly.Blocks['clickmouse'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("click ")
        .appendField(new Blockly.FieldDropdown([["left","MOUSE_LEFT"], ["right","MOUSE_RIGHT"], ["middle","MOUSE_MIDDLE"]]), "NAME")
        .appendField("mouse button");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.keyboard_mouse.MOUSE_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['movemouse'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("move cursor by x")
        .appendField(new Blockly.FieldTextInput("0"), "X")
        .appendField(" and y")
        .appendField(new Blockly.FieldTextInput("0"), "Y");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.keyboard_mouse.MOUSE_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['presskey_textinput'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("press key")
        .appendField(new Blockly.FieldTextInput("KEY_CODE"), "KEY_CODE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.keyboard_mouse.KEYB_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['releasekey_textinput'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("release key")
        .appendField(new Blockly.FieldTextInput("KEY_CODE"), "KEY_CODE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.keyboard_mouse.KEYB_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['releasekey_allkeys'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("release all keys");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.keyboard_mouse.KEYB_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['pressmouse'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("press")
        .appendField(new Blockly.FieldDropdown([["left","MOUSE_LEFT"], ["right","MOUSE_RIGHT"], ["middle","MOUSE_MIDDLE"]]), "NAME")
        .appendField("mouse button");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.keyboard_mouse.MOUSE_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['releasemouse'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("release")
        .appendField(new Blockly.FieldDropdown([["left","MOUSE_LEFT"], ["right","MOUSE_RIGHT"], ["middle","MOUSE_MIDDLE"]]), "NAME")
        .appendField("mouse button");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.keyboard_mouse.MOUSE_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['mouse_ispressed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["left","MOUSE_LEFT"], ["right","MOUSE_RIGHT"], ["middle","MOUSE_MIDDLE"]]), "NAME")
        .appendField("mouse button is pressed");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.keyboard_mouse.MOUSE_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['writekey_textinput'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("send keystroke")
        .appendField(new Blockly.FieldTextInput("KEY_CODE"), "KEY_CODE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.keyboard_mouse.KEYB_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
