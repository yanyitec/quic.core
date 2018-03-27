namespace Quic{
    export interface IRenderContext{
        render:IRender,
        defObject:any,
        data?:any,
        expr?:string;
        element:any;
        wrapElement:any;
        viewContext:any;
    }


    export interface IRender{
        gridCss:Array<string>;
        /**
         * 根据defObj定义，呈现到container中去,如果定了container的话
         * 
         * @param {*} defObj 定义
         * @param {@} viewContext 视图上下文
         * @param {*} [container] 容器
         * @returns {*} 
         * @memberof IView
         */
        render(defObj:any,viewContext:any,container?:any):any;
        format(modelValue:string):string;
        unformat(viewValue:string):string;
    }
    export let renders :{[type:string]:any}={};
    export let binders :{[index:string]:(context:IRenderContext,bindValue:any)=>void}={};

    let idseed = 0;
    export function newViewId(){
        if(idseed++ ==2100000000)idseed = 0;
        return idseed;
    }

    let opts={
        "type":"form",
        "children":[
            {
                "@type":"panel",
                "@caption":"{GroupName}",
                "@children":[
                    {
                        "@type":"text",
                        "@value":"{data.username}",
                        "@disable":"${perms.username==='disabled'}",
                        "@readonly":"${perms.username==='readonly'}"
                    }
                ]
            }
        ]
    }
}