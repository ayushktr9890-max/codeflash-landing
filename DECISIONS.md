# DECISIONS.md — CodeFlash Landing Page

## 1. Why this approach over the obvious alternative?

I picked a fully static HTML/CSS/JS stack instead of a component framework (React, Vue, etc.)
for one reason: zero build tooling between me and a deployed URL. No `npm install`,
no bundler config, no hydration overhead. The page is a single folder — open `index.html`
and it runs. For a landing page with no dynamic data requirements, a framework would have
added complexity without adding value.

For animations I used the native `IntersectionObserver` API instead of a library like AOS
or GSAP. This keeps the JS footprint near zero and means I can explain exactly what every
line does — no black-box behavior.

## 2. One trade-off made under the time limit

The product demo section uses a static mock diff card with a typewriter effect — not an
actual live code analysis. Given a real week, I'd wire it to a small backend (FastAPI or
Node) that accepts a code snippet, runs a real AST-based check (e.g., using Python's `ast`
module to detect f-string SQL interpolation), and streams the comment back to the UI.

That would turn the demo from "looks real" to "is real" — a much stronger signal.
I'd also add a second demo tab where visitors paste their own snippet and see a live review.

## 3. Where I used AI tools and what I verified / changed

I used Kiro (AI assistant) to scaffold the initial HTML structure, CSS custom properties,
and the Intersection Observer boilerplate.

What I personally reviewed and adjusted:
- Verified every ARIA attribute (`aria-expanded`, `aria-modal`, `aria-labelledby`,
  `role="dialog"`) is semantically correct and the focus trap on the easter egg modal
  actually works
- Confirmed the Konami Code sequence implementation handles edge cases: a 2-second
  inter-key timeout to reset progress, and a partial-match restart (if the first key
  of a failed attempt matches the start of the sequence, it counts as step 1)
- Checked the CSS diff highlighting logic — the flagged line class uses `border-left`
  rather than `background` alone, so it reads as intentionally marked rather than just
  a different colour
- Verified no fake testimonials, fake user counts, or fake logos appear anywhere on the page
- Tested responsive layout at 390px (iPhone 14 width) and 1440px by hand
