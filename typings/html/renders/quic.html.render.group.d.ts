declare namespace Quic {
    namespace Html {
        class HtmlGroupRender extends HtmlCompositeRender {
            constructor();
            renderElement(renderContext: IRenderContext): any;
            caption(context: IRenderContext, value: any): void;
            status(context: IRenderContext, value: any): void;
        }
    }
}
