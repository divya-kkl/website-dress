import { OrderModel } from "../../DB/MongoDB/Order/Order.js";

export const OrderService = {
    async getAllOrders() {
        const orders = await OrderModel.find();
        return orders.map((item: any) => ({
            id: item._id,
            userId: item.userId,
            shopId: item.shopId,
            orderItems: item.orderItems,
            orderNumber: item.orderNumber,
            subTotal: item.subTotal,
            createdAt: item.createdAt?.toString(),
            updatedAt: item.updatedAt?.toString(),
        }));
    },

    async getOrderById(id: string) {
        const item: any = await OrderModel.findById(id);
        if (!item) {
            throw new Error("Order not found");
        }
        return {
            id: item._id,
            userId: item.userId,
            shopId: item.shopId,
            orderItems: item.orderItems,
            orderNumber: item.orderNumber,
            subTotal: item.subTotal,
            createdAt: item.createdAt?.toString(),
            updatedAt: item.updatedAt?.toString(),
        };
    },

    async createOrder(input: any) {
        const { userId, shopId, orderItems, orderNumber, subTotal } = input;

        const exist = await OrderModel.findOne({ orderNumber });
        if (exist) {
            throw new Error("Order already exists with this orderNumber");
        }

        const newOrder: any = await OrderModel.create({
            userId,
            shopId,
            orderItems,
            orderNumber,
            subTotal
        });

        return {
            id: newOrder._id,
            userId: newOrder.userId,
            shopId: newOrder.shopId,
            orderItems: newOrder.orderItems,
            orderNumber: newOrder.orderNumber,
            subTotal: newOrder.subTotal,
            createdAt: newOrder.createdAt?.toString(),
            updatedAt: newOrder.updatedAt?.toString(),
        };
    },

    async deleteOrder(id: string) {
        const deletedOrder = await OrderModel.findByIdAndDelete(id);
        if (!deletedOrder) {
            throw new Error("Order not found");
        }
        return "Order deleted successfully";
    }
};
