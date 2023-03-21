update evaluation set description = '' where description is null;
alter table evaluation alter column description set default '';
alter table evaluation alter column description set not null;