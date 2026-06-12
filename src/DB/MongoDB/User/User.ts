import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username?: string,
    email?: string,
    password?: string,
    country: string,
    address: string,
    city: string,
    state: string,
    phone_number: string,
    pincode: string,
    createdTime: Date;
    gender: string;
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHER"]
    },
    country: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    phone_number: {
        type: String
    },
    pincode: {
        type: String
    },
    createdTime: {
        type: Date,
        default: Date.now()
    }
}
);

export const userModel = mongoose.model<IUser>("User", UserSchema);
