// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#dwe33p
Blockly.JavaScript['uart_new'] = function(block) {
    var dropdown_baud_rate = block.getFieldValue('baud_rate');
    var code = 'getUART(board,"' + dropdown_baud_rate + '")';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#4bu9f9
Blockly.JavaScript['uart_tx'] = function(block) {
    var variable_uart = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('uart'), Blockly.Variables.NAME_TYPE);
    var value_uart_data = Blockly.JavaScript.valueToCode(block, 'uart_data', Blockly.JavaScript.ORDER_ATOMIC);
    var code = variable_uart + '.tx(' + value_uart_data + ');\n';
    return code;
};

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#b9pxdq
Blockly.JavaScript['uart_rx'] = function(block) {
    var variable_uart = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('uart'), Blockly.Variables.NAME_TYPE);
    var statements_rx = Blockly.JavaScript.statementToCode(block, 'rx');
    var code = variable_uart + '.rx(';
    code += "function(){\n" + statements_rx + "});\n";
    return code;
};

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#d9sohf
Blockly.JavaScript['uart_data'] = function(block) {
    var variable_uart = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('uart'), Blockly.Variables.NAME_TYPE);
    var dropdown_dataType = block.getFieldValue('dataType');
    var code = variable_uart + '.' + dropdown_dataType;
    return [code, Blockly.JavaScript.ORDER_NONE];
};