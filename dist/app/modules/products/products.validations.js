"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createProductValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        description: zod_1.default.string({
            required_error: "Description is required",
        }),
        shortDescription: zod_1.default.string({
            required_error: "Short description is required",
        }),
        image: zod_1.default.string({
            required_error: "Image URL is required",
        }),
        discount: zod_1.default.number().optional(),
        previousPrice: zod_1.default.number().optional(),
        price: zod_1.default.number({
            required_error: "Price is required",
        }),
        title: zod_1.default.string({
            required_error: "Title is required",
        }),
        inStock: zod_1.default.boolean().default(true).optional(),
        quantity: zod_1.default.number({
            required_error: "Quantity is required",
        }),
        deliveryFee: zod_1.default.number({
            required_error: "Delivery Fee is required",
        }).optional(),
        paymentMethod: zod_1.default.object({
            nagat: zod_1.default.boolean().default(false).optional(),
            bkash: zod_1.default.boolean().default(false).optional(),
            cashOnDelivery: zod_1.default.boolean().default(false).optional(),
        }),
    })
});
const updateProductValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        description: zod_1.default.string({
            required_error: "Description is required",
        }).optional(),
        shortDescription: zod_1.default.string({
            required_error: "Description is required",
        }).optional(),
        image: zod_1.default.string({
            required_error: "Image URL is required",
        }).optional(),
        discount: zod_1.default.number().optional(),
        previousPrice: zod_1.default.number().optional(),
        price: zod_1.default.number({
            required_error: "Price is required",
        }).optional(),
        title: zod_1.default.string({
            required_error: "Title is required",
        }).optional(),
        inStock: zod_1.default.boolean().default(true).optional(),
        quantity: zod_1.default.number({
            required_error: "Quantity is required",
        }).optional(),
        deliveryFee: zod_1.default.number({
            required_error: "Delivery Fee is required",
        }).optional(),
        paymentMethod: zod_1.default.object({
            nagat: zod_1.default.boolean().optional(),
            bkash: zod_1.default.boolean().optional(),
            cashOnDelivery: zod_1.default.boolean().optional(),
        }).optional(),
    })
});
exports.productValidations = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
