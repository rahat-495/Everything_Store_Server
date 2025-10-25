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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const auth = (...requiredRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (!((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.accessToken)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not Authorized!');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtAccessSecret);
        const user = yield user_model_1.userModel.findOne({ $or: [{ email: (_c = decoded === null || decoded === void 0 ? void 0 : decoded._doc) === null || _c === void 0 ? void 0 : _c.email }, { phone: (_d = decoded === null || decoded === void 0 ? void 0 : decoded._doc) === null || _d === void 0 ? void 0 : _d.phone }] });
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
        }
        const isActiveStatus = user === null || user === void 0 ? void 0 : user.isActive;
        if (isActiveStatus === false) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is deactivated !!');
        }
        if (requiredRole && !requiredRole.includes((_e = decoded === null || decoded === void 0 ? void 0 : decoded._doc) === null || _e === void 0 ? void 0 : _e.role)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not authorized');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
