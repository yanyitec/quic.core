"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transport;
var Quic = /** @class */ (function () {
    function Quic(opts, context) {
        //this.opts = opts;
        var contextData;
        if (context instanceof Quic) {
            this.superInstance = context;
            contextData = this.superInstance.ctrlr;
        }
        else {
            contextData = context || {};
        }
    } //end constructor
    return Quic;
}());
exports.Quic = Quic;
function initOpts() { }
