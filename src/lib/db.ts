import { PrismaClient } from "@prisma/client";

// Declare a module augmentation for the global object
declare global {
  var db: PrismaClient | undefined;
}

let db: PrismaClient;

// Check if we are running in production mode
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  // Check if there is already a connection to the database
  if (!global.db) {
    global.db = new PrismaClient();
  }
  db = global.db;
}

export { db };
