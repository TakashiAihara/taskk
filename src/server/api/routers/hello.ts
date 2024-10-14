import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const helloRouter = createTRPCRouter({
hello: publicProcedure
    .query(() => {
      return "connected";
    }),

    create: publicProcedure
    .input(z.object({
      title: z.string().min(1),
      tags: z.array(z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      const { title, tags: tagNames } = input;

      return ctx.db.task.create({
        data: {
          title,
          tags: {
            connectOrCreate: tagNames.map(name => ({
              where: { name },
              create: { name },
            })),
          },
        },
        include: {
          tags: true,
        },
      });
    }),
});
