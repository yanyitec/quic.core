namespace Quic{
    
    export interface IBInd{
        view:IView;
        viewAccessor:(value?:any)=>void;
    }
    export class BindInfo{
        propname:string;
        modelAccessor:IAccessor;
        members:{[subname:string]:BindInfo};
        binds:IBInd[];
        getValue:(data:any)=>any;
        setValue:(data:any,value:any)=>void;
        constructor(propname:string, modelAccessor?:IAccessor){
            if(modelAccessor) this.setModelAccessor(modelAccessor);
            this.propname = propname;
            this.binds = [];
        }
        setModelAccessor(modelAccessor:IAccessor){
            this.modelAccessor = modelAccessor;
            this.getValue = modelAccessor.getValue;
            this.setValue = modelAccessor.setValue;
        }
        modelchange(value:any,old_value:any){
            for(let i =0,j=this.binds.length;i<j;i++){
                let bind = this.binds[i];
                bind.viewAccessor.call(bind.view,value);
            }
            for(let sub in this.members){
                let subinfo = this.members[sub];
                subinfo.modelchange(value?value[sub]:undefined,old_value?old_value[sub]:undefined);
            }
        }
        static bind(view:IView,viewAccessor:(value?:any)=>void,modelAccessor:IAccessor){
            let paths:string[] = modelAccessor.paths;
            if(!paths)return;
            let info = view.$instance.$bindInfo;
            for(let i =0,j=paths.length-1;i<=j;i++){
                let propname = paths[i];
                if(propname==="$self"){continue;}
                let curr = info.members[propname];
                if(!curr){
                    curr = info.members[propname] = new BindInfo(propname,i===j?modelAccessor:undefined);
                }else {
                    if(i===j){
                        if(curr.modelAccessor===undefined) {
                            curr.setModelAccessor(modelAccessor);
                        }else if(curr.modelAccessor!==modelAccessor){
                            throw new Error("两次model_accessor不一致");
                        }
                    }
                }
                curr.binds.push({
                    view:view,
                    viewAccessor:viewAccessor
                });
                info = curr;
            }
            return info;
        }
    }
 
    function updateModel(curr:any,origin:any,bindInfo:any,propname?:string){
        if(propname===undefined){
            for(let pname in origin){
                updateModel(curr,origin,bindInfo,pname);
            }
            return;
        }
        let info = bindInfo[propname];
        //当前属性没有绑定信息，直接返回
        if(!info) return;
        let currValue = curr[propname];
        let originValue = origin[propname];
        let curr_t = typeof currValue;
        //一样，不用触发任何联动
        
        if(currValue===originValue){
            if(curr_t!=="object") return;
        }
        
        let origin_t = typeof origin;
        if(curr_t!==origin_t){
            info.modelchange(currValue,originValue);
            return;
        }
        //类型一样，值不一样
        if(curr_t==="object"){
            let existednames = [];
            for(let subname in currValue){
                updateModel(currValue,originValue,info,subname);
                existednames.push(subname);
            }
            for(let subname in originValue){
                let isExisted = false;
                for(let i =0,j=existednames.length;i<j;i++){
                    if(existednames[i]===subname) {
                        isExisted = true;
                        break;
                    }
                }
                if(isExisted) continue;
                updateModel(currValue,originValue,info,subname);
            }
        }
    }

}