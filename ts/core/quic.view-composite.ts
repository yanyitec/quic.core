namespace Quic{
    let views = Quic.views;
    export abstract class CompositeView extends View{
        $layout:{[slotname:string]:any};
        constructor(field:IField,composite?:IView,instance?:QuicInstance){
            super(field,composite,instance);  
        }
        render():any{
            let layout:{[slotname:string]:any} = this.$layout = this.renderLayout();
            let childrenDef = this.$field.components;
            for(var i in childrenDef){
                let childDef = childrenDef[i];
                if(!childDef)continue;
                let childViewType :new(field:IField,composite?:IView,instance?:QuicInstance)=>IView = views[childDef.viewType];
                let childView :IView = new childViewType(childDef,this);
                let rawChild = childView.render();
                let slotname = childDef.slot || "";
                let slot = layout[slotname] || layout[""];
                insertAfter(slot,rawChild);
               
            }
            return layout["$raw"];
        }
        renderLayout():{[slotname:string]:any}{
            let raw = super.render();
            return {"":raw,"$raw":raw};
        }
        
    }    
        
        //renders["composite"] = new CompositeRender();
}