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
exports.Server = void 0;
const PostgresDB_1 = require("../database/PostgresDB");
class RateToUsdServer {
    toArray(that) {
        return [that.code, that.name, that.rate, that.bid, that.ask,
            that.stored, that.last_refreshed];
    }
    //code, name, rate, bid, ask, stored, last_refreshed
    List() {
        return __awaiter(this, void 0, void 0, function* () {
            let qret = yield PostgresDB_1.Srv.query('SELECT * FROM products ORDER BY code ASC');
            // res.status(200).json(qret.rows).end();
            return []; //qret.rows;
        });
    }
    ;
    First(code) {
        return __awaiter(this, void 0, void 0, function* () {
            let qret = yield PostgresDB_1.Srv.query(`SELECT * FROM products ORDER BY code ASC 
			WHERE code=$1`, [code]);
            let that = (qret.rowCount >= 1) ? qret.rows[0] : undefined;
            return that;
        });
    }
    // Insert returns RateToUsd on success otherwise - undefined
    Insert(that) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { product_name, quantity, price } = req.body;
            const qret = yield PostgresDB_1.Srv.query(`INSERT INTO RateToUsd
			( code, name, rate, bid, ask,stored, last_refreshed)
				VALUES ($1, $2, $3, $4, $5, $6, $7)
				ON CONFLICT DO NOTHING`, this.toArray(that));
            if (qret.rowCount >= 1)
                return qret.rows[0];
            return undefined;
        });
    }
    ;
    // Insert returns RateToUsd on success otherwise - undefined
    Update(code, that) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { product_name, quantity, price } = req.body;
            const qret = yield PostgresDB_1.Srv.query(`UPDATE RateToUsd
			SET  name=$2,
			rate=$3, 
			bid=$4, 
			ask=$5,
			stored=$6, 
			last_refreshed=$7
			WHERE code=$1;`, this.toArray(that));
            if (qret.rowCount >= 1) {
                return qret.rows[0];
            }
            return undefined;
        });
    }
    ;
    Delete(code) {
        return __awaiter(this, void 0, void 0, function* () {
            let qret = yield PostgresDB_1.Srv.query(`DELETE * FROM products  
			WHERE code=$1`, [code]);
            if (qret.rowCount >= 1) {
                return qret.rows[0];
            }
            return undefined;
        });
    }
    ;
}
exports.Server = new RateToUsdServer();
//# sourceMappingURL=rateToUsd.service.js.map