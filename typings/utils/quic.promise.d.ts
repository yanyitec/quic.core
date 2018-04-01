declare namespace Quic {
    interface IPromisedFunc {
        (resolve: Function, reject: Function): void;
    }
    interface IFullfill<T> {
        (result: T, rs1?: any, rs2?: any): any;
    }
    interface IReject {
        (error: any): any;
    }
    class PromiseResult<T> {
        fullfilled: boolean;
        result: T;
        result1?: any;
        result2?: any;
        apply_invocation: boolean;
    }
    class Promise<T = any> {
        __done_handlers: Array<IFullfill<T>>;
        __fail_handlers: Array<IReject>;
        __result: PromiseResult<T>;
        promiseId: number;
        constructor(promised?: IPromisedFunc | Promise<T>, constValue?: any);
        resolve: Function;
        reject: Function;
        done(done_handler: IFullfill<T>): Promise<T>;
        fail(fail_handler: IReject): Promise<T>;
    }
    function when<T>(...args: Array<IPromisedFunc | Promise<T> | string>): Promise<T>;
}
