///<reference path="../core/quic.render.ts" />
var Quic;
(function (Quic) {
    function createElement(context, type) {
        return document.createElement(type || "div");
    }
    Quic.createElement = createElement;
    function appendElement(context, parentElement, element) {
        parentElement.appendChild(element);
    }
    Quic.appendElement = appendElement;
    var Html;
    (function (Html) {
        function attach(element, evt, listener) {
            if (element.addEventListener) {
                Quic.attach = function (element, evt, listener) {
                    element.addEventListener(evt, listener, false);
                };
            }
            else if (element.attachEvent) {
                Quic.attach = function (element, evt, listener) {
                    element.attachEvent("on" + evt, listener, false);
                };
            }
            else {
                throw new Error("Browser is not support the addEventListener/attachEvent");
            }
            Quic.attach(element, evt, listener);
        }
        Html.attach = attach;
    })(Html = Quic.Html || (Quic.Html = {}));
})(Quic || (Quic = {}));
