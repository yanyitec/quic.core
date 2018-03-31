var Quic;
(function (Quic) {
    var Html;
    (function (Html) {
        Quic.binders.value = function (context, bindParameter) {
            if (context.element.type == "text" || context.element.tagName == "TEXTAREA") {
                bindText(context, bindParameter);
            }
        };
        function bindText(context, bindParameter) {
            var accessor = Quic.accessor(bindParameter);
            context.element.setAttribute("value", accessor.getValue(context.data));
            var valuechange = function () {
                if (tick) {
                    clearTimeout(tick);
                    tick = 0;
                }
                var viewValue = context.element.value;
                var modelValue = context.render.unformat(viewValue);
                accessor.setValue(context.data, modelValue);
            };
            Html.attach(context.element, "blur", valuechange);
            var tick;
            Html.attach(context.element, "keyup", function () {
                tick = setTimeout(valuechange, 150);
            });
            var viewValue = context.render.format(accessor.getValue(context.data));
            context.element.value = viewValue;
            context.element.setAttribute("value", viewValue);
            context.element.innerHTML = viewValue;
        }
        function bindInnerText(context, bindParameter) {
            var value = context.render.format(Quic.getValue(context.expr, context.data));
            context.element.innerHTML = value;
        }
    })(Html = Quic.Html || (Quic.Html = {}));
})(Quic || (Quic = {}));
