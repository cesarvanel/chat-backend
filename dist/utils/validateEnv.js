"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validateEnv = () => {
    (0, envalid_1.cleanEnv)(process.env, {
        NODE_ENV: (0, envalid_1.str)({
            choices: ['developement', 'production']
        }),
        MONGO_USER: (0, envalid_1.str)(),
        MONGO_PASSWORD: (0, envalid_1.str)(),
        MONGO_CLUSTER: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)({ default: 4500 })
    });
};
exports.default = validateEnv;
