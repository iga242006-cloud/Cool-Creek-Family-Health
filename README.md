# Cool Creek Family Health — Demo Website

Multi-page static demo site (HTML/CSS/JS, no frameworks, no build step) for
Cool Creek Family Health, a Direct Primary Care practice in Carmel, Indiana.

**Deploy:** drag this `coolcreek-demo` folder onto [Netlify Drop](https://app.netlify.com/drop).
The contact form is Netlify-Forms-ready (`data-netlify="true"`) and `_headers`
sets long-lived caching for assets and fonts.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, award badge, DPC explainer, provider intro, reviews, employer teaser |
| `about.html` | Founder story, team bios, "Why Cool Creek" naming story, recognition |
| `membership.html` | Pricing, what's included, DPC explainer, FAQ accordion (+ FAQPage schema) |
| `employers.html` | DPC as a small-business benefits alternative |
| `contact.html` | NAP, meet-and-greet form, map placeholder |
| `404.html` | Not-found page |

## ⚠️ Placeholders to swap before client review

The original brand assets were not available in the build environment, so
brand-accurate stand-ins were generated from the brief. **Replace these two
files with the real ones (same filenames — nothing else needs to change):**

- `assets/logo.png` — currently a rendered recreation of the teal
  stethoscope-heart mark + wordmark (880×220, transparent). Drop in the real
  logo at the same path.
- `assets/farah-hero.jpg` + `assets/farah-hero.webp` — currently a branded
  gradient placeholder (1300×1625, 4:5). Drop in the real headshot of Farah
  Myers, FNP, cropped to 4:5, and re-export a WebP alongside it
  (e.g. `cwebp -q 78 farah-hero.jpg -o farah-hero.webp`).

Also generated from the mark: `assets/favicon.png`, `assets/apple-touch-icon.png`,
`assets/aria-avatar.webp`, `assets/og-image.jpg` — regenerate from the real
logo if desired.

**Membership pricing** (`membership.html` and the ARIA widget in `js/aria.js`)
uses sample rates — Kids $30 / Adults $79 / Seniors $99 per month — marked
"sample pricing for demonstration" on the page. Confirm real rates with the
practice and update both files. Review carousel quotes are paraphrased from
common review themes, not verbatim quotes.

**Canonical URLs / sitemap** point at `https://coolcreekfamilyhealth.com`.
Update the base URL if deploying to a different production domain.

## Pavlina services demonstrated

1. **Website Optimization** — conversion-focused multi-page build; inlined
   critical CSS, deferred stylesheet/JS, self-hosted preloaded fonts,
   explicit image dimensions, lazy-loaded below-fold images, semantic HTML,
   MedicalBusiness/FAQPage/Person schema, per-page local-intent titles and
   descriptions, OG/Twitter cards, sitemap + robots.
2. **Google Reviews** — testimonial carousel on the home page plus Google
   Reviews read/leave CTA widgets.
3. **ARIA** — scripted AI receptionist demo (`js/aria.js`), lazy-loaded on
   first click, keyword-matched answers (pricing, inclusions, insurance/HSA,
   scheduling, employers, house calls, bilingual care) with quick-reply chips,
   keyboard navigable (Esc closes, focus returns to launcher).

## Accessibility & performance notes

- WCAG 2.1 AA contrast: teal `#0E7276` is used for interactive text (5.3:1 on
  the warm paper background); brand teal `#14969B` only at large sizes;
  coral `#E8836B` is decorative, with `#B54A2E` for coral text on light.
- Visible `:focus-visible` outlines, skip link, single H1 per page,
  `prefers-reduced-motion` respected, `aria-live` chat log.
- No external requests at all — fonts, images, CSS and JS are self-hosted.
