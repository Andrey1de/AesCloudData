"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Srv = void 0;
const pg_1 = require("pg");
const dotenv = require("dotenv");
if (!process.env.ENV_OPENED) {
    dotenv.config();
}
const IS_HEROKU = (process.env.IS_HEROKU || 'false').toLowerCase() == 'true';
const DATABASE_URL_LOCAL = process.env.DATABASE_URL_LOCAL || '';
const DATABASE_URL = (IS_HEROKU) ? process.env.DATABASE_URL : DATABASE_URL_LOCAL;
process.env.DATABASE_URL = DATABASE_URL;
class PostgressPool {
    constructor() {
        this.pool = new pg_1.Pool({
            connectionString: DATABASE_URL
        });
    }
    query(que, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const ret = (params.length <= 0)
                ? yield this.pool.query(que)
                : yield this.pool.query(que, params);
            return ret;
        });
    }
}
exports.Srv = new PostgressPool();
//# sourceMappingURL=PostgresDB.js.map