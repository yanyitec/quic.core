///<reference path="../core/quic.render.ts" />
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
        var HtmlRender = /** @class */ (function (_super) {
            __extends(HtmlRender, _super);
            function HtmlRender() {
                return _super.call(this) || this;
            }
            HtmlRender.prototype.id = function (context, value) {
                if (value === undefined)
                    return context.element.id;
                context.element.id = value;
            };
            HtmlRender.prototype.value = function (context, value) {
                if (value === undefined)
                    return context.element.value;
                context.element.value = value;
            };
            HtmlRender.prototype.hidden = function (context, value) {
                if (value === undefined)
                    return context.element.value;
                context.element.value = value;
            };
            HtmlRender.prototype.renderElement = function (context) {
                var css = this.css || "";
                if (this.gridCss) {
                    if (css) {
                        css = this.gridCss.join(" ") + " " + css;
                    }
                    else {
                        css = this.gridCss.join(" ");
                    }
                }
                context.quic_constCss = css;
            };
            return HtmlRender;
        }(Quic.Render));
        Html.HtmlRender = HtmlRender;
    })(Html = Quic.Html || (Quic.Html = {}));
})(Quic || (Quic = {}));
