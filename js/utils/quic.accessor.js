var Quic;
(function (Quic) {
    var AccessorManager = /** @class */ (function () {
        function AccessorManager() {
            this.__accessors = {};
        }
        AccessorManager.prototype.acquire = function (expr) {
            var accessor = this.__accessors[expr];
            if (!accessor)
                accessor = this.__accessors[expr] = makeAccessor(expr);
            return accessor;
        };
        return AccessorManager;
    }());
    Quic.AccessorManager = AccessorManager;
    var makeAccessor = function (expr) {
        var getCode;
        var setCode;
        var accessor = {};
        var directDataCode;
        if (expr === "$self") {
            getCode = "return data;";
            directDataCode = "return data;";
            setCode = "throw new Error('$self是只读的');";
        }
        else if (expr === "$" && expr[1] === "{" && expr[expr.length - 1] === "}") {
            getCode = "with (data){ return " + expr.substring(2, expr.length - 1) + ";}";
            setCode = "throw new Error('计算表达式是只读的');";
            directDataCode = "throw new Error('计算表达式没有直接对象');";
            accessor.computed = true;
        }
        if (!getCode) {
            var exprs = expr.split(".");
            getCode = "var d=$__DATA;\r\n";
            for (var i = 0, j = exprs.length; i < j; i++) {
                var propname = exprs[i];
                getCode += "d=d[\"" + propname + "\"];if(!d)return d;\r\n";
            }
            getCode += "return d;\r\n";
            setCode = "var ctnr= $__DATA;\r\n";
            for (var i_1 = 0, j_1 = exprs.length - 1; i_1 < j_1; i_1++) {
                var propname = exprs[i_1];
                setCode += "if(ctnr[\"" + propname + "\"]) ctnr=ctnr[\"" + propname + "\"];else ctnr=ctnr[\"" + propname + "\"]={};\r\n";
            }
            directDataCode = setCode + "return ctnr;\r\n";
            setCode += "ctnr[\"" + exprs[exprs.length - 1] + "\"]=$__VALUE;\r\n";
        }
        accessor.getValue = new Function("$__DATA", getCode);
        accessor.setValue = new Function("$__DATA", "$__VALUE", setCode);
        accessor.directData = new Function("$__DATA", directDataCode);
        return accessor;
    };
    var accessors = {};
    function accessor(expr) {
        return accessors[expr] || (accessors[expr] = makeAccessor(expr));
    }
    Quic.accessor = accessor;
    function getValue(expr, data) {
        var accessor = accessors[expr] || (accessors[expr] = makeAccessor(expr));
        return accessor.getValue(data);
    }
    Quic.getValue = getValue;
    function setValue(expr, data, value) {
        var accessor = accessors[expr] || (accessors[expr] = makeAccessor(expr));
        accessor.setValue(data, value);
    }
    Quic.setValue = setValue;
    function directData(expr, data) {
        var accessor = accessors[expr] || (accessors[expr] = makeAccessor(expr));
        return accessor.getValue(data);
    }
    Quic.directData = directData;
})(Quic || (Quic = {}));
