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
exports.cartControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const cart_services_1 = require("./cart.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const getMyAllCarts = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_services_1.cartServices.getMyAllCartsFromDb(req.user);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Successfully retrived all carts !" });
    }
}));
const getSingleCart = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield cart_services_1.cartServices.getSingleCartFromDb((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Successfully retrived that cart !" });
    }
}));
const addToCart = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_services_1.cartServices.createCartIntoDb(req.body);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Add to cart successfull !" });
    }
}));
const updateAddToCart = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield cart_services_1.cartServices.updateCartIntoDb((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id, req.body);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Successfully updated add to cart !" });
    }
}));
const deleteAddToCart = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield cart_services_1.cartServices.deleteCartIntoDb((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Successfully deleted add to cart !" });
    }
}));
exports.cartControllers = {
    addToCart,
    getSingleCart,
    getMyAllCarts,
    updateAddToCart,
    deleteAddToCart,
};
