# Kids Do Vegas

Kids Do Vegas is a free public website that helps parents across the Las Vegas Valley find things for their kids (ages 0–18) to do and use. It brings together three kinds of Listings that are scattered across library calendars, city parks departments, nonprofits, and social media today:

- **Resources**: ongoing offerings that aren't tied to a date. Parks, museums, pediatric dentists, swim schools, free grocery distribution.
- **Events**: dated things a family would plan an outing around. A craft fair, a free museum night, Tuesday storytime.
- **Programs**: offerings with a set run that require registration. An 8-week swim class, a summer camp.

Each Listing is connected to the **Organization** that provides it and the **Locations** where it happens. See [GLOSSARY.md](./GLOSSARY.md) for the exact vocabulary.

## Who it's for

Parents and caregivers anywhere in the Las Vegas Valley: the City of Las Vegas, Henderson, North Las Vegas, Boulder City, and unincorporated Clark County, plus nearby day trips. Most visitors are expected to arrive from search engines ("free things to do with kids Henderson this weekend"). The site is free and has no ads. Making money from it is not a current goal, but it shouldn't be ruled out later.

## What visitors can do

- **Browse Resources** by Category (Parks, Museums, Healthcare, Food Assistance, and so on) and by Area (Henderson, Summerlin, Northwest, Day Trips, and so on).
- **Check the Events calendar** to answer "what can we do this weekend?" Special Events (one-off or occasional) are shown by default. Regulars (storytime, open swim) are one tap away so they don't crowd out the rest. Repeat occurrences of the same Event at the same Location are grouped into one card.
- **Filter by Age Group**: Baby, Toddler, Preschool, Elementary, Tween, Teen. Each Listing has a numeric Age Range, and a Listing matches every Age Group it overlaps.
- **Filter by cost**: each Listing is Free, Low Cost, or Paid, with a short Price Note. "Free" is a top-level filter.
- **Get directions**: each Location links out to Google or Apple Maps.
- **Trust what they see**: hand-entered Listings show a "Last verified" date, and visitors can send a Problem Report if something is wrong or closed.

There are no visitor accounts.

## How the data gets in

- **By hand**: the editor enters Listings through a ready-made CMS admin panel (forms, relationships, drafts, revision history). It includes a list of Listings that Need Verification, meaning they haven't been checked in 6 months.
- **Collectors**: automated daily jobs that pull Events from external Sources and keep them up to date. The first one covers the Las Vegas–Clark County Library District and Henderson Libraries, which share one structured calendar feed with age information. Only events relevant to ages 0–18 are kept.
- **Not scraped**: Facebook, Instagram, TikTok, Eventbrite search, Nevada 211, and findhelp.org. Their terms, technical limits, or unstructured content rule them out. Events found on social media are entered by hand (and later through Quick Add). For service directories and food assistance (Nevada 211, Three Square), the plan is to ask for data partnerships.

## Version 1

**Launch content**: about 75 Resources covering every Area, with at least 5 in each launch Category (Parks & Playgrounds, Libraries, Museums & Attractions, Indoor Play, Sports & Swim, Healthcare, Food Assistance, Childcare & Education). The library Collector will already be running, so the calendar has a few weeks of Events.

**Problem Reports** go to an inbox in the admin; there are no email notifications at launch.


- A hand-entered Resources directory (the main focus).
- An Events calendar filled automatically by the library Collector.
- Hand-entered Events and Programs as needed.
- English only, with content structured so Spanish can be added later.

## Later

- **Quick Add**: paste a social media post or flyer screenshot, get a draft Event extracted by AI, then review and publish it.
- More Collectors: North Las Vegas Parks & Rec, City of Las Vegas events, Discovery Children's Museum, Springs Preserve, and data exports requested from Henderson and Clark County Parks & Rec.
- Submissions from Organizations, reviewed by the editor before publishing.
- Spanish translations.
- Map pins on detail pages.
- A "my kids' ages" filter.

## Out of scope for now

- An Indoor/Outdoor filter
- Visitor accounts, favorites, and reminders
- Map-based browsing and distance search
- Monetization
- Analytics
- Email notifications for Problem Reports

## Stack

One Next.js app with Payload CMS v3 inside it (TypeScript, Postgres). See [ADR 0001](./docs/adr/0001-nextjs-and-payload.md).

- **Hosting**: Railway, with the app as one always-on Docker container plus Railway Postgres.
- **Collectors**: TypeScript, running as Payload scheduled jobs inside the app.
- **Rendering**: Resource, Organization, and Area pages are cached and refreshed when an edit is published. The calendar and Event pages are rendered per request (or cached for a few minutes).

## Domain

As of 2026-11-20, `kidsdovegas.com`, `.org`, and `.net` were all unregistered.
