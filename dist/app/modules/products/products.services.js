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
exports.productServices = void 0;
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const products_model_1 = require("./products.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getAllProductsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(query === null || query === void 0 ? void 0 : query.page) || 1;
    const limit = Number(query === null || query === void 0 ? void 0 : query.limit) || 24;
    const skip = (page - 1) * limit;
    if ((query === null || query === void 0 ? void 0 : query.minPrice) === '0' && (query === null || query === void 0 ? void 0 : query.maxPrice) === '0') {
        query.minPrice = null;
        query.maxPrice = null;
    }
    const filter = {};
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        filter.$or = [
            { title: { $regex: query.searchTerm, $options: "i" } },
            { description: { $regex: query.searchTerm, $options: "i" } },
        ];
    }
    if (query === null || query === void 0 ? void 0 : query.category) {
        filter.category = query === null || query === void 0 ? void 0 : query.category;
    }
    if ((query === null || query === void 0 ? void 0 : query.isAvailable) === "yes") {
        filter.inStock = true;
    }
    else if ((query === null || query === void 0 ? void 0 : query.isAvailable) === "no") {
        filter.inStock = false;
    }
    if ((query === null || query === void 0 ? void 0 : query.minPrice) && (query === null || query === void 0 ? void 0 : query.maxPrice)) {
        filter.price = {
            $gte: query === null || query === void 0 ? void 0 : query.minPrice,
            $lte: query === null || query === void 0 ? void 0 : query.maxPrice,
        };
    }
    else if (query === null || query === void 0 ? void 0 : query.minPrice) {
        filter.price = { $gte: query === null || query === void 0 ? void 0 : query.minPrice };
    }
    else if (query === null || query === void 0 ? void 0 : query.maxPrice) {
        filter.price = { $lte: query === null || query === void 0 ? void 0 : query.maxPrice };
    }
    const total = yield products_model_1.productsModel.find(filter).estimatedDocumentCount();
    const result = yield products_model_1.productsModel.find(filter).skip(skip).limit(limit);
    const totalPage = Math.ceil(total / limit);
    return { result, meta: { limit, page, total, totalPage } };
});
const getSingleProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.productsModel.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Product not found !");
    }
    return result;
});
const createProductIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.productsModel.create(payload);
    return result;
});
const updateProductIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExist = yield products_model_1.productsModel.findById(id);
    if (!isProductExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Product not found !");
    }
    const result = yield products_model_1.productsModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExist = yield products_model_1.productsModel.findById(id);
    if (!isProductExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Product not found !");
    }
    const result = yield products_model_1.productsModel.findByIdAndDelete(id);
    return result;
});
exports.productServices = {
    createProductIntoDb,
    updateProductIntoDb,
    deleteProductFromDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
};
