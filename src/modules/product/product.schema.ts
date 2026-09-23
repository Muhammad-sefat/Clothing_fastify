import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(5),
    price: z.number().nonnegative(),
    category: z.string().min(2),
    stock: z.number().int().nonnegative(),
});

export const updateProductSchema = createProductSchema.partial();

export const productIdSchema = z.object({
    id: z.string().min(1),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export type UpdateProductInput = z.infer<typeof updateProductSchema>;