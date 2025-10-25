"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createOrderValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        paidStatus: zod_1.default.boolean().optional().default(false),
        isCancel: zod_1.default.boolean().optional().default(false),
        transactionId: zod_1.default.string().optional(),
        product: zod_1.default.string({ required_error: "Product ID is required" }),
        status: zod_1.default.enum([
            "Pending",
            "Processing",
            "Shipped",
            "In Transit",
            "Out for Delivery",
            "Delivered",
            "Canceled",
            "Returned",
            "Refunded",
        ]).optional().default("Pending"),
        userId: zod_1.default.string({ required_error: "User ID is required" }),
        userEmail: zod_1.default.string({ required_error: "User email is required" }).optional(),
        userPhone: zod_1.default.string({ required_error: "User phone is required" }),
        shippingAddress: zod_1.default.string({ required_error: "Shipping address is required" }),
        quantity: zod_1.default.number({ required_error: "Quantity is required" }).min(1, "Quantity must be at least 1"),
        totalPrice: zod_1.default.number({ required_error: "Total price is required" }).optional(),
        deliveryDate: zod_1.default.string({ required_error: "Delivery date is required" }),
        cancelReason: zod_1.default.string().optional(),
        refundAmount: zod_1.default.number().optional(),
        paymentMethod: zod_1.default.enum(["CashOnDelivery", "Bkash", "Nagat"], {
            required_error: "Payment method is required",
        }),
    }),
});
const updateOrderValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        paidStatus: zod_1.default.boolean().optional().default(false),
        isCancel: zod_1.default.boolean().optional().default(false),
        transactionId: zod_1.default.string().optional(),
        product: zod_1.default.string({ required_error: "Product ID is required" }).optional(),
        status: zod_1.default.enum([
            "Pending",
            "Processing",
            "Shipped",
            "In Transit",
            "Out for Delivery",
            "Delivered",
            "Canceled",
            "Returned",
            "Refunded",
        ]).optional().default("Pending"),
        userId: zod_1.default.string({ required_error: "User ID is required" }).optional(),
        userEmail: zod_1.default.string({ required_error: "User email is required" }).optional(),
        userPhone: zod_1.default.string({ required_error: "User phone is required" }).optional(),
        shippingAddress: zod_1.default.string({ required_error: "Shipping address is required" }).optional(),
        quantity: zod_1.default.number({ required_error: "Quantity is required" }).min(1, "Quantity must be at least 1").optional(),
        totalPrice: zod_1.default.number({ required_error: "Total price is required" }).optional(),
        deliveryDate: zod_1.default.string({ required_error: "Delivery date is required" }).optional(),
        cancelReason: zod_1.default.string().optional(),
        refundAmount: zod_1.default.number().optional(),
        paymentMethod: zod_1.default.enum(["CashOnDelivery", "Bkash", "Nagat"], {
            required_error: "Payment method is required",
        }).optional(),
    }),
});
exports.orderValidations = {
    createOrderValidationSchema,
    updateOrderValidationSchema,
};
