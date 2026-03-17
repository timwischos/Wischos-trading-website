# Craighill.co - Implementation Quick Start Guide

## 📋 Project Overview

**Goal:** Recreate craighill.co website (or similar e-commerce site)
**Platform:** Shopify OR Custom build
**Timeline:** 2-8 weeks depending on choice
**Complexity:** Medium to High

---

## 🛠️ Technology Stack Selection

### Option 1: Shopify-Based (Recommended for Speed)
**Timeline:** 2-4 weeks
**Pros:**
- Built-in e-commerce functionality
- Admin dashboard for product management
- Payment processing integrated
- Less custom backend development

**Cons:**
- Less control over backend
- Shopify fees apply
- Template limitations

**Setup:**
```bash
# 1. Create Shopify store
# 2. Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# 3. Clone theme
shopify theme init my-craighill-theme

# 4. Develop locally
shopify theme dev

# 5. Deploy theme
shopify theme push
```

### Option 2: Custom Build (React + Node.js)
**Timeline:** 6-8 weeks
**Pros:**
- Complete control
- Scalable
- Custom features
- No recurring fees

**Cons:**
- More development time
- Need custom e-commerce backend
- More complexity

**Tech Stack:**
- Frontend: React + Tailwind CSS
- Backend: Node.js/Express
- Database: PostgreSQL
- Payments: Stripe
- CMS: Custom or Headless CMS

---

## 📁 Project Structure

### Shopify Theme Structure
```
my-craighill-theme/
├── layout/
│   └── theme.liquid (main layout template)
├── sections/
│   ├── header.liquid
│   ├── hero.liquid
│   ├── featured-products.liquid
│   ├── product-grid.liquid
│   ├── newsletter.liquid
│   └── footer.liquid
├── snippets/
│   ├── product-card.liquid
│   ├── image-with-text.liquid
│   ├── carousel.liquid
│   └── swatch.liquid
├── templates/
│   ├── index.json (homepage)
│   ├── product.json (product page)
│   ├── collection.json (collection page)
│   └── page.json (generic page)
├── assets/
│   ├── theme.css
│   ├── theme.js
│   └── splide.min.js
├── config/
│   └── settings_schema.json
└── locales/
    └── en.json
```

### Custom Build Structure
```
craighill-site/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── Newsletter.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Collection.jsx
│   │   │   └── About.jsx
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── tailwind.config.js
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── controllers/
│   │   └── middleware/
│   ├── config/
│   └── package.json
└── README.md
```

---

## 🚀 Step-by-Step Implementation (Shopify)

### Phase 1: Foundation (Days 1-3)

#### 1.1 Setup
```bash
# Create Shopify store
# Go to: https://www.shopify.com/free-trial

# Install dependencies
npm install -g @shopify/cli @shopify/theme
npm install @tailwindcss/cli -D
npm install gsap
npm install @splidejs/splide
```

#### 1.2 Create Theme Structure
```bash
shopify theme init my-craighill-theme
cd my-craighill-theme

# Create directory structure
mkdir -p assets/scripts assets/stylesheets
mkdir -p sections snippets templates
```

#### 1.3 Configure Tailwind
Create `tailwind.config.js`:
```javascript
module.exports = {
  content: ['./layout/*.liquid', './sections/**/*.liquid', './snippets/**/*.liquid'],
  theme: {
    extend: {
      colors: {
        'scheme-text': 'var(--scheme-text)',
        'scheme-background': 'var(--scheme-background)',
        'scheme-accent': 'var(--scheme-accent)',
      },
      fontFamily: {
        'body-display': ['GT Alpina Condensed', 'sans-serif'],
      },
      gap: {
        'gutter': 'var(--gap-gutter)',
      },
    }
  }
}
```

### Phase 2: Core Components (Days 4-7)

#### 2.1 Create Layout Template
`layout/theme.liquid`:
```liquid
<!DOCTYPE html>
<html lang="{{ shop.locale }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ page_title }}</title>

  {{ content_for_header }}

  {% stylesheet 'theme.css' %}
  <link rel="stylesheet" href="{{ 'splide.min.css' | asset_url }}">
</head>
<body>
  {% section 'header' %}

  <main id="MainContent">
    {{ content_for_layout }}
  </main>

  {% section 'newsletter' %}
  {% section 'footer' %}

  <script src="{{ 'theme.js' | asset_url }}" defer></script>
  <script src="{{ 'splide.min.js' | asset_url }}" defer></script>
</body>
</html>
```

#### 2.2 Create Header Section
`sections/header.liquid`:
```liquid
<style>
  .header {
    @apply flex py-4 section-x-padding transition bg-scheme-background border-b-grid border-grid-color;
  }
</style>

<nav class="header">
  <a href="/" class="logo font-body-display text-xl">Craighill</a>

  <div class="hidden lg:flex gap-8 ml-auto">
    <a href="/pages/about-us">About</a>
    <a href="/pages/custom">Custom</a>
    <a href="/pages/gifting">Gifting</a>
  </div>

  <button class="lg:hidden ml-auto" id="menu-toggle">☰</button>
  <a href="/cart" class="ml-4">🛒</a>
</nav>

<script>
  document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('translate-y-0');
  });
</script>

{% schema %}
{
  "name": "Header",
  "settings": []
}
{% endschema %}
```

#### 2.3 Create Hero Section
`sections/hero.liquid`:
```liquid
<style>
  .hero {
    @apply relative w-full h-screen overflow-hidden;
  }

  .hero-image {
    @apply absolute top-0 left-0 w-full h-full z-0;
  }

  .hero-content {
    @apply absolute top-0 left-0 right-0 bottom-0 z-10 section-x-padding py-theme flex flex-col items-center justify-center;
  }
</style>

<section class="hero">
  <div class="hero-image">
    {% if section.settings.image %}
      {{ section.settings.image | image_url: width: 1920 | image_tag }}
    {% endif %}
  </div>

  <div class="hero-content">
    <h1 class="font-body-display text-4xl lg:text-6xl text-center">
      {{ section.settings.heading }}
    </h1>
    <p class="mt-4 fs-body-lg text-center">
      {{ section.settings.subheading }}
    </p>
    <a href="{{ section.settings.button_link }}" class="mt-8 px-8 py-3 border border-current hover:opacity-80 transition">
      {{ section.settings.button_text }}
    </a>
  </div>
</section>

{% schema %}
{
  "name": "Hero",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading"
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "Subheading"
    }
  ]
}
{% endschema %}
```

### Phase 3: Product Components (Days 8-11)

#### 3.1 Product Card Snippet
`snippets/product-card.liquid`:
```liquid
<div class="block-container lg:p-8 px-4 py-5 border-grid-color border-b-grid">
  <div class="featured-collection__image z-0 relative mb-4">
    {% if product.featured_image %}
      {{ product.featured_image | image_url: width: 600 | image_tag: class: "w-full h-auto" }}
    {% endif %}
  </div>

  <div class="container-info-product uppercase py-4 flex flex-col lg:flex-row lg:justify-between">
    <div class="product-title text-left lg:w-3/5">
      {{ product.title }}
    </div>
    <div class="price-container text-right lg:w-2/5">
      {{ product.price | money }}
    </div>
  </div>

  <a href="{{ product.url }}" class="block text-center py-2 border border-current hover:opacity-80 transition uppercase">
    View Product
  </a>
</div>
```

#### 3.2 Featured Products Section
`sections/featured-products.liquid`:
```liquid
<section class="featured-grid grid grid-cols-1 lg:grid-cols-3 gap-gutter border-t-grid border-grid-color py-8">
  {% assign products = collections.featured.products | limit: 6 %}

  {% for product in products %}
    {% include 'product-card' %}
  {% endfor %}
</section>

{% schema %}
{
  "name": "Featured Products",
  "settings": [
    {
      "type": "collection",
      "id": "collection",
      "label": "Collection"
    }
  ]
}
{% endschema %}
```

### Phase 4: Styling (Days 12-14)

#### 4.1 Main Theme CSS
`assets/theme.css`:
```css
:root {
  --scheme-text: #1a1a1a;
  --scheme-background: #ffffff;
  --scheme-accent: #333333;
  --scheme-text-overlay: #666666;
  --grid-color: #cccccc;
  --gap-gutter: 2rem;
  --py-theme: 3rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--scheme-text);
  background-color: var(--scheme-background);
}

@font-face {
  font-family: 'GT Alpina Condensed';
  src: url('{{ "gt-alpina-condensed.woff2" | asset_url }}') format('woff2');
  font-weight: 400;
}

.section-x-padding {
  padding-left: 1rem;
  padding-right: 1rem;
}

.border-t-grid {
  border-top: 1px solid var(--grid-color);
}

.border-b-grid {
  border-bottom: 1px solid var(--grid-color);
}

.border-grid-color {
  border-color: var(--grid-color);
}

.gap-gutter {
  gap: var(--gap-gutter);
}

.py-theme {
  padding-top: var(--py-theme);
  padding-bottom: var(--py-theme);
}

/* Responsive */
@media (min-width: 1024px) {
  .section-x-padding {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
```

### Phase 5: JavaScript (Days 15-17)

#### 5.1 Main Theme JavaScript
`assets/theme.js`:
```javascript
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('translate-y-0');
      mobileMenu.classList.toggle('translate-y-full');
    });
  }
});

// Splide Carousel Initialization
document.addEventListener('DOMContentLoaded', function() {
  const splideElements = document.querySelectorAll('.splide');

  splideElements.forEach(element => {
    new Splide(element, {
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
  });
});

// Image Lazy Loading
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazyload');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});
```

### Phase 6: Pages & Content (Days 18-21)

#### 6.1 Homepage Template
`templates/index.json`:
```json
{
  "sections": {
    "hero": {
      "type": "hero",
      "settings": {
        "heading": "Everyday Objects Designed to Last",
        "subheading": "Premium home goods and design accessories"
      }
    },
    "featured_products": {
      "type": "featured-products"
    },
    "about_preview": {
      "type": "image-with-text"
    }
  },
  "order": ["hero", "featured_products", "about_preview"]
}
```

#### 6.2 Add Product Content
```
In Shopify Admin:
1. Products → Create Product
2. Add images
3. Set price
4. Add collections
5. Publish
```

#### 6.3 Create Pages
```
In Shopify Admin:
1. Pages → Create Page
2. Add content
3. Set templates
4. Publish

Pages to create:
- About Us (/pages/about-us)
- Custom (/pages/custom)
- Gifting (/pages/gifting)
- Journal (/pages/journal)
- Careers (/pages/careers)
```

### Phase 7: Final Polish & Deployment (Days 22-24)

#### 7.1 Testing Checklist
```
□ Desktop layout (Chrome, Safari, Firefox)
□ Tablet layout (iPad view)
□ Mobile layout (iPhone, Android)
□ Touch interactions (mobile menu, buttons)
□ Forms (newsletter signup)
□ Product pages
□ Checkout flow
□ Page load speed
□ Image optimization
□ SEO metadata
□ Analytics setup
```

#### 7.2 Performance Optimization
```javascript
// Lazy load images
<img loading="lazy" src="image.jpg" alt="Description" />

// Defer non-critical scripts
<script defer src="script.js"></script>

// Optimize images
# Compress with tools like:
# - TinyPNG
# - ImageOptim
# - Shopify's built-in CDN
```

#### 7.3 Deploy Theme
```bash
# Push to Shopify
shopify theme push --deployment

# Or manually in Shopify Admin:
# 1. Go to Online Store → Themes
# 2. Click "Add theme"
# 3. Upload or create theme
```

---

## 📊 Deployment Checklist

```
PRE-LAUNCH
□ Domain configured
□ SSL certificate installed
□ Payment gateway setup (Stripe/Shopify Payments)
□ Shipping configured
□ Tax settings configured
□ Email notifications configured
□ Analytics configured (Google Analytics, Klaviyo)
□ SEO settings optimized
□ Robots.txt and sitemap.xml
□ 404 page customized
□ 500 error page customized

CONTENT
□ All products added with descriptions and images
□ All collections created and organized
□ All pages created (About, Contact, etc.)
□ Terms of Service page
□ Privacy Policy page
□ Return/Shipping policy page

TESTING
□ All links working
□ Forms submitting correctly
□ Mobile responsiveness checked
□ Cross-browser testing completed
□ Payment processing tested
□ Email notifications tested
□ Search functionality working

LAUNCH
□ Final backup created
□ Team notified
□ Social media updated
□ Email to subscribers
□ Monitor analytics
□ Check error logs
```

---

## 🔧 Essential Dependencies

### Shopify Theme
```json
{
  "dependencies": {
    "@tailwindcss/cli": "^3.3.0",
    "@splidejs/splide": "^4.1.14",
    "gsap": "^3.12.5"
  }
}
```

### Custom Build (React)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "tailwindcss": "^3.3.0",
    "axios": "^1.3.0",
    "gsap": "^3.12.5",
    "@splidejs/react-splide": "^0.7.10"
  },
  "devDependencies": {
    "vite": "^4.1.0",
    "@vitejs/plugin-react": "^3.1.0"
  }
}
```

---

## 📈 Performance Targets

```
Google PageSpeed Insights:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

Web Vitals:
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
```

---

## 🤝 Team Recommendations

For fastest delivery:
- 1 Frontend Developer
- 1 Backend Developer (if custom)
- 1 Designer/UI specialist
- 1 Project Manager

**Timeline:** 4-6 weeks

---

## 🎓 Learning Resources

### Shopify Theme Development
- Shopify Liquid docs: https://shopify.dev/api/liquid
- Theme development: https://shopify.dev/themes/getting-started
- Tailwind CSS: https://tailwindcss.com/docs

### Custom Build
- React docs: https://react.dev
- Node.js/Express: https://expressjs.com
- Tailwind CSS: https://tailwindcss.com

### Design System
- Splide.js: https://splidejs.com
- GSAP: https://greensock.com/gsap

---

## ❓ Troubleshooting

### Common Issues

**Images not loading:**
```liquid
<!-- Use asset_url for Shopify assets -->
<img src="{{ 'image.jpg' | asset_url }}" alt="Description" />
```

**Styles not applying:**
```liquid
<!-- Inline styles in sections -->
<style>
  .my-class {
    /* styles */
  }
</style>
```

**Mobile menu not working:**
```javascript
// Ensure proper event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Your code here
});
```

**Slow page load:**
```
1. Optimize images (use WebP)
2. Lazy load images
3. Minify CSS/JS
4. Enable Shopify CDN caching
5. Reduce third-party scripts
```

---

## 📞 Support Resources

- Shopify Community: https://community.shopify.com
- Shopify Experts: https://experts.shopify.com
- React community: https://react.dev/community
- Stack Overflow: #shopify #tailwindcss

---

This quick start guide should get you from zero to launch in 3-4 weeks for Shopify or 6-8 weeks for a custom build. Adjust timeline based on your team size and complexity requirements.

