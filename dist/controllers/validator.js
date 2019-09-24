"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
exports.createUser = Joi.object().keys({
    name: Joi.string().required(),
    city: Joi.string().required(),
});
exports.updateUser = Joi.object().keys({
    name: Joi.string().optional(),
    city: Joi.string().optional(),
});
//# sourceMappingURL=validator.js.map