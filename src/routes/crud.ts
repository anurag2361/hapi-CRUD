import { Request, ResponseToolkit } from "@hapi/hapi";
import { createUser, updateUser } from "./../controllers/validator";
import User from "./../models/User";

export let crudRoute = [
    {
        method: "GET",
        path: "/",
        options: {
            description: "Home Page",
            tags: ["api"],
        },
        handler: async (request: Request, response: ResponseToolkit) => {
            return "Hello";
        },
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
                payload: createUser,
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                },
            },
        },
        handler: async (request: Request, response: ResponseToolkit) => {
            try {
                const newUser = new User(request.payload);
                const result = await newUser.save();
                return response.response(result);
            } catch (error) {
                throw error;
            }
        },
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
        handler: async (request: Request, response: ResponseToolkit) => {
            try {
                const user = await User.findById(request.params.id);
                return user;
            } catch (error) {
                throw error;
            }
        },
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
                payload: updateUser,
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                },
            },
        },
        handler: async (request: Request, response: ResponseToolkit) => {
            try {
                const update = request.payload;
                const userupdate = await User.findByIdAndUpdate(request.params.id, update, { new: true });
                return userupdate;
            } catch (error) {
                throw error;
            }
        },
    },
];
