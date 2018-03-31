declare namespace Quic {
    /**
     * 获取模块
     * {module:}
     * @export
     * @param {string} moduleId 模块Id
     * @returns {Promise}
     */
    function acquire(moduleId: string): Promise;
}
