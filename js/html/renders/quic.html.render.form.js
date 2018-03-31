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
    var Html;
    (function (Html) {
        var renders = Quic.renders;
        var HtmlFormRender = /** @class */ (function (_super) {
            __extends(HtmlFormRender, _super);
            function HtmlFormRender() {
                var _this = _super.call(this) || this;
                _this.tagName = "form";
                return _this;
            }
            HtmlFormRender.prototype.render = function (defObj, viewContext, container) {
                var form = _super.prototype.render.call(this, defObj, viewContext, container);
                form.method = defObj.method || "get";
                form.action = defObj.url || "";
            };
            HtmlFormRender.prototype.getViewValue = function (element) {
                var els = element.elements;
                var result = {};
                for (var i = 0, j = els.length; i < j; i++) {
                    var input = els[i];
                    var renderContext = input.quic_renderContext;
                    if (renderContext) {
                        result[input.name] = renderContext.unformat(renderContext.getViewValue(input));
                    }
                    else {
                        result[input.name] = input.value;
                    }
                }
            };
            HtmlFormRender.prototype.setViewValue = function (element, data) {
                var els = element.elements;
                var result = {};
                for (var i = 0, j = els.length; i < j; i++) {
                    var input = els[i];
                    var renderContext = input.quic_renderContext;
                    if (renderContext) {
                        renderContext.setViewValue(renderContext.format(data[input.name]));
                    }
                    else {
                        input.value = data[input.name];
                    }
                }
            };
            return HtmlFormRender;
        }(Html.HtmlCompositeRender));
        Html.HtmlFormRender = HtmlFormRender;
        renders["form"] = new HtmlFormRender();
    })(Html = Quic.Html || (Quic.Html = {}));
})(Quic || (Quic = {}));
