declare namespace Quic {
    interface IControl {
        $name: string;
        $controlType: string;
        $dataType: string;
        $bind: string;
    }
    class Control extends Observable {
        name: string;
        controlType: string;
        dataType: string;
        bind: string;
        __bindName: string;
        constructor();
        onvaluechange(handler: (value: any, sender: Control) => any): Control;
        notifyValueChange(): this;
        getValue(): any;
    }
}
