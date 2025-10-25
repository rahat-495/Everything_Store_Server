"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    paidStatus: {
        type: Boolean,
        required: true,
        default: false,
    },
    isCancel: {
        type: Boolean,
        default: false,
    },
    transactionId: {
        type: String,
        default: "",
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "product",
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    userEmail: {
        type: String,
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
    totalPrice: {
        type: Number,
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
}, {
    timestamps: true,
});
orderSchema.pre("save", function (next) {
    if (!this.transactionId) {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const milliseconds = date.getTime();
        this.transactionId = `TXN-${year}${month}${day}-${milliseconds}`;
    }
    next();
});
exports.ordersModel = (0, mongoose_1.model)("Order", orderSchema);
