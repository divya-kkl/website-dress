import { OrderService } from "./Order.services.js";

export const OrderResolver = {
    Query: {
        getAllOrders: async (_: any, __: any, context: any) => {
            return OrderService.getAllOrders();
        },
        getOrderById: async (_: any, { id }: any, context: any) => {
            return OrderService.getOrderById(id);
        }
    },
    Mutation: {
        placeOrder: async (_: any, { input }: any, context: any) => {
            return OrderService.placeOrder(input);
        },
        deleteOrder: async (_: any, { id }: any, context: any) => {
            return OrderService.deleteOrder(id);
        }
    }
};
