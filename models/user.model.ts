
export class User {
    name: string;
    user_id: number;
    email: string;
    password: string;
    guid: string;
    severity: string;// NOT NULL,
     last_refreshed : Date = null;

    constructor(that: any) {
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


