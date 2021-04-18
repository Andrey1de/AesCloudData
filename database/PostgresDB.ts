import { Pool, QueryResult, QueryResultRow } from 'pg';
import * as dotenv from 'dotenv'

if (!process.env.ENV_OPENED) {
	dotenv.config();
}

const IS_HEROKU = (process.env.IS_HEROKU || 'false').toLowerCase() == 'true';
const DATABASE_URL_LOCAL = process.env.DATABASE_URL_LOCAL || '';
const  DATABASE_URL : string = (IS_HEROKU) ? process.env.DATABASE_URL : DATABASE_URL_LOCAL;
process.env.DATABASE_URL = DATABASE_URL;

class PostgressPool {
	readonly pool : Pool
	constructor() {
		this.pool = new	Pool({
			connectionString :  DATABASE_URL
		})
	}

	async query<T = any>(que: string, params:any [] = []): Promise<QueryResult<T>>{
		const ret = (params.length <= 0) 
			? await this.pool.query<T>(que)
			: await this.pool.query<T>(que, params);
		return ret;

	}

}

export const Srv = new PostgressPool()


