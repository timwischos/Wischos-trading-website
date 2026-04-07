# Wischos Gift Trading - AI Context & Project Knowledge

*This file is intended to give AI assistants a rapid, comprehensive onboarding into the project's business model, tech stack, and design aesthetic so they can immediately match the tone and technical requirements without needing to read the entire codebase.*

## 1. Business Model & Audience
- **Core Offering:** High-end, custom-branded metal gifts (Writing Instruments, Desk Accessories, EDC Accessories, Drinkware) and curated Gift Sets.
- **Target Audience:** Corporate buyers, HR teams (employee gifting), PR agencies, and event planners. We are explicitly **not** targeting retail/B2C, but we also want to avoid overly rigid "B2B wholesale" terminology that might alienate premium buyers.
- **Key Proposition:** "Sourced close to the factory. Priced without the layers." We handle the entire project from inquiry to delivery.
- **Constraints:** Minimum Order Quantity (MOQ) is strictly 100 sets/units. Every piece leaves the factory marked with the client's logo (we don't sell our own branded products).

## 2. Design Aesthetic & Tone
- **Visual Style:** Editorial, minimalist, stark, premium, and highly restrained.
- **Color Palette:** Pure black (`#0a0a0a`, `#0d0d0d`), pure white, various shades of cool/neutral grey for text/borders, and a signature **copper/brass accent** (`--accent-brand` or `#B87333`).
- **Layouts:** Heavy use of hairline borders (`1px solid var(--grid-color)`), architectural grid layouts, generous negative space, and uppercase tracked-out micro-typography for labels (e.g., `letterSpacing: '0.14em'`).
- **Photography:** "Raw" editorial still-life. High contrast, directional lighting, deep shadows. We prefer conceptual tension and "material potential" over busy lifestyle shots.
- **Copywriting:** Quiet, confident, objective. No marketing fluff, no exclamation marks. We state facts (e.g., "Defined by utility and material substance", "Six pre-designed sets").

## 3. Tech Stack & Architecture
- **Framework:** React 19 + Vite.
- **Routing:** TanStack Router (`@tanstack/react-router`). Routes are file-based inside `src/routes/`. Dynamic routes use `$` syntax (e.g., `src/routes/{-$locale}/gift-sets/$setId.tsx`).
- **Styling:** Primarily highly-controlled **Vanilla CSS via inline styles** for structural layouts and grid borders. There is a `styles.css` / `globals.css` for root variables.
- **Data/Content:** Currently file-based. Content lives in `.ts` files inside `src/content/` (e.g., `giftSets.ts`, `products.ts`, `homepage.ts`).
- **Assets/Images:** Images are hosted on **Cloudinary** (`dcivh8ovs`). The project uses a utility `cloudinaryUrl()` in `src/lib/cloudinary.ts` to transform local paths into Cloudinary URLs on the fly with automatic formatting (`f_auto,q_auto`). There are upload scripts in `scripts/upload-to-cloudinary.ts`.

## 4. Key Pages & Routes
- `/`: Homepage (Hero, Featured Products, Why Us, Differentiators).
- `/products`: Full product grid (formerly just raw products).
- `/gift-sets`: Curated combinations of products (formerly `/featured`).
- `/about`: Details the process ("From Inquiry to Delivery") and sourcing philosophy. Anchor `#how-it-works` points to the timeline video.
- `/contact` / `/inquiry`: For submitting RFQs (Requests for Quote).

## 5. Coding Rules for AI
- **DO NOT** import generic Tailwind classes unless explicitly already used in that specific component. Match the existing inline-style grid architecture perfectly.
- **DO NOT** use generic placeholder images from unsplash/placeholder.com. Generate or describe high-end Cloudinary path placeholders.
- **ALWAYS** check `src/content/` before hardcoding data into components.
- **ALWAYS** use TanStack Router's `<Link>` component with strongly typed `to` props (e.g., `to={'/about' as RouterTo}`).
