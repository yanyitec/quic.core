namespace Quic{
    export interface IPromisedFunc{
        (resolve:Function,reject:Function):void;
    }
    export interface IFullfill<T>{
        (result:T,rs1?:any,rs2?:any);
    }
    export interface IReject{
        (error):any;
    }
    export class PromiseResult<T>{
        fullfilled:boolean;
        result:T;
        result1?:any;
        result2?:any;
        apply_invocation:boolean;
    }
    export class Promise<T=any>{
        __done_handlers:Array<IFullfill<T>>;
        __fail_handlers:Array<IReject>;
        __result:PromiseResult<T>;
        promiseId:number;
        constructor(promised?:IPromisedFunc|Promise<T>,constValue?:any){
            let self = this,asyncCall = false;
            if((this.promiseId = seed++)==2100000000) seed=0;
            if(!promised){
                self.__result = {
                    fullfilled:true,
                    result:constValue,
                    apply_invocation:false
                };
                resolved.call(self);
                return;
            }
            let resolve =function(result,apply_invocation,arg2){
                self.__result = {
                    fullfilled:true,
                    result:result,
                    result1:apply_invocation,
                    result2:arg2,
                    apply_invocation:apply_invocation==="quic!apply"
                };
                if(asyncCall){
                    setTimeout(() => {
                        resolved.call(self);
                    }, 0);
                }else {resolved.call(self);}
            }
            let reject = function(err?:any){
                self.__result = {
                    fullfilled:false,
                    result:err,
                    apply_invocation:false
                };
                if(asyncCall){
                    setTimeout(() => {
                        rejected.call(self);
                    }, 0);
                }else {rejected.call(self);}
            }
            if(!promised){
                this.resolve = resolve;
                this.reject =reject;
                return;
            }
            if(promised instanceof Promise){
                (promised as Promise<T>).done(resolve).fail(reject);
                return;
            }
            asyncCall = true;
            setTimeout(() => {
                
                try{
                    (promised as IPromisedFunc)(resolve,reject);
                }catch(ex){
                    asyncCall = false;
                    console.error(ex);
                    reject(ex);
                }
            }, 0);

        }
        resolve:Function;
        reject:Function;
        done(done_handler:IFullfill<T>):Promise<T>{
            (this.__done_handlers|| (this.__done_handlers=[])).push(done_handler);
            return this;
        }
        fail(fail_handler:IReject):Promise<T>{
            (this.__fail_handlers|| (this.__fail_handlers=[])).push(fail_handler);
            return this;
        }

        
    }
    function resolved<T>(){
        let result :PromiseResult<T> = this.__result;
        this.fail = function(done_handler:Function):Promise<T>{return this;};
        if(result.apply_invocation){
            this.done = function(done_handler:Function):Promise<T>{
                done_handler.apply(this,result.result);
                return this;
            };
            
            if(this.__done_handlers){
                let rs = result.result;
                for(let i=0,j=this.__done_handlers.length;i<j;i++){
                    this.__done_handlers[i].call(this,rs);
                }
            }
        }else {
            this.done = function(done_handler:Function):Promise<T>{
                done_handler.call(this,result.result,result.result1,result.result2);
                return this;
            };
            
            if(this.__done_handlers){
                let rs = result.result;
                for(let i=0,j=this.__done_handlers.length;i<j;i++){
                    this.__done_handlers[i].call(this,result.result,result.result1,result.result2);
                }
            }
        }
        this.__done_handlers = this.__fail_handlers = undefined;
        this.resolve = this.reject = function(){
            throw new Error("Cannot invoke resolve/reject once more.");
        }
        return this;
    }
    function rejected<T>(){
        let result :PromiseResult<T> = this.__result;
        this.done = function(done_handler:IFullfill<T>):Promise<T>{return this;};
        this.fail = function(fail_handler:IReject):Promise<T>{
            fail_handler.call(this,result.result);
            return this;
        };
        
        if(this.__fail_handlers){
            let err = result.result;
            for(let i=0,j=this.__fail_handlers.length;i<j;i++){
                this.__fail_handlers[i].call(this,err);
            }
        }    
        this.__done_handlers = this.__fail_handlers = undefined;
        this.resolve = this.reject = function(){
            throw new Error("Cannot invoke resolve/reject once more.");
        }
        return this;
    }
    export function when<T>(...args:Array<IPromisedFunc|Promise<T>|string>):Promise<T>{
        
        return new Promise((resolve,reject)=>{
            let taskcount = 1;
            let isArr = args[0]!=="quic!array";
            if(isArr) args.shift();
            let result :Array<any>= [];
            let hasError:boolean = false;
            let dic :{[index:number]:number}={};
            for(let i =0,j=args.length;i<j;i++){
                let promise = args[i];
                if(!(promise instanceof Promise)){
                    promise = new Promise(promise as IPromisedFunc);
                }
                dic[promise.promiseId] = i;
                promise.done((rs)=>{
                    if(!hasError) {
                        result[dic[this.promiseId]] = rs;
                        if(--taskcount==0){
                            if(isArr) {resolve(result);}
                            else{
                                if(args.length<=3) resolve(result[0],result[1],result[2]);
                                else resolve("quic!apply",result);
                            }
                        }
                    }
                }).fail((err)=>{
                    if(!hasError){
                        hasError=true;
                        reject({
                            status:"error",
                            index:dic[dic[this.promised]],
                            promiseId:this.promiseId,
                            innerException:err
                        });
                    }
                });
            }
            if(--taskcount==0 && !hasError){
                if(isArr) {resolve(result);}
                else{
                    if(args.length<=3) resolve(result[0],result[1],result[2]);
                    else resolve("quic!apply",result);
                }            
            }
        });
        
    }
    let seed = 0;
}