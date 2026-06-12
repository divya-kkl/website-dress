import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    productName: string,
    productImage: string,
    productMrp: number,
    productDiscount: number,
    productSize: number,
    productGender: string,
    productPrice: number,
    productStock: number,
    productCategory: string,
    createdAt?: Date,
}

const ProductSchema = new Schema<IProduct>({
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productMrp: {
        type: Number,
        required: true
    },
    productDiscount: {
        type: Number,
        default: 0
    },
    productSize: {
        type: Number,
        required: true
    },
    productGender: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productStock: {
        type: Number,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const productModel = mongoose.model<IProduct>("Product", ProductSchema);