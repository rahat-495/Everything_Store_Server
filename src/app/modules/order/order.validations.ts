
import z from "zod";

const createOrderValidationSchema = z.object({
    body: z.object({
        paidStatus: z.boolean().optional().default(false),
        isCancel: z.boolean().optional().default(false),
        transactionId: z.string().optional(), 
        product: z.string({ required_error: "Product ID is required" }),
        status: z.enum([
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
        userId: z.string({ required_error: "User ID is required" }),
        userEmail: z.string({ required_error: "User email is required" }).optional(),
        userPhone: z.string({ required_error: "User phone is required" }),
        shippingAddress: z.string({ required_error: "Shipping address is required" }),
        quantity: z.number({ required_error: "Quantity is required" }).min(1, "Quantity must be at least 1"),
        totalPrice: z.number({ required_error: "Total price is required" }).optional(),
        deliveryDate: z.string({ required_error: "Delivery date is required" }),
        cancelReason: z.string().optional(),
        refundAmount: z.number().optional(),
        paymentMethod: z.enum(["CashOnDelivery", "Bkash", "Nagat"], {
            required_error: "Payment method is required",
        }),
    }),
});

const updateOrderValidationSchema = z.object({
    body: z.object({
        paidStatus: z.boolean().optional().default(false),
        isCancel: z.boolean().optional().default(false),
        transactionId: z.string().optional(), 
        product: z.string({ required_error: "Product ID is required" }).optional(),
        status: z.enum([
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
        userId: z.string({ required_error: "User ID is required" }).optional(),
        userEmail: z.string({ required_error: "User email is required" }).optional(),
        userPhone: z.string({ required_error: "User phone is required" }).optional(),
        shippingAddress: z.string({ required_error: "Shipping address is required" }).optional(),
        quantity: z.number({ required_error: "Quantity is required" }).min(1, "Quantity must be at least 1").optional(),
        totalPrice: z.number({ required_error: "Total price is required" }).optional(),
        deliveryDate: z.string({ required_error: "Delivery date is required" }).optional(),
        cancelReason: z.string().optional(),
        refundAmount: z.number().optional(),
        paymentMethod: z.enum(["CashOnDelivery", "Bkash", "Nagat"], {
            required_error: "Payment method is required",
        }).optional(),
    }),
});

export const orderValidations = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};

