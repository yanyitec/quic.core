namespace Quic{
    export namespace Html{
        let renders = Quic.renders;
        class HtmlFormRender extends HtmlCompositeRender{
            constructor(){
                super();
                this.tagName = "form";
            }
            render(defObj:any,viewContext:any,container?:any):any{
                let form = super.render(defObj,viewContext,container);
                form.method = defObj.method||"get";
                form.action = defObj.url || "";
            }
        }
        renders["form"] = new HtmlFormRender();
        
    }
}