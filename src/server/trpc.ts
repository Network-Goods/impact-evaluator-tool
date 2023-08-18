import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

const isAdmin = t.middleware(({ next, ctx }) => {
  if (ctx.auth.role != "admin") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User is not an admin",
    });
  }
  return next({
    ctx: {
      ...ctx,
    },
  });
});

const isUser = t.middleware(({ next, ctx }) => {
  // TODO
  return next({
    ctx: {
      ...ctx,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const adminProcedure = t.procedure.use(isAdmin);
export const userProcedure = t.procedure.use(isUser);
