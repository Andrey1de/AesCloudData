"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET users listing.
 */
const express = require("express");
const router = express.Router();
router.get(`/:name`, (req, res) => {
    var _a;
    const name = '' + ((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.name);
    if (name.toLocaleLowerCase() === 'all') {
        res.json(process.env);
    }
    else {
        res.send(process.env[name]);
    }
    res.send(process.env[name]);
});
router.get('/', (req, res) => {
    res.json(process.env);
});
exports.default = router;
//# sourceMappingURL=env.route.js.map