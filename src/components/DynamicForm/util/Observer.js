export function Observer() {
    function Observer() {
        this.store = {};
        this.paylaod = {};
    }
    Observer.prototype.emit = function emit(type, payload) {
        if (!this.store[type]) return;
        this.store[type](payload);
    };
    // 前置触发，也即在注册之前可以先调用，注册时会自动触发，可以不用担心顺序问题
    Observer.prototype.preEmit = function preEmit(type, payload) {
        if (!this.store[type]) {
            this.paylaod[type] = {
                payload,
            };
            return;
        }
        this.emit(type, payload);
    };
    // 重复触发事件注册
    Observer.prototype.on = function on(type, callback) {
        this.store[type] = callback;
        if (this.paylaod[type]) {
            const { payload } = this.paylaod[type];
            this.emit(type, payload);
            this.paylaod[type] = null;
        }
    };
    // 移除事件
    Observer.prototype.remove = function remove(type) {
        if (!type || !this.store[type]) return;
        this.store[type] = undefined;
    };
    // 单次触发事件注册
    Observer.prototype.once = function once(type, callback) {
        if (!type) return;
        const _this = this;
        const anonym = function anonym() {
            function fn(payload) {
                callback(payload);
                _this.remove(type, fn);
            }
            return fn;
        };

        this.store[type] = anonym();
    };
    return Observer;
}
export default Observer();
