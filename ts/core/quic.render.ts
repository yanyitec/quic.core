///<reference path="quic.instance.ts" />
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
        gridCss:Array<string>;
        render(field:IField,viewContext:QuicInstance,container?:any):any;
        id(renderContext:IRenderContext,value?:any):any;
        value(renderContext:IRenderContext,value?:any):any;
        format(modelValue:string,context:IRenderContext):string;
        unformat(viewValue:string,context:IRenderContext):string;
        _T(text:string):string;
    }
    export interface IBinder{
        (context:IRenderContext,attribute:(value?:any)=>void):void;
    }
    export interface IAttibute{
        (renderContext:IRenderContext,value?:any):any;
    }
    
    export abstract class Render implements IRender{
        gridCss:Array<string>;
        binders:{[index:string]:IBinder};
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
            for(let attrname in field){
                let elementAttribute = (this as any)[attrname];
                if(!elementAttribute) continue;
                let binder : IBinder = this.binders?this.binders[attrname]:null;
                if(!binder) binder = binders[attrname];
                if(binder){
                    binder(renderContext,elementAttribute);
                }
            }
            (element as any).quic_renderContext = renderContext;
            return element;
        }
        abstract id(renderContext:IRenderContext,value?:any):any;
        abstract value(renderContext:IRenderContext,value?:any):any;
        
        protected abstract renderElement(renderContext:IRenderContext);
        
        
            
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

    export declare function createElement(context:IRenderContext,type?:string):any;
    export declare function appendElement(context:IRenderContext,parentElement:any,element:any):any;
    export declare function mask(element:any,message?:string,icon?:string);
    export declare function unmask(element:any);
    export declare function messageBox(message:string,type?:string):Promise<string>;

    let idseed = 0;
    export function newViewId(){
        if(idseed++ ==2100000000)idseed = 0;
        return idseed;
    }

    function regulateField(field:IField,viewContext:QuicInstance):IField {
        if((field as any).regulated ) return field;
        if(field.extend){
            let superField = viewContext.opts.fields[field.extend];
            if(superField){
                combine(field,superField);
            }
        }
        if(!field.data_path) field.data_path=field.name;
        return field;
    }

    
}