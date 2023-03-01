# Impact Evaluator Tool

## Environment Variables

To facilitate low friction switching between different backends (local, staging, prod) during development the environment variables for each backend are split into seperate files in the .env directory. Which env file is loaded is determined by the `DEV_TARGET` environment variable, so `DEV_TARGET=staging` would load environment variables from the file `.env/.staging`.

Convenience commands are included for the common backends:

- `yarn dev:local`
- `yarn dev:staging`
- `yarn dev:production`
- `yarn dev` (uses staging)

Implementation of this switch is in `next.config.js`

## Development

### Running

`$ yarn dev`
`$ yarn run codegen:watch`

### Database

#### GraphQL Codegen

If you update the database, run `$ yarn run codegen:fetch` to fetch the new type graphql schema.

#### Migrations

No system is yet in place for database migrations. My intention is to use

### Design

### Inspiration

https://github.com/supabase-community/supabase-graphql-example

TODO: document this error
Failed to join round {
code: 'PGRST202',
details: null,
hint: 'If a new function was created in the database with this name and parameters, try reloading the schema cache.',
message: 'Could not find the public.join_with_code(code, preffered_email, user_id) function or the public.join_with_code function with a single unnamed json or jsonb parameter in the schema cache'
}

Get SME status

```
select
"user".name as user_name,
github_handle,
voice_credits,
exists (select 1 from votes where votes.evaluator_id = evaluator.id) as has_voted,
true as has_logged_in,
evaluation.name as round_title
from evaluator
join "user" on "user".id = evaluator.user_id
join evaluation on evaluator.evaluation_id = evaluation.id
where evaluator.voice_credits = 100 and evaluator.evaluation_id = 'cf866f4d-216c-49aa-8363-3cabd93e80e0'
and "user".role != 'admin';
```
