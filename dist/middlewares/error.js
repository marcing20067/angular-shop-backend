"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler = (req, res, next, err) => {
    res
        .status(err.statusCode || 500)
        .send({
        message: err.errorMessage ||
            'Wystąpił nieoczekiwany błąd. Prosimy spróbować później.',
    });
};
exports.default = ErrorHandler;
