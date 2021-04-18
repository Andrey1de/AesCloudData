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
const express_promise_router_1 = require("express-promise-router");
const logger_1 = require("../common/logger");
const RateToUsd_model_1 = require("../models/RateToUsd.model");
const rateToUsd_service_1 = require("../services/rateToUsd.service");
const S = require("../common/StatusCodes");
const MAX_WAIT_MS = 1000 * 3600 * 6; //6 hours
const router = express_promise_router_1.default();
exports.default = router;
/*
*  ==========  INIT MOCK DATA	==========
*/
//const RateUsdUsd: RateToUsd = {
//	code: 'USD',
//	name: 'USA Dollar',
//	rate: 1.0,
//	bid: 1.0,
//	ask: 1.0,
//	last_refreshed: new Date(),
//	stored: new Date()
//};
const MapRates = new Map();
function delay(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
//First read of Rates
(() => __awaiter(void 0, void 0, void 0, function* () {
    //await delay(500);
    try {
        logger_1.default.info(`==>Begin retrieving info from RateToUsd table`);
        const list = yield rateToUsd_service_1.Server.List();
        list.forEach(p => MapRates.set(p.code, p));
        logger_1.default.info(`==>End retrieving info from RateToUsd table : \n `
            + JSON.stringify(list, null, 2));
    }
    catch (e) {
        logger_1.default.error(e);
    }
    //TBD fill the hash
    //let arr: Rate[] =  Mock.init(RATE_DB_DIR,RATE_DB_PATH, [RateUsd]);
    //MapRates.set(RateUsd.code, RateUsd);
    //arr?.forEach(rate => MapRates.set(rate.code, rate));
}))();
function getCode(req, res) {
    var _a, _b;
    const code = ('' + (((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.code) || ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.code))).
        toUpperCase().substr(0, 3);
    if (code.length < 3) {
        let msg = 'Parameter code has bad format:' + code;
        logger_1.default.warn(msg);
        res.status(S.BAD_REQUEST).send(msg).end();
        return undefined;
    }
    return code;
}
//ALL
router.get(`/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(S.OK).json({ data: [...MapRates.values()] }).end();
}));
//GET/:code
router.get(`/get/:code`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = getCode(req, res);
        if (!code)
            return;
        let that = MapRates.get(code);
        if (!!that && new Date().getTime() - that.last_refreshed.getTime() < MAX_WAIT_MS) {
            res.status(S.OK).json({ data: that, status: S.OK, message: "OK" }).end();
            return;
        }
        that = yield rateToUsd_service_1.Server.First(code);
        if (!that) {
            res.status(S.OK).json({ data: that, status: S.OK, message: "OK" }).end();
            return;
        }
        // Exists in the past  but just not found !!!!
        if (MapRates.has(code))
            MapRates.delete(code);
        res.status(S.NOT_FOUND).end();
    }
    catch (e) {
        logger_1.default.error(e);
        res.status(S.INTERNAL_SERVER_ERROR).send(e.message).end();
    }
}));
//NEW
router.post(`/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const code: string = getCode(req, res);
    //if (!code)
    //	return;
    try {
        let that = new RateToUsd_model_1.RateToUsd(req.body);
        const code = that.code;
        if (MapRates.get(code)) {
            res.status(S.CONFLICT).end();
            return;
        }
        that = yield rateToUsd_service_1.Server.Insert(that);
        if (!!that) {
            res.status(S.CREATED).json(that).end();
            return;
        }
        res.status(S.CONFLICT).end();
    }
    catch (e) {
        logger_1.default.error(e);
        res.status(S.INTERNAL_SERVER_ERROR).send(e.message).end();
    }
}));
//UPDATE
router.put(`/:code`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = getCode(req, res);
        if (!code)
            return;
        let that = new RateToUsd_model_1.RateToUsd(req.body);
        if (code != that.code) {
            res.status(S.BAD_REQUEST).end();
            return;
        }
        if (MapRates.get(code)) {
            res.status(S.CONFLICT).end();
        }
        that = yield rateToUsd_service_1.Server.Insert(that);
        if (!!that) {
            res.status(S.CREATED).json(that).end();
            return;
        }
        res.status(S.CONFLICT).end();
    }
    catch (e) {
        logger_1.default.error(e);
        res.status(S.INTERNAL_SERVER_ERROR).send(e.message).end();
    }
}));
//DELETE
router.delete(`/:code`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = getCode(req, res);
        if (!code)
            return;
        MapRates.delete(code);
        const that = yield rateToUsd_service_1.Server.Delete(code);
        if (that) {
            res.status(S.OK).end();
        }
        else {
            res.status(S.CONFLICT).end();
        }
    }
    catch (e) {
        logger_1.default.error(e);
        res.status(S.INTERNAL_SERVER_ERROR).send(e.message).end();
    }
}));
//router.get(`/tab`, (req: Request, res: Response)=> {
//	const rates = [...MapRates.values()]
//		.sort((a, b) => a.code.localeCompare(b.code));
//	renderTable(req, res, rates);
//	return;
//
//router.get(`/sql`, (req: Request, res: Response)=> {
//	const rates = [...MapRates.values()]
//		.filter(a => a.code != 'USD')
//		.sort((a, b) => a.code.localeCompare(b.code));
//	const table = 'RateUSD';
//	let query = '';
//	rates.forEach(r => {
//		query += 'INSERT OR IGNORE INTO ' + table +
//			` (code, name,rate,bid,ask,stored,lastRefreshed)  VALUES ` + '\n'
//			+ `( "${r.code}", "${r.name}", ${r.rate}, ${r.bid}, ${r.ask}, "${r.stored}","${r.lastRefreshed}");\n`
//	});
//	logger.info(query);
//	res.status(200).send(query).end();
//	return;
//});
//router.get(`/:from/:to`, (req: Request, res: Response)=> {
//	const _from = ('' + req.params?.from).toUpperCase().substr(0, 3);
//	const _to     = ('' + req.params?.to).toUpperCase().substr(0, 3);
//	if (_from === '' || _to === '') {
//		res.status(BAD_REQUEST).end();
//		return;
//	}
//	Promise.all([
//		tryGetYahoo(_from),
//		tryGetYahoo(_to),
//	 ]).then(arr => {
//		let [iFrom, iTo] = arr;
//		if (!iFrom || !iTo) {
//			res.status(NOT_FOUND).end();
//		}
//		else if (iTo.rate ==Request 0.0) {
//			res.status(NO_CONTENT).end();
//		} else {
//			const _rate = iFrom.rate / iTo.rate;
//			const updated = Math.min(iFrom.lastRefreshed.getTime(), iTo.lastRefreshed.getTime());
//			res.json({ from:_from,to:_to, rate: _rate, updated: new Date(updated) });
//		}
//	}).catch(err => {
//		logger.error(`Get from:${_from}/to:${_to} error ${err}`)
//		res.status(IM_A_TEAPOT).end();
//	});
//});
//});
//# sourceMappingURL=ratesToUsd.route.js.map