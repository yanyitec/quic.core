var Quic;
(function (Quic) {
    var QuicInstance = /** @class */ (function () {
        function QuicInstance(opts, context) {
            var _this = this;
            //创建元素
            this.element = opts.element || Quic.createElement();
            //let ui = (Quic as any).ui;
            //ui.mask(this.element,"loading","loading");
            if (typeof opts === "string")
                opts = { module: opts };
            this.module = opts.module;
            if (opts.module) {
                Quic.aquireOpts(opts.module).done(function (dftOpts) {
                    _this.__init(context, opts, dftOpts);
                });
            }
            else {
                this.__init(context, opts);
            }
        } //end constructor
        QuicInstance.prototype.__init = function (context, opts, dftOpts) {
            this.viewName = opts.viewName || "query";
            this.viewType = opts.viewType || "query";
            //上下文
            var contextData;
            if (context instanceof QuicInstance) {
                this.superInstance = context;
                contextData = this.superInstance.model;
            }
            else {
                contextData = context || {};
            }
            if (opts.controller) {
                if (typeof opts.controller === "function") {
                    this.controller = new opts.controller(this);
                }
                else {
                    this.controller = opts.controller || {};
                }
            }
            if (opts.imports) {
            }
            //this.__init =()=>throw new Error("already inited.");
        };
        return QuicInstance;
    }());
    Quic.QuicInstance = QuicInstance;
    function init(instance, context, opts, dftOpts) {
        instance.viewName = opts.viewName || "query";
        instance.viewType = opts.viewType || "query";
        //上下文
        var contextData;
        if (context instanceof QuicInstance) {
            instance.superInstance = context;
            contextData = instance.superInstance.model || {};
        }
        else {
            contextData = context || {};
        }
        if (opts.controller) {
            if (typeof opts.controller === "function") {
                instance.controller = new opts.controller(this);
            }
            else {
                instance.controller = opts.controller || {};
            }
        }
        //导入初始化数据
        if (opts.imports) {
            doImports(this.model, opts.imports, contextData);
        }
        //this.__init =()=>throw new Error("already inited.");
    }
    function combineOpts(opts, dftOpts, propname) {
        if (propname === undefined) {
            for (var n in dftOpts) {
                combineOpts(opts, dftOpts, n);
            }
            return opts;
        }
        var targetValue = opts[propname];
    }
    function loadData(instance, opts) {
    }
    function doImports(target, defValue, contextData, propname) {
        if (propname === undefined) {
            for (var n in defValue) {
                doImports(target, defValue[n], contextData, n);
            }
            return target;
        }
        var t = typeof (defValue);
        var result;
        if (t === "string") {
            if (defValue[0] == "{" && defValue[defValue.length - 1] == "}") {
                var expr = defValue.substring(1, defValue.length - 1);
                result = target[propname] = Quic.getValue(expr, contextData);
            }
            else if (defValue[0] == "$" && defValue[1] == "{" && defValue[defValue.length - 1] == "}") {
                var expr = defValue.substring(1);
                result = target[propname] = Quic.getValue(expr, contextData);
            }
            else {
                result = target[propname] = defValue;
            }
            return result;
        }
        if (t === "object") {
            var targetValue = target[propname];
            if (!targetValue) {
                targetValue = defValue.push && defValue.length !== undefined ? [] : {};
                target[propname] = target;
            }
            for (var subname in defValue) {
                doImports(targetValue, defValue[subname], contextData, subname);
            }
            return targetValue;
        }
        else {
            return target[propname] = defValue;
        }
    }
})(Quic || (Quic = {}));
