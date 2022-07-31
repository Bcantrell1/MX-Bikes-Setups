import { createRouter } from "../createRouter";
import * as trpc from '@trpc/server'
import { createBikeSchema, getSingleBikeSchema, getCategoryBikeSchema } from "../../schema/bike.schema";
import { getSession } from 'next-auth/react';

const session = getSession();

export const bikesRouter = createRouter()
.mutation('create-bike', {
    input: createBikeSchema,
    async resolve({ctx, input}) {
        if(!session) {
            new trpc.TRPCError({
                code: 'FORBIDDEN',
                message: 'You are not allowed to create bikes'
            });
        }

        const bike = (await ctx).prisma.bike.create({
            data: {
            ...input,
            }
        })
        return bike;
    }
})
.query('categories', {
    async resolve({ctx}) {
        return (await ctx).prisma.bike.findMany({
            orderBy: {
                category: 'asc'
            }
        });
    }
})
.query('single-bike', {
    input: getCategoryBikeSchema,
    async resolve({ctx, input}) {
        return (await ctx).prisma.bike.findUnique({
            where: {
                id: input.category
            }
        });
    }
})
.query('category-bikes', {
    input: getCategoryBikeSchema,
    async resolve({ctx, input}) {
        return (await ctx).prisma.bike.findMany({
            where: {
                category: input.category
            }
        });
    }
});