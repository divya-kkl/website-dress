import { ShopUserService } from "./ShopUser.services.js";

export const ShopUserResolver = {
    Query: {
        getAllShopUsers: async (_: any, __: any, context: any) => {
            return ShopUserService.getAllShopUsers(context.user);
        },
        getShopUserById: async (_: any, __: any, context: any) => {
            return ShopUserService.getShopUserById(__.id, context.user);
        }
    },
    Mutation: {
        registerShopUser: async (_: any, __: any, context: any) => {
            return ShopUserService.registerShopUser(__.input);
        },
        loginShopUser: async (_: any, __: any, context: any) => {
            return ShopUserService.loginShopUser(__.input);
        },
        updateShopUser: async (_: any, __: any, context: any) => {
            return ShopUserService.updateShopUser(__.id, __.input, context.user);
        },
        deleteShopUser: async (_: any, __: any, context: any) => {
            return ShopUserService.deleteShopUser(__.id, context.user);
        }
    }
};
