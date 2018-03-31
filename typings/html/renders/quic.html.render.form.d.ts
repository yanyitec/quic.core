declare namespace Quic {
    namespace Html {
        class HtmlFormRender extends HtmlCompositeRender {
            constructor();
            render(defObj: any, viewContext: any, container?: any): any;
            getViewValue(element: HTMLFormElement): void;
            setViewValue(element: HTMLFormElement, data: any): void;
        }
    }
}
