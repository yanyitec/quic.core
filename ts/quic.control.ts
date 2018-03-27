namespace Quic{
    export interface IControl{
        $name:string;
        $controlType:string;
        $dataType:string;
        $bind:string;

    }
    let opts={
        "@type":"form",
        "@children":[
            {
                "@type":"panel",
                "@caption":"{GroupName}",
                "@children":[
                    {
                        "@type":"text",
                        "@value":"{data.username}",
                        "@disable":"${perms.username==='disabled'}",
                        "@readonly":"${perms.username==='readonly'}"
                    }
                ]
            }
        ]
    }
    export class Control extends Observable{
        name:string;
        controlType:string;
        dataType:string;
        bind:string;
        __bindName:string;
        constructor(){
            super();
        }
        onvaluechange(handler:(value:any,sender:Control)=>any):Control{
            if(this.__bindName)this.subscribe(this.__bindName,handler);
            return this;
        }
        notifyValueChange(){
            if(this.__bindName)this.notify(this.__bindName,this.getValue(),this);
            return this;
        }
        getValue():any{
            throw new Error("not implement");
        }
    }
}