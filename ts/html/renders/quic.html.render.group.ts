namespace Quic{
    export namespace Html{
        let renders = Quic.renders;
        export class HtmlGroupRender extends HtmlCompositeRender{
            constructor(){
                super();
                this.tagName = "div";   
                this.binds={
                    "group-caption":true
                }; 
            }
            renderElement(renderContext:IRenderContext):any{
                let wrapElement:HTMLDivElement = renderContext.wrapElement as HTMLDivElement;
                wrapElement.innerHTML = `<div class="group-header"><h3 class="group-caption"></h3><div class="group-actions"></div></div><div class="group-content"></div><div class="group-footer"><div class="group-status"></div><div class="group-actions"></div></div>`;

                let childrenDef = renderContext.defObject.layout || renderContext.defObject.children;
                for(var i in childrenDef){
                    let childDef = childrenDef[i];
                    if(!childDef)continue;
                    let childViewType :any = renders[childDef.viewType];
                    let childView :IRender = new childViewType() as IRender;
                    let rawChild = childView.render(childDef,renderContext.defObject,renderContext.element);
                    let slot = renderContext.defObject.slot;
                    let ctn:HTMLDivElement;
                    switch(slot){
                        case "header":ctn = wrapElement.firstChild.lastChild as HTMLDivElement;break;
                        case "footer":ctn = wrapElement.lastChild.lastChild as HTMLDivElement;break;
                        default:ctn = wrapElement.childNodes[1] as HTMLDivElement;
                    }
                    ctn.appendChild(rawChild);
                }
            }
        }
        
        renders["composite"] = new HtmlCompositeRender();
        binders["group-caption"] = function(context:IRenderContext,bindParameter:any){
            let captionElem :HTMLHeadingElement = context.wrapElement.firstChild.firstChild as HTMLHeadingElement;
            captionElem.innerHTML =getValue(context.expr,context.data);
        }
        binders["group-status"] = function(context:IRenderContext,bindParameter:any){
            let statusElem :HTMLHeadingElement = context.wrapElement.lastChild.firstChild as HTMLHeadingElement;
            statusElem.innerHTML =getValue(context.expr,context.data);
        }
    }
}