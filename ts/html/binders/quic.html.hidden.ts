///<reference path="../../utils/quic.accessor.ts" />
namespace Quic{
    namespace Html{
        (Quic.Render as any).binders.hidden = (context:IRenderContext,bindParameter:any):void=>{
            let value = getValue(context.data,bindParameter);
            if(value==="visible" || value===true){
                context.wrapElement.style.display = "";
            } else {
                context.wrapElement.style.display= "none";
            }
        }

    }
}