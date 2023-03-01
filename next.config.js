const toBoolean = (dataStr) => {
  if (dataStr === undefined) {
    return undefined;
  }

  return dataStr?.toLowerCase?.() === "true";
};

if (process.env.CLIENT_BACKEND) {
  require("dotenv").config({ path: `.env/.${process.env.CLIENT_BACKEND}` });
}

const env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

let errors = [];
for (let [key, value] of Object.entries(env)) {
  if (value === undefined) {
    errors.push(`    ${key}`);
  }
}

if (errors.length != 0) {
  console.error("ERROR - Failed to load the following environment variables:");
  for (let error of errors) {
    console.log(error);
  }

  if (process.env.CLIENT_BACKEND) {
    console.log(`CLIENT_BACKEND is set. Loaded variables from: '.env/.${process.env.CLIENT_BACKEND}'`);
  } else {
    console.log(`CLIENT_BACKEND is not set, no variables were read from env files. See README for more details.`);
  }

  process.exit(1);
}

const nextConfig = {
  env: env,
};

module.exports = nextConfig;
