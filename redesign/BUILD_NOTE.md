# FL + Eous website redesign - STAGED DRAFTS (not published)

Frame: Spin-off, 2026-09-10 (afternoon EES). Owner: Eous. Scoping default taken: (A) one company site with a dedicated Eous product area; a clean path to a standalone Eous domain later (the /eous page is self-contained and lifts out whole).

## What is in this folder (redesign/ - OUTSIDE public/, so nothing here is served)

| File | What it is |
|---|---|
| design-system.html | Tokens + components + motion/access rules + the locked framing rules as a guardrail page |
| index.html | Redesigned HOME |
| eous.html | NEW Eous product page (what it does / how it works / who it is for / honest edges / see it work) |
| about.html | The 9/10 honest rebuild of About, designed (same facts, same lineage, same 94/83/45) |
| styles.css | The design-system stylesheet on its own (each page also inlines it, so every draft is self-contained) |
| shots/ | Full-page renders of each draft (1280px) and the phone render of home (400px) |

## Before / after (home)

BEFORE (live public/index.html, commit 56c4622): centered 100vh hero on a dark radial gradient with a breathing hero image, centered copy throughout, Source Sans 3 body, every section the same width and rhythm; the residual private name in the body copy ("built with Ember", index.html:264) and a `twitter:site` handle carrying it (line 16); nav points at partnerwith.ai for "Eous" with no product page on the site.

AFTER (redesign/index.html): left-aligned asymmetric hero with the site's one signature object beside it - the verification receipt (a real Agent4Science record: Tammes beats reference, Thomson and difference bases are credited reproductions, the reversed result is listed as a loss); the four-habit creed as cards; the product as a dark band with three Garamond stats; the businesses directory (Braun Law + "listed only once real"); the research framed by a confidence rail with the 45% row carrying the only hot accent, and the lineage credited by name in the callout; cooperative + founder; one closing CTA. No private name anywhere (grep: only "member"/"remembers"). The `twitter:site` tag is dropped. Nav now carries Home / Eous / How it works / Businesses / Research / About + the "Partner with Eous" pill.

## The design system, in one paragraph

Brand hues kept and sharpened: Iron #141A24, Parchment #F1ECE2, Brass #A8864F (structure: rules, labels, links), Heat #D95B1E (spent on the primary action and the one key number, nowhere else), Slag #6C7078. Type: Cormorant Garamond display (brand equity kept), IBM Plex Sans body (replaces Source Sans 3), IBM Plex Mono reserved for the verification receipt and eyebrows. 1.250 type scale on a 17px base, 4px spacing, 64ch measure, 1180px wrap. Light and dark themes through tokens. Motion: one hero rise + 2px hover lifts, all removed under prefers-reduced-motion. Contrast: ink/parchment 13.9:1; brass is label-only.

## Constraint check (locked rules, section 4 of the charter)

- Private dyad name: 0 occurrences across the four drafts (verified by grep; hits are "member"/"remembers").
- "structurally parallel" / Einstein: 0 occurrences in the drafts.
- Confidence: 45% literal truth stated on home, about, eous (as "not the theory"), and the design-system rail.
- Lineage credited by name on home and about: Spinoza, Bohm, Zurek, Penrose and Hameroff, Goff, Tononi.
- Claims: every result, business, and record on the drafts already appears on the live site (A4S boards, the reversed result, Braun Law, the cooperative facts, the ten provisionals, CITI/MIMIC-IV). No testimonials, logos, or new credentials were added.
- Hero image: the live maji2-hero.png is not used (a substrate-named asset on the public face); an original inline mark (anvil + spark) stands in. Swap for a real Eous mark when one exists.

## Residual drift found on the LIVE site while reading it (outside this frame, named here, not fixed)

1. public/index.html:264 still says "built with Ember" and line 16 carries `twitter:site @EmberLucidity`; the JSON-LD `sameAs` also carries x.com/EmberLucidity. The redesign clears the copy; the X handle is a real account and is Greg's call (drop, or point to a non-Ember handle).
2. public/framework.html:155 still says NPR "makes a structurally parallel claim" to E = mc2 and line 204 carries "Units: Embers (Em)". That is the framework page, not the papers; it breaks locked rule 4 on a live page. The research papers and the Codex keep their author credit and their own text (published works).
3. The box's checkout of forgedlucidity-site was behind origin/main (at 3e34d02; origin at 56c4622). Fast-forwarded on sight; the box now matches what is live.

## What publishing would take (Greg's hand)

1. Approve the direction (or pick the parts that work) from the four drafts.
2. Move the approved files into public/: redesign/index.html -> public/index.html; redesign/about.html -> public/about.html; redesign/eous.html -> public/eous.html; nav links use clean URLs (/eous, /about, /how-it-works) which vercel.json already serves via cleanUrls.
3. Extend the same nav/footer to how-it-works, businesses/, research/ (a second frame: apply the system to the remaining pages).
4. Commit on main and fire the ember-caretaker-deploy hook (or Greg's recorded word and Eous fires it).

## Seal (from the charter)

Within the frame, Greg approves the redesign DIRECTION from the staged drafts, or picks the parts that work. LOSS = Greg judges the redesign no better than what is live, or it breaks a locked constraint. Sunset 2026-09-24.
