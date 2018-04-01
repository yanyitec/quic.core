///<reference path="../utils/quic.observable.ts" />
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
    var QuicInstance = /** @class */ (function (_super) {
        __extends(QuicInstance, _super);
        function QuicInstance(opts, context) {
            var _this = _super.call(this) || this;
            //创建元素
            _this.element = opts.element || Quic.createElement();
            Quic.mask(_this.element);
            _this.module = opts.module;
            if (opts.module) {
                Quic.aquireOpts(opts.module).done(function (dftOpts) {
                    init(_this, context, opts, dftOpts);
                });
            }
            else {
                init(_this, context, opts);
            }
            return _this;
        } //end constructor
        return QuicInstance;
    }(Quic.Observable));
    Quic.QuicInstance = QuicInstance;
    function init(instance, context, opts, dftOpts) {
        initController(instance, opts);
        Quic.combine(opts, dftOpts);
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
        instance.context_data = contextData;
        initModel(instance, opts).done(function (model) {
            instance.model = model;
            instance.notify("model", model, instance);
            initView(instance, opts);
            Quic.unmask(instance.element);
        });
    }
    function initModel(instance, opts) {
        if (!opts.url) {
            var model = opts.model || {};
            instance.notify("data", model, instance);
            if (opts.imports) {
                Quic.combine(model, opts.imports, undefined, instance.context_data);
            }
            return new Quic.Promise(null, model);
        }
        return new Quic.Promise(function (resolve, reject) {
            Quic.transport({
                url: opts.url,
                method: "get",
                dataType: "json",
                cache: false
            }).done(function (model) {
                instance.notify("data", model, instance);
                if (opts.imports)
                    Quic.combine(model, opts.imports, undefined, instance.context_data);
                resolve(model);
            }).fail(reject);
        });
    }
    function initController(instance, opts) {
        if (opts.controller) {
            if (typeof opts.controller === "function") {
                instance.controller = new opts.controller(instance);
            }
            else {
                instance.controller = opts.controller || {};
            }
            if (instance.controller.init)
                instance.controller.init(instance);
        }
    }
    function initView(instance, opts) {
        var view, viewType;
        if (opts.components) {
            view = {
                components: opts.components,
                viewType: instance.viewType
            };
        }
        else {
            view = opts.layouts[instance.viewName];
            viewType = instance.viewType || opts.viewType;
        }
        var render = Quic.renders[viewType];
        instance.notify("rendering", view, instance);
        render.render(view, instance, instance.element);
        instance.notify("rendered", view, instance);
    }
})(Quic || (Quic = {}));
