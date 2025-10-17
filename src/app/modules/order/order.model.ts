
import { Schema, model } from "mongoose";
import { TOrder } from "./order.interfaces";

const orderSchema = new Schema<TOrder>({
    paidStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
    transactionId: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Canceled",
        "Returned",
        "Refunded",
      ],
      default: "Pending",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    deliveryDate: {
      type: String,
      required: true,
    },
    cancelReason: {
      type: String,
    },
    refundAmount: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      enum: ["CashOnDelivery", "Bkash", "Nagat"],
      required: true,
    },
},{
    timestamps: true,
});

export const OrderModel = model<TOrder>("Order", orderSchema);

