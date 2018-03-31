namespace Quic{
    
    
    export function combine(dest:Object,src:Object,propname?:string|number,contextData?:any){
        if(propname===undefined){
            if(!src) return dest;
            for(var mname in src){
                combine(dest,src,mname,contextData);
            }            
            return dest;
        }
        let destValue = dest[propname];
        let srcValue = src[propname];
        
        let srcType = typeof(srcValue);
        if(srcType==="string"){
            if(srcValue[0]=="{" && srcValue[srcValue.length-1]=="}"){
                var expr = srcValue.substring(1, srcValue.length - 1);
                srcValue = (Quic as any).getValue(expr,contextData);
                srcType = typeof(srcValue);
            }else if(srcValue[0]=="$" && srcValue[1]=="{" && srcValue[srcValue.length-1]=="}"){
                var expr = srcValue.substring(1);
                srcValue = (Quic as any).getValue(expr,contextData);
                srcType = typeof(srcValue);
            }
        }
        if(srcType==="object"){
            let destType = typeof(destValue);
            if(destType==="undefined"){
                destValue = dest[propname] = srcValue.push && srcValue.length!==undefined?[]:{};
            }
            if(destType==="object"){
                if(destValue===null) return null;
                for(let mname in srcValue){
                    combine(destValue,srcValue,mname);
                }
                return destValue;
            }
            return destValue;
        }else {
            if(destValue===undefined) return dest[propname] = srcValue;
            return destValue;
        }
    }

    
}