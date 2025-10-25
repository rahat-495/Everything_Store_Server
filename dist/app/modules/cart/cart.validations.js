"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createSartValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        productId: zod_1.default.string({ "required_error": "Product id is required !" }),
        amount: zod_1.default.number({ "required_error": "Product amount is required !" }),
        email: zod_1.default.string({ "required_error": "Email is required !" }).optional(),
        phone: zod_1.default.string({ "required_error": "User phone number is required !" }),
        userId: zod_1.default.string({ "required_error": "User id is required !" }),
    })
});
const updateSartValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        productId: zod_1.default.string({ "required_error": "Product id is required !" }).optional(),
        amount: zod_1.default.number({ "required_error": "Product amount is required !" }),
        email: zod_1.default.string({ "required_error": "Email is required !" }).optional(),
        phone: zod_1.default.string({ "required_error": "User phone number is required !" }).optional(),
        userId: zod_1.default.string({ "required_error": "User id is required !" }).optional(),
    })
});
exports.cartValidations = {
    createSartValidationSchema,
    updateSartValidationSchema,
};
