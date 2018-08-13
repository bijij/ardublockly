/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for the Raw Code blocks.
 *
 */
'use strict';

goog.require('Blockly.Arduino');



/**
 * Generator for inserting raw code
 * Arduino code: function 
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['raw_func'] = function(block) {
  var code = block.getFieldValue('CODE');
  Blockly.Arduino.addDeclaration(block.id, code);
  return '';
};


/**
 * Generator for inserting raw code
 * Arduino code: loop { X }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['raw_code'] = function(block) {
  var code = block.getFieldValue('CODE');
  return code + '\n';
};


/**
 * Generator for inserting raw code
 * Arduino code: statement ( x )
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['raw_output'] = function(block) {
  var code = block.getFieldValue('CODE');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

