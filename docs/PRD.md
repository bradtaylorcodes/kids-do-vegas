# Kids Do Vegas: Product Requirements (v1)

| | |
|---|---|
| **Status** | Draft |
| **Last updated** | 2026-11-20 |
| **Related** | [README](../README.md) · [Glossary](../GLOSSARY.md) · [ADR 0001: Next.js + Payload](./adr/0001-nextjs-and-payload.md) |

Capitalised terms (Resource, Event, Area, and so on) are defined in the [Glossary](../GLOSSARY.md).

---

## 1. Problem

Parents in the Las Vegas Valley have no single place to find things to do and use with their kids. The information is scattered across:

- two library systems' calendars
- four city or county parks departments, each on a different registration system
- nonprofit websites (food assistance, health services)
- museum websites
- Facebook, Instagram, and TikTok posts

Answering "what can we do this Saturday with a 4-year-old, for free, near Henderson?" means checking half a dozen sites. Ongoing help, like where to get free groceries or which dentists see kids, is even harder to find.

## 2. Goals

1. **One place to look.** Parents find Resources and Events across the whole Las Vegas Valley without visiting each provider's site.
2. **Answer "what can we do this weekend?"** The calendar is filtered by age, cost, and Area, and highlights Special Events over routine ones.
3. **Information people can trust.** Listings show when they were last checked, and parents can report errors.
4. **Easy for one person to run.** A single editor can keep the site accurate with a few hours a week, because Collectors handle high-volume Event Sources automatically.
5. **Found through search.** Pages are crawlable and fast, so parents arrive from Google.

## 3. Non-goals (v1)

- Visitor accounts, favourites, reminders, or saved searches
- Maps, map-based browsing, or distance search
- Indoor/Outdoor filtering
- Spanish content (the data structure supports it; translation is not part of v1)
- Submissions from Organizations or the public
- Collecting from social media, Eventbrite search, Nevada 211, or findhelp.org
- Analytics, ads, sponsorships, or any other way of making money
- Email notifications
- Booking or registering for Programs on the site (we link out)

## 4. Users

| User | Description | Primary need |
|---|---|---|
| **Parent / caregiver** | Lives anywhere in the Las Vegas Valley, usually on a phone, often arriving from Google | Quickly find age-appropriate, affordable things nearby, for this weekend or for an ongoing need |
| **Editor** | The site owner; the only admin user in v1 | Add and maintain Listings efficiently, keep data fresh, and handle Problem Reports |

---

## 5. User stories

### Parent

1. As a parent, I want to see upcoming **Special Events** this weekend, so I can plan an outing.
2. As a parent, I want to filter Events and Resources by **Age Group**, so I only see things that suit my kids.
3. As a parent, I want to filter by **Free**, so I can find things that fit my budget.
4. As a parent, I want to filter by **Area**, so I see things near me.
5. As a parent, I want to browse **Resources by Category** (for example Food Assistance or Healthcare), so I can find ongoing help.
6. As a parent, I want to see **Regulars** (storytime, open swim) separately, so I know the weekly options without them burying special events.
7. As a parent, I want a **Directions** link for each Location, so I can get there from my phone.
8. As a parent, I want to see when a Resource was **Last Verified**, so I know whether to trust it.
9. As a parent, I want to **report a problem** with a Listing (closed, wrong time, wrong price), so others aren't misled.
10. As a parent, I want to reach a Program's or Event's **registration or info page** at the provider, so I can sign up.

### Editor

11. As the editor, I want to create and edit Resources, Events, Programs, Organizations, and Locations through forms, so I don't touch the database.
12. As the editor, I want to save a Listing as a **draft** before publishing it.
13. As the editor, I want a list of Listings that **Need Verification**, with a one-click "Mark verified", so I can keep data fresh.
14. As the editor, I want a **Problem Report inbox** where I can open the Listing and mark the report resolved.
15. As the editor, I want to see each **Collector's last run, counts, and errors**, so I know if the calendar has gone stale.
16. As the editor, I want to **override** a collected Event's Special/Regular classification, or hide it, and have the override survive the next Collector run.
17. As the editor, I want **revision history** on Listings, so I can undo mistakes.

---

## 6. Functional requirements

Priorities: **P0** = required for launch, **P1** = should have for launch, **P2** = nice to have.

### 6.1 Public site

| ID | Requirement | Priority |
|---|---|---|
| PUB-1 | **Home page** shows this weekend's Special Events, quick links to Categories and Areas, and a Free filter shortcut. | P0 |
| PUB-2 | **Events calendar** lists upcoming Special Events by date. Default range: the next 14 days. | P0 |
| PUB-3 | The calendar has a **Regulars** tab or toggle showing routine Events, grouped by title and Location into one card with its schedule summarised (e.g. "Tue & Thu 10am"). | P0 |
| PUB-4 | The calendar filters by date range, **Age Group** (several allowed), **Cost Tier**, and **Area** (several allowed). Filters are reflected in the URL so they can be shared and indexed. | P0 |
| PUB-5 | **Resources directory** can be browsed by **Category** and **Area**, and filtered by Age Group and Cost Tier. | P0 |
| PUB-6 | A **Resource detail page** shows the name, description, Category, Organization, Locations (with Directions links), schedule text, Age Range, Cost Tier and Price Note, website and phone, Last Verified date, and upcoming Events linked to the Resource. | P0 |
| PUB-7 | An **Event detail page** shows the title, date and time, Location (with Directions), Age Range, Cost Tier and Price Note, Organization, description, and a link to the Source or registration page. Past Events say clearly that they have ended. | P0 |
| PUB-8 | A **Program detail page** shows the title, date range, session schedule, registration link, Age Range, Cost Tier and Price Note, Organization, and Location. | P0 |
| PUB-9 | An **Organization page** lists that Organization's Resources, upcoming Events, and Programs. | P1 |
| PUB-10 | An **Area page** lists the Resources and upcoming Events in that Area. These pages are a main way in from search ("kids activities Henderson"). | P1 |
| PUB-11 | Every Listing has a **Report a problem** form: a reason (Closed / Wrong time / Wrong price / Other), a free-text field, and an optional email. Submissions create a Problem Report. | P0 |
| PUB-12 | **Site search** by keyword across Listings. | P2 |
| PUB-13 | An **About** page covering what the site is, how Listings are sourced, and how to contact the editor. | P1 |

### 6.2 Admin (Payload)

| ID | Requirement | Priority |
|---|---|---|
| ADM-1 | Create, edit, list, and delete Resources, Events, Programs, Organizations, Locations, Areas, and Categories. | P0 |
| ADM-2 | Searchable pickers for linked records (Organization, Location, Area, Category, parent Resource). | P0 |
| ADM-3 | **Drafts** and **publish** for Resources, Events, and Programs. | P0 |
| ADM-4 | **Revision history** for Resources, Events, and Programs. | P1 |
| ADM-5 | **Needs Verification** view: hand-entered Listings whose Last Verified date is more than 6 months old, sorted oldest first, with a "Mark verified" action that sets Last Verified to today. | P0 |
| ADM-6 | **Problem Report inbox**: a list of open reports, each linked to its Listing, with a status (Open / Resolved / Dismissed). | P0 |
| ADM-7 | **Collector status** view: for each Collector, the last run time, its result, and counts of Events created, updated, and removed, plus recent errors. | P0 |
| ADM-8 | Collected Events can be **overridden** (Special/Regular, hidden), and the Collector does not undo overrides. | P0 |
| ADM-9 | Admin login is limited to the editor's account. | P0 |
| ADM-10 | Publishing or editing a Listing refreshes its public page right away. | P0 |
| ADM-11 | Text fields are marked as translatable so Spanish can be added without changing the data model. | P1 |

### 6.3 Library Collector

The first Collector covers the **Las Vegas–Clark County Library District** and **Henderson Libraries**. Both run Communico and expose the same JSON calendar endpoint.

| ID | Requirement | Priority |
|---|---|---|
| COL-1 | Runs **daily** as a Payload scheduled job, fetching the next **60 days** of Events from both library Sources. | P0 |
| COL-2 | Imports only Events whose audience falls within ages 0–18 (Communico age categories from Babies through Teens, plus mixed/family audiences). Adult-only Events are never stored. | P0 |
| COL-3 | Maps Communico age categories to a numeric **Age Range** using a table maintained in code. | P0 |
| COL-4 | Stores **each occurrence as its own Event** (no grouping into Recurring Events). Events are matched to existing records by Source plus the Source's event ID, so repeated runs update rather than duplicate. | P0 |
| COL-5 | Maps each library branch to a **Location** (created once and linked to the library's Organization and Resource) and sets Cost Tier to Free. | P0 |
| COL-6 | Classifies each Event as **Special** or **Regular** using simple rules (how often the same title occurs at the same branch, plus keywords such as "storytime"). Editor overrides always win. | P0 |
| COL-7 | Events that disappear from the feed or are marked cancelled are **unpublished**, not deleted. | P0 |
| COL-8 | Records each run's outcome for the Collector status view (ADM-7). A failure for one Source doesn't stop the other. | P0 |
| COL-9 | Makes polite requests: identifies itself in the User-Agent, runs off-peak, and limits its request rate. | P0 |

---

## 7. Data model

These are the conceptual fields; the definitions live in the [Glossary](../GLOSSARY.md). Every Listing (Resource, Event, Program) has these **shared fields**:

| Field | Notes |
|---|---|
| Title, description | Translatable |
| Age Range (min, max) | Integers 0–18; required |
| Cost Tier | Free / Low Cost / Paid; required |
| Price Note | Optional, translatable |
| Organization | Optional link |
| Source | Hand-entered, or the Collector name + the Source's ID + the Source URL |
| Published / draft | |
| Last Verified | Hand-entered Listings only |

The **type-specific fields**:

| Type | Fields |
|---|---|
| **Resource** | Category (required), Locations (0..n), schedule text, website, phone |
| **Event** | Start and end date/time (America/Los_Angeles), Location (0..1), parent Resource (optional), Special or Regular, registration/info URL, editor override flags |
| **Program** | Start and end date, session schedule text, registration URL, Location (0..1) |
| **Organization** | Name, website, phone, description |
| **Location** | Name, street address, Area (required), Directions URL derived from the address |
| **Area** | Name, slug. Launch set covers the whole valley plus "Day Trips" |
| **Category** | Name, slug |
| **Problem Report** | Listing, reason, message, optional email, status, created date |

---

## 8. Non-functional requirements

| Area | Requirement |
|---|---|
| **Search engines** | Every Listing, Category, and Area page is rendered on the server, with a unique title and meta description, and has schema.org structured data (`Event` for Events, `Place`/`LocalBusiness` for Resources). A sitemap includes all published Listings. Filtered calendar views use canonical URLs. |
| **Performance** | Core Web Vitals in the "good" range on mobile. Resource, Organization, and Area pages are cached and refreshed on publish. Calendar pages are rendered per request or cached for 5 minutes or less. |
| **Mobile and accessibility** | Designed for phones first. Meets WCAG 2.2 AA. |
| **Privacy** | No tracking cookies or analytics. A Problem Report's email is optional and visible only to the editor. |
| **Time zone** | Everything is stored and shown in America/Los_Angeles. |
| **Portability** | See [ADR 0001](./adr/0001-nextjs-and-payload.md): standard Postgres, S3-compatible storage if needed, a Dockerfile, and no host-specific services. |
| **Hosting** | Railway: one always-on container plus Railway Postgres. Target cost: $25/month or less. |
| **Backups** | Daily Postgres backups, kept for at least 7 days. |

---

## 9. Launch criteria

- [ ] About **75 published Resources** spread across every Area, with at least 5 in each launch Category: Parks & Playgrounds, Libraries, Museums & Attractions, Indoor Play, Sports & Swim, Healthcare, Food Assistance, Childcare & Education.
- [ ] The library Collector has run successfully for **7 days in a row**, and the calendar shows at least 2 weeks of Events.
- [ ] All P0 requirements are done.
- [ ] `kidsdovegas.com` is registered and pointed at production, with HTTPS.
- [ ] The sitemap is submitted to Google Search Console.

## 10. Success measures

There's no analytics, so success is measured from the admin data and Google Search Console (which reports search traffic without tracking visitors on the site):

| Measure | Target (3 months after launch) |
|---|---|
| Published Resources | 150+ |
| Share of hand-entered Listings that Need Verification | < 10% |
| Collector success rate | ≥ 95% of daily runs |
| Problem Reports resolved within 7 days | ≥ 90% |
| Google Search Console clicks per month | Growing month over month |

---

## 11. Milestones

| # | Milestone | Contents |
|---|---|---|
| M1 | **Foundation** | Next.js + Payload project, Postgres, Dockerfile, Railway deploy, the admin collections for the whole data model |
| M2 | **Public Resources** | Resources directory, detail pages, Category and Area pages, Report a problem form, structured data, sitemap |
| M3 | **Library Collector** | The Communico Collector for both library Sources, Special/Regular classification, Collector status view |
| M4 | **Events calendar** | Calendar with filters, Regulars view, Event and Program detail pages |
| M5 | **Content and launch** | Enter about 75 Resources, check the launch criteria, register the domain, go live |

## 12. After v1 (roadmap)

1. **Quick Add**: paste a social media post or flyer screenshot, get a draft Event extracted by AI, review it, and publish.
2. **More Collectors**: North Las Vegas Parks & Rec (ActiveNet), City of Las Vegas events, Discovery Children's Museum, Springs Preserve.
3. **Data partnerships**: Nevada 211, Three Square, and data exports from Henderson and Clark County Parks & Rec.
4. Email notifications for Problem Reports.
5. Spanish translations.
6. Map pins on detail pages, and a "my kids' ages" filter.
7. Submissions from Organizations, reviewed by the editor.
8. Privacy-friendly analytics.

## 13. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| The library's Communico endpoint is undocumented and could change or be blocked | Medium | High (the calendar goes stale) | The Collector status view shows failures; keep the Collector isolated so it's easy to fix; ask the library district about official access |
| Library Regulars swamp the calendar | High | Medium | The Special/Regular split, classification rules, and editor overrides |
| Hand-entered Resources go stale | High | Medium | The Needs Verification view, the Last Verified date shown to visitors, and Problem Reports |
| Payload v3 → v4 upgrade effort | High (v4 is in beta) | Medium | Stay on v3 stable; plan the upgrade once v4 is stable |
| Collecting more content is a lot of work for one person | Medium | High | Launch with the library calendar plus Resources only; Quick Add and partnerships next |
| Problem Report form used for spam | Medium | Low | Rate limiting and a honeypot field; add a CAPTCHA only if needed |

## 14. Open questions

- What Areas does the launch set include? Proposed: Downtown/Central, Henderson, Summerlin, Northwest, North Las Vegas, Southwest/Enterprise, Southeast/Green Valley, East, Boulder City, Day Trips.
- Exact mapping from Communico's age categories to numeric Age Ranges (decided during M3, once real feed data is in hand).
- Whether to email the Las Vegas–Clark County Library District before launch to tell them about the Collector or ask for official access.
