var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Quic;
(function (Quic) {
    var ParseJsonException = /** @class */ (function (_super) {
        __extends(ParseJsonException, _super);
        function ParseJsonException(message, raw, at, line, offset) {
            var _this = _super.call(this, message) || this;
            _this.text = raw;
            _this.at = at;
            _this.line = line;
            _this.offset = offset;
            return _this;
        }
        return ParseJsonException;
    }(Error));
    Quic.ParseJsonException = ParseJsonException;
    var Parser = /** @class */ (function () {
        function Parser(text) {
            this.text = text;
            this.lastAt = 0;
            this.at = 0;
            this.offset = 1;
            this.line = 1;
            this.stack = [];
            this._key = null;
        }
        Parser.prototype.doubleQuote = function (at) {
            if (!this._inString) {
                this._inString = '"';
                return;
            }
            if (this._inString === '"') {
                var txt = this.text.substring(this.lastAt, at - 1);
                if (this.current.push)
                    this.current.push(txt);
                else if (this._key === null)
                    this._key = txt;
                else {
                    this.current[this._key] = txt;
                    this._key = null;
                }
                return true;
            }
        };
        Parser.prototype.singleQuote = function (at) {
            this.at = at;
            if (!this._inString) {
                this._inString = "'";
                return;
            }
            if (this._inString === "'") {
                var txt = this.text.substring(this.lastAt, at - 1);
                if (this.current.push)
                    this.current.push(txt);
                else if (this._key === null)
                    this._key = txt;
                else {
                    this.current[this._key] = txt;
                    this._key = null;
                }
                return true;
            }
        };
        Parser.prototype.colon = function (at) {
            if (this._inString)
                return;
            if (this._key !== null)
                throw new ParseJsonException("重复的(:)", this.text, this.at, this.line, this.offset);
            this._key = this.text.substring(this.lastAt, at - 1);
            return true;
        };
        Parser.prototype.comma = function (at) {
            if (this._inString)
                return;
            //}后面的,
            var lastChar = this.text[this.lastAt - 1];
            if (lastChar === "}" || lastChar === "]")
                return;
            if (!this.current) {
                var txt_1 = this.text.substring(this.lastAt, at - 1);
                if (this._key === null) {
                    this.current = [txt_1];
                    this.stack.push(this.current);
                }
                else {
                    this.current = {};
                    this.current[this._key] = txt_1;
                    this._key = null;
                }
                this.stack.push(this.current);
                return;
            }
            if (this.current.push || this._key === null) {
                var txt_2 = this.text.substring(this.lastAt, at - 1);
                this.current.push(txt_2);
                return;
            }
            var txt = this.text.substring(this.lastAt, at - 1);
            this.current[this._key] = txt;
            this._key = null;
            return true;
        };
        Parser.prototype.braceBegin = function (at) {
            if (this._inString)
                return;
            var curr = {};
            if (!this.current) {
                var txt = this.text.substring(this.lastAt, at - 1);
                if (this._key === null) {
                    if (this.stack.length == 0) {
                        this.current = {};
                        this.stack.push(this.current);
                    }
                    else {
                        throw new ParseJsonException("未能解析出key，就出现({)", this.text, this.at, this.line, this.offset);
                    }
                }
                else {
                    throw new ParseJsonException("未定义的解析路径", this.text, this.at, this.line, this.offset);
                }
            }
            else {
                if (this.current.push) {
                    this.current.push(curr);
                    this.stack.push(curr);
                    this.current = curr;
                }
                else {
                    if (this._key === null) {
                        throw new ParseJsonException("未定义的解析路径", this.text, this.at, this.line, this.offset);
                    }
                    this.current[this._key] = curr;
                    this.current = curr;
                    this._key = null;
                }
            }
            return true;
        };
        Parser.prototype.braceEnd = function (at) {
            if (this._inString)
                return;
            if (!this.current)
                throw new ParseJsonException("不期望出现的(})", this.text, this.at, this.line, this.offset);
            if (!(this.current = this.stack.pop()))
                throw new ParseJsonException("多余的(})", this.text, this.at, this.line, this.offset);
            return true;
        };
        Parser.prototype.bracketBegin = function (at) {
            if (this._inString)
                return;
            var curr = [];
            if (!this.current) {
                if (this.stack.length == 0) {
                    this.current = curr;
                    this.stack.push(curr);
                    return true;
                }
                else {
                    throw new ParseJsonException("未定义的解析路径", this.text, this.at, this.line, this.offset);
                }
            }
            else {
                if (this._key === null) {
                    if (this.current.push) {
                        this.current.push(curr);
                        this.current = curr;
                        this.stack.push(curr);
                        return true;
                    }
                    else {
                        throw new ParseJsonException("key还未解析出来，就要到了([)", this.text, this.at, this.line, this.offset);
                    }
                }
                else {
                    this.current[this._key] = curr;
                    this.current = curr;
                    this.stack.push(curr);
                    this._key = null;
                    return true;
                }
            }
        };
        Parser.prototype.bracketEnd = function (at) {
        };
        return Parser;
    }());
    function parseJson(text) {
        var stack = [];
        var currentObj;
        var line = 1, offset = 1;
        var isInString, isInArray;
        var lastTokenAt = 0;
        var key = null, value;
        for (var at = 0, j = text.length; at < j; at++) {
        }
    }
    Quic.parseJson = parseJson;
})(Quic || (Quic = {}));
