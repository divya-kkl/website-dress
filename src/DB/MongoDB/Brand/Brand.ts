import mongoose, { Schema, Document } from "mongoose";

export interface IBrand extends Document {
    name: string;
    status: "ACTIVE" | "INACTIVE";
    createdTime: Date;
}

const brandSchema = new Schema<IBrand>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE"
        },
        createdTime: {
            type: Date,
            default: Date.now,
        }
    }
);

export const brandModel = mongoose.model<IBrand>("Brand", brandSchema);
