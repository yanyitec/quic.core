var Quic;
(function (Quic) {
    var PromiseResult = /** @class */ (function () {
        function PromiseResult() {
        }
        return PromiseResult;
    }());
    Quic.PromiseResult = PromiseResult;
    var Promise = /** @class */ (function () {
        function Promise(promised, constValue) {
            var self = this, asyncCall = false;
            if ((this.promiseId = seed++) == 2100000000)
                seed = 0;
            if (!promised) {
                self.__result = {
                    fullfilled: true,
                    result: constValue,
                    apply_invocation: false
                };
                resolved.call(self);
                return;
            }
            var resolve = function (result, apply_invocation, arg2) {
                self.__result = {
                    fullfilled: true,
                    result: result,
                    result1: apply_invocation,
                    result2: arg2,
                    apply_invocation: apply_invocation === "quic!apply"
                };
                if (asyncCall) {
                    setTimeout(function () {
                        resolved.call(self);
                    }, 0);
                }
                else {
                    resolved.call(self);
                }
            };
            var reject = function (err) {
                self.__result = {
                    fullfilled: false,
                    result: err,
                    apply_invocation: false
                };
                if (asyncCall) {
                    setTimeout(function () {
                        rejected.call(self);
                    }, 0);
                }
                else {
                    rejected.call(self);
                }
            };
            if (!promised) {
                this.resolve = resolve;
                this.reject = reject;
                return;
            }
            if (promised instanceof Promise) {
                promised.done(resolve).fail(reject);
                return;
            }
            asyncCall = true;
            setTimeout(function () {
                try {
                    promised(resolve, reject);
                }
                catch (ex) {
                    asyncCall = false;
                    console.error(ex);
                    reject(ex);
                }
            }, 0);
        }
        Promise.prototype.done = function (done_handler) {
            (this.__done_handlers || (this.__done_handlers = [])).push(done_handler);
            return this;
        };
        Promise.prototype.fail = function (fail_handler) {
            (this.__fail_handlers || (this.__fail_handlers = [])).push(fail_handler);
            return this;
        };
        return Promise;
    }());
    Quic.Promise = Promise;
    function resolved() {
        var result = this.__result;
        this.fail = function (done_handler) { return this; };
        if (result.apply_invocation) {
            this.done = function (done_handler) {
                done_handler.apply(this, result.result);
                return this;
            };
            if (this.__done_handlers) {
                var rs = result.result;
                for (var i = 0, j = this.__done_handlers.length; i < j; i++) {
                    this.__done_handlers[i].call(this, rs);
                }
            }
        }
        else {
            this.done = function (done_handler) {
                done_handler.call(this, result.result, result.result1, result.result2);
                return this;
            };
            if (this.__done_handlers) {
                var rs = result.result;
                for (var i = 0, j = this.__done_handlers.length; i < j; i++) {
                    this.__done_handlers[i].call(this, result.result, result.result1, result.result2);
                }
            }
        }
        this.__done_handlers = this.__fail_handlers = undefined;
        this.resolve = this.reject = function () {
            throw new Error("Cannot invoke resolve/reject once more.");
        };
        return this;
    }
    function rejected() {
        var result = this.__result;
        this.done = function (done_handler) { return this; };
        this.fail = function (fail_handler) {
            fail_handler.call(this, result.result);
            return this;
        };
        if (this.__fail_handlers) {
            var err = result.result;
            for (var i = 0, j = this.__fail_handlers.length; i < j; i++) {
                this.__fail_handlers[i].call(this, err);
            }
        }
        this.__done_handlers = this.__fail_handlers = undefined;
        this.resolve = this.reject = function () {
            throw new Error("Cannot invoke resolve/reject once more.");
        };
        return this;
    }
    function when() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var taskcount = 1;
            var isArr = args[0] !== "quic!array";
            if (isArr)
                args.shift();
            var result = [];
            var hasError = false;
            var dic = {};
            for (var i = 0, j = args.length; i < j; i++) {
                var promise = args[i];
                if (!(promise instanceof Promise)) {
                    promise = new Promise(promise);
                }
                dic[promise.promiseId] = i;
                promise.done(function (rs) {
                    if (!hasError) {
                        result[dic[_this.promiseId]] = rs;
                        if (--taskcount == 0) {
                            if (isArr) {
                                resolve(result);
                            }
                            else {
                                if (args.length <= 3)
                                    resolve(result[0], result[1], result[2]);
                                else
                                    resolve("quic!apply", result);
                            }
                        }
                    }
                }).fail(function (err) {
                    if (!hasError) {
                        hasError = true;
                        reject({
                            status: "error",
                            index: dic[dic[_this.promised]],
                            promiseId: _this.promiseId,
                            innerException: err
                        });
                    }
                });
            }
            if (--taskcount == 0 && !hasError) {
                if (isArr) {
                    resolve(result);
                }
                else {
                    if (args.length <= 3)
                        resolve(result[0], result[1], result[2]);
                    else
                        resolve("quic!apply", result);
                }
            }
        });
    }
    Quic.when = when;
    var seed = 0;
})(Quic || (Quic = {}));
