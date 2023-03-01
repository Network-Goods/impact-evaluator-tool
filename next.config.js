if (!process.env.DEV_TARGET) {
  console.error(
    `ERROR - Failde to load environment variables: 'DEV_TARGET' is not set. See the 'Environment Variables' section in the README.`,
  );
  process.exit(1);
}

require("dotenv").config({ path: `.env/.${process.env.DEV_TARGET}` });

const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

module.exports = nextConfig;
