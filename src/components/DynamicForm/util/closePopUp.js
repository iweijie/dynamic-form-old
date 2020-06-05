class ClosePopUp {
    constructor() {
        this.store = {};
        this.uid = 0;
    }
    add(fn, id) {
        this.uid++;
        this.store[id || this.uid] = fn;
        return id || this.uid;
    }
    del(id) {
        delete this.store[id];
    }
    reset() {
        this.store = {};
    }
    call() {
        Object.keys(this.store).forEach(key => {
            this.store[key]();
        });
    }
}

export default ClosePopUp;
