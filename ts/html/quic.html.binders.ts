namespace Quic{
    export namespace Html{
        
        
        binders.visible = (context:IRenderContext,bindParameter:any):void=>{
            let value = getValue(context.data,bindParameter);
            if(value==="hidden" || value===false){
                context.wrapElement.style.display = "none";
            } else {
                context.wrapElement.style.display= "";
            }
        }

        binders.validatable = (context:IRenderContext,bindParameter:any):void=>{
            let value = getValue(context.data,bindParameter);
            if(value==="hidden" || value===false){
                context.wrapElement.style.display = "none";
            } else {
                context.wrapElement.style.display= "";
            }
        }

        binders.value = (context:IRenderContext,bindParameter:any):void=>{
            if((context.element as HTMLInputElement).type=="text" || context.element.tagName == "TEXTAREA"){
                bindText(context,bindParameter);
            }
            
        }

        function bindText(context:IRenderContext,bindParameter:any):void{
            let accessor = Quic.accessor(bindParameter);
            context.element.setAttribute("value",accessor.getValue(context.data));
            let valuechange = ()=>{
                if(tick){
                    clearTimeout(tick);tick=0;
                }
                let viewValue = (context.element as HTMLInputElement).value;
                let modelValue = context.render.unformat(viewValue);
                accessor.setValue(context.data,modelValue);
            };
            attach(context.element,"blur",valuechange);
            let tick;
            attach(context.element,"keyup",()=>{
                tick = setTimeout(valuechange, 150);
            });
        }
        
    }
}