declare namespace Quic {
    /**
     * 代表数据字段
     *
     * @export
     * @interface IField
     */
    interface IField {
        name: string;
        label?: string;
        /**
         * 控件类型 系统内建一下类型
         * 文本:text,editor,textarea
         * 选项:dropdown,multi-select,radio-group
         * 按键:submit,reset,submit,action
         * 组合:group,form
         * @type {string}
         * @memberof IControl
         */
        controlType?: string;
        dataType?: string;
        length?: number;
        validations?: {
            [validatorName: string]: any;
        };
        data_path?: string;
        components: {
            [subname: string]: IField;
        };
    }
    /**
     * 控件，代表view上的一个元素
     *
     * @export
     * @interface IControl
     */
    interface IControl extends IField {
    }
    interface IQuicOptions {
        module: string;
        /**
         * 视图类型
         * form 表单
         * list 列表
         *
         * @type {string}
         * @memberof IQuicOptions
         */
        viewType: string;
        viewName: string;
        url: string;
        /**
         * 字段定义与布局
         *
         * @type {{[subname:string]:IField}}
         * @memberof IQuicOptions
         */
        layout: {
            [subname: string]: IField;
        };
        /**
         * 控制器与模型
         *
         * @type {(object|Function)}
         * @memberof IQuicOptions
         */
        ctrlr: object | Function;
    }
}
