var Quic;
(function (Quic) {
    var caches;
    /**
     * 获取模块
     * {module:}
     * @export
     * @param {string} moduleId 模块Id
     * @returns {Promise}
     */
    function acquire(moduleId) {
        var existed = caches[name];
        if (existed)
            return existed;
        return caches[name] = new Quic.Promise(function (resolve, reject) {
            Quic.transport({
                url: ""
            }).done(resolve).fail(reject);
        });
    }
    Quic.acquire = acquire;
})(Quic || (Quic = {}));
