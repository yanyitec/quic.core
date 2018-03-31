var Quic;
(function (Quic) {
    var __cached = {};
    var fetcher;
    function define(name, defObj) {
        if (defObj)
            return __cached[name] = makeDefineObject(defObj);
        var existed = __cached[name];
        if (existed)
            return existed;
        return new Quic.Promise(function (resolve, reject) {
            fetcher(name).done(function (defObj) { return makeDefineObject(defObj).done(resolve).fail(reject); })
                .fail(reject);
        });
    }
    Quic.define = define;
    define.setFetcher = function (handler) {
    };
    function makeDefineObject(defObj) {
        if (defObj.$extend) {
            return new Quic.Promise(function (resolve, reject) {
                return define(defObj.$extend)
                    .done(function (srcDef) { return resolve(extend(defObj, srcDef)); })
                    .fail(function (ex) { return reject(ex); });
            });
        }
        return new Quic.Promise(null, defObj);
    }
    function extend(dest, src, propname) {
        if (propname === undefined) {
            if (!src)
                return dest;
            var refs = [];
            for (var mname in src) {
                extend(dest, src, mname);
            }
            extendRef(dest);
            return dest;
        }
        var destValue = dest[propname];
        var srcValue = src[propname];
        var srcType = typeof (destValue);
        if (srcType === "object") {
            var destType = typeof (destValue);
            if (destType === "undefined") {
                destValue = dest[propname] = srcValue.push && srcValue.length !== undefined ? [] : {};
            }
            if (destType === "object") {
                if (destValue === null)
                    return null;
                for (var mname_1 in srcValue) {
                    extend(destValue, srcValue, mname_1);
                }
                return destValue;
            }
            return destValue;
        }
        else {
            if (destValue === undefined)
                return dest[propname] = srcValue;
            return destValue;
        }
    }
    Quic.extend = extend;
    function extendRef(obj, propname, root) {
        if (propname === undefined) {
            for (var mname in obj) {
                extendRef(obj, propname, obj);
            }
            return obj;
        }
        var value = obj[propname];
        if (!value)
            return;
        var t = typeof (value);
        if (t !== "object")
            return;
        for (var mname_2 in value) {
            if (mname_2 === "&reference") {
                var src = Quic.getValue(root, value[mname_2]);
                extend(obj, src);
            }
        }
    }
})(Quic || (Quic = {}));
