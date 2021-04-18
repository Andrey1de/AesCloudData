

 export class RateToUsd {

    public code: string = '';
    public name: string = '';
    public rate: number = -1;
    public bid: number = -1;
    public ask: number = -1;
    public stored: Date = new Date('1900-01-01');
    public last_refreshed: Date = new Date('1900-01-01');
   
    constructor(that: any) {
        if (!!that && that.code ) {
            this.code = that.code.toUpperCase().substr(0, 3);
            this.name = that.name;
            this.rate = that.rate;
            this.bid = that.bid;
            this.ask = that.ask;
            this.stored = that.stored;
            this.last_refreshed = this.last_refreshed ||  that.lastRefreshed;

        }

    }

   
}

