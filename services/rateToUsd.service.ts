import { Srv} from '../database/PostgresDB'
import { RateToUsd } from '../models/rateToUsd.model';

class RateToUsdServer  {

	private  toArray(that: RateToUsd): any[] {
		return [that.code, that.name, that.rate, that.bid, that.ask,
		that.stored, that.last_refreshed];
	}

	//code, name, rate, bid, ask, stored, last_refreshed
	public async List(): Promise<RateToUsd[]>{
		let qret = await Srv.query<RateToUsd>
				('SELECT * FROM products ORDER BY code ASC');
	// res.status(200).json(qret.rows).end();
		return qret.rows;
	};

	async First(code: string): Promise<RateToUsd | undefined> {

		let qret = await Srv.query<RateToUsd>(
			`SELECT * FROM products ORDER BY code ASC 
			WHERE code=$1`, [code]);
		let that = (qret.rowCount >= 1) ? qret.rows[0] : undefined;
		return that;

	}

	// Insert returns RateToUsd on success otherwise - undefined
	async Insert(that: RateToUsd): Promise<RateToUsd | undefined> {
		// const { product_name, quantity, price } = req.body;
		const qret = await Srv.query<RateToUsd>(
			`INSERT INTO RateToUsd
			( code, name, rate, bid, ask,stored, last_refreshed)
				VALUES ($1, $2, $3, $4, $5, $6, $7)
				ON CONFLICT DO NOTHING`,
				this.toArray(that)
		);
		if (qret.rowCount >= 1)
			return qret.rows[0];
		return undefined;

	};

	// Insert returns RateToUsd on success otherwise - undefined
	  async  Update(code: string, that: RateToUsd): Promise<RateToUsd | undefined> {
		// const { product_name, quantity, price } = req.body;
		const qret = await Srv.query<RateToUsd>(
			`UPDATE RateToUsd
			SET  name=$2,
			rate=$3, 
			bid=$4, 
			ask=$5,
			stored=$6, 
			last_refreshed=$7
			WHERE code=$1;` ,
			this.toArray(that)
		);
		if (qret.rowCount >= 1) {
			return qret.rows[0];
		}

		return undefined;
	};

	  async Delete(code: string): Promise<RateToUsd | undefined> {

		let qret = await Srv.query<RateToUsd>(
			`DELETE * FROM products  
			WHERE code=$1`, [code]);
		if (qret.rowCount >= 1) {
			return qret.rows[0];
		}

		return undefined;
	};


}
export const Server: RateToUsdServer = new RateToUsdServer();
