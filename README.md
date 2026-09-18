# The Digital Librarian

A modern, content-rich React + Vite website for The Digital Librarian brand, designed to showcase programs, services, resources, events, initiatives, and institutional partnerships while providing a lightweight administrative content management experience.

## Overview

This project is a marketing and knowledge platform for a digital learning and library transformation initiative. It combines:

- A public-facing website with editorial-style pages and rich content sections
- A CMS-like admin area for updating navigation, pages, services, blog posts, events, initiatives, team members, testimonials, partner logos, and media
- Local storage persistence by default, with Supabase-ready data synchronization hooks
- A responsive front-end built with React, TypeScript, Vite, and Tailwind CSS

The application is organized as a single-page app with client-side routing and a public/admin split.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Supabase JS client
- Lucide React
- Sharp (used for image processing assets)

## Project Goals

- Present a polished digital brand for The Digital Librarian
- Showcase thought leadership, learning resources, initiatives, and community engagement
- Support content updates without needing full backend infrastructure
- Offer an admin dashboard for non-technical content editors
- Be easy to deploy to static hosting providers or a Node-based hosting environment

## Features

### Public website

- Landing page with hero, services, stats, initiatives, and call-to-action areas
- About and profile pages
- Solutions and resource hubs
- Blog and article detail pages
- Event listing and event details
- Initiative pages and special campaign pages
- Contact page
- Dynamic custom pages configurable from the admin panel

### Admin dashboard

- Dashboard overview
- Page editor
- Navigation management
- Homepage customization
- Services management
- Resources management
- Blog management
- Events management
- Initiatives management
- Team management
- Testimonials management
- Partners management
- Media library
- Submissions handling
- Site settings

### Content storage

- Local storage-backed by default for quick setup and demos
- Supabase integration supported through environment variables and the data layer
- Ready for future migration to a dedicated backend if required

## Repository Structure

```text
.
├── public/
│   ├── favicon.png
│   ├── favicon.svg
│   ├── favicon-badge.png
│   └── images/
├── src/
│   ├── admin/
│   ├── components/
│   ├── lib/
│   ├── pages/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── scripts/
├── supabase/
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── serve.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── README.md
├── ROADMAP.md
└── .env.example (if added later)
```

## Prerequisites

Before running the project locally, ensure you have:

- Node.js 18 or newer
- npm 9 or newer
- A terminal or VS Code integrated terminal

## Installation

1. Clone the repository.
2. Open the project folder in a terminal.
3. Install dependencies:

```bash
npm install
```

## Environment Variables

This project supports optional Supabase configuration. Create a .env file in the project root if needed:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

If these values are not set, the app will fall back to local storage data.

## Running the App

### Development mode

```bash
npm run dev
```

The app is configured to run on:

- http://localhost:3000

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Available Scripts

```bash
npm run dev       # start Vite dev server
npm run build     # TypeScript check + production build
npm run preview   # preview the production bundle locally
```

## Admin Usage

The admin interface is available at:

```text
/admin
```

The login route is:

```text
/admin/login
```

Use the project’s admin flow to update and manage content. The implementation is designed to be usable for a non-technical editor with a visual content management workflow.

## Data Model Notes

The app uses a data store abstraction in `src/lib/storage/index.ts`.

This layer:

- Reads from localStorage by default
- Uses Supabase when configured
- Keeps a consistent content API across admin and public views

This makes it easy to swap or extend storage backends without rewriting page components.

## Branding and Assets

Brand assets are stored in public folders and can be replaced without changing app logic.

Common asset locations:

- `public/images/` for images and logo variants
- `public/favicon.png` and `public/favicon.svg` for browser branding
- `public/favicon-badge.png` for touch or app-style icons

## Deployment

This project is suitable for:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting platform
- A Node-based hosting setup using the Vite build output

For production deployment:

1. Run `npm run build`
2. Publish the generated `dist/` directory or use the hosting platform’s static deploy flow
3. Configure environment variables on the deployment platform if using Supabase

## Quality and Maintenance Considerations

- Keep content and image files optimized for web performance
- Validate all new uploaded images before publishing
- Ensure navigation and route slugs remain consistent with CMS content
- Back up content before big rebranding changes
- Document new content fields when extending the schema

## Common Troubleshooting

### App does not start

- Verify Node.js and npm versions
- Reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Admin content not appearing

- Check localStorage in browser dev tools
- Verify Supabase environment variables if Supabase is enabled
- Ensure the data store is not blocked by invalid JSON or storage errors

### Build fails

- Run TypeScript build output directly:

```bash
npx tsc --noEmit
```
- Check for broken imports or mismatched types in newly edited files

## License

This project is currently intended for internal or project-specific use unless otherwise specified by the owner.

## Maintainer

The Digital Librarian project team or designated site administrator should manage branding, content, deployment, and operational updates.

## Future Direction

This project is structured to grow with the brand. Planned future improvements may include:

- More structured CMS workflows
- Improved content validation and image processing
- Database-backed content for multi-user editing
- Search and filtering enhancements
- Analytics and conversion tracking
- Multi-language support

---

For a detailed delivery plan and roadmap, see [ROADMAP.md](ROADMAP.md).
