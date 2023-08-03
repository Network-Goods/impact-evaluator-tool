# Impact Evaluator Tool | Quadratic Voting Implementation
Impact Evaluator implementatiom used for subjective, quantitative evaluations of a list of outcomes or projects. The tool uses quadratic voting as the evaluation mechanism.

Website: [impactevaluator.io](impactevaluator.io)

## Resources
### Demo:
Video: [bit.ly/ietooldemo](bit.ly/ietooldemo)
Link: [impactevaluator.io](impactevaluator.io)
Codes:
  - Round4Demo
  - DemoSubmissions

### Case Studies:
- [IPFS Impact Evaluator Round 1](https://network-goods.notion.site/IPFS-Impact-Evaluator-Round-1-bcc8450ae387487fad9916cf9d645417)
- [FVM Impact Evaluator & Builders Leaderboard](https://network-goods.notion.site/Impact-Evaluators-Builders-Leaderboard-602ea6755b5642e1ad6f9da59a47fa62)
- [IPFS Impact Evaluator Round 2](https://docs.google.com/document/d/105-nsKp5KkH9SSWY0XmWwZ7_RqZDvlheK3W5ez7Hi1I/edit)

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

Get number of credits used by each evaluator

```
select github_handle, coalesce(sum(votes*votes), 0)
from evaluator
left join votes on evaluator.id = votes.evaluator_id
join "user" on "user".id = evaluator.user_id
where evaluator.evaluation_id = 'cf866f4d-216c-49aa-8363-3cabd93e80e0'
group by github_handle
order by github_handle;
```
