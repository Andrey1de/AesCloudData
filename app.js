"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
//import * from 'process';
const index_1 = require("./routes/index");
const users_route_1 = require("./routes/users.route");
const env_route_1 = require("./routes/env.route");
const ratesToUsd_route_1 = require("./routes/ratesToUsd.route");
const DATABASE_URL_MOK = "postgres://jpiugjjydtcoej:7867dbb5ee52caa47a8e71c211a8fc688a99360a931ff79bc0ff53567b978349" +
    "@ec2-107-22-83-3.compute-1.amazonaws.com:5432/d59dgts7li116b";
dotenv.config();
const debug = require('debug')('my express app');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});
process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index_1.default);
app.use('/env', env_route_1.default);
app.use('/users', users_route_1.default);
app.use('/rates', ratesToUsd_route_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), function () {
    debug(`Express server listening on port ${server.address().port}`);
});
//# sourceMappingURL=app.js.map