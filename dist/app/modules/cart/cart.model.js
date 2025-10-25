"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartsModel = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    amount: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.cartsModel = (0, mongoose_1.model)('cart', cartSchema);
