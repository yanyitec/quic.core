///<reference path="quic.instance.ts" />
/*
namespace Quic{
    export interface IRenderContext{
        render:IRender,
        field:IField,
        data?:any,
        expr?:string;
        element:any;
        wrapElement:any;
        viewContext:QuicInstance;
    }


    export interface IRender{
        render(field:IField,viewContext:QuicInstance,container?:any):any;
        id(renderContext:IRenderContext,value?:any):any;
        value(renderContext:IRenderContext,value?:any):any;
        format(modelValue:string,context:IRenderContext):string;
        unformat(viewValue:string,context:IRenderContext):string;
        _T(text:string):string;
    }
    export interface IBinder{
        (context:IRenderContext,viewAccessor:(value?:any)=>void,modelAccessor:IAccessor):void;
    }
    export interface IAttibute{
        (renderContext:IRenderContext,value?:any,old_value?:any):any;
    }
    
    export abstract class Render implements IRender{
        render(field:IField,viewContext:QuicInstance,container?:any):any{
            regulateField(field,viewContext);
            
            let renderContext :IRenderContext = {
                render:this,
                field :field,
                viewContext :viewContext,
                element:null,
                wrapElement :null
            };
            let element = createElement(renderContext,field.viewType);
            renderContext.element = renderContext.wrapElement = element;

            if(!(element.id = field.viewId)){
                if(container) {
                   this.id(renderContext,container.id + "_" + (field.name || newViewId()));
                }else {
                    this.id(renderContext,(field.name || newViewId().toString()));
                }
            }
            if(container) appendElement(renderContext,container,element);
            this.renderElement(renderContext);
            
            return element;
        }
        abstract id(renderContext:IRenderContext,value?:any):any;
        abstract value(renderContext:IRenderContext,value?:any):any;
        
        protected renderElement(renderContext:IRenderContext){
            let field = renderContext.field;
            let element = renderContext.element;
            for(let attrname in field){
                let attrvalue = field[attrname];
                let viewAccessor = (this as any)[attrname];                
                let modelAccessor = accessorManager.acquire(attrvalue,null);
                if(viewAccessor){
                    if(modelAccessor) {
                        BindInfo.bind(renderContext,viewAccessor,modelAccessor);
                    }else{
                        viewAccessor(attrvalue);
                    }
                }
            }
            (element as any).quic_renderContext = renderContext;
        }
      
        _T(text:string):string{
            return text;
        }

        format(modelValue:string,context:IRenderContext):string{
            return modelValue;
        }
        unformat(viewValue:string,context:IRenderContext):string{
            return viewValue;
        }
    }

    

    export let renders :{[type:string]:any}={};
    let binders :{[index:string]:IBinder} = (Render as any).binders={};

    
    //export declare function mask(element:any,message?:string,icon?:string);
    //export declare function unmask(element:any);
    

    

    
}
*/