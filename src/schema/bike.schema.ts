import z from 'zod';

export const createBikeSchema = z.object({
    name: z.string(),
    category: z.string(),
    image: z.string()
});

export type CreateBikeInput = z.TypeOf<typeof createBikeSchema>;

export const getSingleBikeSchema = z.object({
    name: z.string(),
});

export type GetSingleBikeInput = z.TypeOf<typeof getSingleBikeSchema>;

export const getCategoryBikeSchema = z.object({
    category: z.string(),
});

export type GetCategoryBikeInput = z.TypeOf<typeof getCategoryBikeSchema>;