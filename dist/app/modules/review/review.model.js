"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsModel = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    images: {
        type: [String],
    },
    rating: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5],
    },
    review: {
        type: String,
        required: true,
    },
    orderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'order',
        required: true,
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
});
exports.reviewsModel = (0, mongoose_1.model)('review', reviewSchema);
