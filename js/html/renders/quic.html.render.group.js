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
        var HtmlGroupRender = /** @class */ (function (_super) {
            __extends(HtmlGroupRender, _super);
            function HtmlGroupRender() {
                return _super.call(this) || this;
            }
            HtmlGroupRender.prototype.renderElement = function (renderContext) {
                var wrapElement = renderContext.wrapElement;
                wrapElement.innerHTML = "<div class=\"group-header\"><h3 class=\"group-caption\"></h3><div class=\"group-actions\"></div></div><div class=\"group-content\"></div><div class=\"group-footer\"><div class=\"group-status\"></div><div class=\"group-actions\"></div></div>";
                var childrenDef = renderContext.field.components;
                for (var i in childrenDef) {
                    var childDef = childrenDef[i];
                    if (!childDef)
                        continue;
                    var childViewType = renders[childDef.viewType];
                    var childView = new childViewType();
                    var rawChild = childView.render(childDef, renderContext.viewContext, renderContext.element);
                    var slot = renderContext.field.slot;
                    var ctn = void 0;
                    switch (slot) {
                        case "header":
                            ctn = wrapElement.firstChild.lastChild;
                            break;
                        case "footer":
                            ctn = wrapElement.lastChild.lastChild;
                            break;
                        default: ctn = wrapElement.childNodes[1];
                    }
                    ctn.appendChild(rawChild);
                }
            };
            HtmlGroupRender.prototype.caption = function (context, value) {
                var captionElem = context.wrapElement.firstChild.firstChild;
                captionElem.innerHTML = Quic.getValue(context.expr, context.data);
            };
            HtmlGroupRender.prototype.status = function (context, value) {
                var statusElem = context.wrapElement.lastChild.firstChild;
                statusElem.innerHTML = Quic.getValue(context.expr, context.data);
            };
            return HtmlGroupRender;
        }(Html.HtmlCompositeRender));
        Html.HtmlGroupRender = HtmlGroupRender;
        renders["group"] = new HtmlGroupRender();
    })(Html = Quic.Html || (Quic.Html = {}));
})(Quic || (Quic = {}));
