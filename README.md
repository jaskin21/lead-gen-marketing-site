# Brightly Digital — Marketing Landing Page

A production-style marketing website built for a technical assessment: a responsive landing page with a working lead-generation flow, a simulated CRM integration, and marketing tracking (GTM + Meta Pixel).

**Live site:** _[add deployed frontend URL]_
**Live API:** _[add deployed backend URL]_

## Overview

The project is split into two independently deployable apps:

- **[`frontend/`](./frontend/README.md)** — Vite + React landing page, lead form, and all tracking logic. See its README for component structure, form implementation, tracking details, and SEO/performance work.
- **[`backend/`](./backend/README.md)** — Express API that validates leads and simulates a CRM hand-off. See its README for API documentation, middleware, and the CRM integration implementation.

No database — lead persistence isn't required by the brief; the simulated CRM is the system of record. No authentication — this is a public marketing page.

## Feature Summary

- Responsive landing page: hero, services, testimonials, pricing, lead form, footer
- Client + server-validated lead form with loading/success/error states and duplicate-submission protection
- Simulated CRM hand-off with credential protection and an on-demand failure mode
- GTM + Meta Pixel tracking, with the conversion event firing only on confirmed success
- Per-route SEO metadata, lazy-loaded routes, Lighthouse-tested performance

## Technology Choices

| Layer      | Stack                                       | Why                                                      |
| ---------- | ------------------------------------------- | -------------------------------------------------------- |
| Frontend   | Vite + React + TypeScript + Tailwind v4     | Fast tooling, type safety, no heavy design system needed |
| Forms      | react-hook-form + zod                       | Minimal re-renders; schema reused server-side            |
| State      | Zustand (minimal)                           | One shared flag (`hasSubmitted`); everything else local  |
| Backend    | Express + TypeScript                        | Enough structure for one real endpoint                   |
| Deployment | Vercel/Netlify (frontend), Render (backend) | Free tiers, no card required                             |

Full rationale for each choice is in the respective subfolder README.

## Architecture Decisions

- **Two independently deployable apps, one repo.** The frontend only knows the backend via a public URL (`VITE_API_URL`) — either side can be redeployed without touching the other.
- **One real API route** (`POST /api/lead`) — no speculative extra endpoints.
- **Validation exists in two places on purpose** — instant client-side feedback, plus server-side re-validation so the API never trusts the client alone.

## Form / API Flow (summary)

User fills form → client validation → `POST /api/lead` → server re-validation → duplicate check → simulated CRM call → JSON response → UI reflects idle/loading/success/error. Full request/response documentation is in [`backend/README.md`](./backend/README.md).

## CRM Integration Approach (summary)

The backend simulates sending each lead to a CRM (e.g. HubSpot): shapes the payload correctly, keeps the API key server-side only, and can force a failure on demand for testing. Implementation detail and code walkthrough: [`backend/README.md`](./backend/README.md#crm-integration).

## Tracking Implementation (summary)

All tracking calls are centralized in one frontend file. The Meta conversion event fires only after a confirmed successful submission — never on click. Full event table and verification method: [`frontend/README.md`](./frontend/README.md#tracking-implementation).

## Debugging Approach

**Reported issue:** "Marketing says we're receiving leads, but Meta is showing fewer conversions than the number of successful form submissions."

### What I Would Check First

Reproduce the gap myself before touching any config: submit a batch of test leads through the real flow and compare that count against the backend/CRM log for the same window. This confirms whether the problem is genuinely at the tracking layer, or whether some submissions marketing counts as "successful" aren't actually reaching a real success state.

### Browser/Network Tools

- **DevTools Console** — inspect `window.dataLayer` after each user action to confirm events are queued in the right order
- **Network tab** — filtered to `facebook.com/tr` and `googletagmanager.com`, to confirm requests actually leave the browser
- **Meta Pixel Helper** (browser extension) — flags exactly which pixel events fired, including duplicates or misfires, directly in its panel

### GTM Configuration

Open GTM's Preview mode and step through the exact user journey. Confirm the Meta Pixel "Lead" tag's trigger condition matches the `form_submitted` event name exactly (event names are case-sensitive) and is configured to fire on that event specifically — not on button click, not on page load, not on a generic "form interaction" trigger that could fire too early.

### Meta Events Manager

Compare Events Manager's real-time event log against the backend's lead log for the same time window. Use the "Test Events" tool while manually submitting a test lead to watch the event arrive live, which confirms end-to-end delivery rather than just client-side firing.

### Possible Duplicate or Missing Events

- **Missing:** the pixel is blocked by an ad blocker or Safari's Intelligent Tracking Prevention, a Content Security Policy is blocking the request, or a GTM trigger mismatch means the tag never fires at all.
- **Duplicate:** the same conversion fires from two places at once — e.g. a hardcoded `fbq('track','Lead')` call _and_ a GTM-configured tag both firing for the same submission. This would actually show _more_ conversions than leads, the opposite of the reported symptom, which helps rule this direction in or out.

### Possible Frontend/Backend Issues

- **Frontend:** the tracking call fires optimistically on click, before the API confirms success, so it can fire even when the actual submission fails downstream.
- **Backend:** the API returns `200` even though the CRM call actually failed internally — a false-positive success response. This would explain leads being counted as "received" by marketing without a genuine successful conversion for Meta to register, which directly matches the reported symptom.

### How I Would Verify the Final Fix

Submit a fixed, known number of test leads through the real flow. Confirm that exact number appears in both the backend's lead log and Meta Events Manager's real-time count for the same window, with no duplicates and no gaps. Repeat once more after a short delay to rule out a timing fluke before considering it resolved.

**Demonstrated via:** `window.dataLayer` inspection in the browser console, the Meta Pixel Helper extension confirming the `Lead` event fires only after a genuinely successful submission (and does not fire on an invalid one), and the Network tab confirming the actual outbound request to `facebook.com/tr`. Screenshots of all three are included in this submission.

## Scaling to 10 More Campaign Pages

- Extract the page into a reusable `<CampaignPage config={...} />` template — sections already accept props rather than hardcoded copy.
- Move content into typed config objects or a headless CMS (e.g. Sanity) so new campaigns are a data change, not a code change.
- Tracking and design stay consistent automatically, since every campaign page renders through the same shared components.

## Assumptions and Limitations

- No database — the CRM is the system of record; no persistence layer required.
- Duplicate-submission guard uses in-memory backend state — resets on restart, wouldn't scale across multiple instances (production fix: Redis).
- GTM/Meta Pixel IDs are placeholders (no real ad accounts for this assessment); event logic verified independently via console + Meta Pixel Helper.
- Safari occasionally doesn't fire React's input events on autofill, requiring one manual interaction before validation recognizes the value — known browser quirk, not addressed further given scope.
- No authentication — not required for a public marketing page.

## What I Would Improve With Additional Time

- Move content into a headless CMS to fully realize the "10 landing pages" scenario.
- Redis-backed rate limiting for correctness under multiple server instances.
- A real GTM container with Preview-mode-verified tags.
- Automated tests (Vitest/Jest) for validation and CRM service branches.
- A consent-management step before firing tracking scripts.
