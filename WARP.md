# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **static educational website** that helps students understand the difference between Aadhaar-linked and DBT-enabled bank accounts. The site uses vanilla HTML, CSS, and JavaScript with no build process or dependencies.

**Core Purpose**: Student-friendly educational resource about government benefit transfers and banking requirements.

## Development Commands

### Local Development Server
```bash
# Option 1: Python (if available)
python -m http.server 8000

# Option 2: Node.js (if available)
npx http-server

# Option 3: Direct file access
# Simply open index.html in any modern browser
```

### Validation & Testing
```bash
# HTML validation (if htmlhint installed globally)
npx htmlhint *.html

# Check broken links (if available)
npx broken-link-checker http://localhost:8000

# Basic accessibility test
# Open browser developer tools and run Lighthouse audit
```

## Architecture & Structure

### Core Architecture
- **Static Site**: No backend, build process, or frameworks
- **Progressive Enhancement**: Works even with JavaScript disabled
- **Mobile-First**: Responsive design using CSS Grid and Flexbox
- **Accessibility-First**: WCAG 2.1 compliant with semantic HTML and ARIA

### File Structure
```
/
├── index.html          # Main landing page with comparison and steps
├── faq.html           # Detailed FAQ with 10+ accordion questions
├── resources.html     # Official government links and guides
├── css/styles.css     # Single 437-line CSS file with complete styling
└── js/script.js       # Vanilla JS for interactivity (~85 lines)
```

### Key Components

#### CSS Architecture (`css/styles.css`)
- **CSS Custom Properties**: Used for theming and consistency
- **Component-based styling**: `.btn`, `.card`, `.accordion`, `.panel` classes
- **Responsive Design**: Mobile-first with breakpoints for tablet/desktop
- **Accessibility Features**: Skip links, screen reader support, proper focus management

#### JavaScript Functionality (`js/script.js`)
- **Mobile Navigation**: Hamburger menu with proper ARIA attributes
- **Accordion System**: FAQ expand/collapse with keyboard support
- **Smooth Scrolling**: In-page navigation with focus management
- **Intersection Observer**: Animation triggers for cards and steps
- **Progressive Enhancement**: All core functionality works without JS

### Content Management
- **Government Links**: All external links point to official .gov.in domains
- **Educational Focus**: Content written for college students and recent graduates
- **Disclaimer-driven**: Clear educational purpose messaging throughout

## Key Patterns & Conventions

### HTML Patterns
- **Semantic HTML5**: Proper use of `<section>`, `<article>`, `<nav>`, etc.
- **Accessibility**: All interactive elements have proper ARIA attributes
- **SEO Optimized**: Meta descriptions, proper heading hierarchy, structured data

### CSS Patterns
- **BEM-like Naming**: `.accordion__button`, `.nav__list` for component clarity
- **Mobile-First**: `min-width` media queries for progressive enhancement
- **CSS Grid for Layout**: Modern layout techniques throughout

### JavaScript Patterns
- **IIFE Wrapper**: All code wrapped in immediately invoked function expression
- **Query Helpers**: `$()` and `$$()` utility functions for DOM selection
- **Event Delegation**: Efficient event handling for dynamic content

## Content Updating Guidelines

### Critical Content Areas
1. **Government URLs**: Always verify links point to current official portals
2. **Process Steps**: Banking procedures may change - verify with official sources
3. **Contact Information**: Government helpline numbers and email addresses
4. **Legal Disclaimers**: Maintain "educational purposes only" messaging

### FAQ Management
- FAQ content is in `faq.html` using accordion pattern
- Each FAQ item has unique `id` and proper ARIA labeling
- Add new FAQs following the established HTML structure pattern

### Resource Links
- All external links in `resources.html` open in new tabs (`target="_blank"`)
- Links include `rel="noopener"` for security
- Organized by category (Government Portals, Banking Resources, Benefit Schemes)

## Browser Testing Requirements

**Supported Browsers** (per README.md):
- Chrome 70+, Firefox 65+, Safari 12+, Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

**Testing checklist**:
1. Accordion functionality across all browsers
2. Mobile navigation on small screens
3. Smooth scrolling behavior
4. Form accessibility with screen readers
5. Print stylesheet compatibility

## Deployment Notes

The website is deployment-ready as static files:
- **GitHub Pages**: Deploy from main branch, no build required
- **Netlify/Vercel**: Drag-and-drop deployment
- **Traditional hosting**: Upload all files to web server public directory
- **Local sharing**: Files work directly from filesystem (file:// protocol)

## Educational Content Guidelines

- Keep language student-friendly and avoid banking jargon
- Always emphasize that this is educational content only
- Direct users to official government sources for actual processes
- Maintain accurate information about NPCI mapper and DBT processes
- Include troubleshooting guidance for common student issues
