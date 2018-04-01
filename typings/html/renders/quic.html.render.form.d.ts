declare namespace Quic {
    namespace Html {
        class HtmlFormRender extends HtmlCompositeRender {
            constructor();
            renderElement(context: IRenderContext): void;
            value(context: IRenderContext, value?: any): any;
        }
    }
}
