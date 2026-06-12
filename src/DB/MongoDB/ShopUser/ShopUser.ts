import mongoose, { Schema, Document } from "mongoose";

export interface IShopUser extends Document {
    shopName: string,
    ownerName: string,
    email: string,
    password?: string,
    contactNumber: string,
    address?: string,
    gstNumber?: string,
    createdAt?: Date,
}

const ShopUserSchema = new Schema<IShopUser>({
    shopName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    gstNumber: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const shopUserModel = mongoose.model<IShopUser>("ShopUser", ShopUserSchema);
