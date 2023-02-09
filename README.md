# Impact Evaluator Tool

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
