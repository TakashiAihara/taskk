import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TaskOptionalDefaultsSchema, TaskOptionalDefaultsWithRelationsSchema, TaskPartialSchema, TaskSchema, TaskUpdateInputSchema } from "~/prisma/generated/zod";

export const taskRouter = createTRPCRouter({
    update: publicProcedure
    .input(TaskPartialSchema.merge(TaskSchema.pick({id: true})))
    .mutation(async ({ctx, input}) =>
      ctx.db.task.update(
        {
          data: {...input},
          where: {
            id:input.id
          }
        },
      )
    ),

    delete: publicProcedure
    .input(TaskSchema.pick({id: true}))
    .mutation(async ({ctx, input}) =>
      ctx.db.task.delete(
        {
          where: {
            ...input
          }
        },
      )
    ),

    create: publicProcedure
    .input(TaskOptionalDefaultsSchema.omit({id: true}))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          ...input
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.db.task.findMany({
      orderBy: { createdAt: "desc" },
    });

    return tasks ?? null;
  }),

  getOne: publicProcedure
  .input(z.object({id: z.number().nonnegative()}))
  .query(async ({ ctx, input }) => {
    const {id} = input;

    return ctx.db.task.findFirst({
      where: {
        id
      }
    });
  }),
});
