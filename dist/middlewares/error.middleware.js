"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMilleware = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Something wrong";
    res.status(status).send({ status: status, message: message });
};
exports.default = errorMilleware;
