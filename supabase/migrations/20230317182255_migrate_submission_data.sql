insert
  into evaluation_field (id, evaluation_id, heading, subheading, char_count, placeholder)
  select
    uuid_generate_v4(),
    evaluation.id,
    'Project Description',
    'Using 280 characters or less, describe your project.',
    280,
    'My project is...'
  from evaluation
  where evaluation.id not in ('08405342-f33e-418f-9f5d-3ed460a64f5c', '6ce7221a-aaa7-4171-a7b6-2371a0b84de9');

insert
  into evaluation_field (id, evaluation_id, heading, subheading, char_count, placeholder)
  select
    uuid_generate_v4(),
    evaluation.id,
    'Progress Summary',
    'Using 280 characters or less, describe what your project has accomplished in the past 1 month.',
    280,
    'In the past 1 month, my project has...'
  from evaluation
  where evaluation.id not in ('08405342-f33e-418f-9f5d-3ed460a64f5c', '6ce7221a-aaa7-4171-a7b6-2371a0b84de9');

insert 
  into evaluation_field (id, evaluation_id, heading, subheading, char_count, placeholder)
  select
    uuid_generate_v4(),
    evaluation.id,
    'FVM Tech Specs',
    'Using 360 characters or less, describe your F(E)VM smart contract designs as well as the unique value your contracts bring to Filecoin.',
    360,
    'My project is using FVM''s functionality to...'
  from evaluation
  where evaluation.id not in ('08405342-f33e-418f-9f5d-3ed460a64f5c', '6ce7221a-aaa7-4171-a7b6-2371a0b84de9');

insert into
  submission_field (id, fields_id, field_body, submission_id)
  select
    uuid_generate_v4(),
    (select id
      from evaluation_field
      where evaluation_field.evaluation_id = submission.evaluation_id and evaluation_field.heading = 'Project Description'
    ),
    submission.description->>'description',
    submission.id
  from submission
  where submission.evaluation_id not in ('08405342-f33e-418f-9f5d-3ed460a64f5c', '6ce7221a-aaa7-4171-a7b6-2371a0b84de9');

insert into
  submission_field (id, fields_id, field_body, submission_id)
  select
    uuid_generate_v4(),
    (select id
      from evaluation_field
      where evaluation_field.evaluation_id = submission.evaluation_id and evaluation_field.heading = 'Progress Summary'
    ),
    submission.description->>'summary',
    submission.id
  from submission
  where submission.evaluation_id not in ('08405342-f33e-418f-9f5d-3ed460a64f5c', '6ce7221a-aaa7-4171-a7b6-2371a0b84de9');

insert into
  submission_field (id, fields_id, field_body, submission_id)
  select
    uuid_generate_v4(),
    (select id
      from evaluation_field
      where evaluation_field.evaluation_id = submission.evaluation_id and evaluation_field.heading = 'FVM Tech Specs'
    ),
    submission.description->>'specs',
    submission.id
  from submission
  where submission.evaluation_id not in ('08405342-f33e-418f-9f5d-3ed460a64f5c', '6ce7221a-aaa7-4171-a7b6-2371a0b84de9');