declare namespace Quic {
    interface IAccessor {
        getValue(data: any): any;
        setValue(data: any, value: any): any;
        directData(data: any): any;
        computed: boolean;
    }
    class AccessorManager {
        private __accessors;
        constructor();
        acquire(expr: any): IAccessor;
    }
    function accessor(expr: any): IAccessor;
    function getValue(expr: any, data: any): any;
    function setValue(expr: any, data: any, value: any): void;
    function directData(expr: any, data: any): any;
}
