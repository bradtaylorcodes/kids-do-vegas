# Adult-only accounts with minimal child data

_Members are not part of v1 (deferred on 2026-11-22; see [#5](https://github.com/bradtaylorcodes/kids-do-vegas/issues/5)). This decision applies once they're built._

Only adults (18+) can become Members, and a Child Profile holds just a nickname plus birth month and year. Data is entered by parents *about* their children, never collected *from* children. This keeps the site outside the scope of COPPA, the US children's privacy law covering data collected from under-13s, and means a data breach would expose very little about any child. Accounts are needed so the ages filter, Favorites, and Reminders sync across devices.

## Considered Options

- **Let teens (13–17) sign up**: they're part of the audience, but teen accounts bring age checks, parental consent questions, and more legal exposure for a one-person site.
- **Full names, exact birthdates, or interests on Child Profiles**: they would allow better personalisation, but birth month and year are enough to work out an Age Group, and Listings have no interest tags to match against.
- **No accounts, ages stored on the device only**: simplest and most private, but it can't sync across devices. The device-only filter still exists for visitors who don't sign up.

## Consequences

- Sign-up asks Members to confirm they are 18 or older.
- Members must be able to delete their account, which also deletes their Child Profiles, Favorites, and Reminders.
- Sign-in uses an emailed link, so no passwords are stored.
