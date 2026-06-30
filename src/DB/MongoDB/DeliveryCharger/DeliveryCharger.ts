import mongoose, { Schema, Document } from "mongoose";

export interface IDeliveryCharger extends Document {
    charge: number;
    status: "ACTIVE" | "INACTIVE";
    createdTime: Date;
}

const deliveryChargerSchema = new Schema<IDeliveryCharger>(
    {
        charge: {
            type: Number,
            required: true
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

export const deliveryChargerModel = mongoose.model<IDeliveryCharger>("DeliveryCharger", deliveryChargerSchema);
