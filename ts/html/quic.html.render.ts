///<reference path="../core/quic.render.ts" />

namespace Quic{
    export namespace Html{
        
        export abstract class HtmlRender extends Render{
            css:string;
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
                let css = this.css || "";
                if(this.gridCss){
                    if(css) {
                        css = this.gridCss.join(" ") + " " + css;
                    }else {
                        css = this.gridCss.join(" ");
                    }
                }
                (context as any).quic_constCss = css;
            } 
        }
        

        
        
    }
    
}