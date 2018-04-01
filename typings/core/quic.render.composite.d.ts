declare namespace Quic {
    abstract class CompositeRender extends Render {
        constructor();
        renderElement(renderContext: IRenderContext): any;
    }
}
