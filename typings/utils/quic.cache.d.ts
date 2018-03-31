/// <reference path="quic.promise.d.ts" />
declare namespace Quic {
    class CacheItem {
        constructor(key: string, value: any);
        key: string;
        value: any;
        expireTime: number;
    }
    /**
     * 缓存类，通过getItem,setItem来获取/set缓存对象
     *
     * @export
     * @class Cache
     */
    class Cache {
        /**
         * 缓存项
         *
         * @type {Array<CacheItem>}
         * @memberof Cache
         */
        protected items: Array<CacheItem>;
        /**
         * 定时器。如果有缓存，定时器会自动启动
         *
         * @type {number}
         * @memberof Cache
         */
        timer: any;
        /**
         * 缓存时长，毫秒
         *
         * @type {number}
         * @memberof Cache
         */
        interval: number;
        /**
         * Creates an instance of Cache.
         * @param {number} interval 缓存时长(毫秒)
         * @memberof Cache
         */
        constructor(interval?: number);
        /**
         * 设置缓存，如果value===undefined表示删除该key的缓存
         *
         * @param {string} key 缓存项的key
         * @param {*} value 要缓存的值
         * @returns {Cache}
         * @memberof Cache
         */
        setItem(key: string, value: any, expireTime?: number): Cache;
        /**
         * 获取缓存值
         *
         * @param {string} key 要获取的缓存的key
         * @returns {*}
         * @memberof Cache
         */
        getItem(key: string): any;
        getOrCreate(key: string, factory: (key: string) => any): any;
    }
}
