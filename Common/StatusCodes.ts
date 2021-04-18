
import { AddressInfo } from "net";

import { StatusCodes } from 'http-status-codes';
import { BADQUERY, NODATA } from 'node:dns';
import { inflateRaw } from "node:zlib";
export const  OK = StatusCodes.OK;
export const  BAD_REQUEST = StatusCodes.BAD_REQUEST;
export const  NOT_FOUND = StatusCodes.NOT_FOUND;
export const  CREATED = StatusCodes.CREATED;
export const  NO_CONTENT = StatusCodes.NO_CONTENT;
export const  CONFLICT = StatusCodes.CONFLICT;
export const IM_A_TEAPOT = StatusCodes.IM_A_TEAPOT;
export const INTERNAL_SERVER_ERROR = StatusCodes.INTERNAL_SERVER_ERROR;
//import RatesController from './rates/rate.controller';
export const  HOUR_SPAN_MS = Number(process.env.SPAN_MS) || 1000 * 3600;	 // one hour
//export const  RATE_DB_PATH = process.env.RATE_DB_PATH || './db/RatesDb.json';
//export const  RATE_DB_DIR = process.env.RATE_DB_DIR || './db';
