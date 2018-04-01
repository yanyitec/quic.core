var Quic;
(function (Quic) {
    Quic.Render.binders.value = function (context, attribute) {
        if (context.element.type == "text" || context.element.tagName == "TEXTAREA") {
            bindText(context, attribute);
        }
    };
    function bindText(context, attribute) {
        var accessor = Quic.accessor(context.field.data_path);
        context.element.setAttribute("value", accessor.getValue(context.data));
        var valuechange = function () {
            if (tick) {
                clearTimeout(tick);
                tick = 0;
            }
            var viewValue = context.element.value;
            var modelValue = context.render.unformat(viewValue, context);
            accessor.setValue(context.data, modelValue);
        };
        Quic.Html.attach(context.element, "blur", valuechange);
        var tick;
        Quic.Html.attach(context.element, "keyup", function () {
            tick = setTimeout(valuechange, 150);
        });
        var viewValue = context.render.format(accessor.getValue(context.data), context);
        context.element.value = viewValue;
        context.element.setAttribute("value", viewValue);
        context.element.innerHTML = viewValue;
    }
    function bindInnerText(context, bindParameter) {
        var value = context.render.format(Quic.getValue(context.expr, context.data), context);
        context.element.innerHTML = value;
    }
})(Quic || (Quic = {}));
