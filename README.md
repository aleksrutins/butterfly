# Butterfly
> Idiotically simple cross-database queries and migrations

## Usage
To create a migration, add `<migration-name>.up.sql` and `<migration-name>.down.sql` files in a `migrations` directory. Write your SQL for applying and reverting the migration in those files, respectively.

Then, call `butterfly up` to apply all unapplied migrations, `butterfly revert` to revert the latest migration, or `butterfly refresh` to revert and re-apply all migrations.

It's that simple!