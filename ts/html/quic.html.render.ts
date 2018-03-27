namespace Quic{
    export namespace Html{
        
        export abstract class HtmlRender implements IRender{
            tagName:string;
            gridCss:Array<string>;
            css:string;
            binds:Array<string>;
            constructor(){
                this.binds = ["disable"];
            }
            render(defObj:any,viewContext:any,container?:any):any{
                
                let element = document.createElement(this.tagName);
                let renderContext :IRenderContext = {
                    render:this,
                    defObject :defObj,
                    viewContext :viewContext,
                    element:element,
                    wrapElement :element
                };

                if(defObj.attributes){
                    for(var n in defObj.attributes) element.setAttribute(n,defObj.attributes[n]);
                }

                if(!(element.id = defObj.viewId)){
                    if(container) {
                        element.id = container.id + "_" + (defObj.id || newViewId());
                    }else {
                        element.id = (defObj.id || newViewId());
                    }
                }

                let css = this.css || "";
                if(this.gridCss){
                    if(css) {
                        css = this.gridCss.join(" ") + " " + css;
                    }else {
                        css = this.gridCss.join(" ");
                    }
                }
                (element as any).quic_constCss = css;
                if(container) container.appendChild(element);
                this.renderElement(renderContext);
                for(let i in this.binds){
                    let bindname = this.binds[i];
                    let binder = binders[bindname];
                    if(binder){
                        let bindParameter = defObj[bindname];
                        if(bindParameter!==undefined)binder(renderContext,bindParameter);
                    }
                }
                return element;
            }
            
            protected abstract renderElement(renderContext:IRenderContext);

            format(modelValue:string):string{
                return modelValue;
            }
            unformat(viewValue:string):string{
                return viewValue;
            }
            
            _T(text:string):string{
                return text;
            }
        }
        

        export function attach(element:HTMLElement,evt:string,listener:EventListenerOrEventListenerObject){
            if(element.addEventListener){
                (Quic as any).attach = function(element:HTMLElement,evt:string,listener:EventListenerOrEventListenerObject){
                    element.addEventListener(evt,listener,false);
                }
            }else if((element as any).attachEvent){
                (Quic as any).attach = function(element:HTMLElement,evt:string,listener:EventListenerOrEventListenerObject){
                    (element as any).attachEvent("on" + evt,listener,false);
                }
            }else {
                throw new Error("Browser is not support the addEventListener/attachEvent");
            }
            (Quic as any).attach(element,evt,listener);
        }
        
    }
}