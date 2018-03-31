declare namespace Quic {
    function define(name: string, defObj?: any): Promise;
    function extend(dest: Object, src: Object, propname?: string | number): any;
}
