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
exports.cartServices = void 0;
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const products_model_1 = require("../products/products.model");
const cart_model_1 = require("./cart.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getMyAllCartsFromDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield cart_model_1.cartsModel.find({ userId: (_a = user === null || user === void 0 ? void 0 : user._doc) === null || _a === void 0 ? void 0 : _a._id }).populate("productId").sort({ createdAt: -1 });
    return result;
});
const getSingleCartFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.cartsModel.findById(id).populate("productId");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Cart not found !");
    }
    return result;
});
const createCartIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_model_1.productsModel.findById(payload === null || payload === void 0 ? void 0 : payload.productId);
    if (Number(product === null || product === void 0 ? void 0 : product.quantity) >= Number(payload === null || payload === void 0 ? void 0 : payload.amount)) {
        const result = yield cart_model_1.cartsModel.create(payload);
        return result;
    }
    else {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, `Only ${product === null || product === void 0 ? void 0 : product.quantity} items are available in stock!`);
    }
});
const updateCartIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCartExist = yield cart_model_1.cartsModel.findById(id);
    const product = yield products_model_1.productsModel.findById(isCartExist === null || isCartExist === void 0 ? void 0 : isCartExist.productId);
    if (!isCartExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Cart not found !");
    }
    if (Number(product === null || product === void 0 ? void 0 : product.quantity) >= Number(payload === null || payload === void 0 ? void 0 : payload.amount)) {
        const result = yield cart_model_1.cartsModel.findByIdAndUpdate(id, payload, { new: true });
        return result;
    }
    else {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, `Only ${product === null || product === void 0 ? void 0 : product.quantity} items are available in stock!`);
    }
});
const deleteCartIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isCartExist = yield cart_model_1.cartsModel.findById(id);
    if (!isCartExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Cart not found !");
    }
    const result = yield cart_model_1.cartsModel.findByIdAndDelete(id);
    return result;
});
exports.cartServices = {
    createCartIntoDb,
    updateCartIntoDb,
    deleteCartIntoDb,
    getSingleCartFromDb,
    getMyAllCartsFromDb,
};
