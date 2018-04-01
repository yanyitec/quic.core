namespace Quic{
    export interface IAccessor{
        getValue(data:any):any;
        setValue(data:any,value:any);
        directData(data:any):any;
        computed:boolean;
        expr:string;
        paths:string[];
    }
    

    export class AccessorManager{
        private __accessors:{[index:string]:IAccessor};
        constructor(){
            this.__accessors={};
        }
        acquire(expr:string,braced?:boolean):IAccessor{
            if(expr==="$self") return selfAccessor;
            let computed = checkComputed(expr);

            if (computed){
                let getCode = "with ($_DATA){ return " + computed + ";}";
                let setter = function(data:any,value:any){throw new Error('计算表达式是只读的');};
                let directData = function(data:any){throw new Error('计算表达式没有直接对象');};
                return {
                    getValue:new Function("$DATA",getCode) as (data:any)=>any,
                    setValue :setter,
                    expr:expr,
                    directData : directData,
                    computed:true,
                    paths:[]
                };             
            }
            let bindExpr = checkBind(expr);
            if( !bindExpr){
                if(braced!==undefined){
                    return braced===true?new ConstAccessor(expr):null;
                }else {
                    bindExpr = expr;
                }
            }
            
            let accessor:IAccessor = this.__accessors[expr];
            
            if(!accessor){
                
                accessor =  this.__accessors[expr] = makeAccessor(bindExpr);
            } 
            return accessor;
        }
    }

    class ConstAccessor implements IAccessor{
        computed:boolean;
        paths:string[];
        constValue:any;
        expr:string;
        constructor(value:any){
            this.constValue = value;
        }
        getValue():any{return this.constValue;}
        setValue(){}
        directData(data:any):any{return data;}
    }
    let selfAccessor:IAccessor ={
        getValue:(data:any):any=>data,
        setValue:(data:any,value:any)=>{},
        directData:(data:any):any=>data,
        expr:"$self",
        computed:false,
        paths:["$self"]
    };
   
    function checkComputed(expr:string){
        if(expr[0] === "$" && expr[1] === "{" && expr[expr.length - 1] === "}"){
            return expr.substring(2,expr.length - 1);
        }
    }
    function checkBind(expr:string,checkonly?:boolean){
        if(expr[0] === "{" && expr[expr.length - 1] === "}"){
            return checkonly?true:expr.substring(1,expr.length-1);
        }
    }
    
    function makeAccessor(expr):IAccessor{
        let getCode;let setCode;let accessor:any={};
        var directDataCode;
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

        accessor.getValue = new Function("$__DATA",getCode);
        accessor.setValue = new Function("$__DATA","$__VALUE",setCode);
        accessor.directData= new Function("$__DATA",directDataCode);
        accessor.paths = exprs;
        accessor.expr = expr;
        return accessor as IAccessor;
    }

    export let accessorManager = new AccessorManager();
    export function aquireAccessor(expr:string,braced?:boolean){
        return accessorManager.acquire(expr,braced);
    }
    export function getValue(expr:string,data:any,branced?:boolean):any{
        let accessor = accessorManager.acquire(expr,branced);
        return accessor?accessor.getValue(data):undefined;
    }
    export function setValue(expr:string,data:any,value:any,branced?:boolean){
        let accessor = accessorManager.acquire(expr,branced);
        if(accessor)accessor.setValue(data,value);
    }
    export function directData(expr:string,data:any,branced?:boolean){
        let accessor = accessorManager.acquire(expr,branced);
        return accessor.directData(data);
    }
}

    
    
    