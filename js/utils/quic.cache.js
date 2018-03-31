///<reference path="quic.promise.ts" />
var Quic;
(function (Quic) {
    var CacheItem = /** @class */ (function () {
        function CacheItem(key, value) {
            this.key = key;
            this.value = value;
            //this.expireTime =  new Date(new Date().getTime() + 300000); 
        }
        return CacheItem;
    }());
    Quic.CacheItem = CacheItem;
    /**
     * 缓存类，通过getItem,setItem来获取/set缓存对象
     *
     * @export
     * @class Cache
     */
    var Cache = /** @class */ (function () {
        /**
         * Creates an instance of Cache.
         * @param {number} interval 缓存时长(毫秒)
         * @memberof Cache
         */
        function Cache(interval) {
            if (interval === void 0) { interval = 600000; }
            interval = interval;
            this.items = [];
        }
        /**
         * 设置缓存，如果value===undefined表示删除该key的缓存
         *
         * @param {string} key 缓存项的key
         * @param {*} value 要缓存的值
         * @returns {Cache}
         * @memberof Cache
         */
        Cache.prototype.setItem = function (key, value, expireTime) {
            var _this = this;
            var items = this.items;
            for (var i = 0, j = items.length; i < j; i++) {
                var item = items.shift();
                if (item.key == key) {
                    if (value === undefined) {
                        if (items.length == 0) {
                            clearInterval(this.timer);
                            this.timer = 0;
                        }
                        return this;
                    }
                    item.value = value;
                    if (expireTime === undefined)
                        item.expireTime = new Date().getTime() + this.interval;
                    else
                        item.expireTime = expireTime;
                    items.push(item);
                    return this;
                }
                else {
                    items.push(item);
                }
            }
            var newItem = new CacheItem(key, value);
            newItem.expireTime = new Date().getTime() + this.interval;
            if (items.length == 0) {
                this.timer = setInterval(function () {
                    var items = _this.items;
                    var now = new Date().getTime();
                    for (var i = 0, j = items.length; i < j; i++) {
                        var item = items.shift();
                        if (item.expireTime >= now)
                            items.push(item);
                    }
                    if (items.length == 0) {
                        clearInterval(_this.timer);
                        _this.timer = 0;
                    }
                }, this.interval / 2);
            }
            items.push(newItem);
            return this;
        };
        /**
         * 获取缓存值
         *
         * @param {string} key 要获取的缓存的key
         * @returns {*}
         * @memberof Cache
         */
        Cache.prototype.getItem = function (key) {
            var items = this.items;
            for (var i = 0, j = items.length; i < j; i++) {
                var item = items[i];
                if (item.key == key) {
                    item.expireTime = new Date().getTime() + this.interval;
                    return item.value;
                }
            }
        };
        Cache.prototype.getOrCreate = function (key, factory) {
            var _this = this;
            var items = this.items;
            for (var i = 0, j = items.length; i < j; i++) {
                var item = items[i];
                if (item.key == key) {
                    item.expireTime = new Date().getTime() + this.interval;
                    return item.value;
                }
            }
            if (!factory)
                return;
            var item = new CacheItem(key, factory(key));
            item.expireTime = new Date().getTime() + this.interval;
            if (items.length == 0) {
                this.timer = setInterval(function () {
                    var items = _this.items;
                    var now = new Date().getTime();
                    for (var i = 0, j = items.length; i < j; i++) {
                        var item = items.shift();
                        if (item.expireTime >= now)
                            items.push(item);
                    }
                    if (items.length == 0) {
                        clearInterval(_this.timer);
                        _this.timer = 0;
                    }
                }, this.interval / 2);
            }
            items.push(item);
        };
        return Cache;
    }());
    Quic.Cache = Cache;
})(Quic || (Quic = {}));
