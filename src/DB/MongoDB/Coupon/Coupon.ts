import mongoose, { Schema, Document } from "mongoose";

export interface ICoupon extends Document {
    name: string;
    code: string;
    expireDate: Date;
    type: "PERCENTAGE" | "FLAT";
    value: number;
    isActive: boolean;
    minimumUses: number;
    usesCount: number;
}

const CouponSchema = new Schema<ICoupon>({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    expireDate: { type: Date, required: true },
    type: { type: String, enum: ["PERCENTAGE", "FLAT"], required: true },
    value: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    minimumUses: { type: Number, default: 0 },
    usesCount: { type: Number, default: 0 }
}, {
    timestamps: true
});

export const couponModel = mongoose.model<ICoupon>("Coupon", CouponSchema);
