declare namespace Quic {
    class QuicInstance {
        element: any;
        module: string;
        context: any;
        opts: Quic.IQuicOptions;
        superInstance: QuicInstance;
        controller: object;
        model: any;
        viewName: string;
        viewType: string;
        layout: {
            [subname: string]: Quic.IField;
        };
        constructor(opts: Quic.IQuicOptions | string, context?: any);
        __init(context: any, opts: Quic.IQuicOptions, dftOpts?: Quic.IQuicOptions): void;
    }
}
