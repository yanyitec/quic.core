namespace Quic{
    export interface IView{
        $field:IField;
        $element:any;
        $instance:QuicInstance;
        $components:IView[];
        $composite:IView;
        id(value?:any):any;
        value(value?:any):any;
        render():any;
        mask(message:string,icon?:string);
        unmask();
        format(modelValue:string):string;
        unformat(viewValue:string):string;
        _T(text:string):string;
        insertAfter(childView:IView,after?:IView|number):IView;
        removeChild(child:IView|number):IView;
    }
    export abstract class View implements IView{
        $field:IField;
        $element:any;
        $composite:IView;
        $components:IView[];
        $instance:QuicInstance;
        constructor(field:IField,composite?:IView,instance?:QuicInstance){
            this.$field = field;
            this.$composite = composite;
            this.$instance = instance||(composite?composite.$instance:undefined);
            
        }
        render():any{
            let field = this.$field;
            regulateField(field,this.$instance);
            let element = this.$element = createElement(this,field.viewType);
            let composite = this.$composite;
            if(!(element.id = field.viewId)){
                if(composite) {
                   this.id(composite.id() + "_" + (field.name || newViewId()));
                }else {
                    this.id((field.name || newViewId().toString()));
                }
            }
            if(composite) composite.insertAfter(this);
            
            for(let attrname in field){
                let attrvalue = field[attrname];
                let viewAccessor = (this as any)[attrname];                
                let modelAccessor = accessorManager.acquire(attrvalue,null);
                if(viewAccessor){
                    if(modelAccessor) {
                        //BindInfo.bind(viewAccessor,modelAccessor);
                    }else{
                        viewAccessor(attrvalue);
                    }
                }
            }
            
            return element;
        }
        removeChild(child:IView|number,logicOnly?:boolean):IView{
            let result:IView ;
            let components = this.$components;
            if(components){
                for(let i =0,j=components.length;i<j;i++){
                    let childView = components.shift();
                    if(childView!==child && i!=child) components.push(childView);
                    else result = childView;
                }
            }
            if(result){
                result.$composite=undefined;
                if(!logicOnly) removeElement(this.$element,result.$element);
            }
            
            return result;
        }
        
        insertAfter(childView:IView,after?:number|IView,logicOnly?:boolean){
            this.removeChild(childView,logicOnly);
            if(!logicOnly){
                insertAfter(this.$element,childView.$element,after);
            }
            let components = this.$components;
            if(!components) components= this.$components=[];
            let count = components.length;
            for(let i =0,j=count;i<j;i++){
                let child = components.shift();
                
                components.push(child);
                if(child==after||i==after){
                    components.push(childView);
                }
            }
            if(components.length===count) components.push(childView);
            childView.$composite = this;
            
            return this;
        }
      
        _T(text:string):string{
            return text;
        }

        format(modelValue:string):string{
            return modelValue;
        }
        unformat(viewValue:string):string{
            return viewValue;
        }

        abstract id(value?:any):any;
        abstract value(value?:any):any;
        abstract mask(message:string,icon?:string);
        abstract unmask();
    }

    export let views:{[viewType:string]:new(field:IField,composite?:IView,instance?:QuicInstance)=>IView}={};

    let idseed = 0;
    export function newViewId(){
        if(idseed++ ==2100000000)idseed = 0;
        return idseed;
    }

    function regulateField(field:IField,viewContext:QuicInstance):IField {
        if((field as any).regulated ) return field;
        if(field.extend){
            let superField = viewContext.$opts.fields[field.extend];
            if(superField){
                combine(field,superField);
            }
        }
        if(!field.data_path) field.data_path=field.name;
        return field;
    }
    export let createElement:(context:IView,type?:string)=>any;
    export let removeElement:(container:any,child:any)=>void;
    export let insertBefore:(container:any,child:any,before?:any)=>any;
    export let insertAfter:(container:IView,child:any,after?:any)=>any;
    export declare function messageBox(message:string,type?:string):Promise<string>;
}