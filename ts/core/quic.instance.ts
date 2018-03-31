///<reference path="../utils/quic.observable.ts" />

namespace Quic{
    export class QuicInstance extends Observable{
        element:any;
        module:string;
        context_data:any;
        opts:IQuicOptions & IQuicDesignedOptions;
        superInstance:QuicInstance;
    
        controller:object;
        model:any;
    
        viewName:string;
        viewType:string;
        layout:{[subname:string]:Quic.IField};
        
    
        constructor(opts:IQuicOptions & IQuicDesignedOptions,context?:any){
            super();
            //创建元素
            this.element = opts.element || (Quic as any).createElement();
            mask(this.element);
            
            this.module = opts.module;
            if(opts.module){
                Quic.aquireOpts(opts.module).done((dftOpts)=>{
                    init(this,context,opts,dftOpts);
                });
            }  else {
                init(this,context,opts );
            }       
            
        }//end constructor
    
        
    }
    function init(instance:QuicInstance,context:any,opts:IQuicOptions & IQuicDesignedOptions,dftOpts?:IQuicOptions){
        initController(instance,opts);            
        combine(opts,dftOpts);
        instance.viewName = opts.viewName || "query";
        instance.viewType = opts.viewType || "query";

        //上下文
        let contextData;
        if(context instanceof QuicInstance){
            instance.superInstance = context as QuicInstance;
            contextData = instance.superInstance.model||{};
        }else {
            contextData = context ||{};
        }
        instance.context_data = contextData;

        initModel(instance,opts).done((model)=>{
            instance.model = model;
            instance.notify("model",model,instance);
            initView(instance,opts);   
            unmask(instance.element);     
        });

        
        
    }
    
    function initModel(instance:QuicInstance,opts:IQuicOptions):Promise<any>{
        if(!opts.url){
            let model = opts.model ||{};
            instance.notify("data",model,instance);
            if(opts.imports){
                combine(model,opts.imports,undefined,instance.context_data);
            }
            return new Promise(null,model);
        }
        return new Promise((resolve,reject:IFullfill<any>)=>{
            transport({
                url:opts.url,
                method:"get",
                dataType:"json",
                cache:false
            }).done((model)=>{
                instance.notify("data",model,instance);
                if(opts.imports) combine(model,opts.imports,undefined,instance.context_data);
                resolve(model);
            }).fail(reject);
        });
      
    }

    function initController(instance:QuicInstance,opts:IQuicOptions){
        if(opts.controller){
            if(typeof opts.controller==="function"){
                instance.controller = new opts.controller (instance);
            }else {
                instance.controller = opts.controller || {};
            }
            if((instance.controller as any).init) (instance.controller as any).init(instance);
        }
    }

    function initView(instance:QuicInstance,opts:IQuicOptions & IQuicDesignedOptions){
        let view:IViewOptions,viewType:string;
        if(opts.components){
            view = {
                components:opts.components,
                viewType:instance.viewType
            };
        }else{
            view = opts.layouts[instance.viewName];
            viewType = instance.viewType || opts.viewType;
        }
        let render:IRender = renders[viewType];
        instance.notify("rendering",view,instance);
        
        render.render(view as IField,instance,instance.element);
        instance.notify("rendered",view,instance);
    }
    
}


