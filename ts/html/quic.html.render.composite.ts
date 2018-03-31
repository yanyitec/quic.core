namespace Quic{
    export namespace Html{
        let renders = Quic.renders;
        export class HtmlCompositeRender extends HtmlRender{
            constructor(){
                super();  
                this.renderElement = CompositeRender.prototype.renderElement;
            }
            renderElement(renderContext:IRenderContext):any{
                CompositeRender.prototype.renderElement.call( this, renderContext);
            }
        }
        
        renders["composite"] = new HtmlCompositeRender();
    }
    
}