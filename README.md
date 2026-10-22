# Columbia, Tennessee — Destination Website

A responsive multi-page destination website for Columbia, Tennessee built with React, Vite, Tailwind CSS, React Router, Framer Motion, GSAP, and ScrollTrigger.

## Visual direction

- Instrument Serif display headlines + Inter for body text, navigation, and UI.
- Bright white canvas, sky-blue gradients, river/forest-green accents, a subtle film-grain texture, and generously spaced editorial grids.
- Locally bundled generated editorial imagery for downtown, heritage-style architecture, a river landscape, and community events. These images are illustrative AI-generated artwork, not documentary photographs; replace them with licensed, authentic destination photography before official launch.
- GSAP text reveals, ScrollTrigger section entrances, image reveals, hero parallax, and reduced-motion support.
- Responsive navigation/mobile drawer, reusable interior-page layouts, interactive itinerary planner, FAQ accordion, support form, and a custom 404 page.

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Routes

- `/` — Home
- `/about` — About Columbia
- `/heritage` — Heritage
- `/historic-square` — Historic downtown square
- `/attractions` — Things to do and outdoors
- `/events` — Events and traditions
- `/getting-here` — Directions and Welcome Center information
- `/plan-your-visit` — Interactive itinerary planner
- `/support` — Visitor support/contact
- `/faq` — FAQs
- `/privacy` — Privacy
- `/culture`, `/things-to-do`, `/visit-columbia`, `/map` — Friendly redirects to the current routes
- Unknown paths — Custom not-found page

Vercel and Netlify fallback configuration is included for direct navigation to nested routes.

## Important launch checks

- The contact form is front-end only: it validates the fields and prepares an email draft; it does not submit to a server. Connect it to the approved destination organization system before launch.
- The itinerary planner creates a suggested plan, not reservations. Visitors should confirm opening hours, event dates, weather, and availability.
- Verify all official links, contact information, opening hours, events, and visitor claims before publishing as an official government/state destination site.
- The AI-generated destination images are concept art only and should be replaced with licensed local photos where accurate representation matters.
