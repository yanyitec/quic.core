namespace Quic{
    let renders = Quic.renders;
        export abstract class CompositeRender extends Render{
            constructor(){
                super();  
            }
            renderElement(renderContext:IRenderContext):any{
                //super.renderElement(renderContext);
                renderContext.wrapElement= renderContext.element;
                let childrenDef = renderContext.field.components;
                for(var i in childrenDef){
                    let childDef = childrenDef[i];
                    if(!childDef)continue;
                    let childViewType :any = renders[childDef.viewType];
                    let childView :IRender = new childViewType() as IRender;
                    let rawChild = childView.render(childDef,renderContext.viewContext,renderContext.element);
                    appendElement(renderContext,renderContext.element,rawChild);
                   
                }
            }
        }
        
        //renders["composite"] = new CompositeRender();
}