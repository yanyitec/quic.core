///<reference path="../utils/quic.cache.ts" />
///<reference path="../utils/quic.combine.ts" />
namespace Quic{
    /**
     * 代表数据字段
     * 
     * @export
     * @interface IField
     */
    export interface IField{
        name:string;
        extend?:string;
        label?:string;
        viewId?:string;
        /**
         * 控件类型 系统内建一下类型
         * 文本:text,editor,textarea
         * 选项:dropdown,multi-select,radio-group
         * 按键:submit,reset,submit,action
         * 组合:group,form
         * @type {string}
         * @memberof IControl
         */
        viewType?:string;
        dataType?:string;
        length?:number;
        validations?:{[validatorName:string]:any};
        data_path?:string;
        components?:{[subname:string]:IField};
        attributes:{[attrname:string]:string};
        slot?:string;
    }    

    export interface IViewOptions{
        viewType?:string;
        components?:{[subname:string]:IField};
    }

    export interface IQuicDesignedOptions{
        module:string;
        viewType:string;
        viewName:string;
        fields:{[subname:string]:IField};
        layouts:{[viewName:string]:IViewOptions};
    }
    
    export interface IQuicOptions{
        element?:any;
        module?:string;
        /**
         * 视图类型
         * form 表单
         * list 列表
         * 
         * @type {string}
         * @memberof IQuicOptions
         */
        viewType?:string;
        viewName?:string;
        url?:string;

        imports?:any;
        
        /**
         * 字段定义与布局
         * 
         * @type {{[subname:string]:IField}}
         * @memberof IQuicOptions
         */
        components?:{[subname:string]:IField};

        /**
         * 控制器与模型
         * 
         * @type {any}
         * @memberof IQuicOptions
         */
        controller?:any;   
        model?:any;

    }    

    let cache:Cache=new Cache();
    let fetcher:(name:string)=>Quic.Promise;
    export function aquireOpts(name:string):Promise<IQuicDesignedOptions>{
        return cache.getOrCreate(name,(name)=>new Promise((resolve:IFullfill<IQuicDesignedOptions>,reject:IFullfill<IQuicDesignedOptions>)=>{
            fetcher(name).done((defObj)=> makeDefineObject(defObj).done(resolve).fail(reject))
            .fail(reject);
        }));
    } 
    
    (aquireOpts as any).setFetcher = function(handler:(name:string)=>Promise){
        fetcher = handler;
    }
    function makeDefineObject(defObj):Promise{
        if(defObj.$extend){
            return new Promise((resolve,reject)=>
            aquireOpts(defObj.$extend)
                .done((srcDef:any)=>resolve(combine(defObj,srcDef)))
                .fail((ex)=>reject(ex))  
            );
        }
        return new Promise(null,defObj);
    }

    
}