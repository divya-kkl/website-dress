import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrderItem {
    productId: Types.ObjectId,
    quantity: number,
    price: number,
    mrp: number,
    name: string,
    image: string,
    size: string
}

export interface IOrder extends Document {
    userId: Types.ObjectId,
    shopId: Types.ObjectId,
    orderItems: IOrderItem[],
    orderNumber: string,
    subTotal: number,
}

const OrderItemSchema = new Schema<IOrderItem>({
    productId:
    {
        type: Schema.Types.ObjectId,
        required: true
    },
    quantity:
    {
        type: Number,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    mrp:
    {
        type: Number,
        required: true
    },
    name:
    {
        type: String,
        required: true
    },
    image:
    {
        type: String,
        required: true
    },
    size:
    {
        type: String,
        required: true
    }
}, { _id: false });

const OrderSchema = new Schema<IOrder>({
    userId:
    {
        type: Schema.Types.ObjectId,
        required: true
    },
    shopId:
    {
        type: Schema.Types.ObjectId,
        required: true
    },
    orderItems:
    {
        type: [OrderItemSchema],
        required: true
    },
    orderNumber:
    {
        type: String,
        required: true
    },
    subTotal:
    {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);