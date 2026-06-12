import { cartModel } from "../../DB/MongoDB/Cart/Cart.js";
import { productModel } from "../../DB/MongoDB/Product/Product.js";

const populateCartItems = async (items: any[]) => {
    const populated = [];
    for (let item of items) {
        const product = await productModel.findById(item.productId);
        if (product) {
            populated.push({
                productId: item.productId,
                productName: product.productName,
                productImage: product.productImage,
                productMrp: product.productMrp,
                productDiscount: product.productDiscount,
                productSize: product.productSize,
                productGender: product.productGender,
                productPrice: product.productPrice,
                productStock: product.productStock,
                productCategory: product.productCategory,
                quantity: item.quantity,
                subtotal: product.productPrice * item.quantity
            });
        }
    }
    return populated;
};

export const CartService = {

    async getAllCarts() {
        const carts = await cartModel.find();
        return Promise.all(carts.map(async cart => ({
            id: cart._id,
            userId: cart.userId,
            items: await populateCartItems(cart.items),
            createdAt: cart.createdAt?.toString(),
            updatedAt: cart.updatedAt?.toString()
        })));
    },

    async getCartByUserId(userId: string) {
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = await cartModel.create({ userId, items: [] });
        }
        return {
            id: cart._id,
            userId: cart.userId,
            items: await populateCartItems(cart.items),
            createdAt: cart.createdAt?.toString(),
            updatedAt: cart.updatedAt?.toString()
        };
    },

    async addToCart(userId: string, productId: string, quantity: number) {
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = await cartModel.create({ userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
        
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex]!.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();

        return {
            id: cart._id,
            userId: cart.userId,
            items: await populateCartItems(cart.items),
            createdAt: cart.createdAt?.toString(),
            updatedAt: cart.updatedAt?.toString()
        };
    },

    async removeFromCart(userId: string, productId: string) {
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            throw new Error("Cart not found");
        }

        cart.items = cart.items.filter(item => item.productId !== productId);
        await cart.save();

        return {
            id: cart._id,
            userId: cart.userId,
            items: await populateCartItems(cart.items),
            createdAt: cart.createdAt?.toString(),
            updatedAt: cart.updatedAt?.toString()
        };
    },

    async clearCart(userId: string) {
        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            throw new Error("Cart not found");
        }
        cart.items = [];
        await cart.save();
        return "Cart cleared successfully";
    }
};
