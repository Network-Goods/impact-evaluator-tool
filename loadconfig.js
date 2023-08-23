if (process.env.CLIENT_BACKEND) {
  require("dotenv").config({ path: `.env/.${process.env.CLIENT_BACKEND}` });
}

const required = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  PGHOST: process.env.PGHOST,
  PGPORT: process.env.PGPORT,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
};

const optional_with_default = {
  NEXT_PUBLIC_SHOW_EMAIL_LOGIN: process.env.NEXT_PUBLIC_SHOW_EMAIL_LOGIN || "false",
};

let optional = {
  CLIENT_BACKEND: process.env.CLIENT_BACKEND,
};

let errors = [];
for (let [key, value] of Object.entries(required)) {
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

const DATABASE_URL = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}`;

const env = {
  ...required,
  ...optional_with_default,
  ...optional,
  DATABASE_URL,
};

module.exports = env;
