var Quic;
(function (Quic) {
    function combine(dest, src, propname) {
        if (propname === undefined) {
            if (!src)
                return dest;
            for (var mname in src) {
                combine(dest, src, mname);
            }
            return dest;
        }
        var destValue = dest[propname];
        var srcValue = src[propname];
        var srcType = typeof (srcValue);
        if (srcType === "object") {
            var destType = typeof (destValue);
            if (destType === "undefined") {
                destValue = dest[propname] = srcValue.push && srcValue.length !== undefined ? [] : {};
            }
            if (destType === "object") {
                if (destValue === null)
                    return null;
                for (var mname_1 in srcValue) {
                    combine(destValue, srcValue, mname_1);
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
    Quic.combine = combine;
})(Quic || (Quic = {}));
