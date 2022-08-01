import { createRouter } from "../createRouter";
import * as trpc from '@trpc/server'
import { createBikeSchema, getSingleBikeSchema, getCategoryBikeSchema } from "../../schema/bike.schema";

export const bikesRouter = createRouter()
.mutation('create-bike', {
    input: createBikeSchema,
    async resolve({ctx, input}) {
        if(!(await ctx).session) {
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
        if(!(await ctx).session) {
            new trpc.TRPCError({
                code: 'FORBIDDEN',
                message: 'You are not allowed to access categories'
            });
        }
        
        return (await ctx).prisma.bike.findMany({
            orderBy: {
                category: 'asc'
            }
        });
    }
})
.query('single-bike', {
    input: getSingleBikeSchema,
    async resolve({ctx, input}) {
        if(!(await ctx).session) {
            new trpc.TRPCError({
                code: 'FORBIDDEN',
                message: 'You are not allowed to create bikes'
            });
        }

        return (await ctx).prisma.bike.findFirst({
            where: {
                name: input.name
            }
        });
    }
})
.query('category-bikes', {
    input: getCategoryBikeSchema,
    async resolve({ctx, input}) {
        if(!(await ctx).session) {
            new trpc.TRPCError({
                code: 'FORBIDDEN',
                message: 'You are not allowed to create bikes'
            });
        }

        return (await ctx).prisma.bike.findMany({
            where: {
                category: input.category
            }
        });
    }
});