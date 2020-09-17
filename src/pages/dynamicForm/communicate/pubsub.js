import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

// function Observer() {
//     function Observer() {
//         this.store = {};
//         this.payload = {};
//     }
//     Observer.prototype.emit = function emit(id, type, payload) {
//         const handle = get(this.store, `${id}.${type}`);
//         if (isEmpty(handle)) return;
//         return handle(payload);
//     };
//     // 前置触发，也即在注册之前可以先调用，注册时会自动触发，可以不用担心顺序问题
//     Observer.prototype.preEmit = function preEmit(id, type, payload) {
//         const handle = get(this.store, `${id}.${type}`);
//         if (isEmpty(handle)) {
//             set(this.payload, `${id}.${type}`, payload);
//             return;
//         }
//         this.emit(id, type, payload);
//     };
//     // 重复触发事件注册
//     Observer.prototype.on = function on(id, type, callback) {
//         set(this.store, `${id}.${type}`, callback);
//         const payload = get(this.payload, `${id}.${type}`);
//         if (payload) {
//             delete this.payload[id][type];
//             this.emit(id, type, payload);
//         }
//     };
//     // 移除事件
//     Observer.prototype.remove = function remove(id, type) {
//         if (isEmpty(type)) {
//             this.store[id] = undefined;
//         } else {
//             set(this.store, `${id}.${type}`, undefined);
//         }
//     };
//     // 单次触发事件注册
//     Observer.prototype.once = function once(id, type, callback) {
//         if (!type) return;
//         const _this = this;
//         const anonym = function anonym() {
//             function fn(payload) {
//                 callback(payload);
//                 _this.remove(type, fn);
//             }
//             return fn;
//         };

//         this.store[type] = anonym();
//     };
//     return Observer;
// }

const Observer = (function() {
    function Observer() {
        this.store = {};
        this.payload = {};
    }
    Observer.prototype.emit = function emit(type, payload) {
        const handle = get(this.store, type);
        if (isEmpty(handle)) return;
        handle(payload);
    };
    // 前置触发，也即在注册之前可以先调用，注册时会自动触发，可以不用担心顺序问题
    Observer.prototype.preEmit = function preEmit(type, payload) {
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
        this.store[type] = callback;
        if (this.payload[type]) {
            const { payload } = this.payload[type];
            this.emit(type, payload);
            this.payload[type] = null;
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
})();

const getType = (uuid, type) => `${uuid}_${type}`;

export class Pubsub {
    constructor() {
        this.observer = new Observer();
    }
    subscribe(uuid, type, fn) {
        this.observer.on(getType(uuid, type), fn);
    }
    publish(uuid, type, params) {
        this.observer.emit(getType(uuid, type), params);
    }
    removeSubscribe(uuid, type) {
        this.observer.remove(getType(uuid, type));
    }
}

export default new Pubsub();
