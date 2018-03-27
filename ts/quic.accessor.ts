namespace Quic{
    export interface IAccessor{
        getValue(data:any):any;
        setValue(data:any,value:any);
        directData(data:any):any;
        computed:boolean;
    }
    export class AccessorManager{
        private __accessors:{[index:string]:IAccessor};
        constructor(){
            this.__accessors={};
        }
        acquire(expr):IAccessor{
            let accessor:IAccessor = this.__accessors[expr];
            if(!accessor) accessor =  this.__accessors[expr] = makeAccessor(expr);
            return accessor;
        }
    }
    var makeAccessor = function(expr):IAccessor{
        let getCode;let setCode;let accessor:any={};
        var directDataCode;
        if (expr === "$self") {
            getCode = "return data;";
            directDataCode = "return data;";
            setCode = "throw new Error('$self是只读的');";
        }else if(expr === "$" && expr[1] === "{" && expr[expr.length - 1] === "}") {
            getCode = "with (data){ return " + expr.substring(2, expr.length - 1) + ";}";
            setCode = "throw new Error('计算表达式是只读的');";
            directDataCode = "throw new Error('计算表达式没有直接对象');";
            accessor.computed = true;
        }
        if(!getCode){
            var exprs = expr.split(".");
            getCode = "var d=$__DATA;\r\n";
            for(var i=0,j=exprs.length;i<j;i++){
                var propname = exprs[i];
                getCode+="d=d[\"" + propname + "\"];if(!d)return d;\r\n";
                
            }
            getCode += "return d;\r\n";
            setCode = "var ctnr= $__DATA;\r\n";
            for(let i=0,j=exprs.length-1;i<j;i++){
                var propname = exprs[i];
                setCode+="if(ctnr[\""+propname+"\"]) ctnr=ctnr[\""+propname+"\"];else ctnr=ctnr[\"" + propname + "\"]={};\r\n";
            }
            directDataCode = setCode + "return ctnr;\r\n";
            setCode += "ctnr[\"" + exprs[exprs.length-1] + "\"]=$__VALUE;\r\n";
        }
        accessor.getValue = new Function("$__DATA",getCode);
        accessor.setValue = new Function("$__DATA","$__VALUE",setCode);
        accessor.directData= new Function("$__DATA",directDataCode);
        return accessor as IAccessor;
    }

    var accessors :{[index:string]:IAccessor}={};
    export function accessor(expr){
        return accessors[expr] ||( accessors[expr] = makeAccessor(expr));
    }
    export function getValue(expr,data):any{
        let accessor:IAccessor = accessors[expr] ||( accessors[expr] = makeAccessor(expr));
        return accessor.getValue(data);
    }
    export function setValue(expr,data,value){
        let accessor:IAccessor = accessors[expr] ||( accessors[expr] = makeAccessor(expr));
        accessor.setValue(data,value);
    }
    export function directData(expr,data){
        let accessor:IAccessor = accessors[expr] ||( accessors[expr] = makeAccessor(expr));
        return accessor.getValue(data);
    }

}

    
    
    