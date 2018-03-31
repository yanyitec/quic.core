namespace Quic{
    (Render as any).binders.value = (context:IRenderContext,attribute:IAttibute):void=>{
        if((context.element as HTMLInputElement).type=="text" || context.element.tagName == "TEXTAREA"){
            bindText(context,attribute);
        }
        
    }

    function bindText(context:IRenderContext,attribute:IAttibute):void{
        let accessor = Quic.accessor(context.field.data_path);
        context.element.setAttribute("value",accessor.getValue(context.data));
        let valuechange = ()=>{
            if(tick){
                clearTimeout(tick);tick=0;
            }
            let viewValue = (context.element as HTMLInputElement).value;
            let modelValue = context.render.unformat(viewValue,context);
            accessor.setValue(context.data,modelValue);
        };
        Quic.Html.attach(context.element,"blur",valuechange);
        let tick;
        Quic.Html.attach(context.element,"keyup",()=>{
            tick = setTimeout(valuechange, 150);
        });
        let viewValue = context.render.format(accessor.getValue(context.data),context);
        context.element.value = viewValue;
        context.element.setAttribute("value",viewValue);
        context.element.innerHTML = viewValue;
    }

    function bindInnerText(context:IRenderContext,bindParameter:any):void{
        let value = context.render.format(Quic.getValue(context.expr,context.data),context);
        context.element.innerHTML = value;
    }

}