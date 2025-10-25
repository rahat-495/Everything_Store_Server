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
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const nameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});
const userSchema = new mongoose_1.Schema({
    name: {
        type: nameSchema,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        default: "",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcryptSaltRounds));
    });
});
userSchema.post("save", function (doc, next) {
    doc.password = "",
        next();
});
userSchema.post("find", function (doc, next) {
    doc.forEach((user) => {
        user.password = "";
    });
    next();
});
exports.userModel = (0, mongoose_1.model)("user", userSchema);
