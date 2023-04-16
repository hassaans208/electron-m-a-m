class TableFunctions {
    constructor() {
        this._view = [];
        this._delete = [];
        this._edit = [];
    }
    get view() {
        return this._view;
    }
    get edit() {
        return this._edit;
    }
    get delete() {
        return this._delete;
    }
    configDelete(action) {
        let object = {
            act:action}
        this._delete.push(object)
    }
    configView(action) {
        this._view.push(action)
    }
    configEdit(action) {
        this._edit.push(action)
    }
}
const action = new TableFunctions();
module.exports = action