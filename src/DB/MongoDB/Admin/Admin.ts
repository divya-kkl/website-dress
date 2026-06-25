import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
    username: string;
    email: string;
    password?: string;
    mobile: string;
    gender: string;
    role: string;
    createdTime?: Date;
}

const AdminSchema = new Schema<IAdmin>({
    username: {
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
    mobile: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    },
    createdTime: {
        type: Date,
        default: Date.now
    }
});

export const adminModel = mongoose.model<IAdmin>("Admin", AdminSchema);
