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
exports.authServices = void 0;
// @ts-nocheck
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const createUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if ((payload === null || payload === void 0 ? void 0 : payload.password.length) < 6) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Password must be greater then 6 charecters !");
    }
    const isUserAlreadyExist = yield user_model_1.userModel.findOne({ $or: [{ email: payload === null || payload === void 0 ? void 0 : payload.email }, { phone: payload === null || payload === void 0 ? void 0 : payload.phone }] });
    if (isUserAlreadyExist) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "User already exist !");
    }
    const result = yield user_model_1.userModel.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Something went wrong during register user !");
    }
    const accessToken = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, result), { password: "" }), config_1.default.jwtAccessSecret, { expiresIn: '10d' });
    const refreshToken = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, result), { password: "" }), config_1.default.jwtAccessSecret, { expiresIn: '365d' });
    return { result, accessToken, refreshToken };
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone, password } = payload;
    if ((payload === null || payload === void 0 ? void 0 : payload.password.length) < 6) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Password must be greater then 6 charecters !");
    }
    const isUserExist = yield user_model_1.userModel.findOne({ $or: [{ email: phone }, { phone }] }).select("+password");
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found !");
    }
    if (!isUserExist.isActive) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "This user is deactivated !");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Password isn't match !");
    }
    const user = {
        _id: isUserExist._id,
        name: isUserExist.name,
        email: isUserExist.email,
        phone: isUserExist.phone,
        address: isUserExist.address,
        image: isUserExist.image,
        role: isUserExist.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, isUserExist), { password: "" }), config_1.default.jwtAccessSecret, { expiresIn: '10d' });
    const refreshToken = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, isUserExist), { password: "" }), config_1.default.jwtAccessSecret, { expiresIn: '365d' });
    return { user, accessToken, refreshToken };
});
const updatePasswordIntoDb = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userData = yield user_model_1.userModel.findById((_a = user === null || user === void 0 ? void 0 : user._doc) === null || _a === void 0 ? void 0 : _a._id).select("+password");
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.currentPassword, userData === null || userData === void 0 ? void 0 : userData.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Old password isn't match !");
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.newPassword, Number(config_1.default.bcryptSaltRounds));
    const result = yield user_model_1.userModel.findByIdAndUpdate(userData === null || userData === void 0 ? void 0 : userData._id, { password: newHashedPassword }, { new: true }).select("-password");
    return result;
});
exports.authServices = {
    login,
    createUserIntoDb,
    updatePasswordIntoDb,
};
