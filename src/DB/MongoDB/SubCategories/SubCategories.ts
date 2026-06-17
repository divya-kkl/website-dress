import mongoose, { Schema, Document } from "mongoose";

export interface ISubCategory extends Document {
    name: string;
    code: string;
    productCategoryId: mongoose.Types.ObjectId | string;
    description?: string;
    imageUrl?: string;
    status: "ACTIVE" | "INACTIVE";
    createdTime: Date;
}

const subCategorySchema = new Schema<ISubCategory>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
        uppercase: true,
    },
    productCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategories",
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE",
    },
    createdTime: {
        type: Date,
        default: Date.now,
    },
});

export const subCategoryModel = mongoose.model<ISubCategory>("SubCategories", subCategorySchema);
