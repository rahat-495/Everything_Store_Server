
import z from "zod";

const createProductValidationSchema = z.object({
    body : z.object({
        description: z.string({
        required_error: "Description is required",
        }),

        image: z.string({
            required_error: "Image URL is required",
        }),

        discount: z.number().optional(),

        previousPrice: z.number().optional(),

        price: z.number({
            required_error: "Price is required",
        }),

        title: z.string({
            required_error: "Title is required",
        }),

        inStock: z.boolean().default(true).optional(),

        quantity: z.number({
            required_error: "Quantity is required",
        }),
    })
});

export const productValidations = {
  createProductValidationSchema,
};
