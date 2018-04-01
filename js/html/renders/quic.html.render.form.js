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
                return _super.call(this) || this;
            }
            HtmlFormRender.prototype.renderElement = function (context) {
                var form = context.element;
                form.method = context.field.method || "get";
                form.action = context.field.url || "";
                _super.prototype.renderElement.call(this, context);
            };
            HtmlFormRender.prototype.value = function (context, value) {
                if (value === undefined)
                    return getViewValue(context.element);
                setViewValue(context.element, value);
            };
            return HtmlFormRender;
        }(Html.HtmlCompositeRender));
        Html.HtmlFormRender = HtmlFormRender;
        function getViewValue(element) {
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
        }
        function setViewValue(element, data) {
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
        }
        renders["form"] = new HtmlFormRender();
    })(Html = Quic.Html || (Quic.Html = {}));
})(Quic || (Quic = {}));
