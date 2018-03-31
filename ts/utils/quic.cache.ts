///<reference path="quic.promise.ts" />
namespace Quic{
    export class CacheItem{
        constructor(key:string,value:any){
            this.key = key;
            this.value = value;
            //this.expireTime =  new Date(new Date().getTime() + 300000); 
        }
        key:string;
        value:any;
        expireTime:number;
    }
    /**
     * 缓存类，通过getItem,setItem来获取/set缓存对象
     * 
     * @export
     * @class Cache
     */
    export class Cache{
        /**
         * 缓存项
         * 
         * @type {Array<CacheItem>}
         * @memberof Cache
         */
        protected items:Array<CacheItem>;
        /**
         * 定时器。如果有缓存，定时器会自动启动
         * 
         * @type {number}
         * @memberof Cache
         */
        timer:any;
        /**
         * 缓存时长，毫秒
         * 
         * @type {number}
         * @memberof Cache
         */
        interval:number;
        /**
         * Creates an instance of Cache.
         * @param {number} interval 缓存时长(毫秒)
         * @memberof Cache
         */
        constructor(interval:number=600000){
            interval = interval;
            this.items=[];
            
        }
        /**
         * 设置缓存，如果value===undefined表示删除该key的缓存
         * 
         * @param {string} key 缓存项的key
         * @param {*} value 要缓存的值
         * @returns {Cache} 
         * @memberof Cache
         */
        setItem(key:string ,value:any,expireTime?:number):Cache{
            let items :Array<CacheItem> = this.items;
            for(let i =0,j=items.length;i<j;i++){
                var item = items.shift();
                if(item.key ==key){
                    if(value===undefined){
                        if(items.length==0) {
                            clearInterval(this.timer);
                            this.timer = 0;
                        }
                        return this;
                    }
                    item.value = value;
                    if(expireTime===undefined)item.expireTime = new Date().getTime() + this.interval;
                    else item.expireTime = expireTime;
                    items.push(item);
                    return this;
                }else{
                    items.push(item);
                }

            }
            let newItem = new CacheItem(key,value);
            newItem.expireTime = new Date().getTime() + this.interval;
            if(items.length==0){
                this.timer = setInterval(()=>{
                    let items :Array<CacheItem> = this.items; 
                    let now = new Date().getTime();
                    for(let i =0,j=items.length;i<j;i++){
                        var item = items.shift();
                        if(item.expireTime>=now) items.push(item);
                    }
                    if(items.length==0){
                        clearInterval(this.timer);
                        this.timer = 0;
                    }
                },this.interval/2);
            }
            items.push(newItem);
            
            return this;
        }
        /**
         * 获取缓存值
         * 
         * @param {string} key 要获取的缓存的key
         * @returns {*} 
         * @memberof Cache
         */
        getItem(key:string):any{
            let items :Array<CacheItem> = this.items;
            for(let i =0,j=items.length;i<j;i++){
                var item = items[i];
                if(item.key ==key){
                    item.expireTime = new Date().getTime() + this.interval;
                    return item.value;
                }

            }
        }

        getOrCreate(key:string,factory:(key:string)=>any):any{
            let items :Array<CacheItem> = this.items;
            for(let i =0,j=items.length;i<j;i++){
                var item = items[i];
                if(item.key ==key){
                    item.expireTime = new Date().getTime() + this.interval;
                    return item.value;
                }
            }
            if(!factory)return;
            var item = new CacheItem(key, factory(key));
            item.expireTime = new Date().getTime() + this.interval;
            if(items.length==0){
                this.timer = setInterval(()=>{
                    let items :Array<CacheItem> = this.items; 
                    let now = new Date().getTime();
                    for(let i =0,j=items.length;i<j;i++){
                        var item = items.shift();
                        if(item.expireTime>=now) items.push(item);
                    }
                    if(items.length==0){
                        clearInterval(this.timer);
                        this.timer = 0;
                    }
                },this.interval/2);
            }
            items.push(item);
        }

    }
    
}