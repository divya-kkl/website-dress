import mongoose, { Schema, Document } from "mongoose";

export interface ITopBanner extends Document {
    message: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const TopBannerSchema = new Schema<ITopBanner>({
    message: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const TopBannerModel = mongoose.model<ITopBanner>("TopBanner", TopBannerSchema);
