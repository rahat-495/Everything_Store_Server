"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewServices = void 0;
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const order_model_1 = require("../order/order.model");
const products_model_1 = require("../products/products.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const review_model_1 = require("./review.model");
const createReviewIntoDb = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isProductExist = yield products_model_1.productsModel.findById(payload === null || payload === void 0 ? void 0 : payload.productId);
    if (!isProductExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Product not found !");
    }
    const isOrderExist = yield order_model_1.ordersModel.findById(payload === null || payload === void 0 ? void 0 : payload.orderId);
    if (!isOrderExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Order not found !");
    }
    const result = yield review_model_1.reviewsModel.create(Object.assign(Object.assign({}, payload), { userId: (_a = user === null || user === void 0 ? void 0 : user._doc) === null || _a === void 0 ? void 0 : _a._id }));
    return result;
});
const getMyAllReviewsFromDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield review_model_1.reviewsModel.find({ userId: (_a = user === null || user === void 0 ? void 0 : user._doc) === null || _a === void 0 ? void 0 : _a._id });
    return result;
});
const getMySingleReviewFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.reviewsModel.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Review not found !");
    }
    return result;
});
const getAllReviewsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.reviewsModel.find();
    return result;
});
const getMyOrderReviewFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isOrderExist = yield order_model_1.ordersModel.findById(id);
    if (!isOrderExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Order not found !");
    }
    const result = yield review_model_1.reviewsModel.findOne({ orderId: isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist._id, productId: isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.product, userId: isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.userId });
    return result;
});
const updateMyReviewIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isReviewExist = yield review_model_1.reviewsModel.findById(id);
    if (!isReviewExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Review not found !");
    }
    const result = yield review_model_1.reviewsModel.findByIdAndUpdate(id, { rating: payload === null || payload === void 0 ? void 0 : payload.rating, review: payload === null || payload === void 0 ? void 0 : payload.review, images: payload === null || payload === void 0 ? void 0 : payload.images }, { new: true });
    return result;
});
exports.reviewServices = {
    createReviewIntoDb,
    getAllReviewsFromDb,
    updateMyReviewIntoDb,
    getMyAllReviewsFromDb,
    getMyOrderReviewFromDb,
    getMySingleReviewFromDb,
};
