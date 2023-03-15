#!/usr/bin/env bash

source .env/.production

migrations_dir=supabase/migrations
last_commit_timestamp=$(git log -n 1 main --pretty=format:"%at")

migration_time=$(date -u -d "@$last_commit_timestamp" '+%Y%m%d%H%M%S')

seed_filename="${migration_time}_seed.sql"

for f in $(ls "$migrations_dir" | grep -E "[0-9]{14}_seed.sql"); do
  rm "$migrations_dir/$f"
done

PGPASSWORD="$PGPASSWORD" pg_dump \
  --column-inserts \
  --data-only \
  --schema=public \
  --host=db.wtefsnhgkloxbxhifnxp.supabase.co \
  --dbname=postgres \
  --username=postgres \
  > "$migrations_dir/$seed_filename"

PGPASSWORD="$PGPASSWORD" pg_dump \
  --exclude-table=auth.schema_migrations \
  --column-inserts \
  --data-only \
  --schema=auth \
  --host=db.wtefsnhgkloxbxhifnxp.supabase.co \
  --dbname=postgres \
  --username=postgres \
  >> "$migrations_dir/$seed_filename"
