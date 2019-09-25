import { Request, ResponseToolkit } from "@hapi/hapi";
import bcrypt from "bcrypt";
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
                            description: "User created.",
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
                const newUser: any = new User(request.payload);
                const { password } = newUser;
                const hash = await bcrypt.hash(password, 10);
                newUser.password = hash;
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
                const user: any = await User.findById(request.params.id);
                const upass = user.password;
                const update: any = request.payload;
                const { password } = update;
                const hpass = await bcrypt.compare(password, upass);
                if (hpass) {
                    const hash = await bcrypt.hash(password, 10);
                    update.password = hash;
                    const userupdate = await user.updateOne(update, { new: true });
                    return userupdate;
                } else {
                    return response.response({ message: "Can't update. Check your password" });
                }
            } catch (error) {
                throw error;
            }
        },
    },
];
