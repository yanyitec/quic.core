/// <reference path="../utils/quic.observable.d.ts" />
declare namespace Quic {
    class QuicInstance extends Observable {
        element: any;
        module: string;
        context_data: any;
        opts: IQuicOptions & IQuicDesignedOptions;
        superInstance: QuicInstance;
        controller: object;
        model: any;
        viewName: string;
        viewType: string;
        layout: {
            [subname: string]: Quic.IField;
        };
        constructor(opts: IQuicOptions & IQuicDesignedOptions, context?: any);
    }
}
