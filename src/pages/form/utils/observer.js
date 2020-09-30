/**
 *  通讯模块
 *
 *  observer 用于组件之间的数据传递
 */

import get from 'lodash/get';
import isFunction from 'lodash/isFunction';

export const Observer = (function() {
    function Observer() {
        this.store = {};
        this.payload = {};
    }
    Observer.prototype.emit = function emit(type, payload) {
        const handle = get(this.store, type);
        if (!isFunction(handle)) return;
        handle(payload);
    };
    // 前置触发
    // 已注册后触发， 和正常触发一致
    // 未注册触发，会在注册时触发一次，未注册前的多次调用只会调用最后一次
    Observer.prototype.perEmit = function preEmit(type, payload) {
        if (!this.store[type]) {
            this.payload[type] = {
                payload,
            };
            return;
        }
        this.emit(type, payload);
    };
    // 重复触发事件注册
    Observer.prototype.on = function on(type, callback) {
        if (!isFunction(callback)) return false;
        this.store[type] = callback;
        if (this.payload[type]) {
            const { payload } = this.payload[type];
            this.emit(type, payload);
            this.payload[type] = null;
        }
    };
    // 移除事件
    Observer.prototype.remove = function remove(type) {
        if (!type || !this.store[type]) return false;
        this.store[type] = undefined;
        return true;
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
})();

export default new Observer();
