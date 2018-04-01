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
        var HtmlTextRender = /** @class */ (function (_super) {
            __extends(HtmlTextRender, _super);
            function HtmlTextRender() {
                return _super.call(this) || this;
            }
            HtmlTextRender.prototype.render = function (defObj, viewContext, container) {
                var isInForm = viewContext.viewType === "form";
                _super.prototype.render.call(this, defObj, viewContext, container);
            };
            HtmlTextRender.prototype.getViewValue = function (element) {
                return element.value;
            };
            HtmlTextRender.prototype.setViewValue = function (element, value) {
                element.value = value;
            };
            HtmlTextRender.prototype.renderElement = function (renderContext) {
            };
            HtmlTextRender.prototype.renderInform = function (renderContext) {
                var label = this._T(renderContext.field.label || renderContext.field.name);
                var name = renderContext.field.name;
                renderContext.wrapElement.innerHTML = "<label class=\"field-label>\">" + label + "</label><input type=\"text\" class=\"field-input\" name=\"" + name + "\" ><label class=\"field-ins\"></label>";
                var input = renderContext.element =
                    renderContext.wrapElement.quid_input = renderContext.wrapElement.firstChild.nextSibling;
            };
            return HtmlTextRender;
        }(Html.HtmlCompositeRender));
        Html.HtmlTextRender = HtmlTextRender;
        renders["text"] = new HtmlTextRender();
    })(Html = Quic.Html || (Quic.Html = {}));
})(Quic || (Quic = {}));
