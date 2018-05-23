
/**
 * js/blockly/core/field_textarea.js
 *
 */

'use strict';

goog.provide('Blockly.FieldTextArea');

goog.require('Blockly.FieldTextInput');
goog.require('Blockly.Msg');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.userAgent');


/**
 * Class for an editable text field.
 * @param {string} text The initial content of the field.
 * @param {Function=} opt_changeHandler An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns either the accepted text, a 
replacement
 *     text, or null to abort the change.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldTextArea = function(text, opt_validator) {
  Blockly.FieldTextArea.superClass_.constructor.call(this, text,
    opt_validator);
};
goog.inherits(Blockly.FieldTextArea, Blockly.FieldTextInput);

/**
 * Close the input widget if this input is being deleted.
 */
Blockly.FieldTextArea.prototype.dispose = function() {
  Blockly.WidgetDiv.hideIfOwner(this);
  Blockly.FieldTextArea.superClass_.dispose.call(this);
};

/**
 * Update the text node of this field to display the current text.
 * @private
 */
Blockly.FieldTextArea.prototype.updateTextNode_ = function() {
  if (!this.textElement_) {
    // Not rendered yet.
    return;
  }
  var text = this.text_;

  // Empty the text element.
  goog.dom.removeChildren(/** @type {!Element} */ (this.textElement_));

  // Replace whitespace with non-breaking spaces so the text doesn't collapse.
  text = text.replace(/ /g, Blockly.Field.NBSP);
  if (this.sourceBlock_.RTL && text) {
    // The SVG is LTR, force text to be RTL.
    text += '\u200F';
  }
  if (!text) {
    // Prevent the field from disappearing if empty.
    text = Blockly.Field.NBSP;
  }

  if (text.length > this.maxDisplayLength) {
    var temp = "";
    var done = false;
    while (!done) {
        temp = temp + text.substring(0, this.maxDisplayLength);
        temp = temp.concat("\n");
        text = text.substring(this.maxDisplayLength, text.length);
        if (text.length < this.maxDisplayLength) {
            temp = temp + text;
            done = true;
        }
    }
    text = temp;
  }
  
  var lines = text.split('\n');
  var dy = '0em';
  for (var i = 0; i < lines.length; i++) {
    var tspanElement = Blockly.createSvgElement('tspan',
        {'dy': dy, 'x': 0}, this.textElement_);
    dy = '1em';
    var textNode = document.createTextNode(lines[i]);
    tspanElement.appendChild(textNode);
  }

  // Cached width is obsolete.  Clear it.
  this.size_.width = 0;
};

/**
 * Show the inline free-text editor on top of the text.
 * @param {boolean=} opt_quietInput True if editor should be created without
 *     focus.  Defaults to false.
 * @private
 */
Blockly.FieldTextArea.prototype.showEditor_ = function(opt_quietInput) {
  var quietInput = opt_quietInput || false;
  if (!quietInput && (goog.userAgent.MOBILE || goog.userAgent.ANDROID ||
                      goog.userAgent.IPAD)) {
    // Mobile browsers have issues with in-line textareas (focus & keyboards).
    var newValue = window.prompt(Blockly.Msg.CHANGE_VALUE_TITLE, 
this.text_);
    if (this.sourceBlock_ && this.changeHandler_) {
      var override = this.changeHandler_(newValue);
      if (override !== undefined) {
        newValue = override;
      }
    }
    if (newValue !== null) {
      this.setValue(newValue);
    }
    return;
  }

  Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, 
this.widgetDispose_());
  var div = Blockly.WidgetDiv.DIV;
  // Create the input.
  var htmlInput = goog.dom.createDom('textarea', 'blocklyHtmlTextArea');
  var fontSize = (Blockly.FieldTextArea.FONTSIZE *
                  this.sourceBlock_.workspace.scale) + 'pt';
  div.style.fontSize = fontSize;
  htmlInput.style.fontSize = fontSize;
  Blockly.FieldTextArea.htmlInput_ = htmlInput;
  htmlInput.style['line-height'] = '15px';
  htmlInput.style.height = '100%';
  htmlInput.style.width = '100%';
  div.appendChild(htmlInput);

  htmlInput.value = htmlInput.defaultValue = this.text_;
  htmlInput.oldValue_ = null;
  this.validate_();
  this.resizeEditor_();
  if (!quietInput) {
    htmlInput.focus();
    htmlInput.select();
  }

  // Bind to keydown -- trap Enter without IME and Esc to hide.
  htmlInput.onKeyDownWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keydown', this, 
this.onHtmlInputKeyDown_);
  // Bind to keyup -- trap Enter; resize after every keystroke.
  htmlInput.onKeyUpWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keyup', this, this.onHtmlInputChange_);
  // Bind to keyPress -- repeatedly resize when holding down a key.
  htmlInput.onKeyPressWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keypress', this, 
this.onHtmlInputChange_);
  var workspaceSvg = this.sourceBlock_.workspace.getCanvas();
  htmlInput.onWorkspaceChangeWrapper_ =
      Blockly.bindEvent_(workspaceSvg, 'blocklyWorkspaceChange', this,
      this.resizeEditor_);
};

/**
 * Handle key down to the editor.
 * @param {!Event} e Keyboard event.
 * @private
 */
Blockly.FieldTextArea.prototype.onHtmlInputKeyDown_ = function(e) {
  var htmlInput = Blockly.FieldTextArea.htmlInput_;
  var escKey = 27;
  if (e.keyCode == escKey) {
    this.setValue(htmlInput.defaultValue);
    Blockly.WidgetDiv.hide();
  }
};

/**
 * Handle a change to the editor.
 * @param {!Event} e Keyboard event.
 * @private
 */
Blockly.FieldTextArea.prototype.onHtmlInputChange_ = function(e) {
    var htmlInput = Blockly.FieldTextArea.htmlInput_;
    // Update source block.
    var text = htmlInput.value;
    if (text !== htmlInput.oldValue_) {
      htmlInput.oldValue_ = text;
      this.setValue(text);
      this.validate_();
    } else if (goog.userAgent.WEBKIT) {
      // Cursor key.  Render the source block to show the caret moving.
      // Chrome only (version 26, OS X).
      this.sourceBlock_.render();
    }
    this.resizeEditor_();
  };
/**
 * Check to see if the contents of the editor validates.
 * Style the editor accordingly.
 * @private
 */
Blockly.FieldTextArea.prototype.validate_ = function() {
  var valid = true;
  goog.asserts.assertObject(Blockly.FieldTextArea.htmlInput_);
  var htmlInput = Blockly.FieldTextArea.htmlInput_;
  if (this.sourceBlock_ && this.changeHandler_) {
    valid = this.changeHandler_(htmlInput.value);
  }
  if (valid === null) {
    Blockly.addClass_(htmlInput, 'blocklyInvalidTextArea');
  } else {
    Blockly.removeClass_(htmlInput, 'blocklyInvalidTextArea');
  }
};

/**
 * Resize the editor and the underlying block to fit the text.
 * @private
 */
Blockly.FieldTextArea.prototype.resizeEditor_ = function() {
  var div = Blockly.WidgetDiv.DIV;
  var bBox = this.fieldGroup_.getBBox();
  div.style.width = bBox.width * this.sourceBlock_.workspace.scale + 'px';
  div.style.height = bBox.height * this.sourceBlock_.workspace.scale + 'px';
  var xy = this.getAbsoluteXY_();
  // In RTL mode block fields and LTR input fields the left edge moves,
  // whereas the right edge is fixed.  Reposition the editor.
  if (this.sourceBlock_.RTL) {
    var borderBBox = this.getScaledBBox_();
    xy.x += borderBBox.width;
    xy.x -= div.offsetWidth;
  }
  // Shift by a few pixels to line up exactly.
  xy.y += 1;
  if (goog.userAgent.GECKO && Blockly.WidgetDiv.DIV.style.top) {
    // Firefox mis-reports the location of the border by a pixel
    // once the WidgetDiv is moved into position.
    xy.x -= 1;
    xy.y -= 1;
  }
  if (goog.userAgent.WEBKIT) {
    xy.y -= 3;
  }
  div.style.left = xy.x + 'px';
  div.style.top = xy.y + 'px';
};

/**
 * Draws the border with the correct width.
 * Saves the computed width in a property.
 * @private
 */
Blockly.FieldTextArea.prototype.render_ = function() {

this.size_.width = this.textElement_.getBBox().width + 5;
  var text = this.text_;  
  if (text.length > this.maxDisplayLength) {
    var temp = "";
    var done = false;
    while (!done) {
        temp = temp + text.substring(0, this.maxDisplayLength);
        temp = temp.concat("\n");
        text = text.substring(this.maxDisplayLength, text.length);
        if (text.length < this.maxDisplayLength) {
            temp = temp + text;
            done = true;
        }
    }
    text = temp;
}
 this.size_.height= (text.split('\n').length ||1)*20 + 
                    (Blockly.BlockSvg.SEP_SPACE_Y+5) ;
  if (this.borderRect_) {
    this.borderRect_.setAttribute('width',
         this.size_.width + Blockly.BlockSvg.SEP_SPACE_X);
        this.borderRect_.setAttribute('height',
         this.size_.height -  (Blockly.BlockSvg.SEP_SPACE_Y+5));
  }

};
  
/**
 * Close the editor, save the results, and dispose of the editable
 * text field's elements.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldTextArea.prototype.widgetDispose_ = function() {
  var thisField = this;
  return function() {
    var htmlInput = Blockly.FieldTextArea.htmlInput_;
    // Save the edit (if it validates).
    var text = htmlInput.value;
    if (thisField.sourceBlock_ && thisField.changeHandler_) {
      var text1 = thisField.changeHandler_(text);
      if (text1 === null) {
        // Invalid edit.
        text = htmlInput.defaultValue;
      } else if (text1 !== undefined) {
        // Change handler has changed the text.
        text = text1;
      }
    }
    thisField.setValue(text);
    thisField.sourceBlock_.rendered && thisField.sourceBlock_.render();
    Blockly.unbindEvent_(htmlInput.onKeyDownWrapper_);
    Blockly.unbindEvent_(htmlInput.onKeyUpWrapper_);
    Blockly.unbindEvent_(htmlInput.onKeyPressWrapper_);
    Blockly.unbindEvent_(htmlInput.onWorkspaceChangeWrapper_);
    Blockly.FieldTextArea.htmlInput_ = null;
    // Delete style properties.
    var style = Blockly.WidgetDiv.DIV.style;
    style.width = 'auto';
    style.height = 'auto';
    style.fontSize = '';
  };
};