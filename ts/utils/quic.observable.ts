namespace Quic{
    /**
     * 观察者模式-被观察者
     * 
     * @export
     * @class Observable
     */
    export class Observable{
        __events:{[evtName:string]:Array<Function>};
        /**
         * 订阅事件
         * 
         * @param {string} evtName 事件名
         * @param {Function} listener 监听函数
         * @returns {Observable} 被观察者自己
         * @memberof Observable
         */
        subscribe(evtName:string,listener:Function):Observable{
            let events:{[evtName:string]:Array<Function>} = this.__events || (this.__events = {});
            (events[name] || (events[name]=[])).push(listener);            
            return this;
        }
        /**
         * 解除订阅
         * 
         * @param {string} evtName 事件名
         * @param {Function} listener 要解除的监听函数
         * @returns {Observable} 
         * @memberof Observable
         */
        unsubscribe(evtName:string,listener:Function):Observable{
            let handlers:Array<Function>;
            if(!(this.__events) || !(handlers= this.__events[evtName])) return this;
            for(let i =0,j=handlers.length;i<j;i++){
                let exist:Function = handlers.shift();
                if(exist!==listener) handlers.push(exist);
            }
            return this;
        }
        /**
         * 播放通知
         * 如果不是用apply方式调用，最多只能有3个事件参数
         * 
         * @param {string} evtName 事件
         * @param {*} arg1 如果等于"quic!apply"这个字符就是 notify('click','quic!apply',[evtArg1,evtArg2]) apply调用监听函数，否者默认3个参数用call调用监听函数
         * @param {*} [arg2] 
         * @param {*} [arg3] 
         * @returns {Observable} 
         * @memberof Observable
         */
        notify(evtName:string,arg1:any,arg2?:any,arg3?:any):Observable{
            if(!this.__events)return this; 
            let handlers= this.__events[evtName];
            if(!handlers) return this;
            if(arg1==="quic!apply"){
                for(let i =0,j=handlers.length;i<j;i++){
                    let exist:Function = handlers.shift();
                    let retValue =exist.apply(this,arg2);
                    if(retValue==="quic!remove") continue;
                    handlers.push(exist);
                    if(retValue===false || retValue==="quic!cancel") return this;
                }
            }else {
                for(let i =0,j=handlers.length;i<j;i++){
                    let exist:Function = handlers.shift();
                    let retValue =exist.call(this,arg1,arg2,arg3);
                    if(retValue==="quic!remove") continue;
                    handlers.push(exist);
                    if(retValue===false || retValue==="quic!cancel") return this;
                }
            }
            
            return this;
        }
    }
}