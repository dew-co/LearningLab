# TheLearningLabs

TheLearningLabs is a responsive Angular 21 coaching website for an online education platform. The project includes branded marketing pages, an admission request flow, legal pages, shared navigation/footer, GSAP-based motion, and a mobile-friendly layout.

## Pages

- Home
- Courses
- Live Classes
- Results
- About Us
- Contact Us
- Admission
- Admission Thank You
- Privacy Policy
- Terms of Service

## Features

- Shared floating navbar with mobile hamburger menu
- Scroll hide/show navbar behavior
- Shared footer with social links, contact details, and legal links
- Admission form flow with thank-you page routing
- Contact page with embedded map and enquiry form layout
- Scroll-to-top button
- GSAP reveal/parallax motion across major sections
- Font Awesome icons across the site
- Responsive layouts for desktop, tablet, and mobile

## Tech Stack

- Angular 21 standalone components + Angular Router
- Tailwind CSS 4
- GSAP
- Font Awesome
- `@fontsource` fonts

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open:

```text
http://localhost:4200/
```

## Available Scripts

- `npm start` - run the Angular dev server
- `npm run build` - create a production build in `dist/coaching-website`
- `npm run watch` - build in watch mode
- `npm test` - run tests

## Project Structure

```text
src/
  app/
    components/        Shared UI such as header, footer, and sections
    directives/        Reusable motion directive
    pages/             Routed page components
    app.routes.ts      Route definitions
    site.config.ts     Shared brand, nav, footer, and header config
  styles.css           Global styles, fonts, and shared utilities
```

## Build Notes

The project currently builds successfully, but Angular reports warning-level bundle and component stylesheet budget overruns during `npm run build`. These are warnings, not build failures.

## Branding

This project is configured for the `TheLearningLabs` brand in shared site configuration:

- Brand name
- Navbar items and CTA
- Footer quick links
- Footer contact details
- Footer legal links

The main shared config lives in `src/app/site.config.ts`.
