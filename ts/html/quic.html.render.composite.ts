namespace Quic{
    export namespace Html{
        let renders = Quic.renders;
        export class HtmlCompositeRender extends HtmlRender{
            constructor(){
                super();
                this.tagName = "div";    
            }
            renderElement(renderContext:IRenderContext):any{
                let childrenDef = renderContext.defObject.layout || renderContext.defObject.children;
                for(var i in childrenDef){
                    let childDef = childrenDef[i];
                    if(!childDef)continue;
                    let childViewType :any = renders[childDef.viewType];
                    let childView :IRender = new childViewType() as IRender;
                    let rawChild = childView.render(childDef,renderContext.defObject,renderContext.element);
                    renderContext.element.appendChild(rawChild);
                }
            }
        }
        
        
    }
}