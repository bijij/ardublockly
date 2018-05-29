

/**
 * @fileoverview Keyboard and Mouse blocks for Blockly.
 * @author mrundle@gmail.com (Matt Rundle)
 */
 
'use strict';

goog.require('Blockly.Arduino');

Blockly.Arduino['clickmouse'] = function(block) {
  Blockly.Arduino.addInclude('mouse', '#include <Mouse.h>');
  var setupCode ="Mouse.begin();\n";
  Blockly.Arduino.addSetup('startmouse', setupCode, true);
  var mouseButton = block.getFieldValue('NAME');
  var code = 'Mouse.click(' + mouseButton + ');\n';
  return code;
};

Blockly.Arduino['movemouse'] = function(block) {
  Blockly.Arduino.addInclude('mouse', '#include <Mouse.h>');
  var setupCode ="Mouse.begin();\n";
  Blockly.Arduino.addSetup('startmouse', setupCode, true);
  var x = block.getFieldValue('X');
  var y = block.getFieldValue('Y');
  // TODO: type checking here. needs to be ints. 
  var code = 'Mouse.move(' + x + ', ' + y + ');\n';
  return code;
};

Blockly.Arduino['pressmouse'] = function(block) {
  Blockly.Arduino.addInclude('mouse', '#include <Mouse.h>');
  var setupCode ="Mouse.begin();\n";
  Blockly.Arduino.addSetup('startmouse', setupCode, true);
  var mouseButton = block.getFieldValue('NAME');
  var code = 'Mouse.press(' + mouseButton + ');\n';
  return code;
};

Blockly.Arduino['releasemouse'] = function(block) {
  Blockly.Arduino.addInclude('mouse', '#include <Mouse.h>');
  var setupCode ="Mouse.begin();\n";
  Blockly.Arduino.addSetup('startmouse', setupCode, true);
  var dropdown_name = block.getFieldValue('NAME');
  var mouseButton = block.getFieldValue('NAME');
  var code = 'Mouse.release(' + mouseButton + ');\n';
  return code;
};

Blockly.Arduino['mouse_ispressed'] = function(block) {
  Blockly.Arduino.addInclude('mouse', '#include <Mouse.h>');
  var setupCode ="Mouse.begin();\n";
  Blockly.Arduino.addSetup('startmouse', setupCode, true);
  var dropdown_name = block.getFieldValue('NAME');
  var mouseButton = block.getFieldValue('NAME');
  var code = 'Mouse.isPressed(' + mouseButton + ')';
  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['presskey_textinput'] = function(block) {
  Blockly.Arduino.addInclude('keyboard', '#include <Keyboard.h>');
  var setupCode ="Keyboard.begin();\n";
  Blockly.Arduino.addSetup('startkeyboard', setupCode, true);
  var key = block.getFieldValue('KEY_CODE');
  var code = 'Keyboard.press(' + key + ');\n';
  return code;
};

Blockly.Arduino['releasekey_textinput'] = function(block) {
  Blockly.Arduino.addInclude('keyboard', '#include <Keyboard.h>');
  var setupCode ="Keyboard.begin();\n";
  Blockly.Arduino.addSetup('startkeyboard', setupCode, true);
  var key = block.getFieldValue('KEY_CODE');
  var code = 'Keyboard.release(' + key + ');\n';
  return code;
};

Blockly.Arduino['releasekey_allkeys'] = function(block) {
  Blockly.Arduino.addInclude('keyboard', '#include <Keyboard.h>');
  var setupCode ="Keyboard.begin();\n";
  Blockly.Arduino.addSetup('startkeyboard', setupCode, true);
  var code = 'Keyboard.releaseAll();\n';
  return code;
};

Blockly.Arduino['writekey_textinput'] = function(block) {
  Blockly.Arduino.addInclude('keyboard', '#include <Keyboard.h>');
  var setupCode ="Keyboard.begin();\n";
  Blockly.Arduino.addSetup('startkeyboard', setupCode, true);
  var key = block.getFieldValue('KEY_CODE');
  var code = 'Keyboard.write(' + key + ');\n';
  return code;
};