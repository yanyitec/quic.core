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
    var renders = Quic.renders;
    var CompositeRender = /** @class */ (function (_super) {
        __extends(CompositeRender, _super);
        function CompositeRender() {
            return _super.call(this) || this;
        }
        CompositeRender.prototype.renderElement = function (renderContext) {
            //super.renderElement(renderContext);
            renderContext.wrapElement = renderContext.element;
            var childrenDef = renderContext.field.components;
            for (var i in childrenDef) {
                var childDef = childrenDef[i];
                if (!childDef)
                    continue;
                var childViewType = renders[childDef.viewType];
                var childView = new childViewType();
                var rawChild = childView.render(childDef, renderContext.viewContext, renderContext.element);
                Quic.appendElement(renderContext, renderContext.element, rawChild);
            }
        };
        return CompositeRender;
    }(Quic.Render));
    Quic.CompositeRender = CompositeRender;
    //renders["composite"] = new CompositeRender();
})(Quic || (Quic = {}));
