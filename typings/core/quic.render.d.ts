/// <reference path="quic.instance.d.ts" />
declare namespace Quic {
    interface IRenderContext {
        render: IRender;
        field: IField;
        data?: any;
        expr?: string;
        element: any;
        wrapElement: any;
        viewContext: QuicInstance;
    }
    interface IRender {
        gridCss: Array<string>;
        render(field: IField, viewContext: QuicInstance, container?: any): any;
        id(renderContext: IRenderContext, value?: any): any;
        value(renderContext: IRenderContext, value?: any): any;
        format(modelValue: string, context: IRenderContext): string;
        unformat(viewValue: string, context: IRenderContext): string;
        _T(text: string): string;
    }
    interface IBinder {
        (context: IRenderContext, attribute: (value?: any) => void): void;
    }
    interface IAttibute {
        (renderContext: IRenderContext, value?: any): any;
    }
    abstract class Render implements IRender {
        gridCss: Array<string>;
        binders: {
            [index: string]: IBinder;
        };
        render(field: IField, viewContext: QuicInstance, container?: any): any;
        abstract id(renderContext: IRenderContext, value?: any): any;
        abstract value(renderContext: IRenderContext, value?: any): any;
        protected renderElement(renderContext: IRenderContext): void;
        _T(text: string): string;
        format(modelValue: string, context: IRenderContext): string;
        unformat(viewValue: string, context: IRenderContext): string;
    }
    let renders: {
        [type: string]: any;
    };
    function createElement(context: IRenderContext, type?: string): any;
    function appendElement(context: IRenderContext, parentElement: any, element: any): any;
    function mask(element: any, message?: string, icon?: string): any;
    function unmask(element: any): any;
    function messageBox(message: string, type?: string): Promise<string>;
    function newViewId(): number;
}
