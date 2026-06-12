import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem {
    productId: string;
    quantity: number;
}

export interface ICart extends Document {
    userId: string;
    items: ICartItem[];
    createdAt?: Date;
    updatedAt?: Date;
}

const CartItemSchema = new Schema<ICartItem>({
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const CartSchema = new Schema<ICart>({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    items: [CartItemSchema]
}, { timestamps: true });

export const cartModel = mongoose.model<ICart>("Cart", CartSchema);
