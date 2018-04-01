///<reference path="../utils/quic.observable.ts" />

namespace Quic{
    export class QuicInstance extends Observable implements IView{
        
        $module:string;
        $context_data:any;
        $opts:IQuicOptions & IQuicDesignedOptions;
        $superInstance:QuicInstance;
    
        $controller:object;
        $model:any;
    
        $viewName:string;
        $viewType:string;
        $layout:{[subname:string]:Quic.IField};
        $bindInfo:BindInfo;

        $field:IField;
        $element:any;
        $instance:QuicInstance;
        $components:IView[];
        $composite:IView;
        id:(value?:any)=>any;
        value:(value?:any)=>any;
        render:()=>any;
        mask:(message:string,icon?:string)=>void;
        unmask:()=>void;
        format:(modelValue:string)=>string;
        unformat:(viewValue:string)=>string;
        _T:(text:string)=>string;
        insertAfter:(childView:IView,after?:IView|number)=>IView;
        removeChild:(child:IView|number)=>IView;

        
    
        constructor(opts:IQuicOptions & IQuicDesignedOptions,context?:any){
            super();
            //创建元素
            this.$element = opts.element || (Quic as any).createElement();
            
            
            this.$module = opts.module;
            
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
        instance.$viewName = opts.viewName || "query";
        instance.$viewType = opts.viewType || "query";

        //上下文
        let contextData;
        if(context instanceof QuicInstance){
            instance.$superInstance = context as QuicInstance;
            contextData = instance.$superInstance.$model||{};
        }else {
            contextData = context ||{};
        }
        instance.$context_data = contextData;

        initModel(instance,opts).done((model)=>{
            instance.$model = model;
            instance.notify("model",model,instance);
            initView(instance,opts);   
            //unmask(instance.$element);     
        });

        
        
    }
    
    function initModel(instance:QuicInstance,opts:IQuicOptions):Promise<any>{
        if(!opts.url){
            let model = opts.model ||{};
            instance.notify("data",model,instance);
            
            instance.$bindInfo = new BindInfo("$self",accessorManager.acquire("$self"));
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
                if(opts.imports) combine(model,opts.imports,undefined,instance.$context_data);
                resolve(model);
            }).fail(reject);
        });
      
    }

    function initImports(instance:QuicInstance,opts:IQuicOptions,model:any){
        if(!opts.imports)return;
        let self :any = this;
        let imports :object ={};
        for(let n in opts.imports){
            if(n[0]!="@"){
                imports[n] = opts.imports[n];
            }else{
                let pname = n.substr(1);
                self[pname] = (context:IView,value:any):void=>{
                    let bindInfo:BindInfo = self.bindInfo[pname];
                    let old_value = self.model[pname];
                    self.model[pname] = value;
                    bindInfo.modelchange(value,old_value);
                }
            }
        }
        combine(model,imports,undefined,instance.$context_data);
    }

    function initController(instance:QuicInstance,opts:IQuicOptions){
        if(opts.controller){
            if(typeof opts.controller==="function"){
                instance.$controller = new opts.controller (instance);
            }else {
                instance.$controller = opts.controller || {};
            }
            if((instance.$controller as any).init) (instance.$controller as any).init(instance);
        }
    }

    function initView(instance:QuicInstance,opts:IQuicOptions & IQuicDesignedOptions){
        let viewOpts:IViewOptions,viewTypeName:string;
        if(opts.components){
            viewOpts = {
                components:opts.components,
                viewType:instance.$viewType
            };
        }else{
            viewOpts = opts.layouts[instance.$viewName];
            viewTypeName = instance.$viewType || opts.viewType;
        }
        let viewType:new(field:IField,composite:IView,instance:QuicInstance)=>IView = views[viewTypeName];
        instance.notify("rendering",viewOpts,instance);
        let view = new viewType(viewOpts as IField,undefined,this);
        view.render();
        instance.notify("rendered",view,instance);
    }
    
}


