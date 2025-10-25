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
exports.orderControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const order_services_1 = require("./order.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createOrder = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.orderServices.createOrderIntoDb(req.body);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Order created successfull !" });
    }
}));
const getAllOrders = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.orderServices.getAllOrdersFromDb();
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "All orders are retrived successfull !" });
    }
}));
const getMyAllOrders = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.orderServices.getMyAllOrdersFromDb(req.user);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "All orders are retrived successfull !" });
    }
}));
const getSingleOrder = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield order_services_1.orderServices.getSingleOrderFromDb((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Orders are retrived successfull !" });
    }
}));
const updateOrderStatus = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield order_services_1.orderServices.updateOrderStatusIntoDb((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, req.body);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Order status updated successfull !" });
    }
}));
const cancelOrder = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield order_services_1.orderServices.cancelOrderIntoDb((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Order canceled successfull !" });
    }
}));
const getMyHistory = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.orderServices.getMyHistoryFromDb(req === null || req === void 0 ? void 0 : req.user);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "History are retrived successfull !" });
    }
}));
exports.orderControllers = {
    cancelOrder,
    createOrder,
    getMyHistory,
    getAllOrders,
    getMyAllOrders,
    getSingleOrder,
    updateOrderStatus,
};
