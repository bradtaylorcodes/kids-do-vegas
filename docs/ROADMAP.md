# Kids Do Vegas: Roadmap

What comes after v1. The v1 scope lives in the [PRD](./PRD.md); capitalised terms are defined in the [Glossary](../GLOSSARY.md).

- **Next**: things we intend to build after v1, roughly in order.
- **Ideas**: unranked and unvetted. An Idea moves to Next once there's a reason to build it.
- **Won't do (for now)**: deliberate exclusions, each with its reason.

When an item is picked up, it gets its own section in a PRD before any building starts.

## Next

1. **Needs Verification view**: a list of hand-entered Listings whose Last Verified date is more than 6 months old, oldest first, with a one-click "Mark verified". Nothing is that old at launch, but it must ship before the first launch Resources reach 6 months.
2. **Quick Add**: one editor can't keep up with Events posted only on social media, and AI drafting makes entering each one take seconds instead of minutes.
3. **More Collectors**: North Las Vegas Parks & Rec (ActiveNet), City of Las Vegas events, Discovery Children's Museum, and Springs Preserve. These fill the calendar beyond the libraries without adding editor work.
4. **Programs**: registration-based classes and camps, with a date range, registration opening date, session schedule, and their own detail page. Until then, a camp or class can be entered as a Resource whose schedule text gives the session dates.
5. **Members**: email sign-in with no passwords, Child Profiles that set default Age Group filters, Favorites, Reminders, account deletion, and a privacy page, plus the device-only "My kids' ages" filter for visitors without an account. See [ADR 0002](./adr/0002-adult-only-accounts-minimal-child-data.md).
6. **Data partnerships**: Nevada 211, Three Square, and data exports from Henderson and Clark County Parks & Rec. Outreach starts during v1, but the timing depends on the other organizations, so these are not launch requirements.
7. **Submissions**: Organizations know their own offerings best, and a reviewed form spreads the content work beyond one editor.

## Ideas

- **Map pins on detail pages**: show where a Location is at a glance. Would use OpenStreetMap data, with addresses converted to coordinates when a Location is saved.
- **Alerts**: emails telling Members about new Events matching their Child Profiles and Areas, so they don't have to check the calendar.
- **Interests on Child Profiles** (such as swimming or art): would allow better matching, but Listings would need interest tags first.
- **Indoor/Outdoor filter**: useful in Las Vegas summers, but every Listing would need tagging.
- **Map-based browsing and distance search**: "what's near me" is a natural question, but Area filters cover most of it for now.
- **Organization pages**: one page listing an Organization's Resources and upcoming Events.
- **Spanish review queue**: the editor reviews automatic Spanish translations before they're published. Worth building if automatic translation quality turns out to be poor.

## Won't do (for now)

- **Monetization** (ads, sponsorships): the site's value depends on trust and neutrality. We'd only revisit this if running costs become a problem.
- **Collecting from Facebook, Instagram, TikTok, Eventbrite search, Nevada 211, or findhelp.org**: their terms, technical limits, or unstructured content rule them out. Social media Events are entered by hand (later through Quick Add), and Nevada 211 is pursued as a data partnership instead.
