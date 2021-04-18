/*
 * GET users listing.
 */
import * as express from 'express';
import { Request, Response} from 'express';
const router = express.Router();
import logger from '../Common/logger';


router.get('/', (req: Request, res:Response) => {
    res.send("respond with a resource");
});

export default router;