var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Quic;
(function (Quic) {
    var opts = {
        "@type": "form",
        "@children": [
            {
                "@type": "panel",
                "@caption": "{GroupName}",
                "@children": [
                    {
                        "@type": "text",
                        "@value": "{data.username}",
                        "@disable": "${perms.username==='disabled'}",
                        "@readonly": "${perms.username==='readonly'}"
                    }
                ]
            }
        ]
    };
    var Control = /** @class */ (function (_super) {
        __extends(Control, _super);
        function Control() {
            return _super.call(this) || this;
        }
        Control.prototype.onvaluechange = function (handler) {
            if (this.__bindName)
                this.subscribe(this.__bindName, handler);
            return this;
        };
        Control.prototype.notifyValueChange = function () {
            if (this.__bindName)
                this.notify(this.__bindName, this.getValue(), this);
            return this;
        };
        Control.prototype.getValue = function () {
            throw new Error("not implement");
        };
        return Control;
    }(Quic.Observable));
    Quic.Control = Control;
})(Quic || (Quic = {}));
