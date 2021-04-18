"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateToUsd = void 0;
class RateToUsd {
    constructor(that) {
        this.code = '';
        this.name = '';
        this.rate = -1;
        this.bid = -1;
        this.ask = -1;
        this.stored = new Date('1900-01-01');
        this.last_refreshed = new Date('1900-01-01');
        if (!!that && that.code) {
            this.code = that.code.toUpperCase().substr(0, 3);
            this.name = that.name;
            this.rate = that.rate;
            this.bid = that.bid;
            this.ask = that.ask;
            this.stored = that.stored;
            this.last_refreshed = this.last_refreshed || that.lastRefreshed;
        }
    }
}
exports.RateToUsd = RateToUsd;
//# sourceMappingURL=RateToUsd.model.js.map