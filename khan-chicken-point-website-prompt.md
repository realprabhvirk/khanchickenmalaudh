# Khan Chicken Point: Website Build Brief

Paste this entire document into Claude Code as your first message in a fresh session, in this project's folder. Don't summarize it, execute it. Two things happen before any HTML gets written: (1) the git check in 4.1, then (2) the photo pipeline in 4.3.

---

## 4.1 Role and Project Overview

You are building a real, studio-quality website for a real business: **Khan Chicken Point**, a roadside fried chicken and egg cart at Barota Chowk in Malaudh (also spelled Maloud), Ludhiana district, Punjab, India. This is a paid-quality build, not a template exercise. Most visitors will be on a phone, many standing within a few hundred metres of the cart, so the site has to load fast on mobile data, put the phone number and the map one tap away, and look like it belongs to this exact stall and nobody else.

**Working directory rule (non-negotiable):** Work entirely inside the root folder this Claude Code session is already running in. Do not create a new project folder inside Downloads, OneDrive, Desktop, or anywhere else, this session's current folder IS the project root. All files, images, and assets for Khan Chicken Point live inside it, and nothing gets written outside it unless you're explicitly told otherwise mid-session.

**Git and delivery rules (non-negotiable):**
- First action of the session: run `git rev-parse --is-inside-work-tree` and `git remote -v` in the root folder.
- If this is a git repo (expected remote: `github.com/realprabhvirk/khanchickenmalaudh`): commit and push everything straight to `main`. Always `main`. No feature branches, no pull requests. Push after every meaningful milestone (photo pipeline done, each page done, final QA done) with `git add -A && git commit -m "<clear message>" && git push origin main`.
- No preview URLs of any kind. No preview deployments, no preview branches, no tunnel links (ngrok, cloudflared and the like), and no "here is your preview" link in any reply. Check your work locally by opening the files and running local checks, then push to `main`.
- If this is NOT a git repo: ignore the two bullets above, don't run `git init`, don't add a remote. Just create and update the website files in place in the root folder.
- This brief file stays where it is. It is not part of the site: never link to it from a page, never delete it.

**Punctuation rule (non-negotiable):** No em dashes anywhere on the website. Not in visible copy, page titles, meta tags, alt text, JSON-LD, HTML or CSS comments, JS strings, or filenames. Normal hyphens are fine. Also avoid en dashes, use a plain hyphen for ranges. The forbidden forms are the literal long dash character, `&mdash;`, `&#8212;`, `&#x2014;`, and the JavaScript escape for U+2014 (a backslash followed by u2014). Use a colon, a comma, a full stop, or a spaced hyphen instead. Section 4.11 has the exact check to run before every push.

**The story hook (lean on this hard).** There is no brand history to dig up, so the real angle is the cart itself, and every bit of it is visible in the photos: a single stall under a big tree at Barota Chowk, a black and yellow hand-lettered board, a kadhai on the counter, a steel tray of masala-coated fried chicken, and the owner's phone number printed on the board four times. This is a landmark-led, call-the-man-directly kind of place. The site's job is to make a stranger in Malaudh recognise the cart from a distance, trust the food from the photos, and either call or walk over. Do not invent heritage, recipes, years in business, or family stories. If a claim is not in 4.2, it does not go on the site.

---

## 4.2 Client Snapshot

Everything below is either given by the client (the person commissioning the site), read off the photos, or sourced and labelled. Nothing else is assumed.

| Item | Detail | Source |
|---|---|---|
| Business name | Khan Chicken Point | Client |
| Name on the board (Gurmukhi) | ਖਾਨ ਚਿਕਨ ਪੋਆਇੰਟ | Read off the board in IMG_3254. Copy the exact spelling from the photo, not from this line, if they differ. |
| Format | Roadside food cart at a fixed spot. Not a shopfront or restaurant with seating. | Photos |
| Location | Barota Chowk, in front of Sajan Tailor, Malaudh, Ludhiana district, Punjab. PIN 141119 | Client for the landmark. PIN from a public pincode directory, verify before publishing. |
| Map pin | 30.63662 N, 75.93394 E | Client. Sanity check: lands within about 400 m of published coordinates for Malaudh town. |
| Phone | +91 78377 78270 (printed on the board as `Raj Khan : 78377-78270`) | The board itself, IMG_3253 and IMG_3254. Verify it is still live. |
| Contact name | Raj Khan, as printed next to the number. Treat as the contact. Role (owner or not) is unconfirmed. | Board |
| Email | None found | n/a |
| Website, Facebook, Instagram, Google Business Profile | None found. Searches only returned unrelated businesses called "Khan Chicken" in Delhi, Chennai, Pakistan and elsewhere. Do NOT borrow any detail from those. | Research |
| Hours | Unknown. Photos were taken at dusk and in the evening, which proves nothing about opening hours. | n/a |
| Reviews and ratings | None verifiable. No review section, no star rating, no review count anywhere on the site. | n/a |
| Town context | Malaudh is a town on the Ludhiana-Malerkotla Road, roughly 40 km from Ludhiana. | Wikipedia, secondary source, use lightly |

**What the photos prove (the only food and setting claims you may make):**
- The cart sits under a large tree on a paved roadside, with a black tarp roof, a black-navy fascia with yellow Gurmukhi lettering, a glass display counter with trays of eggs on top, printed food photos on the front panels, and a side board with a grid of about twelve dish photos.
- A large black kadhai sits on a gas burner on the counter beside the glass case, with a long-handled perforated skimmer (jhara) resting in it, and a perforated steel tray beside it.
- The fried chicken is bite-size pieces with a red-orange masala coating (IMG_3258).
- The printed panels show halved boiled eggs with garnish, gravy dishes in bowls, and fried items. Exact dish names are not confirmed (see 4.7 and 4.12).

**What you must NOT claim:** halal or jhatka status, "fresh daily", "hygienic", "secret recipe", "famous", "best in Malaudh", opening hours, delivery, advance orders, prices, years in business, or WhatsApp availability. All of these are unconfirmed.

---

## 4.3 Assets: Logo and Images

### Logo
No logo file exists, and none was found online. Do not invent a symbol or an icon-pack mark. Build a wordmark from the board's own look: the Gurmukhi name in `--sign-yellow` with the hard offset shadow, over the English "KHAN CHICKEN POINT" set in the display slab (see 4.5). Wrap it in an HTML comment `<!-- FALLBACK WORDMARK: no real logo exists, replace if the client supplies one -->` wherever it is used.

Favicon: render the single Gurmukhi letter ਖ in `--sign-yellow` on a `--board-navy` rounded square as PNGs (32, 180, 512 px) using a Gurmukhi font file in Python (Pillow). Do not use a live-text SVG favicon, system fonts may be missing.

### Photos: the six real photos
The client's six photos are sent into this session alongside this brief, named `IMG_3253.jpeg` to `IMG_3258.jpeg`. Locate them (session attachments, uploads, project root). If any are missing, stop and ask. Never substitute stock photos while these exist.

Run this pipeline BEFORE writing any page:
1. Copy the untouched originals into `/images/originals/` (never referenced by any page).
2. Look at every image, then rename, crop and process into `/images/` as lowercase-kebab-case descriptive `.jpg` plus a `.webp` twin at the same name. No camera default names survive.
3. Allowed edits: crop, resize (max 1600 px on the long edge for full-width use, 900 px for cards), mild exposure and contrast lift. Not allowed: filters that change the food's colour, added steam or glow, painting out the stall's wear, or anything that makes the food look different from what is on the tray.
4. Write `/images/manifest.json` listing each original, its new name, crop box, intended use, and alt text.

| Original | New name | What it shows | Use |
|---|---|---|---|
| IMG_3258 | `masala-fried-chicken-pieces-on-steel-tray` | Close-up of red-orange masala fried chicken on a perforated steel tray. Best food shot. | Home hero photo, OG image, menu feature |
| IMG_3257 | `kadhai-and-fried-chicken-tray-on-stall-counter` | Kadhai with skimmer, tray of fried chicken, brightest of the three kadhai shots | Home "from the kadhai" section, menu |
| IMG_3254 | `khan-chicken-point-stall-at-barota-chowk-dusk` | Full cart under the tree, board, glass counter, front food panels | Find Us recognition guide, Home landmark section |
| IMG_3253 | `khan-chicken-point-board-with-phone-number` | Close-up of the board with the number | Home phone block |
| IMG_3255 | `kadhai-and-skimmer-on-stall-counter-dusk-a` | Kadhai, murky and underexposed | Optional. Use only if it survives a mild lift, else leave out. |
| IMG_3256 | `kadhai-and-skimmer-on-stall-counter-dusk-b` | Near duplicate of the one above | Optional, never use both |

Specific handling:
- **IMG_3254:** a man in a pink turban, motion-blurred, is on the right edge. He is a passer-by or customer. Crop him out (the cart fills roughly the left 70 percent of the frame) before using the image anywhere, including the OG image. Never name or caption any person.
- **IMG_3253:** crop tight on the line of numerals and the yellow lettering below it.
- **Honest quality note:** these are phone shots at dusk. IMG_3255 and IMG_3256 are dim and show a person's torso in the background. IMG_3257 shows dark, used oil and a sooty counter. Use IMG_3258 as the star, use IMG_3257 as a supporting honest shot, and say in your final report which images you left out and why. A daylight or well-lit evening reshoot is listed in 4.12.
- Alt text must be specific and plain, for example: "Masala-coated fried chicken pieces on a perforated steel tray at Khan Chicken Point". No em dashes, no "image of".
- Generate `og-image.jpg` at 1200 x 630: `--board-navy` background, the wordmark on the left, a crop of the masala chicken photo on the right.

---

## 4.4 Required File Structure

Exactly this, no more, no less:

```
index.html
menu.html
find-us.html
styles.css
main.js
favicon-32.png, apple-touch-icon.png (180), icon-512.png
og-image.jpg
/images  (processed jpg + webp, manifest.json, /originals)
```

Vanilla HTML, CSS and JS only. No framework, no build step, no npm dependency, no bundler. One `styles.css` and one `main.js` shared by all pages, no inline styles or scripts, no per-page CSS or JS. It must work by opening `index.html` directly, or by dropping the folder on any static host. Fonts come from Google Fonts via `<link>` with `display=swap` and `preconnect`.

---

## 4.5 Design Direction

Avoid these, they are the default look of AI-built sites:

- No warm-cream background with a terracotta or clay accent and a big serif headline.
- No near-black background with a single neon-green or acid accent used everywhere.
- No hairline-rule "broadsheet" layout with dense newspaper columns.
- No centered hero with a gradient-blob background and a generic stock photo of unrelated smiling people.
- No numbered "01 / 02 / 03" feature cards unless there is a real sequence being described.
- No emoji in copy or UI, no generic icon-pack icons standing in for real photography.
- No filler marketing copy: "world-class", "premier", "unlock your potential", "passionate about delivering excellence", "mouth-watering", "crafted with love". Every claim must trace to the snapshot in 4.2.

### Colour (CSS custom properties in `:root`)
Sourced from the actual cart. Re-sample each value from the processed photos and adjust if your eye disagrees, but keep the roles.

| Name | Start value | Why it earns its place |
|---|---|---|
| `--board-navy` | `#0E1B33` | The painted fascia. Primary dark surface and the hero. |
| `--sign-yellow` | `#F1D23C` | The hand-lettered Gurmukhi on the board. Display headings and the call pill only. |
| `--dusk` | `#34507A` | The blue shadow behind the sign lettering and the dusk sky in IMG_3254. Offset text shadow, secondary dark panels. |
| `--steel` | `#E7EBEF` | Stainless counter and tray under dusk light. The light section background. Cool on purpose, not cream. |
| `--masala` | `#C6511E` | The red-orange coating on the fried chicken. Tiny accents only: small tags, hover underlines. Never a large fill. |
| `--kadhai` | `#15171B` | Iron kadhai. Body text on light surfaces. |

Check WCAG AA on every real pairing. `--masala` on `--steel` is likely borderline for body text, so keep it to large or decorative use.

### Typography
- **Display (Latin):** Alfa Slab One. Heavy slab that matches sign-painter lettering. Used for headlines only.
- **Display (Gurmukhi):** Noto Sans Gurmukhi at weight 800. Matches the weight of the painted board.
- **Body (Latin and Gurmukhi):** Mukta Mahee, 400 and 600. One family covers both scripts so mixed lines sit on the same baseline.
- Fallback stack for Gurmukhi: `"Noto Sans Gurmukhi", "Mukta Mahee", "Raavi", sans-serif`. Put `lang="pa"` on every Gurmukhi element and keep `<html lang="en">`.

### Signature element: The Board
The hero is built as the actual signboard. A `--board-navy` panel with a top strip carrying the number in white, letter-spaced, set exactly like the line on the real board (`Raj Khan : 78377 78270`), then the headline in `--sign-yellow` with a hard offset shadow `text-shadow: 4px 4px 0 var(--dusk)` (no blur), echoing the real lettering. The call button is a pill with a thin yellow outline, copied from the rounded phone badge on the left board in IMG_3254. Spend all the boldness here. Everything else stays flat and disciplined: no card shadows, no gradients, no rounded-everything.

### Motion
Sparse. One load-in for the hero lettering (8 px rise and fade), a scroll reveal on section blocks, a hover state on the pill and links. When `prefers-reduced-motion: reduce` is set, no motion at all: no transitions, no transforms, everything visible immediately.

### Mobile call bar
Below 900 px wide, show a fixed bottom bar in `--board-navy` with the outlined yellow pill `Call Raj : 78377 78270` (a `tel:` link). Add matching bottom padding to the footer so nothing is hidden, and respect `env(safe-area-inset-bottom)`. Hidden at 900 px and up.

### Quality floor
Fully responsive from 360 px up (design phone-first), visible keyboard focus on every interactive element (never `outline: none` without a replacement), real descriptive alt text on every image, semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`), one `h1` per page and correct heading order.

---

## 4.6 Location and Map

Single venue (Type A), one map only.

- Responsive iframe, no API key: `https://www.google.com/maps?q=30.63662,75.93394&output=embed`, `loading="lazy"`, `title="Map showing Khan Chicken Point at Barota Chowk, Malaudh"`, wrapped for a 4:3 ratio on mobile and 16:9 on desktop.
- Address as text next to it: "Barota Chowk, in front of Sajan Tailor, Malaudh, Ludhiana district, Punjab 141119".
- "Get directions" button: `https://www.google.com/maps/dir/?api=1&destination=30.63662,75.93394`
- "Open in Maps" text link: `https://www.google.com/maps/search/?api=1&query=30.63662,75.93394`
- Show the map on Home (compact) and Find Us (full). Never on Menu.
- Landmark line is part of the location, not an afterthought: "In front of Sajan Tailor" must appear wherever the address appears.

---

## 4.7 Page-by-Page Content Brief

### Home (`index.html`)
1. **Header.** Wordmark left (fallback wordmark, 4.3). Nav: Home, Menu, Find Us. On desktop a call pill at the right. Mobile nav toggle in `main.js`.
2. **The Board (hero).** Per 4.5. Top strip: `Raj Khan : 78377 78270`. Headline (display slab, yellow): "Fried chicken at Barota Chowk, Malaudh." Under it the Gurmukhi name ਖਾਨ ਚਿਕਨ ਪੋਆਇੰਟ in Noto Sans Gurmukhi 800. One line of body: "Kadhai-fried chicken and more, from one cart in front of Sajan Tailor." Two buttons: call pill, then "Get directions". Beside or below the board, the masala chicken photo (`masala-fried-chicken-pieces-on-steel-tray`) as a plain rectangular crop, no frame effects.
3. **From the kadhai** (light `--steel` section). Photo `kadhai-and-fried-chicken-tray-on-stall-counter` with a short paragraph, three or four plain sentences: the kadhai sits on the counter beside the glass case, the pieces come out masala-coated and rest on a perforated steel tray so the oil drains. Nothing about freshness or quality claims. Eyebrow in small caps: "At the cart".
4. **How to spot the cart** (dark `--dusk` or navy section). Photo `khan-chicken-point-stall-at-barota-chowk-dusk` (man cropped out). A plain list of what to look for, all visible in the photo: a black board with yellow Gurmukhi lettering, a large tree overhead, a glass counter with trays of eggs on top, printed food photos along the front, and Sajan Tailor behind it. Close with the landmark sentence.
5. **The number on the board.** Photo `khan-chicken-point-board-with-phone-number`, tight crop. Headline: "Call Raj." Text: "The number is printed on the board, and it's the same one here." Pill button. No claims about orders, delivery or WhatsApp.
6. **Find us (compact).** Map embed, address text, directions button, link through to `find-us.html`.
7. **Footer.** Wordmark, address with landmark, phone, nav links, "Malaudh, Punjab". No socials (none exist), no copyright dash decoration. Copyright line: "2026 Khan Chicken Point".

### Menu (`menu.html`)
Eyebrow in Gurmukhi: ਮੇਨੂ. `h1`: "Menu".
1. **Intro line.** "What's on the cart at Barota Chowk." Nothing more.
2. **The fried chicken.** Feature block with `masala-fried-chicken-pieces-on-steel-tray`. Name: "Fried chicken". Description from the photo only: bite-size pieces, masala coating, fried in the kadhai.
3. **Also on the cart.** A plain list. Open the processed `IMG_3254` and read the front panel and the side board. Add ONLY dish names you can read or identify with confidence (boiled eggs are certain: egg trays on the counter and a halved-egg panel). For every dish you cannot identify, do not guess: leave it off. List what you left off in your final report so the client can supply names.
4. **Prices.** No price column and no invented numbers. Build each item row so a price can be added later by editing one element. Under the list: "Prices and what's ready today: call Raj on 78377 78270." with the pill. This line is a default and is flagged in 4.12.
5. **Footer** as Home.

### Find Us (`find-us.html`)
Eyebrow in Gurmukhi: ਸਾਨੂੰ ਲੱਭੋ. `h1`: "Find us at Barota Chowk".
1. **Map and address.** Full-width map, address text with the landmark, directions button, "Open in Maps" link.
2. **What to look for.** The recognition photo with the same visible-landmark list as Home section 4, expanded slightly: board colours, tree, glass counter, front panels, Sajan Tailor.
3. **Getting there.** Two or three plain sentences: Malaudh is on the Ludhiana-Malerkotla Road, about 40 km from Ludhiana, and the cart is at Barota Chowk. Nothing about bus routes, parking, or timings (unknown).
4. **Call.** Pill with the number and Gurmukhi label ਕਾਲ ਕਰੋ next to it.
5. **Footer.**

**Gurmukhi policy.** Gurmukhi appears only as: the business name (copied from the board), the three eyebrow labels above (ਮੇਨੂ, ਸਾਨੂੰ ਲੱਭੋ, ਕਾਲ ਕਰੋ), and the wordmark. Do not write other Gurmukhi sentences. All Gurmukhi strings are flagged for a native-speaker proofread in 4.12.

**Contact decision:** no contact form and no backend. Contact is click-to-call and the map only.

---

## 4.8 Copy and Tone

Write like someone who works at the cart, not like an agency. Plain, active, specific. Short paragraphs, no stacked adjectives, every claim traceable to 4.2.

Bad: "Experience the authentic taste of mouth-watering, freshly crafted fried chicken, made with passion and tradition."

Good: "Chicken fried in a kadhai at Barota Chowk. Look for the black and yellow board in front of Sajan Tailor."

Bad: "Your journey to flavour starts here."

Good: "Call Raj on 78377 78270 to ask what's ready."

Use the place names naturally for local search: Malaudh, Maloud, Barota Chowk, Sajan Tailor, Ludhiana district. No keyword stuffing.

---

## 4.9 `main.js` Required Functionality

- Accessible mobile nav toggle: button with `aria-expanded` and `aria-controls`, operable by keyboard, closes on outside click and on Escape, returns focus to the toggle.
- Smooth scroll for on-page anchors, disabled when `prefers-reduced-motion: reduce`.
- Scroll-triggered reveal using `IntersectionObserver`, with a no-JS fallback (content visible by default, JS adds the hidden state). Fully off under reduced motion.
- Hero load-in animation, same reduced-motion rule.
- Mark the current page link in the nav with `aria-current="page"`.
- Phone links are plain `tel:+917837778270` anchors. No JS needed, but add a visible text number next to every pill so desktop users can read it.
- No form handling, no lightbox (there is no gallery), no analytics, no third-party scripts.

---

## 4.10 Technical, SEO and Accessibility Checklist

- Semantic HTML5 everywhere, valid markup, one `h1` per page, logical heading order.
- `<picture>` with `.webp` source and `.jpg` fallback, explicit `width` and `height`, `loading="lazy"` on everything below the fold, the hero photo eager with `fetchpriority="high"`. Target under 1 MB total on first paint of Home.
- Unique `<title>` and meta description per page. Use a pipe or hyphen, never a long dash:
  - Home: `Khan Chicken Point | Fried Chicken at Barota Chowk, Malaudh`
  - Menu: `Menu | Khan Chicken Point, Malaudh`
  - Find Us: `Find Us | Khan Chicken Point, Barota Chowk, Malaudh`
- Open Graph and Twitter card tags using `og-image.jpg`. The domain is not decided, so leave `og:url` and canonical tags out, and do not invent a domain. No `sitemap.xml` for the same reason.
- `FoodEstablishment` JSON-LD on Home: name, telephone `+91-78377-78270`, geo `30.63662, 75.93394`, address (streetAddress "Barota Chowk, in front of Sajan Tailor", addressLocality "Malaudh", addressRegion "Punjab", postalCode "141119", addressCountry "IN"). No `aggregateRating`, no `openingHours`, no `priceRange`, no `sameAs`.
- Favicon and apple-touch-icon linked on every page.
- Visible focus outlines, `aria-label` on any icon-only control, skip link to `main`.
- WCAG AA contrast checked on the real palette from 4.5.
- No console errors, no broken links, no unused CSS at handoff.

---

## 4.11 Definition of Done

Run and confirm each of these before the final push:

- [ ] Git check done at session start, and if it is a repo, every commit is on `main` and pushed. No branches, no PRs, no preview URLs anywhere in replies or files.
- [ ] **Em dash check passes.** From the root, run `grep -rn $'\xe2\x80\x94' --exclude-dir=.git .` and expect zero hits. Then run `grep -rniE "&mdash;|&#8212;|&#x2014;|\\\\u2014" --exclude-dir=.git --exclude=khan-chicken-point-website-prompt.md .` and expect zero hits. Fix anything found, then rerun.
- [ ] All six client photos accounted for in `manifest.json`, renamed, with webp twins. IMG_3254 is cropped so no person is visible. Any photo left out is named in the final report with a reason.
- [ ] Wordmark is the styled fallback with the HTML comment, palette and fonts come from section 4.5, hero is the signboard.
- [ ] The map pin is exactly 30.63662, 75.93394 in the embed, the directions link and the JSON-LD. The words "in front of Sajan Tailor" appear beside every address.
- [ ] Phone is `tel:+917837778270` everywhere and displayed as `78377 78270`. The mobile call bar works and does not cover the footer.
- [ ] Tested at 360, 768 and 1280 px widths. Keyboard-only walk-through done. Reduced-motion tested.
- [ ] No lorem ipsum, no stock photos, no invented menu items, prices, hours, reviews, or claims from the "must NOT claim" list in 4.2.
- [ ] Gut check: if this layout could carry another business's name and logo and still work, revise it. It must be recognisably this cart: the board, the kadhai, the tree, the chowk.

---

## 4.12 Open Items to Confirm With the Client Before Launch

Nothing below is assumed anywhere in the build. Report these back in your final message so they can be chased.

1. **Permission.** Confirm Raj Khan has approved the site, the use of his number, and the use of the photos of his cart.
2. **Phone number.** Taken from the board. Confirm it is current, and whether it is on WhatsApp (no WhatsApp link was added).
3. **Opening days and hours.** Not published anywhere, so nothing is shown.
4. **Menu and prices.** Dish names on the printed panels were not fully readable. Get the real list and prices, then add them to `menu.html`.
5. **Orders.** Does the cart take advance orders, takeaway calls, or delivery? None of it is claimed.
6. **Halal or jhatka.** Customers in Punjab may ask. Not stated on the site until confirmed.
7. **Spellings.** The client wrote "Barota Chawnk". The brief uses the standard "Barota Chowk". Confirm which the locals use. Also confirm "Sajan Tailor" and the exact Gurmukhi spelling of the business name on the board.
8. **Gurmukhi proofread.** The strings ਮੇਨੂ, ਸਾਨੂੰ ਲੱਭੋ, ਕਾਲ ਕਰੋ and the name ਖਾਨ ਚਿਕਨ ਪੋਆਇੰਟ need a Punjabi speaker's check. A full Punjabi version with a language toggle is a possible phase two.
9. **PIN code 141119.** Taken from a public pincode directory, verify.
10. **Photo quality and rights.** Current photos are dim phone shots at dusk, one with a customer in frame. A well-lit evening or daytime reshoot of the cart, the kadhai in use, and a plated portion would lift the site a lot. Confirm who took the existing photos and that they can be published.
11. **Person's role.** "Raj Khan" is a printed contact name. Whether he is the owner is unconfirmed, so the site only says "Call Raj".
12. **Domain and hosting.** Not decided. `og:url`, canonical tags and `sitemap.xml` are skipped until a domain exists.
13. **Online presence.** No Google Business Profile, Facebook or Instagram was found for this cart, so there are no reviews to show. Setting up a Google Business Profile with the same pin is the obvious next step but is outside this build.
14. **Town context.** The "about 40 km from Ludhiana on the Ludhiana-Malerkotla Road" line comes from Wikipedia. Fine for light context, verify if it is made prominent.
