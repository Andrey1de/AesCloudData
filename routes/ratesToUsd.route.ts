import { Request, Response } from 'express';
import Router from "express-promise-router";

import Log   from '../common/logger';
import { RateToUsd } from '../models/RateToUsd.model';
import { Server}   from '../services/rateToUsd.service';
import * as S from '../common/StatusCodes';

const MAX_WAIT_MS = 1000 * 3600 * 6; //6 hours
const router = Router();
export default router;												    

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


const MapRates: Map<string, RateToUsd> = new Map<string, RateToUsd>();
async function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
//First read of Rates
(async () => {

	//await delay(500);
	try {
		Log.info(`==>Begin retrieving info from RateToUsd table`);
		const list = await Server.List();
		list.forEach(p => MapRates.set(p.code, p));
		Log.info(`==>End retrieving info from RateToUsd table : \n `
			+ JSON.stringify(list, null, 2));

	} catch (e) {
	   Log.error(e)
	}
	
	//TBD fill the hash
	//let arr: Rate[] =  Mock.init(RATE_DB_DIR,RATE_DB_PATH, [RateUsd]);
	//MapRates.set(RateUsd.code, RateUsd);
	//arr?.forEach(rate => MapRates.set(rate.code, rate));
})();

function getCode(req: Request, res: Response): string | undefined {
	const code = ('' + (req?.params?.code || req?.query?.code)).
		toUpperCase().substr(0, 3);
	if (code.length < 3) {
		let msg = 'Parameter code has bad format:' + code;
		Log.warn(msg)
		res.status(S.BAD_REQUEST).send(msg).end();
		return undefined;
	}
	return code;
}

//ALL
router.get(`/`, async (req: Request, res: Response) => {
	res.status(S.OK).json({ data: [...MapRates.values()] }).end();
});

//GET/:code
router.get(`/get/:code`, async (req: Request, res: Response)=> {
	try {
		const code = getCode(req, res);
		if (!code)
			return;
		let that: RateToUsd | undefined = MapRates.get(code);
		if (!!that && new Date().getTime() - that.last_refreshed.getTime() < MAX_WAIT_MS) {
			res.status(S.OK).json({ data: that, status: S.OK, message: "OK" }).end();
			return;
		}
		that = await Server.First(code);
		if (!that) {
			res.status(S.OK).json({ data: that, status: S.OK, message: "OK" }).end();
			return;
		}
		// Exists in the past  but just not found !!!!
		if (MapRates.has(code))
			MapRates.delete(code);
		res.status(S.NOT_FOUND).end();
	} catch (e) {
		Log.error(e);
		res.status(S.INTERNAL_SERVER_ERROR).send(e.message).end();

	}
	
});


 //NEW
router.post(`/`, async (req: Request, res: Response) => {
	//const code: string = getCode(req, res);
	//if (!code)
	//	return;
	try {
		let that: RateToUsd = new RateToUsd(req.body);
		const code: string = that.code;

		if (MapRates.get(code)) {
			res.status(S.CONFLICT).end();
			return;
		}

		that = await Server.Insert(that);

		if (!!that) {
			res.status(S.CREATED).json(that).end();
			return;
		}

		res.status(S.CONFLICT).end();
	} catch (e) {

		Log.error(e);
		res.status(S.INTERNAL_SERVER_ERROR).send(e.message).end();
	
	}

});
 //UPDATE
router.put(`/:code`, async (req: Request, res: Response) => {
	try {
		const code: string = getCode(req, res);
		if (!code)
			return;

		let that: RateToUsd = new RateToUsd(req.body);
		if (code != that.code) {
			res.status(S.BAD_REQUEST).end();
			return;
		}

		if (MapRates.get(code)) {
			res.status(S.CONFLICT).end();
		}

		that = await Server.Insert(that);

		if (!!that) {
			res.status(S.CREATED).json(that).end();
			return;
		}

		res.status(S.CONFLICT).end();
	} catch (e) {

		Log.error(e);
		res.status(S.INTERNAL_SERVER_ERROR).send(e.message).end();

	}
});

//DELETE
router.delete(`/:code`, async (req: Request, res: Response) => {
	try {
		const code: string = getCode(req, res);
		if (!code)
			return;
		MapRates.delete(code);

		const that = await Server.Delete(code);
		if (that) {
			res.status(S.OK).end();
		}
		else {
			res.status(S.CONFLICT).end();
		}
	} catch (e) {
		Log.error(e);
		res.status(S.INTERNAL_SERVER_ERROR).send(e.message).end();

	}
});






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