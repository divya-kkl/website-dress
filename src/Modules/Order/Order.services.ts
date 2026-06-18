import { OrderModel } from "../../DB/MongoDB/Order/Order.js";
import { cartModel } from "../../DB/MongoDB/Cart/Cart.js";
import { productModel } from "../../DB/MongoDB/Product/Product.js";

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

    async placeOrder(input: any, context: any) {
        if (!context || !context.user || !context.user.id) {
            throw new Error("Unauthorized: Please login to place an order");
        }

        const userId = context.user.id;

        // Fetch active cart
        const cart = await cartModel.findOne({ userId, status: "ACTIVE" });
        if (!cart || !cart.products || cart.products.length === 0) {
            throw new Error("Cart is empty");
        }

        let subTotal = 0;
        const items = [];

        for (const cartProduct of cart.products) {
            const product = await productModel.findById(cartProduct.productId);
            if (!product) {
                throw new Error(`Product not found for id: ${cartProduct.productId}`);
            }

            subTotal += product.price * cartProduct.quantity;
            items.push({
                productId: product._id,
                quantity: cartProduct.quantity,
                price: product.price,
                mrp: product.mrp,
                name: product.name,
                image: product.images?.[0] || "no-image-available",
                size: "Default"
            });
        }

        const totalAmount = subTotal + (input.deliveryCharge || 0);
        const orderNumber = "ORD" + Date.now().toString() + Math.floor(Math.random() * 1000).toString();

        if (input.paymentMethod === 'cashONDelivery' || input.paymentMethod === 'Cash on Delivery') {
            input.paymentMethod = 'COD';
        }

        const orderData = {
            ...input,
            userId,
            items,
            subTotal,
            totalAmount,
            orderNumber
        };

        const newOrder: any = await OrderModel.create(orderData);
        const populatedOrder: any = await OrderModel.findById(newOrder._id).populate("shopDetails");

        // Clear the cart
        cart.status = "INACTIVE";
        await cart.save();

        return {
            id: populatedOrder._id,
            userId: populatedOrder.userId,
            shopDetails: populatedOrder.shopDetails,
            orderNumber: populatedOrder.orderNumber,
            items: populatedOrder.items,
            subTotal: populatedOrder.subTotal,
            deliveryCharge: populatedOrder.deliveryCharge,
            totalAmount: populatedOrder.totalAmount,
            status: populatedOrder.status,
            paymentStatus: populatedOrder.paymentStatus,
            paymentMethod: populatedOrder.paymentMethod,
            deliveryAddress: populatedOrder.deliveryAddress,
            notes: populatedOrder.notes,
            image: populatedOrder.image,
            couponCode: populatedOrder.couponCode,
            isCouponApplied: populatedOrder.isCouponApplied,
            deliveryPartner: populatedOrder.deliveryPartner,
            createdAt: populatedOrder.createdAt?.toString(),
            updatedAt: populatedOrder.updatedAt?.toString(),
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
