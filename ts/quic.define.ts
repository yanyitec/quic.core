namespace Quic{
    let __cached:{[index:string]:Promise}={};
    let fetcher:(name:string)=>Promise;
    export function define(name:string,defObj?:any):Promise{

        if(defObj)return __cached[name] = makeDefineObject(defObj);
        let existed = __cached[name];
        if(existed) return existed;
        return new Promise((resolve,reject)=>{
            fetcher(name).done((defObj)=> makeDefineObject(defObj).done(resolve).fail(reject))
            .fail(reject);
        });
        
    } 
    
    (define as any).setFetcher = function(handler:(name:string)=>Promise){

    }
    function makeDefineObject(defObj):Promise{
        if(defObj.$extend){
            return new Promise((resolve,reject)=>
                define(defObj.$extend)
                .done((srcDef:any)=>resolve(extend(defObj,srcDef)))
                .fail((ex)=>reject(ex))  
            );
        }
        return new Promise(null,defObj);
    }

    interface IRef{
        path:string;
        refPath:string;
    }

    
    export function extend(dest:Object,src:Object,propname?:string|number){
        if(propname===undefined){
            if(!src) return dest;
            let refs = [];
            for(var mname in src){
                extend(dest,src,mname);
            }
            extendRef(dest);
            
            return dest;
        }
        let destValue = dest[propname];
        let srcValue = src[propname];
        
        let srcType = typeof(destValue);
        if(srcType==="object"){
            let destType = typeof(destValue);
            if(destType==="undefined"){
                destValue = dest[propname] = srcValue.push && srcValue.length!==undefined?[]:{};
            }
            if(destType==="object"){
                if(destValue===null) return null;
                for(let mname in srcValue){
                    extend(destValue,srcValue,mname);
                }
                return destValue;
            }
            return destValue;
        }else {
            if(destValue===undefined) return dest[propname] = srcValue;
            return destValue;
        }
    }

    function extendRef(obj:Object,propname?:string|number,root?:Object){
        if(propname===undefined){
            for(var mname in obj){
                extendRef(obj,propname,obj);
            }
            return obj;
        }
        let value = obj[propname];
        if(!value)return;
        let t = typeof(value);
        if(t!=="object")return;
        for(let mname in value){
            if(mname==="&reference"){
                let src = getValue(root,value[mname]);
                extend(obj,src);
            }
        }
    }
}