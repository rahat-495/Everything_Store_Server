
import z from "zod";

const createProductValidationSchema = z.object({
    body : z.object({
        description: z.string({
            required_error: "Description is required",
        }),
        
        shortDescription: z.string({
            required_error: "Short description is required",
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
        
        deliveryFee: z.number({
            required_error: "Delivery Fee is required",
        }).optional(),
        
        paymentMethod : z.object({
            nagat : z.boolean().default(false).optional() ,
            bkash : z.boolean().default(false).optional() ,
            cashOnDelivery : z.boolean().default(false).optional() ,
        }),
    })
});

const updateProductValidationSchema = z.object({
    body : z.object({
        description: z.string({
            required_error: "Description is required",
        }).optional(),

        shortDescription: z.string({
            required_error: "Description is required",
        }).optional(),

        image: z.string({
            required_error: "Image URL is required",
        }).optional(),

        discount: z.number().optional(),

        previousPrice: z.number().optional(),

        price: z.number({
            required_error: "Price is required",
        }).optional(),

        title: z.string({
            required_error: "Title is required",
        }).optional(),
        
        inStock: z.boolean().default(true).optional(),
        
        quantity: z.number({
            required_error: "Quantity is required",
        }).optional(),
        
        deliveryFee: z.number({
            required_error: "Delivery Fee is required",
        }).optional(),

        paymentMethod : z.object({
            nagat : z.boolean().optional() ,
            bkash : z.boolean().optional() ,
            cashOnDelivery : z.boolean().optional() ,
        }).optional(),
    })
});

export const productValidations = {
  createProductValidationSchema ,
  updateProductValidationSchema ,
};
