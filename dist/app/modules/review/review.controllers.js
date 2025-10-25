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
exports.reviewControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const review_services_1 = require("./review.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_services_1.reviewServices.createReviewIntoDb(req.body, req.user);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "review created successfull !" });
    }
}));
const getAllReviews = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_services_1.reviewServices.getAllReviewsFromDb();
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "All review are retrived !" });
    }
}));
const getMyAllReviews = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_services_1.reviewServices.getMyAllReviewsFromDb(req.user);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "All review are retrived !" });
    }
}));
const getMySingleReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield review_services_1.reviewServices.getMySingleReviewFromDb((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Review are retrived !" });
    }
}));
const getMyOrderReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield review_services_1.reviewServices.getMyOrderReviewFromDb((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Review are retrived !" });
    }
}));
const updateMyReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield review_services_1.reviewServices.updateMyReviewIntoDb((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, req.body);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Review are updated !" });
    }
}));
exports.reviewControllers = {
    createReview,
    getAllReviews,
    updateMyReview,
    getMyAllReviews,
    getMyOrderReview,
    getMySingleReview,
};
