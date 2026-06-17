import { UserService } from "./User.services.js";

export const UserResolver = {
    Query: {
        getAllUser: async (_: any, __: any, context: any) => {
            return UserService.getAllUsers(__.search);
        },
        getUserById: async (_: any, __: any, context: any) => {
            return UserService.getUserById(__.id);
        },
        getUser: async (_: any, __: any, context: any) => {
            return UserService.getAllUsers(__.search);
        }
    },
    Mutation: {
        registerUser: async (_: any, __: any, context: any) => {
            return UserService.register(__.input);
        },
        loginUser: async (_: any, __: any, context: any) => {
            return UserService.loginUser(__.input);
        },
    }
};
