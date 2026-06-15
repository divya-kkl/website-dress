import mongoose ,{ Schema, Document, } from "mongoose";

export interface IProductCategories extends Document {
    name: string;
    code: string;
    description?: string;
    imageUrl?: string;
    status: "ACTIVE" | "INACTIVE";
    createdTime: Date;
}

const productCategorySchema = new Schema<IProductCategories>(
    {
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
        description: {
            type: String
        },
        imageUrl: {
            type: String
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE"
        },
        createdTime: {
            type: Date,
            default: Date.now,

        },
        
},
)

export const productCategoryMOdel = mongoose.model<IProductCategories>("ProductCategories",productCategorySchema);
