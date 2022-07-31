import z from 'zod';

export const createBikeSchema = z.object({
    name: z.string(),
    category: z.string()
});

export type CreateBikeInput = z.TypeOf<typeof createBikeSchema>;

export const getSingleBikeSchema = z.object({
    bikeId: z.string(),
});

export const getCategoryBikeSchema = z.object({
    category: z.string(),
});