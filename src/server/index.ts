import { adminProcedure, publicProcedure, router } from "./trpc";

import { admin } from "./routes/admin";
import { user } from "./routes/user";

export const appRouter = router({
  admin: admin,
  user: user,

  test1: publicProcedure.query(async () => {
    throw new Error("test1");
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
