+(function(window, webduino) {
    'use strict';
    window.getUART = function(board, rate) {
        return new webduino.module.UART(board, rate);
    };
}(window, window.webduino));