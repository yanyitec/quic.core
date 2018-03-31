declare namespace Quic {
    class ParseJsonException extends Error {
        text: string;
        at: number;
        line: number;
        offset: number;
        constructor(message: string, raw: string, at: number, line: number, offset: number);
    }
    function parseJson(text: string): void;
}
