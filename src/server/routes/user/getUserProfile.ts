import { userProcedure } from "src/server/trpc";
import { isAdmin } from "src/lib/rpc";

export const getUserProfile = userProcedure.query(async ({ ctx: { db, auth } }) => {
  if (!isAdmin(auth)) {
    // return new Error("Not authorized");
  }

  try {
    const user = await db.User.findUnique({
      where: { id: auth.user_id },
    });

    if (!user) {
      // return new Error(`ERROR -- getUserProfile failed. user_id: ${auth.user_id}`);
    }

    return user;
  } catch (error) {
    console.error("An error occurred while fetching the user profile:", error);
    // return new Error(`ERROR -- getUserProfile failed. user_id: ${auth.user_id}`);
  }
});
