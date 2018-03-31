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
        var HtmlCompositeRender = /** @class */ (function (_super) {
            __extends(HtmlCompositeRender, _super);
            function HtmlCompositeRender() {
                var _this = _super.call(this) || this;
                _this.tagName = "div";
                return _this;
            }
            HtmlCompositeRender.prototype.renderElement = function (renderContext) {
                renderContext.wrapElement = renderContext.element;
                var childrenDef = renderContext.defObject.layout || renderContext.defObject.children;
                for (var i in childrenDef) {
                    var childDef = childrenDef[i];
                    if (!childDef)
                        continue;
                    var childViewType = renders[childDef.viewType];
                    var childView = new childViewType();
                    var rawChild = childView.render(childDef, renderContext.defObject, renderContext.element);
                    renderContext.element.appendChild(rawChild);
                }
            };
            return HtmlCompositeRender;
        }(Html.HtmlRender));
        Html.HtmlCompositeRender = HtmlCompositeRender;
        renders["composite"] = new HtmlCompositeRender();
    })(Html = Quic.Html || (Quic.Html = {}));
})(Quic || (Quic = {}));
