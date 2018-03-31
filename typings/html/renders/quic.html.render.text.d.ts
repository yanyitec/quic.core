declare namespace Quic {
    namespace Html {
        class HtmlTextRender extends HtmlCompositeRender {
            constructor();
            render(defObj: any, viewContext: any, container?: any): any;
            getViewValue(element: HTMLInputElement): string;
            setViewValue(element: HTMLInputElement, value: any): void;
            renderElement(renderContext: IRenderContext): void;
            renderInform(renderContext: IRenderContext): void;
        }
    }
}
