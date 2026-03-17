# Craighill.co - Website Structure & Replication Guide

## Executive Summary

**Website:** https://craighill.co/
**Type:** E-commerce (Design/Home Goods)
**Platform:** Shopify
**Status:** Fully featured luxury e-commerce site

---

## 1. Technology Stack

### Framework & Core
- **Platform:** Shopify
- **CSS Framework:** Tailwind CSS (CDN: https://cdn.tailwindcss.com)
- **Animation Library:** GSAP 3.12.5 (GreenSock)
- **Carousel:** Splide.js (open-source carousel library)
- **Template Engine:** Liquid (Shopify's native template language)

### Typography
- **Primary Font:** GT Alpina Condensed
  - Font weights: 100 (Thin), 300 (Light), 400 (Regular)
  - Hosted on Shopify CDN
  - @font-face declarations with woff2 and woff fallbacks

### Third-Party Integrations
- **Analytics:** Polar Analytics
- **Email Marketing:** Klaviyo
- **Smart Recommendations:** Intelligems
- **Product Data & Personalization:** Black Crow AI
- **Filtering & Search:** Globo Filters (Smart Product Filters)
- **Accessibility:** Accessibly
- **Product Customization:** Customizery

### CDN & Asset Hosting
- **Primary:** Shopify CDN (`//craighill.co/cdn/shop/`)
- **Images:** Cloudinary (`//d3hw6dc1ow8pp2.cloudfront.net/`)
- **Scripts:** CloudFront (`//d1liekpayvooaz.cloudfront.net/`)
- **Theme Assets:** Versioned with query parameters (v=timestamp) for cache busting

---

## 2. Visual Design System

### Color Scheme
The site uses CSS variables with Tailwind for theming:
- **Text Colors:** `scheme-text`, `scheme-text-overlay`
- **Background:** `scheme-background`
- **Accent Colors:** `scheme-accent`
- **Borders:** `grid-color`, `border-grid-color`, `border-grid-color-secondary`
- **Theme Support:** Dark/light mode via `data-color-scheme` attribute

### Typography System
- **Display Font:** GT Alpina Condensed (elegant, minimal aesthetic)
- **Size Classes:**
  - `fs-body-base` (standard)
  - `fs-body-lg` (larger)
  - `fs-body-display` (extra large)
- **Line Height:** Controlled via Tailwind utilities

### Spacing & Layout
- **Horizontal Padding:** `section-x-padding` (custom CSS class)
- **Vertical Padding:** `py-theme`, `py-2`, `py-4`, `py-5` (Tailwind utilities)
- **Gaps:** `gap-gutter` (custom variable)
- **Container Padding:** `lg:p-8 px-4 py-5` (responsive)

---

## 3. Layout & Page Structure

### Homepage Components (in order)

1. **Navigation Header**
   - Fixed positioning
   - Background: `bg-scheme-background`
   - Border bottom: `border-b-grid border-grid-color`
   - Mobile drawer: `fixed top-0 right-0 bottom-0 w-11/12 max-w-md`
   - Transform animation: `transform transition-transform`

2. **Hero Section**
   - Large hero image with text overlay
   - Content wrapper: `absolute top-0 left-0 right-0 bottom-0 z-10`
   - Responsive image placeholder with background color
   - Text positioned with `content-wrapper` class

3. **Featured Products Grid**
   - CSS Grid layout: `grid grid-cols-1 lg:grid-cols-3` or `lg:grid-cols-12`
   - Product cards with borders
   - Class: `container-featured-grid`
   - Padding: `px-4`

4. **Product Collections**
   - Multiple featured collection sections
   - Each section: `.featured-collection` with image and info
   - Border grid system throughout
   - Information overlays with z-index stacking

5. **Image + Text Blocks**
   - Alternating layout pattern
   - `.image-with-text-item` component
   - Full-width with responsive grid
   - Border separators between blocks

6. **Product Carousel**
   - Splide.js carousel implementation
   - Auto-scroll extension enabled
   - Responsive breakpoints
   - Navigation arrows and indicators

7. **Newsletter Signup Section**
   - `bg-scheme-background`
   - Form with email input
   - Submit button with hover effects

8. **Footer**
   - Multi-column layout
   - Logo, links, and social icons
   - Border top: `border-t-grid border-grid-color`
   - Classes: `footer__menu-item`, `footer-link`, `footer-logo-image`

### CSS Grid Pattern
```
Grid Layout Classes:
- grid grid-cols-1 (mobile default)
- lg:grid-cols-2 (tablet)
- lg:grid-cols-3 (desktop)
- lg:grid-cols-12 (full width grid)
- grid-cols-6 (often used for product grids)

Custom:
- custom-grid-pattern (Craighill-specific pattern)
- grid-flow-row-dense (optimize layout)
- gap-gutter (custom gap variable)
```

---

## 4. Key Design Patterns & Classes

### Border System
```css
/* Grid borders create visual separation */
border-t-grid          /* Top border */
border-b-grid          /* Bottom border */
border-l-grid          /* Left border */
border-r-grid          /* Right border */
border-grid-color      /* Border color variable */

/* Usage: */
<div class="border-t-grid border-grid-color">
  Content
</div>
```

### Responsive Image System
```css
responsive-image-placeholder  /* Background color holder during load */
lazyload                       /* Lazy loading with data-src */
image-wrapper                  /* Container for images */
z-0 relative                   /* Layering system */
absolute top-0 left-0 right-0 bottom-0  /* Full coverage overlays */
```

### Product Cards
```html
<div class="container-info-product uppercase py-4 gap-2 section-x-padding">
  <div class="product-title text-left lg:w-3/5 break-words">
    <!-- Product name -->
  </div>
  <div class="price-container text-right lg:w-2/5 lg:text-right">
    <!-- Price display -->
  </div>
</div>
```

### Mobile Menu Drawer
```css
fixed top-0 right-0 bottom-0      /* Full height right panel */
w-11/12 max-w-md                  /* Responsive width */
bg-scheme-background              /* Background color */
transform transition-transform    /* Slide animation */
translate-y-full / translate-y-0  /* Open/close state */
```

### Swatch System (Colors/Materials)
```css
swatch-images-container
hidden lg:block                    /* Show on desktop only */
Product option selection with color/pattern previews
```

---

## 5. Page Hierarchy & Routes

### Core Pages
```
/ (Homepage)
/pages/about-us
/pages/custom
/pages/gifting
/pages/careers
/pages/journal
/pages/shipping
/pages/privacy-policy
```

### Dynamic Pages
```
/products/{product-id} (Individual product pages)
/collections/{collection-id} (Category pages)
/search (Search results)
```

### Special Pages
```
/pages/intro
/pages/gram (Instagram feed)
/pages/tempus-trays
/pages/carbon-black
/pages/assembly
```

---

## 6. Interactive Elements & Animations

### JavaScript Libraries Used
1. **Splide.js** - Carousel/slider
   ```html
   <script src="splide.min.js"></script>
   <script src="splide-extension-auto-scroll.min.js"></script>
   <link href="splide.min.css" rel="stylesheet">
   ```

2. **GSAP** - Animations
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
   <!-- Used for: scroll animations, hover effects, transitions -->
   ```

3. **Shopify Theme JS** - Core functionality
   ```html
   <script type="module" src="theme.min.js"></script>
   ```

### Interactive Components
- **Product Carousel** - Splide with auto-scroll
- **Mobile Menu** - Transform-based drawer
- **Add to Cart** - GSAP animations
- **Product Swatches** - Selection states
- **Filters** - Globo Filters integration
- **Newsletter Form** - Klaviyo integration
- **Reviews** - Customer testimonials section

---

## 7. CSS Architecture

### Structure
```
theme.min.css (Main stylesheet)
├── Tailwind utilities (from CDN)
├── Custom theme variables
├── Grid system
├── Typography definitions
├── Component styles
└── Responsive breakpoints
```

### Additional Stylesheets
- `splide.min.css` - Carousel styles
- `bcpo-front.css` - Back-in-stock notifications
- `general-customizations.css` - Custom overrides
- Third-party: Intelligems, Black Crow, Accessibly stylesheets

### Tailwind Configuration Notes
- Using Tailwind CDN (full framework)
- Responsive breakpoints: `lg:` prefix
- Custom color scheme with CSS variables
- Spacing controlled via Tailwind utilities + custom classes

---

## 8. Asset Management

### Image Optimization
- **Responsive srcset:** Multiple image sizes (180w to 3840w)
- **Format:** `.jpg` with `_` separator for size variants
- **Lazy Loading:** `lazyload` class with `data-src` attribute
- **Fallback:** img tag with src as fallback

Example responsive image:
```html
<img
  src="image_900x.jpg"
  srcset="
    image_180x.jpg 180w,
    image_360x.jpg 360w,
    image_900x.jpg 900w,
    image_1296x.jpg 1296w,
    image_1728x.jpg 1728w
  "
  class="lazyload"
  data-src="image_{width}x.jpg"
/>
```

### Asset Versioning
- Query parameters: `?v=timestamp`
- Example: `theme.min.js?v=79567787878314801151773268592`
- Ensures cache busting on updates

---

## 9. Form Handling

### Checkout & Cart
- Shopify's built-in cart system
- `bcpo` object for cart state management
- Form data structures for product options
- Shopify Accelerated Checkout integration

### Newsletter Signup
- Klaviyo integration
- `onsite.js` for form handling
- Email collection for marketing

### Product Customization
- Customizery app for design personalization
- Color/material selection swatches

---

## 10. Mobile Responsiveness Strategy

### Mobile-First Approach
```css
/* Mobile (default) */
grid-cols-1              /* Single column */
w-full                   /* Full width */
px-4                     /* Side padding */

/* Tablet/Desktop (lg breakpoint) */
lg:grid-cols-2           /* Multi-column */
lg:p-8                   /* Larger padding */
lg:border-r              /* Side borders on desktop */
lg:hidden / hidden lg:block  /* Show/hide by breakpoint */
```

### Breakpoint System
- **Mobile:** < 768px (default Tailwind lg breakpoint)
- **Desktop:** >= 768px (lg: classes apply)
- **XL:** >= 1024px+ (implicit in some custom classes)

---

## 11. Performance Optimizations

### Implemented Features
- **Lazy Loading:** Images with lazyload class
- **CDN Delivery:** All assets from Cloudfront/Shopify CDN
- **Minified Assets:** `.min.js` and `.min.css` files
- **Browser Caching:** Via asset versioning
- **Code Splitting:** Module-based JavaScript loading

### Third-Party Scripts
Most are loaded asynchronously or deferred to not block rendering.

---

## 12. Accessibility Features

### Accessibility Measures
- Accessibly extension integrated
- WCAG compliance features
- Alt text on images (responsive placeholders)
- Semantic HTML structure
- Color contrast considerations

---

## 13. Replication Checklist

For recreating this site, you need:

### ✅ Essential Technologies
- [ ] Shopify account (or build custom e-commerce backend)
- [ ] Tailwind CSS setup
- [ ] Liquid templating (if using Shopify)
- [ ] GSAP library
- [ ] Splide.js for carousels

### ✅ Design Assets
- [ ] GT Alpina Condensed font files
- [ ] Logo and brand assets
- [ ] Product photography
- [ ] Color scheme definition

### ✅ Components to Build
- [ ] Navigation header with mobile menu
- [ ] Hero section with text overlay
- [ ] Product grid layouts
- [ ] Product cards with swatch system
- [ ] Product carousel
- [ ] Newsletter form
- [ ] Footer
- [ ] Filter/search functionality

### ✅ Integrations
- [ ] Shopify checkout (if using Shopify)
- [ ] Klaviyo email marketing
- [ ] Analytics implementation
- [ ] Payment processing

### ✅ Pages to Create
- [ ] Homepage
- [ ] Product detail pages
- [ ] Collection/category pages
- [ ] About Us
- [ ] Custom/Gifting pages
- [ ] Journal/blog
- [ ] Careers
- [ ] Contact

---

## 14. Key Files & Asset Links

### Custom Theme Assets
```
//craighill.co/cdn/shop/t/169/assets/
├── theme.min.js (Main JavaScript)
├── theme.min.css (Main stylesheet)
├── general-customizations.css (Custom overrides)
├── splide.min.js (Carousel)
└── splide-extension-auto-scroll.min.js (Auto-scroll)
```

### External Dependencies
```
https://cdn.tailwindcss.com (Tailwind CSS)
https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js (GSAP)
https://fonts.shopifycdn.com (Font files)
https://cdn.shopify.com (Shopify libraries)
```

---

## 15. HTML Structure Example

### Basic Homepage Section
```html
<!-- Featured Grid Container -->
<div class="featured-grid grid grid-cols-1 lg:grid-cols-3 gap-gutter bg-border">

  <!-- Product Item -->
  <div class="block-container lg:p-8 px-4 py-5 border-grid-color lg:border-r">

    <!-- Image Container -->
    <div class="featured-collection__image z-0 relative">
      <div class="responsive-image-placeholder bg-scheme-text absolute top-0 left-0 right-0 bottom-0"></div>
      <div class="absolute top-0 left-0 w-full h-full">
        <img src="product.jpg" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Product Info -->
    <div class="container-info-product uppercase py-4 gap-2 section-x-padding">
      <div class="product-title text-left lg:w-3/5 break-words">Product Name</div>
      <div class="price-container text-right lg:w-2/5 lg:text-right">$Price</div>
    </div>

  </div>

</div>
```

---

## 16. CSS Custom Properties (Variables)

```css
--scheme-text              /* Primary text color */
--scheme-background        /* Background color */
--scheme-accent           /* Accent color */
--scheme-text-overlay     /* Text on overlays */
--grid-color              /* Border/grid color */
--border-grid-color       /* Alias for grid-color */
--gap-gutter              /* Standard gap between items */
--py-theme                /* Vertical padding for sections */
```

---

## 17. Important Notes for Replication

### Shopify-Specific Features
1. **Liquid Templating:** If replicating on Shopify, you'll need `.liquid` template files
2. **Theme System:** Shopify themes use specific directory structure
3. **Asset Pipeline:** Theme assets must be in specific CDN format
4. **Admin Integration:** Product management through Shopify admin

### Design Philosophy
1. **Minimalist Aesthetic:** Clean layouts, generous whitespace
2. **Premium Positioning:** Luxury home goods presentation
3. **Photography-Focused:** Large hero images and product imagery
4. **Grid-Based:** Consistent use of grid system throughout
5. **Responsive Priority:** Mobile experience is carefully considered

### Performance Considerations
1. Large hero images - ensure proper optimization
2. Multiple carousels - Splide is lightweight
3. GSAP animations - used sparingly for performance
4. Third-party scripts - loaded asynchronously
5. CDN delivery - critical for performance

---

## 18. Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 compatibility layer included (IE11CustomProperties polyfill)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 19. Analytics & Tracking

### Tracking Implemented
- **Polar Analytics:** General site tracking
- **Shopify Analytics:** Built-in
- **Klaviyo:** Email and marketing analytics
- **Google Analytics** (implicit via Shopify)

---

## 20. Maintenance & Updates

### Version Control
- Assets versioned via query parameters
- Theme updates pushed to CDN
- Cache busting via versioning scheme

### Development Environment
- Build/minification process for CSS/JS
- Asset compilation and optimization
- Testing across browsers and devices

---

## Conclusion

Craighill.co is a well-built, modern e-commerce site using Shopify as the foundation with custom styling and carefully chosen third-party integrations. The design emphasizes minimalism and product photography with a clean grid-based layout system. Key technologies include Tailwind CSS, GSAP for animations, and Splide for carousels.

**Estimated Complexity:** Medium to High (depending on whether you're using Shopify or building from scratch)

**Timeline for Replication:**
- Shopify-based: 2-4 weeks (with content)
- Custom build: 6-8 weeks minimum
- Depends on: team size, development speed, content availability

