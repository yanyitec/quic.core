declare namespace Quic {
    interface IPromisedFunc {
        (resolve: Function, reject: Function): void;
    }
    class PromiseResult {
        fullfilled: boolean;
        result: any;
        result1?: any;
        result2?: any;
        apply_invocation: boolean;
    }
    class Promise {
        __done_handlers: Array<Function>;
        __fail_handlers: Array<Function>;
        __result: PromiseResult;
        promiseId: number;
        constructor(promised?: IPromisedFunc | Promise, constValue?: any);
        resolve: Function;
        reject: Function;
        done(done_handler: Function): Promise;
        fail(fail_handler: Function): Promise;
    }
    function when(...args: Array<IPromisedFunc | Promise | string>): Promise;
}
