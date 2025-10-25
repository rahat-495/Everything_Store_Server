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
exports.orderServices = void 0;
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const products_model_1 = require("../products/products.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const order_model_1 = require("./order.model");
const cart_model_1 = require("../cart/cart.model");
const createOrderIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExist = yield products_model_1.productsModel.findById(payload === null || payload === void 0 ? void 0 : payload.product);
    if (!isProductExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Product not found !");
    }
    const isCartExist = yield cart_model_1.cartsModel.findOne({ userId: payload === null || payload === void 0 ? void 0 : payload.userId, productId: payload === null || payload === void 0 ? void 0 : payload.product });
    if (isCartExist) {
        yield cart_model_1.cartsModel.findByIdAndDelete(isCartExist === null || isCartExist === void 0 ? void 0 : isCartExist._id);
    }
    if (Number(isProductExist === null || isProductExist === void 0 ? void 0 : isProductExist.quantity) >= Number(payload === null || payload === void 0 ? void 0 : payload.quantity)) {
        const result = yield order_model_1.ordersModel.create(Object.assign(Object.assign({}, payload), { totalPrice: (payload === null || payload === void 0 ? void 0 : payload.quantity) * (isProductExist === null || isProductExist === void 0 ? void 0 : isProductExist.price) + (isProductExist === null || isProductExist === void 0 ? void 0 : isProductExist.deliveryFee) }));
        return result;
    }
    else {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, `Only ${isProductExist === null || isProductExist === void 0 ? void 0 : isProductExist.quantity} items are available in stock!`);
    }
});
const getAllOrdersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.ordersModel.find().populate("product").populate("userId");
    return result;
});
const getMyAllOrdersFromDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield order_model_1.ordersModel.find({ userId: (_a = user === null || user === void 0 ? void 0 : user._doc) === null || _a === void 0 ? void 0 : _a._id, status: { $ne: "Delivered" }, isCancel: false }).populate("product").populate("userId");
    return result;
});
const getSingleOrderFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.ordersModel.findById(id).populate("product").populate("userId");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Order not found !");
    }
    return result;
});
const updateOrderStatusIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isOrderExist = yield order_model_1.ordersModel.findById(id);
    if (!isOrderExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Order not found !");
    }
    if (isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.isCancel) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "User already cancel the order !");
    }
    const updatedStatus = { status: payload === null || payload === void 0 ? void 0 : payload.status, cancelReason: payload === null || payload === void 0 ? void 0 : payload.cancelReason, paidStatus: false };
    if ((payload === null || payload === void 0 ? void 0 : payload.status) === "Delivered") {
        updatedStatus.paidStatus = true;
    }
    const result = yield order_model_1.ordersModel.findByIdAndUpdate(id, updatedStatus, { new: true });
    return result;
});
const cancelOrderIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isOrderExist = yield order_model_1.ordersModel.findById(id);
    if (!isOrderExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Order not found !");
    }
    if ((isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.status) === "Shipped" ||
        (isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.status) === "Out for Delivery" ||
        (isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.status) === "Delivered" ||
        (isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.status) === "Canceled" ||
        (isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.status) === "Refunded" ||
        (isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.status) === "Returned") {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, `Order is already ${isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.status}!`);
    }
    if ((isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.status) === "Pending" || (isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.status) === "Processing") {
        if (isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.isCancel) {
            throw new AppError_1.default(http_status_codes_1.default.CONFLICT, `Order is already cancled!`);
        }
        const result = yield order_model_1.ordersModel.findByIdAndUpdate(id, { isCancel: true }, { new: true });
        return result;
    }
});
const getMyHistoryFromDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield order_model_1.ordersModel.find({ userId: (_a = user === null || user === void 0 ? void 0 : user._doc) === null || _a === void 0 ? void 0 : _a._id, $or: [{ status: "Delivered" }, { isCancel: true }] }).populate("product").populate("userId");
    return result;
});
exports.orderServices = {
    cancelOrderIntoDb,
    createOrderIntoDb,
    getAllOrdersFromDb,
    getMyHistoryFromDb,
    getMyAllOrdersFromDb,
    getSingleOrderFromDb,
    updateOrderStatusIntoDb,
};
