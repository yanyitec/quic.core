var Quic;
(function (Quic) {
    var Html;
    (function (Html) {
        Quic.binders.hidden = function (context, bindParameter) {
            var value = Quic.getValue(context.data, bindParameter);
            if (value === "visible" || value === true) {
                context.wrapElement.style.display = "";
            }
            else {
                context.wrapElement.style.display = "none";
            }
        };
    })(Html || (Html = {}));
})(Quic || (Quic = {}));
