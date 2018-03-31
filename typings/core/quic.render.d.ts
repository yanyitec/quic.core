declare namespace Quic {
    interface IRenderContext {
        render: IRender;
        defObject: any;
        data?: any;
        expr?: string;
        element: any;
        wrapElement: any;
        viewContext: any;
    }
    interface IRender {
        gridCss: Array<string>;
        /**
         * 根据defObj定义，呈现到container中去,如果定了container的话
         *
         * @param {*} defObj 定义
         * @param {@} viewContext 视图上下文
         * @param {*} [container] 容器
         * @returns {*}
         * @memberof IView
         */
        render(defObj: any, viewContext: any, container?: any): any;
        getViewValue(element: any): any;
        setViewValue(element: any, value: any): any;
        format(modelValue: string): string;
        unformat(viewValue: string): string;
    }
    let renders: {
        [type: string]: any;
    };
    let binders: {
        [index: string]: (context: IRenderContext, bindValue: any) => void;
    };
    function newViewId(): number;
}
