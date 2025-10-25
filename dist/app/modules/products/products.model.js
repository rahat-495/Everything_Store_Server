"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
    },
    previousPrice: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    category: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    deliveryFee: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        bkash: { type: Boolean, default: false },
        nagat: { type: Boolean, default: false },
        CashOnDelivery: { type: Boolean, default: false },
    },
}, {
    timestamps: true,
});
exports.productsModel = (0, mongoose_1.model)("product", productSchema);
