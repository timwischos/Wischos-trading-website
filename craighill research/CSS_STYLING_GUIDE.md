# Craighill.co - CSS & Styling Guide

## Color System

### CSS Variables
```css
/* Main color scheme */
--scheme-text                 /* Primary text color (dark/light) */
--scheme-background           /* Page background */
--scheme-accent              /* Accent/highlight color */
--scheme-text-overlay        /* Secondary text color */

/* Border & Grid */
--grid-color                 /* Border color */
--border-grid-color          /* Alias for grid-color */
--border-grid-color-secondary /* Secondary border color */

/* Spacing */
--gap-gutter                 /* Standard gap between items */
--py-theme                   /* Vertical padding for sections */
```

### Usage in HTML
```html
<!-- Set theme on element -->
<div data-color-scheme="light">
  <!-- Light theme content -->
</div>

<div data-color-scheme="dark">
  <!-- Dark theme content -->
</div>
```

### CSS Application
```css
/* Apply theme variables */
.bg-scheme-background {
  background-color: var(--scheme-background);
}

.text-scheme-text {
  color: var(--scheme-text);
}

.border-grid-color {
  border-color: var(--grid-color);
}
```

---

## Typography

### Font System

#### Primary Font: GT Alpina Condensed
```css
@font-face {
  font-family: 'Gt Alpina Condensed';
  src:
    url('GT-Alpina-Condensed-Thin.woff2') format('woff2'),
    url('GT-Alpina-Condensed-Thin.woff') format('woff');
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: 'Gt Alpina Condensed';
  src:
    url('GT-Alpina-Condensed-Light.woff2') format('woff2'),
    url('GT-Alpina-Condensed-Light.woff') format('woff');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Gt Alpina Condensed';
  src:
    url('GT-Alpina-Condensed-Regular.woff2') format('woff2'),
    url('GT-Alpina-Condensed-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}
```

### Font Classes

```css
/* Tailwind-style font classes */
.font-body-display {
  font-family: 'Gt Alpina Condensed', sans-serif;
  font-weight: 400;
  letter-spacing: -0.02em;
}

.font-body-regular {
  font-family: system-ui, -apple-system, sans-serif;
  font-weight: 400;
}

/* Size variants */
.fs-body-base {
  font-size: 1rem;
  line-height: 1.5;
}

.fs-body-lg {
  font-size: 1.125rem;
  line-height: 1.5;
}

.fs-body-xl {
  font-size: 1.25rem;
  line-height: 1.5;
}

.fs-body-2xl {
  font-size: 1.5rem;
  line-height: 1.4;
}

.fs-body-3xl {
  font-size: 2rem;
  line-height: 1.3;
}

.fs-body-display {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 400;
  letter-spacing: -0.02em;
}
```

### Text Utilities

```css
/* Text alignment */
.text-left     { text-align: left; }
.text-center   { text-align: center; }
.text-right    { text-align: right; }

/* Text cases */
.uppercase     { text-transform: uppercase; }
.capitalize    { text-transform: capitalize; }

/* Text color */
.text-scheme-text           { color: var(--scheme-text); }
.text-scheme-text-overlay   { color: var(--scheme-text-overlay); }
.text-scheme-accent         { color: var(--scheme-accent); }

/* Font weight */
.font-thin      { font-weight: 100; }
.font-light     { font-weight: 300; }
.font-normal    { font-weight: 400; }
.font-bold      { font-weight: 700; }

/* Line height */
.leading-tight  { line-height: 1.25; }
.leading-normal { line-height: 1.5; }
.leading-loose  { line-height: 1.75; }

/* Letter spacing */
.tracking-tight { letter-spacing: -0.02em; }
.tracking-wide  { letter-spacing: 0.05em; }
```

---

## Grid System

### CSS Grid Layout

```css
/* Basic grid */
.grid {
  display: grid;
}

/* Column definitions */
.grid-cols-1 {
  grid-template-columns: minmax(0, 1fr);
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.grid-cols-12 {
  grid-template-columns: repeat(12, minmax(0, 1fr));
}

/* Responsive columns */
@media (min-width: 1024px) {
  .lg\:grid-cols-1 {
    grid-template-columns: minmax(0, 1fr);
  }

  .lg\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\:grid-cols-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
}

/* Grid gaps */
.gap-0 {
  gap: 0;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-8 {
  gap: 2rem;
}

.gap-gutter {
  gap: var(--gap-gutter);
}

/* Responsive gap */
@media (max-width: 1023px) {
  .md\:gap-y-4 {
    row-gap: 1rem;
  }

  .md\:gap-x-5 {
    column-gap: 1.25rem;
  }
}

/* Grid flow */
.grid-flow-row-dense {
  grid-auto-flow: row dense;
}
```

### Flexbox Utilities

```css
.flex {
  display: flex;
}

.flex-row {
  flex-direction: row;
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.justify-start {
  justify-content: flex-start;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-end {
  justify-content: flex-end;
}

.items-start {
  align-items: flex-start;
}

.items-center {
  align-items: center;
}

.items-end {
  align-items: flex-end;
}

.items-stretch {
  align-items: stretch;
}

.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }
.gap-8 { gap: 2rem; }
```

---

## Spacing System

### Padding

```css
.p-0  { padding: 0; }
.p-2  { padding: 0.5rem; }
.p-4  { padding: 1rem; }
.p-8  { padding: 2rem; }

.px-0 { padding-left: 0; padding-right: 0; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }

.py-0 { padding-top: 0; padding-bottom: 0; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }

.pt-0 { padding-top: 0; }
.pb-0 { padding-bottom: 0; }

/* Custom padding for sections */
.section-x-padding {
  padding-left: calc(1rem + env(safe-area-inset-left));
  padding-right: calc(1rem + env(safe-area-inset-right));
}

.py-theme {
  padding-top: var(--py-theme);
  padding-bottom: var(--py-theme);
}

/* Responsive padding */
@media (min-width: 1024px) {
  .lg\:p-8 {
    padding: 2rem;
  }

  .lg\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .lg\:py-8 {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
```

### Margin

```css
.m-0  { margin: 0; }
.m-2  { margin: 0.5rem; }
.m-4  { margin: 1rem; }
.m-8  { margin: 2rem; }

.mx-0 { margin-left: 0; margin-right: 0; }
.mx-auto { margin-left: auto; margin-right: auto; }

.my-0 { margin-top: 0; margin-bottom: 0; }

.mt-0 { margin-top: 0; }
.mt-4 { margin-top: 1rem; }
.mt-8 { margin-top: 2rem; }

.mb-0 { margin-bottom: 0; }
.mb-4 { margin-bottom: 1rem; }
.mb-8 { margin-bottom: 2rem; }

.ml-auto { margin-left: auto; }

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}
```

---

## Border System

### Border Definitions

```css
/* Grid-style borders */
.border-t-grid {
  border-top: 1px solid var(--grid-color);
}

.border-b-grid {
  border-bottom: 1px solid var(--grid-color);
}

.border-l-grid {
  border-left: 1px solid var(--grid-color);
}

.border-r-grid {
  border-right: 1px solid var(--grid-color);
}

/* Responsive borders */
@media (min-width: 1024px) {
  .lg\:border-r {
    border-right: 1px solid var(--grid-color);
  }

  .lg\:border-b {
    border-bottom: 1px solid var(--grid-color);
  }

  .lg\:border-y-0 {
    border-top: none;
    border-bottom: none;
  }
}

/* Border color */
.border-grid-color {
  border-color: var(--grid-color);
}

.border-grid-color-secondary {
  border-color: var(--border-grid-color-secondary);
}

/* Standard borders */
.border {
  border: 1px solid var(--grid-color);
}

.border-2 {
  border: 2px solid var(--grid-color);
}

.border-t { border-top: 1px solid; }
.border-b { border-bottom: 1px solid; }
.border-l { border-left: 1px solid; }
.border-r { border-right: 1px solid; }

/* Rounded corners */
.rounded {
  border-radius: 0.25rem;
}

.rounded-full {
  border-radius: 9999px;
}

.rounded-none {
  border-radius: 0;
}
```

---

## Positioning & Layout

### Position Types

```css
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.fixed {
  position: fixed;
}

.sticky {
  position: sticky;
}

/* Position edges */
.top-0 { top: 0; }
.right-0 { right: 0; }
.bottom-0 { bottom: 0; }
.left-0 { left: 0; }

.top-2 { top: 0.5rem; }
.right-2 { right: 0.5rem; }

/* Z-index layering */
.z-0 { z-index: 0; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.z-30 { z-index: 30; }
```

### Sizing

```css
/* Width */
.w-full { width: 100%; }
.w-11/12 { width: 91.666667%; }
.w-3/5 { width: 60%; }
.w-2/5 { width: 40%; }
.w-fit { width: fit-content; }
.max-w-md { max-width: 28rem; }

/* Height */
.h-full { height: 100%; }
.h-screen { height: 100vh; }
.h-96 { height: 24rem; }

/* Responsive sizing */
@media (min-width: 1024px) {
  .lg\:w-3/5 { width: 60%; }
  .lg\:w-2/5 { width: 40%; }
  .lg\:h-full { height: 100%; }
}
```

---

## Display & Visibility

```css
/* Display types */
.block { display: block; }
.inline-block { display: inline-block; }
.inline { display: inline; }
.flex { display: flex; }
.grid { display: grid; }
.hidden { display: none; }

/* Responsive display */
@media (min-width: 1024px) {
  .hidden\:lg { display: none; }
  .block\:lg { display: block; }
  .flex\:lg { display: flex; }
}

/* Visibility */
.invisible { visibility: hidden; }
.visible { visibility: visible; }

/* Overflow */
.overflow-hidden { overflow: hidden; }
.overflow-y-auto { overflow-y: auto; }
```

---

## Transform & Animation

### Transforms

```css
/* Positioning */
.absolute.top-0.left-0.right-0.bottom-0 {
  /* Full coverage overlay */
}

/* Transform origin */
transform-origin: center;

/* Transform functions */
.scale-100 { transform: scale(1); }
.scale-105 { transform: scale(1.05); }
.scale-110 { transform: scale(1.10); }

.translate-y-0 { transform: translateY(0); }
.translate-y-full { transform: translateY(100%); }
.-translate-y-full { transform: translateY(-100%); }

/* Responsive transforms */
@media (min-width: 1024px) {
  .lg\:translate-y-0 { transform: translateY(0); }
}
```

### Transitions & Animations

```css
/* Transitions */
.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-300 {
  transition-duration: 300ms;
}

/* Hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:opacity-90:hover {
  opacity: 0.9;
}

.hover\:bg-scheme-text:hover {
  background-color: var(--scheme-text);
}

.hover\:text-scheme-background:hover {
  color: var(--scheme-background);
}

.hover\:border-scheme-text:hover {
  border-color: var(--scheme-text);
}
```

---

## Responsive Design

### Breakpoints
```css
/* Mobile (default, < 768px) */
/* Styles apply to all sizes by default */

/* Tablet/Desktop (lg: prefix, >= 768px) */
@media (min-width: 1024px) {
  /* lg: prefix classes */
}

/* XL Desktop (xl: prefix, >= 1280px) - implicit */
```

### Usage Patterns

```css
/* Mobile first */
.grid-cols-1             /* 1 column on mobile */
.lg:grid-cols-3          /* 3 columns on desktop */

.hidden                  /* Hidden on mobile */
.lg:block                /* Shown on desktop */

.block                   /* Shown on mobile */
.lg:hidden               /* Hidden on desktop */

.w-full                  /* Full width on mobile */
.lg:w-3/5                /* 60% width on desktop */

.px-4                    /* Small padding on mobile */
.lg:p-8                  /* Large padding on desktop */
```

---

## Object Fit & Image Handling

```css
.object-cover {
  object-fit: cover;
}

.object-contain {
  object-fit: contain;
}

.object-fill {
  object-fit: fill;
}
```

---

## Accessibility Classes

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus visible */
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px var(--scheme-text);
}
```

---

## Custom Component Classes

### Container Classes
```css
.block-container {
  /* Standard component container */
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  /* Overlay content container */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.featured-grid {
  /* Product grid container */
  display: grid;
  gap: var(--gap-gutter);
  background-color: var(--bg-border);
}

.featured-collection__image {
  position: relative;
  z-index: 0;
  margin-bottom: 1rem;
}

.responsive-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--scheme-text);
  z-index: -1;
}
```

---

## Complete Styling Example

```html
<!-- Hero Section with custom styling -->
<section class="relative w-full h-screen overflow-hidden">
  <div class="absolute top-0 left-0 w-full h-full z-0">
    <div class="responsive-image-placeholder bg-scheme-text absolute top-0 left-0 right-0 bottom-0"></div>
    <img src="hero.jpg" class="w-full h-full object-cover" />
  </div>

  <div class="content-wrapper absolute top-0 left-0 right-0 bottom-0 z-10 section-x-padding py-theme flex flex-col items-center justify-center">
    <h1 class="font-body-display text-4xl lg:text-6xl text-center text-scheme-text">
      Everyday Objects Designed to Last
    </h1>
    <p class="mt-4 fs-body-lg text-center text-scheme-text-overlay">
      Premium home goods and design accessories
    </p>
    <a href="/products" class="mt-8 px-8 py-3 border border-scheme-text text-scheme-text hover:bg-scheme-text hover:text-scheme-background transition">
      SHOP NOW
    </a>
  </div>
</section>
```

---

## Performance Tips

1. **Use CSS variables** for theme switching without additional CSS files
2. **Minimize media queries** by using Tailwind's responsive prefixes
3. **Leverage CSS Grid** for complex layouts instead of nested flexbox
4. **Use object-fit** for responsive images without aspect ratio issues
5. **Implement lazy loading** with native `loading="lazy"` attribute
6. **Optimize fonts** by limiting font weights and using system fonts as fallbacks
7. **Use CSS subgrid** for nested grid layouts (modern browsers)

---

## Customization Guide

### Changing the Color Scheme
```css
:root {
  --scheme-text: #1a1a1a;              /* Change from dark to light */
  --scheme-background: #ffffff;         /* Change background */
  --scheme-accent: #333333;             /* Change accent color */
  --scheme-text-overlay: #666666;       /* Change secondary text */
  --grid-color: #cccccc;                /* Change border color */
  --gap-gutter: 2rem;                   /* Change spacing */
  --py-theme: 3rem;                     /* Change section padding */
}
```

### Adjusting Typography
```css
/* Update font sizes */
.fs-body-base { font-size: 16px; }
.fs-body-lg { font-size: 18px; }

/* Update line heights */
.font-body-display { line-height: 1.1; }
```

### Modifying Spacing
```css
/* Adjust all gaps */
.gap-gutter { gap: 1.5rem; }

/* Adjust section padding */
.section-x-padding { padding: 0 2rem; }
```

This comprehensive styling guide covers all the CSS patterns used on Craighill.co and provides templates for customization.

