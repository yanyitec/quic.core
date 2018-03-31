var Quic;
(function (Quic) {
    var Html;
    (function (Html) {
        var HtmlRender = /** @class */ (function () {
            function HtmlRender() {
                //this.binds = ["disable"];
            }
            HtmlRender.prototype.render = function (defObj, viewContext, container) {
                var element = document.createElement(this.tagName);
                var renderContext = {
                    render: this,
                    defObject: defObj,
                    viewContext: viewContext,
                    element: element,
                    wrapElement: element
                };
                if (defObj.attributes) {
                    for (var n in defObj.attributes)
                        element.setAttribute(n, defObj.attributes[n]);
                }
                if (!(element.id = defObj.viewId)) {
                    if (container) {
                        element.id = container.id + "_" + (defObj.id || Quic.newViewId());
                    }
                    else {
                        element.id = (defObj.id || Quic.newViewId());
                    }
                }
                var css = this.css || "";
                if (this.gridCss) {
                    if (css) {
                        css = this.gridCss.join(" ") + " " + css;
                    }
                    else {
                        css = this.gridCss.join(" ");
                    }
                }
                element.quic_constCss = css;
                if (container)
                    container.appendChild(element);
                this.renderElement(renderContext);
                for (var i in this.binds) {
                    var bindname = this.binds[i];
                    var binder = Quic.binders[bindname];
                    if (binder) {
                        var bindParameter = defObj[bindname];
                        if (bindParameter !== undefined)
                            binder(renderContext, bindParameter);
                    }
                }
                element.quic_renderContext = renderContext;
                return element;
            };
            HtmlRender.prototype.format = function (modelValue) {
                return modelValue;
            };
            HtmlRender.prototype.unformat = function (viewValue) {
                return viewValue;
            };
            HtmlRender.prototype.getViewValue = function (element) {
                throw new Error("Exception");
            };
            HtmlRender.prototype.setViewValue = function (element, value) {
                throw new Error("Exception");
            };
            HtmlRender.prototype._T = function (text) {
                return text;
            };
            return HtmlRender;
        }());
        Html.HtmlRender = HtmlRender;
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
