import { createCallerFactory, createTRPCRouter, publicProcedure } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
// Keep at least one router/procedure so tRPC hydration + types work.
// (We removed demo-only routers like `posts`, but the app still needs a valid router shape.)
const healthRouter = createTRPCRouter({
  ping: publicProcedure.query(() => ({ ok: true }))
});

export const appRouter = createTRPCRouter({
  health: healthRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
