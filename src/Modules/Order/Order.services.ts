import { OrderModel } from "../../DB/MongoDB/Order/Order.js";

export const OrderService = {
    async getAllOrders() {
        const orders = await OrderModel.find().populate("shopDetails");
        return orders.map((item: any) => ({
            id: item._id,
            userId: item.userId,
            shopDetails: item.shopDetails,
            orderNumber: item.orderNumber,
            items: item.items,
            subTotal: item.subTotal,
            deliveryCharge: item.deliveryCharge,
            totalAmount: item.totalAmount,
            status: item.status,
            paymentStatus: item.paymentStatus,
            paymentMethod: item.paymentMethod,
            deliveryAddress: item.deliveryAddress,
            notes: item.notes,
            image: item.image,
            couponCode: item.couponCode,
            isCouponApplied: item.isCouponApplied,
            deliveryPartner: item.deliveryPartner,
            createdAt: item.createdAt?.toString(),
            updatedAt: item.updatedAt?.toString(),
        }));
    },

    async getOrder(search?: string) {
        return OrderService.getAllOrders();
    },

    async getOrderById(id: string) {
        const item: any = await OrderModel.findById(id).populate("shopDetails");
        if (!item) {
            throw new Error("Order not found");
        }
        return {
            id: item._id,
            userId: item.userId,
            shopDetails: item.shopDetails,
            orderNumber: item.orderNumber,
            items: item.items,
            subTotal: item.subTotal,
            deliveryCharge: item.deliveryCharge,
            totalAmount: item.totalAmount,
            status: item.status,
            paymentStatus: item.paymentStatus,
            paymentMethod: item.paymentMethod,
            deliveryAddress: item.deliveryAddress,
            notes: item.notes,
            image: item.image,
            couponCode: item.couponCode,
            isCouponApplied: item.isCouponApplied,
            deliveryPartner: item.deliveryPartner,
            createdAt: item.createdAt?.toString(),
            updatedAt: item.updatedAt?.toString(),
        };
    },

    async placeOrder(input: any) {
        const exist = await OrderModel.findOne({ orderNumber: input.orderNumber });
        if (exist) {
            throw new Error("Order already exists with this orderNumber");
        }

        const newOrder: any = await OrderModel.create(input);

        return {
            id: newOrder._id,
            userId: newOrder.userId,
            shopDetails: newOrder.shopDetails,
            orderNumber: newOrder.orderNumber,
            items: newOrder.items,
            subTotal: newOrder.subTotal,
            deliveryCharge: newOrder.deliveryCharge,
            totalAmount: newOrder.totalAmount,
            status: newOrder.status,
            paymentStatus: newOrder.paymentStatus,
            paymentMethod: newOrder.paymentMethod,
            deliveryAddress: newOrder.deliveryAddress,
            notes: newOrder.notes,
            image: newOrder.image,
            couponCode: newOrder.couponCode,
            isCouponApplied: newOrder.isCouponApplied,
            deliveryPartner: newOrder.deliveryPartner,
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
