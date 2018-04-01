///<reference path="quic.instance.ts" />
var Quic;
(function (Quic) {
    var Render = /** @class */ (function () {
        function Render() {
        }
        Render.prototype.render = function (field, viewContext, container) {
            regulateField(field, viewContext);
            var renderContext = {
                render: this,
                field: field,
                viewContext: viewContext,
                element: null,
                wrapElement: null
            };
            var element = createElement(renderContext, field.viewType);
            renderContext.element = renderContext.wrapElement = element;
            if (!(element.id = field.viewId)) {
                if (container) {
                    this.id(renderContext, container.id + "_" + (field.name || newViewId()));
                }
                else {
                    this.id(renderContext, (field.name || newViewId().toString()));
                }
            }
            if (container)
                appendElement(renderContext, container, element);
            this.renderElement(renderContext);
            return element;
        };
        Render.prototype.renderElement = function (renderContext) {
            var field = renderContext.field;
            var element = renderContext.element;
            for (var attrname in field) {
                var elementAttribute = this[attrname];
                if (!elementAttribute)
                    continue;
                var attributeValue = field[attrname];
                var binder = this.binders ? this.binders[attrname] : null;
                if (!binder)
                    binder = binders[attrname];
                if (binder) {
                    binder(renderContext, elementAttribute);
                }
                else {
                    var attrValue = void 0;
                    elementAttribute.call(this, renderContext);
                }
            }
            element.quic_renderContext = renderContext;
        };
        Render.prototype._T = function (text) {
            return text;
        };
        Render.prototype.format = function (modelValue, context) {
            return modelValue;
        };
        Render.prototype.unformat = function (viewValue, context) {
            return viewValue;
        };
        return Render;
    }());
    Quic.Render = Render;
    Quic.renders = {};
    var binders = Render.binders = {};
    var idseed = 0;
    function newViewId() {
        if (idseed++ == 2100000000)
            idseed = 0;
        return idseed;
    }
    Quic.newViewId = newViewId;
    function regulateField(field, viewContext) {
        if (field.regulated)
            return field;
        if (field.extend) {
            var superField = viewContext.opts.fields[field.extend];
            if (superField) {
                Quic.combine(field, superField);
            }
        }
        if (!field.data_path)
            field.data_path = field.name;
        return field;
    }
})(Quic || (Quic = {}));
