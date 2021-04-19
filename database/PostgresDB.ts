import { Pool, QueryResult, QueryResultRow } from 'pg';
import * as dotenv from 'dotenv';
import Log from '../common/logger';

if (!process.env.ENV_OPENED) {
	dotenv.config();
}

var IS_HEROKU = (process.env.IS_HEROKU || 'false').toLowerCase() == 'true';
var DATABASE_URL_LOCAL = process.env.DATABASE_URL_LOCAL || '';
var  DATABASE_URL : string = (IS_HEROKU) ? process.env.DATABASE_URL : DATABASE_URL_LOCAL;
process.env.DATABASE_URL = DATABASE_URL;

class PostgressPool {
	readonly pool : Pool
	constructor() {
		this.pool = new	Pool({
			connectionString :  DATABASE_URL
		})
		this.pool.on('connect', () => {
			Log.info('Data Base connected OK :!' + DATABASE_URL);
		});
	}

	async query<T = any>(que: string, params: any[] = []): Promise<QueryResult<T>> {
		if (params.length <= 0) {
			const ret = await this.pool.query<T>(que);
			return ret;

		} else {
			const ret = await this.pool.query<T>(que, params);
			return ret;

		}
		
	}

	


}

export const Srv = new PostgressPool()


