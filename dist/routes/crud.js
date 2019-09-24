"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("./../controllers/validator");
const User_1 = __importDefault(require("./../models/User"));
exports.crudRoute = [
    {
        method: "GET",
        path: "/",
        options: {
            description: "Home Page",
            tags: ["api"],
        },
        handler: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
            return "Hello";
        }),
    },
    {
        method: "POST",
        path: "/user",
        options: {
            description: "Create User",
            plugins: {
                "hapi-swagger": {
                    responses: {
                        200: {
                            description: "User found.",
                        },
                        401: {
                            description: "Please login.",
                        },
                    },
                },
            },
            tags: ["api"],
            validate: {
                payload: validator_1.createUser,
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                },
            },
        },
        handler: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const newUser = new User_1.default(request.payload);
                const result = yield newUser.save();
                return response.response(result);
            }
            catch (error) {
                throw error;
            }
        }),
    },
    {
        method: "GET",
        path: "/user/{id}",
        options: {
            description: "Read User",
            plugins: {
                "hapi-swagger": {
                    responses: {
                        200: {
                            description: "User found.",
                        },
                        500: {
                            description: "User not found",
                        },
                    },
                },
            },
            tags: ["api"],
            validate: {},
        },
        handler: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findById(request.params.id);
                return user;
            }
            catch (error) {
                throw error;
            }
        }),
    },
    {
        method: "POST",
        path: "/user/{id}/update",
        options: {
            description: "Update User",
            plugins: {
                "hapi-swagger": {
                    responses: {
                        200: {
                            description: "User updated.",
                        },
                        401: {
                            description: "Please login.",
                        },
                    },
                },
            },
            tags: ["api"],
            validate: {
                payload: validator_1.updateUser,
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                },
            },
        },
        handler: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const update = request.payload;
                const userupdate = yield User_1.default.findByIdAndUpdate(request.params.id, update, { new: true });
                return userupdate;
            }
            catch (error) {
                throw error;
            }
        }),
    },
];
//# sourceMappingURL=crud.js.map