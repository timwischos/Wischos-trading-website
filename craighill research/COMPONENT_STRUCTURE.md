# Craighill.co - Component Structure & Code Patterns

## Component Hierarchy

```
App
├── Header/Navigation
│   ├── Logo
│   ├── Navigation Links
│   ├── Search Bar
│   └── Cart Icon
├── Main Content
│   ├── Hero Section
│   │   ├── Background Image
│   │   └── Text Overlay
│   ├── Featured Products Section
│   │   ├── Section Title
│   │   └── Product Grid
│   │       └── Product Card (repeated)
│   ├── Featured Collections
│   │   └── Collection Item (repeated)
│   ├── Content Sections
│   │   ├── Image + Text Block (alternating)
│   │   ├── Text + Image Block (alternating)
│   │   └── CTA Button
│   ├── Product Carousel
│   │   └── Product Slides (Splide)
│   ├── Newsletter Section
│   │   ├── Heading
│   │   └── Email Form
│   └── Footer
│       ├── Footer Links
│       ├── Social Links
│       └── Legal Links
```

---

## Component Details

### 1. Header/Navigation Component

**Classes:** `flex py-4 section-x-padding transition bg-scheme-background`

```html
<nav class="flex py-4 section-x-padding transition bg-scheme-background border-b-grid border-grid-color">
  <!-- Logo -->
  <div class="logo">
    <a href="/">Craighill</a>
  </div>

  <!-- Desktop Navigation -->
  <div class="hidden lg:flex gap-8 ml-auto">
    <a href="/pages/about-us" class="nav-link">About</a>
    <a href="/pages/custom" class="nav-link">Custom</a>
    <a href="/pages/gifting" class="nav-link">Gifting</a>
    <a href="/pages/journal" class="nav-link">Journal</a>
  </div>

  <!-- Mobile Menu Toggle -->
  <button class="lg:hidden ml-auto" aria-label="Menu">☰</button>

  <!-- Cart Icon -->
  <a href="/cart" class="ml-4 text-scheme-text">🛒</a>
</nav>

<!-- Mobile Menu Drawer -->
<div class="fixed top-0 right-0 bottom-0 w-11/12 max-w-md bg-scheme-background text-scheme-text border-l-grid border-grid-color transform transition-transform overflow-y-auto" id="mobile-menu">
  <div class="flex flex-col gap-4 p-4">
    <button class="text-right" aria-label="Close">✕</button>
    <a href="/pages/about-us">About</a>
    <a href="/pages/custom">Custom</a>
    <a href="/pages/gifting">Gifting</a>
    <a href="/pages/journal">Journal</a>
    <a href="/products">Shop</a>
  </div>
</div>
```

**Key Patterns:**
- `hidden lg:flex` - Hide on mobile, show on desktop
- `absolute top-0 right-0` - Drawer positioning
- `transform transition-transform` - Slide animation
- `border-b-grid border-grid-color` - Grid border separator

---

### 2. Hero Section Component

**Classes:** `relative h-screen flex items-center justify-center`

```html
<section class="relative w-full h-screen overflow-hidden">
  <!-- Background Image -->
  <div class="absolute top-0 left-0 w-full h-full z-0">
    <div class="responsive-image-placeholder bg-scheme-text absolute top-0 left-0 right-0 bottom-0"></div>
    <img
      src="hero-image.jpg"
      class="w-full h-full object-cover"
      loading="lazy"
    />
  </div>

  <!-- Content Overlay -->
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

**Key Patterns:**
- `absolute top-0 left-0 right-0 bottom-0` - Full coverage overlay
- `z-0` and `z-10` - Layering system
- `responsive-image-placeholder` - Loading state
- `content-wrapper` - Text positioning on image

---

### 3. Product Card Component

**Classes:** `block-container border-grid-color flex flex-col`

```html
<div class="block-container lg:p-8 px-4 py-5 border-grid-color lg:border-r border-b-grid">

  <!-- Product Image Container -->
  <div class="featured-collection__image z-0 relative mb-4">
    <div class="responsive-image-placeholder bg-scheme-text absolute top-0 left-0 right-0 bottom-0"></div>
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
      <img
        src="product.jpg"
        alt="Product Name"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>

    <!-- Badge (Sale/New) -->
    <div class="z-10 p-2 bg-scheme-accent text-scheme-text-overlay absolute top-2 right-2">
      NEW
    </div>
  </div>

  <!-- Product Info -->
  <div class="container-info-product uppercase py-4 gap-2 section-x-padding justify-between flex flex-col lg:flex-row">
    <div class="product-title text-left lg:w-3/5 break-words fs-body-base">
      Product Name
    </div>
    <div class="price-container text-right lg:w-2/5 lg:text-right fs-body-lg font-bold">
      $199.00
    </div>
  </div>

  <!-- Description -->
  <p class="px-4 lg:px-0 text-scheme-text text-sm mb-4">
    Brief product description
  </p>

  <!-- Action Link -->
  <div class="mt-auto px-4 lg:px-0">
    <a href="/products/product-name" class="block text-center py-2 border border-scheme-text text-scheme-text hover:bg-scheme-text hover:text-scheme-background transition">
      View Product
    </a>
  </div>

</div>
```

**Key Patterns:**
- `border-grid-color` - Grid border styling
- `relative z-0/z-10` - Image layering
- `absolute top-2 right-2` - Badge positioning
- `flex flex-col lg:flex-row` - Responsive layout

---

### 4. Featured Products Grid Component

**Classes:** `featured-grid grid gap-gutter`

```html
<section class="featured-grid grid grid-cols-1 lg:grid-cols-3 gap-gutter bg-border border-t-grid border-grid-color">

  <!-- Product Card 1 -->
  <div class="block-container">
    <!-- Product content -->
  </div>

  <!-- Product Card 2 -->
  <div class="block-container">
    <!-- Product content -->
  </div>

  <!-- Product Card 3 -->
  <div class="block-container">
    <!-- Product content -->
  </div>

</section>
```

**Key Patterns:**
- `grid grid-cols-1 lg:grid-cols-3` - 1 col mobile, 3 col desktop
- `gap-gutter` - Consistent spacing between items
- `border-t-grid border-grid-color` - Top border separator

---

### 5. Image + Text Block Component

**Classes:** `grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center`

```html
<section class="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center py-8 section-x-padding border-b-grid border-grid-color">

  <!-- Image Column -->
  <div class="image-wrapper relative h-96 lg:h-full overflow-hidden">
    <img
      src="feature-image.jpg"
      alt="Feature"
      class="w-full h-full object-cover"
    />
  </div>

  <!-- Text Column -->
  <div class="text-wrapper flex flex-col gap-4">
    <h2 class="text-4xl font-body-display font-bold text-scheme-text">
      Section Heading
    </h2>
    <div class="font-body-display rte fs-body-lg text-scheme-text">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="/pages/custom" class="w-fit px-8 py-3 border border-scheme-text text-scheme-text hover:bg-scheme-text hover:text-scheme-background transition uppercase">
      Learn More
    </a>
  </div>

</section>
```

**Key Patterns:**
- `grid grid-cols-1 lg:grid-cols-2` - 1 col mobile, 2 col desktop
- `items-center` - Vertical centering
- `h-96 lg:h-full` - Responsive height
- `relative overflow-hidden` - Image container

---

### 6. Product Carousel (Splide) Component

```html
<section class="splide__container py-8">
  <div class="splide" role="region" aria-label="Featured Products">
    <div class="splide__track">
      <ul class="splide__list">

        <!-- Slide 1 -->
        <li class="splide__slide">
          <div class="block-container">
            <!-- Product Card -->
          </div>
        </li>

        <!-- Slide 2 -->
        <li class="splide__slide">
          <div class="block-container">
            <!-- Product Card -->
          </div>
        </li>

      </ul>
    </div>

    <!-- Navigation -->
    <div class="splide__arrows">
      <button class="splide__arrow splide__arrow--prev"></button>
      <button class="splide__arrow splide__arrow--next"></button>
    </div>

    <!-- Pagination -->
    <ul class="splide__pagination"></ul>
  </div>
</section>

<script>
new Splide('.splide', {
  type: 'carousel',
  perPage: 3,
  gap: 'var(--gap-gutter)',
  pagination: true,
  arrows: true,
  breakpoints: {
    768: {
      perPage: 1,
    },
    1024: {
      perPage: 2,
    }
  }
}).mount();
</script>
```

**Key Features:**
- `splide__slide` - Individual slides
- `splide__track` - Carousel container
- `splide__pagination` - Dot indicators
- `splide__arrows` - Navigation buttons
- Responsive `perPage` settings

---

### 7. Newsletter Signup Component

**Classes:** `bg-scheme-background py-8 section-x-padding border-t-grid border-grid-color`

```html
<section class="bg-scheme-background py-8 section-x-padding border-t-grid border-grid-color">
  <div class="max-w-md mx-auto">
    <h2 class="text-2xl font-body-display text-center mb-4 text-scheme-text">
      Stay Updated
    </h2>
    <p class="text-center text-scheme-text-overlay mb-6">
      Subscribe to our newsletter for exclusive offers and updates
    </p>

    <!-- Klaviyo Form -->
    <form class="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Enter your email"
        class="w-full px-4 py-3 border border-scheme-text bg-transparent text-scheme-text placeholder-scheme-text-overlay focus:outline-none"
        required
      />
      <button
        type="submit"
        class="px-8 py-3 bg-scheme-accent text-scheme-text-overlay font-bold uppercase hover:opacity-90 transition"
      >
        Subscribe
      </button>
    </form>
  </div>
</section>
```

**Key Patterns:**
- `max-w-md mx-auto` - Constrain width and center
- `flex flex-col gap-4` - Vertical spacing
- `border-t-grid border-grid-color` - Top separator
- Klaviyo integration ready

---

### 8. Footer Component

**Classes:** `bg-scheme-background border-t-grid border-grid-color`

```html
<footer class="bg-scheme-background border-t-grid border-grid-color section-x-padding py-8">

  <!-- Footer Grid -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

    <!-- Logo Column -->
    <div class="col-span-1">
      <h3 class="footer-logo-image font-body-display text-xl mb-4">Craighill</h3>
      <p class="text-sm text-scheme-text-overlay">
        Everyday objects designed to last
      </p>
    </div>

    <!-- Links Column 1 -->
    <div>
      <h4 class="font-bold mb-4 text-scheme-text">Shop</h4>
      <ul class="space-y-2">
        <li><a href="/products" class="footer__menu-item text-scheme-text-overlay hover:text-scheme-text">All Products</a></li>
        <li><a href="/collections" class="footer__menu-item text-scheme-text-overlay hover:text-scheme-text">Collections</a></li>
        <li><a href="/pages/custom" class="footer__menu-item text-scheme-text-overlay hover:text-scheme-text">Custom</a></li>
      </ul>
    </div>

    <!-- Links Column 2 -->
    <div>
      <h4 class="font-bold mb-4 text-scheme-text">About</h4>
      <ul class="space-y-2">
        <li><a href="/pages/about-us" class="footer-link text-scheme-text-overlay hover:text-scheme-text">About Us</a></li>
        <li><a href="/pages/careers" class="footer-link text-scheme-text-overlay hover:text-scheme-text">Careers</a></li>
        <li><a href="/pages/journal" class="footer-link text-scheme-text-overlay hover:text-scheme-text">Journal</a></li>
      </ul>
    </div>

    <!-- Links Column 3 -->
    <div>
      <h4 class="font-bold mb-4 text-scheme-text">Support</h4>
      <ul class="space-y-2">
        <li><a href="/pages/shipping" class="footer-link text-scheme-text-overlay hover:text-scheme-text">Shipping</a></li>
        <li><a href="/pages/privacy-policy" class="footer-link text-scheme-text-overlay hover:text-scheme-text">Privacy</a></li>
        <li><a href="/contact" class="footer-link text-scheme-text-overlay hover:text-scheme-text">Contact</a></li>
      </ul>
    </div>

  </div>

  <!-- Social Links -->
  <div class="border-t-grid border-grid-color pt-4 flex justify-center gap-4">
    <a href="https://instagram.com/craighill" class="text-scheme-text-overlay hover:text-scheme-text">Instagram</a>
    <a href="https://twitter.com/craighill" class="text-scheme-text-overlay hover:text-scheme-text">Twitter</a>
    <a href="https://facebook.com/craighill" class="text-scheme-text-overlay hover:text-scheme-text">Facebook</a>
  </div>

  <!-- Copyright -->
  <div class="border-t-grid border-grid-color mt-4 pt-4 text-center text-sm text-scheme-text-overlay">
    <p>&copy; 2024 Craighill. All rights reserved.</p>
  </div>

</footer>
```

**Key Patterns:**
- `grid grid-cols-1 md:grid-cols-4` - Responsive columns
- `space-y-2` - Vertical spacing between links
- `border-t-grid border-grid-color` - Grid separators
- `text-scheme-text-overlay` - Secondary text color

---

### 9. Product Color Swatch System

```html
<div class="swatch-images-container hidden lg:block">
  <div class="flex gap-2 mb-4">

    <!-- Color Swatch -->
    <button class="swatch-button w-8 h-8 rounded-full border-2 border-scheme-text hover:scale-110 transition"
            style="background-color: #000;"
            data-color="Black"
            aria-label="Black">
    </button>

    <!-- Pattern Swatch -->
    <button class="swatch-button w-8 h-8 rounded-full border-2 border-transparent hover:border-scheme-text hover:scale-110 transition"
            style="background-image: url('pattern.png'); background-size: cover;"
            data-pattern="Woven"
            aria-label="Woven">
    </button>

  </div>
</div>

<script>
document.querySelectorAll('.swatch-button').forEach(button => {
  button.addEventListener('click', function() {
    // Update product image based on selected color/pattern
    const color = this.dataset.color;
    const mainImage = document.querySelector('.product-main-image');
    // Update image source...
  });
});
</script>
```

**Key Features:**
- `hidden lg:block` - Desktop only
- `border-2` - Visual feedback
- `hover:scale-110` - Hover effect
- `data-*` attributes for selection handling

---

## CSS Custom Classes Reference

### Spacing
```css
.section-x-padding   /* Horizontal padding for sections */
.py-theme           /* Vertical padding for theme sections */
.gap-gutter         /* Standard gap between grid items */
```

### Borders
```css
.border-t-grid      /* Top border (grid style) */
.border-b-grid      /* Bottom border */
.border-l-grid      /* Left border */
.border-r-grid      /* Right border */
.border-grid-color  /* Border color variable */
```

### Containers
```css
.block-container    /* Standard block/card container */
.content-wrapper    /* Overlay content wrapper */
.featured-grid      /* Product grid container */
.featured-collection__image  /* Collection image */
```

### Typography
```css
.font-body-display  /* Display/heading font */
.fs-body-base       /* Base font size */
.fs-body-lg         /* Large font size */
.rte               /* Rich text editor styles */
```

### Images
```css
.responsive-image-placeholder  /* Loading state background */
.image-wrapper      /* Image container */
.lazyload          /* Lazy loading flag */
```

---

## Animation Patterns

### Using GSAP
```javascript
// Scroll animation example
gsap.registerPlugin(ScrollTrigger);

gsap.to(".animated-element", {
  scrollTrigger: {
    trigger: ".animated-element",
    start: "top 80%",
    end: "top 20%",
    scrub: 1
  },
  opacity: 1,
  y: 0,
  duration: 0.6
});

// Hover animation example
gsap.to(".hover-element", {
  duration: 0.3,
  scale: 1.05,
  paused: true
});
```

### CSS Transitions
```css
.transition          /* Standard transition */
.transition-transform /* Transform transition */
.duration-300        /* 300ms duration */
.hover:scale-105     /* Scale on hover */
.transform translate-y-full  /* Mobile menu slide */
```

---

## Responsive Patterns

### Common Breakpoints
```css
/* Mobile First - Default styles apply to mobile */
grid-cols-1         /* Single column */
w-full              /* Full width */

/* Tablet/Desktop - lg: prefix (≥ 768px) */
lg:grid-cols-2      /* Two columns */
lg:grid-cols-3      /* Three columns */
lg:p-8              /* Larger padding */
lg:w-3/5            /* Width fraction */
lg:hidden            /* Hide on desktop */
hidden lg:block      /* Show only on desktop */
```

---

## State Management

### Mobile Menu State
```javascript
const mobileMenu = document.getElementById('mobile-menu');
const menuToggle = document.querySelector('[aria-label="Menu"]');
const menuClose = document.querySelector('[aria-label="Close"]');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.remove('translate-y-full');
  // Or: mobileMenu.style.transform = 'translateY(0)';
});

menuClose.addEventListener('click', () => {
  mobileMenu.classList.add('translate-y-full');
});
```

### Product Swatch Selection
```javascript
const swatches = document.querySelectorAll('.swatch-button');
swatches.forEach(swatch => {
  swatch.addEventListener('click', function() {
    // Remove active state from all
    swatches.forEach(s => s.classList.remove('border-scheme-text'));
    // Add to clicked
    this.classList.add('border-scheme-text');
    // Update product display
    updateProductDisplay(this.dataset.color);
  });
});
```

---

## Summary

This component structure provides:
- ✅ Modular, reusable components
- ✅ Consistent styling patterns
- ✅ Responsive design approach
- ✅ Clear hierarchy and organization
- ✅ Easy to maintain and extend

All components follow Craighill's design system using Tailwind CSS utilities, custom color schemes, and a consistent grid-based layout approach.

