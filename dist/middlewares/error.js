"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).send({
        message: err.errorMessage || 'Unhandled error occurred.',
    });
};
exports.default = ErrorHandler;
