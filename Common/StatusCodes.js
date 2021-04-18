"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOUR_SPAN_MS = exports.INTERNAL_SERVER_ERROR = exports.IM_A_TEAPOT = exports.CONFLICT = exports.NO_CONTENT = exports.CREATED = exports.NOT_FOUND = exports.BAD_REQUEST = exports.OK = void 0;
const http_status_codes_1 = require("http-status-codes");
exports.OK = http_status_codes_1.StatusCodes.OK;
exports.BAD_REQUEST = http_status_codes_1.StatusCodes.BAD_REQUEST;
exports.NOT_FOUND = http_status_codes_1.StatusCodes.NOT_FOUND;
exports.CREATED = http_status_codes_1.StatusCodes.CREATED;
exports.NO_CONTENT = http_status_codes_1.StatusCodes.NO_CONTENT;
exports.CONFLICT = http_status_codes_1.StatusCodes.CONFLICT;
exports.IM_A_TEAPOT = http_status_codes_1.StatusCodes.IM_A_TEAPOT;
exports.INTERNAL_SERVER_ERROR = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
//import RatesController from './rates/rate.controller';
exports.HOUR_SPAN_MS = Number(process.env.SPAN_MS) || 1000 * 3600; // one hour
//export const  RATE_DB_PATH = process.env.RATE_DB_PATH || './db/RatesDb.json';
//export const  RATE_DB_DIR = process.env.RATE_DB_DIR || './db';
//# sourceMappingURL=StatusCodes.js.map