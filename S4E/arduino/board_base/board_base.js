/**
 * @license
 * Copyright 2012 Fred Lin
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating Arduino code for basics board command blocks.
 * @author gasolin@gmail.com (Fred Lin)
 * @author scanet@libreduc.cc (Sébastien CANET)
 */

'use strict';

goog.provide('Blockly.Arduino.board_base');

goog.require('Blockly.Arduino');

Blockly.Arduino['board_base_inout_buildin_led'] = function (block) {
    var dropdown_stat = block.getFieldValue('STAT');
    Blockly.Arduino.setups_['setup_output_13'] = 'pinMode(LED_BUILTIN, OUTPUT);';
    var code = 'digitalWrite(LED_BUILTIN, ' + dropdown_stat + ');\n'
    return code;
};

Blockly.Arduino['board_base_inout_digital_write'] = function (block) {
    var dropdown_pin = block.getFieldValue('PIN');
    var dropdown_stat = block.getFieldValue('STAT');
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = 'digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');\n'
    return code;
};

Blockly.Arduino['board_base_inout_digital_read'] = function (block) {
    var dropdown_pin = block.getFieldValue('PIN');
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'digitalRead(' + dropdown_pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['board_base_inout_highlow'] = function (block) {
    // Boolean values HIGH and LOW.
    var code = (block.getFieldValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['board_base_inout_analog_write'] = function (block) {
    var dropdown_pin = block.getFieldValue('PIN');
    var value_num = Blockly.Arduino.valueToCode(this, 'PWM', Blockly.Arduino.ORDER_ATOMIC);
    //Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = 'analogWrite(' + dropdown_pin + ', ' + value_num + ');\n';
    return code;
};

Blockly.Arduino['board_base_inout_analog_read'] = function (block) {
    var dropdown_pin = block.getFieldValue('PIN');
    //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
    var code = 'analogRead(' + dropdown_pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['board_base_delay'] = function (block) {
    var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000'
    var code = 'delay(' + delay_time + ');\n';
    return code;
};

Blockly.Arduino['board_base_angle'] = function (block) {
    var angle = this.getFieldValue('ANGLE');
    return [angle, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['board_base_map'] = function (block) {
    var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
    var value_dmax = Blockly.Arduino.valueToCode(this, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'map(' + value_num + ', 0, 1024, 0, ' + value_dmax + ')';
    return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['board_base_inout_tone'] = function (block) {
    var dropdown_pin = block.getFieldValue("PIN");
    var value_num = Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_output' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = "tone(" + dropdown_pin + ", " + value_num + ");\n";
    return code;
};

Blockly.Arduino['board_base_inout_notone'] = function (block) {
    var dropdown_pin = block.getFieldValue("PIN");
    Blockly.Arduino.setups_['setup_output' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = "noTone(" + dropdown_pin + ");\n";
    return code;
};

Blockly.Arduino['board_base_serial_print'] = function (block) {
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0'
    //content = content.replace('(','').replace(')','');

    Blockly.Arduino.setups_['setup_serial_' + profile.default.serial] = 'Serial.begin(9600);\n';

    var code = 'Serial.println(' + content + ');\n';
    return code;
};