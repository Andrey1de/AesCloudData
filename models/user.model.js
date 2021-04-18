"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(that) {
        this.last_refreshed = null;
        if (!!that && that.name) {
            this.name = that.name;
            this.user_id = that.user_id;
            this.email = that.email;
            this.password = that.password;
            this.guid = that.guid;
            this.severity = that.severity;
            this.last_refreshed = new Date();
        }
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map