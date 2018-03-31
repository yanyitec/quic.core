namespace Quic{
    export namespace Html{
        let renders = Quic.renders;
        export class HtmlFormRender extends HtmlCompositeRender{
            constructor(){
                super();
            }
           
            renderElement(context:IRenderContext){
                let form = context.element as HTMLFormElement;
                form.method = (context.field as any).method||"get";
                form.action = (context.field as any).url || "";
                super.renderElement(context);
            }

            value(context:IRenderContext,value?:any):any{
                if(value===undefined) return getViewValue(context.element);
                setViewValue(context.element,value);
            }
            
        }

        function getViewValue(element:HTMLFormElement){
            let els = element.elements;
            let result = {};
            for(let i =0,j=els.length;i<j;i++){
                let input:HTMLInputElement = els[i] as HTMLInputElement;
                let renderContext = (input as any).quic_renderContext;
                if(renderContext){
                    result[input.name] = renderContext.unformat(renderContext.getViewValue(input));
                }else {
                    result[input.name] = input.value;
                }
            }
        }
        function setViewValue(element:HTMLFormElement,data:any){
            let els = element.elements;
            let result = {};
            for(let i =0,j=els.length;i<j;i++){
                let input:HTMLInputElement = els[i] as HTMLInputElement;
                let renderContext = (input as any).quic_renderContext;
                if(renderContext){
                    renderContext.setViewValue(renderContext.format(data[input.name]));
                }else {
                    input.value = data[input.name];
                }
            }
        }
        renders["form"] = new HtmlFormRender();
        
    }
}