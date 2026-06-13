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
        createOrder: async (_: any, { input }: any, context: any) => {
            return OrderService.createOrder(input);
        },
        deleteOrder: async (_: any, { id }: any, context: any) => {
            return OrderService.deleteOrder(id);
        }
    }
};
