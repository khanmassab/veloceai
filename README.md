# VeloceAI Landing Page

A modern, animated landing page for VeloceAI built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, professional design with VeloceAI branding
- **Smooth Animations**: Subtle, performant animations using Framer Motion
- **Responsive**: Mobile-first design that works on all devices
- **Fast Loading**: Optimized for performance with minimal dependencies
- **SEO Ready**: Proper meta tags and semantic HTML

## Tech Stack

- React 19+ with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## Brand Guidelines

- **Colors**: Navy blue (#1a365d), Electric blue (#3b82f6), White, Gray-900
- **Font**: Inter for all text
- **Voice**: Direct, no fluff, short sentences, calm confidence
- **Animations**: Subtle and professional, 60fps performance

## Sections

1. **Hero**: Bold headline with CTA and animated background
2. **Problem**: Three-column layout showing common AI implementation issues
3. **Solution**: Timeline visualization of VeloceAI's process
4. **How It Works**: Feature breakdown with icons
5. **Technical Credibility**: Brief technical points
6. **CTA**: Final call-to-action with contact information
7. **Footer**: Simple footer with links

## Customization

To add the Calendly link, update the Button components in the Hero and CTA sections:

```tsx
<Button size="lg" onClick={() => window.open("YOUR_CALENDLY_LINK", "_blank")}>
  Book a Call
</Button>
```

## Performance

- All animations are GPU-accelerated
- Images and assets are optimized
- Code splitting for optimal loading
- Minimal bundle size with tree shaking
