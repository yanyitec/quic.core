declare namespace Quic {
    namespace Html {
        abstract class HtmlRender implements IRender {
            tagName: string;
            gridCss: Array<string>;
            css: string;
            binds: {
                [index: string]: any;
            };
            constructor();
            render(defObj: any, viewContext: any, container?: any): any;
            protected abstract renderElement(renderContext: IRenderContext): any;
            format(modelValue: string): string;
            unformat(viewValue: string): string;
            getViewValue(element: any): void;
            setViewValue(element: any, value: any): void;
            _T(text: string): string;
        }
        function attach(element: HTMLElement, evt: string, listener: EventListenerOrEventListenerObject): void;
    }
}
