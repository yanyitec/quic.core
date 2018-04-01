///<reference path="../utils/quic.cache.ts" />
///<reference path="../utils/quic.combine.ts" />
var Quic;
(function (Quic) {
    var cache = new Quic.Cache();
    var fetcher;
    function aquireOpts(name) {
        return cache.getOrCreate(name, function (name) { return new Quic.Promise(function (resolve, reject) {
            fetcher(name).done(function (defObj) { return makeDefineObject(defObj).done(resolve).fail(reject); })
                .fail(reject);
        }); });
    }
    Quic.aquireOpts = aquireOpts;
    aquireOpts.setFetcher = function (handler) {
        fetcher = handler;
    };
    function makeDefineObject(defObj) {
        if (defObj.$extend) {
            return new Quic.Promise(function (resolve, reject) {
                return aquireOpts(defObj.$extend)
                    .done(function (srcDef) { return resolve(Quic.combine(defObj, srcDef)); })
                    .fail(function (ex) { return reject(ex); });
            });
        }
        return new Quic.Promise(null, defObj);
    }
})(Quic || (Quic = {}));
