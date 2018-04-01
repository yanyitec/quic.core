///<reference path="../core/quic.render.ts" />

namespace Quic{
    export namespace Html{
        
        export abstract class HtmlRender extends Render{
            
            constructor(){
                super();
            }

            id(context:IRenderContext,value?:any):any{
                if(value===undefined) return context.element.id;
                context.element.id = value;
            }
            value(context:IRenderContext,value?:any):any{
                if(value===undefined) return context.element.value;
                context.element.value = value;
            }
            hidden(context:IRenderContext,value?:any):any{
                if(value===undefined) return context.element.value;
                context.element.value = value;
            }
            
            protected renderElement(context:IRenderContext){
                let css =  "";
                let gridCss = context.field.grid_css;
                if(gridCss){
                    if(css) {
                        css = gridCss.join(" ") + " " + css;
                    }else {
                        css = gridCss.join(" ");
                    }
                }
                (context as any).quic_constCss = css;
            } 
        }
        

        
        
    }
    
}