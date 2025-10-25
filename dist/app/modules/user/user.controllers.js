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
exports.userControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_services_1 = require("./user.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const getMyData = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.userServices.getMyDataFromDb(req.user);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "User data retrived successfully !" });
    }
}));
const updateProfile = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = yield user_services_1.userServices.updateProfileIntoDb((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._doc) === null || _b === void 0 ? void 0 : _b._id, req.body);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "User profile are updated successfully !" });
    }
}));
const getAllUsers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.userServices.getAllUsersFromDb();
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "All user data are retrived !" });
    }
}));
exports.userControllers = {
    getMyData,
    getAllUsers,
    updateProfile,
};
