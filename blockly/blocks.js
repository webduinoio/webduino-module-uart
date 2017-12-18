Blockly.Blocks['uart_new'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.WEBDUINO_UART_SETTING, "設定 UART baud rate:")
            .appendField(new Blockly.FieldDropdown([
                ["9600", "9600"],
                ["19200", "19200"],
                ["38400", "38400"],
                ["57600", "57600"],
                ["76800", "76800"],
                ["115200", "115200"]
            ]), "baud_rate");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['uart_tx'] = {
    init: function() {
        this.appendValueInput("uart_data")
            .setCheck(null)
            .appendField(new Blockly.FieldVariable("uart"), "uart")
            .appendField(Blockly.Msg.WEBDUINO_UART_TX, "傳送資料")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(75);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['uart_rx'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("uart"), "uart")
            .appendField(Blockly.Msg.WEBDUINO_UART_RX, "接收資料")
        this.appendStatementInput("rx")
            .setCheck(null)
            .appendField("執行");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['uart_data'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("uart"), "uart")
            .appendField("取得資料")
            .appendField(new Blockly.FieldDropdown([
                ["string", "string"],
                ["list", "list"]
            ]), "dataType");
        this.setOutput(true, null);
        this.setColour(75);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};