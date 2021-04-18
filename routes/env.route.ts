/*
 * GET users listing.
 */
import express = require('express');
const router = express.Router();
router.get(`/:name`, (req, res) => {
    const name = '' + req?.params?.name;
    if (name.toLocaleLowerCase() === 'all') {
        res.json(process.env);

    } else {
        res.send(process.env[name]);

	}
    res.send(process.env[name]);
});
router.get('/', (req: express.Request, res: express.Response) => {
    res.json(process.env);
});



export default router;