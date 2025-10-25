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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const getMyDataFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = yield user_model_1.userModel.findOne({ $or: [{ email: (_a = query === null || query === void 0 ? void 0 : query._doc) === null || _a === void 0 ? void 0 : _a.email }, { phone: (_b = query === null || query === void 0 ? void 0 : query._doc) === null || _b === void 0 ? void 0 : _b.phone }] }).select("-password");
    return result;
});
const updateProfileIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findByIdAndUpdate(id, payload, { new: true }).select("-password");
    return result;
});
const getAllUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.find();
    return result;
});
exports.userServices = {
    getMyDataFromDb,
    getAllUsersFromDb,
    updateProfileIntoDb,
};
