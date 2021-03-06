namespace Quic{
    export namespace Html{
        let renders = Quic.renders;
        export class HtmlTextRender extends HtmlCompositeRender{
            constructor(){
                super();
                
            }
            render(defObj:any,viewContext:any,container?:any):any{
                let isInForm = viewContext.viewType==="form";
                
                super.render(defObj,viewContext,container);
                
            }
            getViewValue(element:HTMLInputElement){
                return element.value;
            }
            setViewValue(element:HTMLInputElement , value:any){
                element.value = value;
            }
            renderElement(renderContext:IRenderContext):void{
                
            }
            renderInform(renderContext:IRenderContext){
                let label = this._T(renderContext.field.label || renderContext.field.name);
                let name = renderContext.field.name;
                renderContext.wrapElement.innerHTML = `<label class="field-label>">${label}</label><input type="text" class="field-input" name="${name}" ><label class="field-ins"></label>`;
                let input = 
                renderContext.element = 
                (renderContext.wrapElement as any).quid_input = renderContext.wrapElement.firstChild.nextSibling as HTMLInputElement;
            }
            
        }
        renders["text"] = new HtmlTextRender();
        
    }
}