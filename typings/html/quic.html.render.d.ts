/// <reference path="../core/quic.render.d.ts" />
declare namespace Quic {
    namespace Html {
        abstract class HtmlRender extends Render {
            css: string;
            constructor();
            id(context: IRenderContext, value?: any): any;
            value(context: IRenderContext, value?: any): any;
            hidden(context: IRenderContext, value?: any): any;
            protected renderElement(context: IRenderContext): void;
        }
    }
}
