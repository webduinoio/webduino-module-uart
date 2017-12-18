+(function(factory) {
    if (typeof exports === 'undefined') {
        factory(webduino || {});
    } else {
        module.exports = factory;
    }
}(function(scope) {
    'use strict';
    var UART_MESSAGE = [0x04, 0x24];
    var UARTEvent = {
        READ: 'read',
        READ_ERROR: 'readError'
    };
    var baudRate = {
        '9600': 2,
        '19200': 3,
        '38400': 4,
        '57600': 5,
        '76800': 6,
        '115200': 7
    };

    var Module = scope.Module,
        BoardEvent = scope.BoardEvent,
        proto;
    var self;
    var string = '';
    var list = [];
    var readCallback = function() {}
    UART.prototype = proto = Object.create(Module.prototype, {
        constructor: {
            value: UART
        }
    });

    function UART(board, rate) {
        Module.call(this);
        self = this;
        this._board = board;
        self._messageHandler = onMessage.bind(this);
        //console.log("start UART: baud 9600");
        board.on(BoardEvent.SYSEX_MESSAGE, self._messageHandler);
        var setBaudRate = [0xF0, 0x04, 0x24, baudRate[rate] /*init*/ , 0xF7];
        board.send(setBaudRate);
    }

    function onMessage(event) {
        var message = event.message;
        if (message[0] !== UART_MESSAGE[0] || message[1] !== UART_MESSAGE[1]) {
            return;
        } else {
            processUARTData(this, message);
        }
    }

    function processUARTData(self, data) {
        var rxData = [];
        if (data[2] == 11 /*rx*/ ) {
            var rawData = data.slice(3);
            for (var i = 0; i < rawData.length; i = i + 2) {
                var b = rawData[i] * 16 + rawData[i + 1];
                rxData.push(b);
            }
            var str = '';
            for (var i = 0; i < rxData.length; i++) {
                str += String.fromCharCode(rxData[i]);
            }
            self.string = str;
            self.list = rxData;
            readCallback();
        }
    }

    proto.tx = function(data) {
        var list = data;
        if (typeof data === 'string') {
            list = [];
            for (var i = 0; i < data.length; i++) {
                list.push(data.charCodeAt(i));
            }
        }
        var sendData = [0xF0, 0x04, 0x24, 0x0A /*send*/ ];
        for (var i = 0; i < list.length; i++) {
            sendData.push((list[i] >> 4) & 0x0f);
            sendData.push(list[i] & 0x0f);
        }
        sendData.push(0xF7);
        //console.log("SendData:", sendData);
        //board.send(setBaudRate);
    }

    proto.rx = function(callback) {
        readCallback = callback;
    }

    scope.module.UART = UART;
}));