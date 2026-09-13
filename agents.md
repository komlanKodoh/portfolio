# Agent Instructions & Guidelines for Portfolio Maintenance

Welcome, future agents! This document outlines the architecture, setup, maintenance instructions, and recent overhauls performed on Daniel Kodoh's portfolio project (`/home/danielkodoh/Projects/portfolio`).

## Project Overview
- **Framework:** Gatsby (v4) with TypeScript and Tailwind CSS.
- **Styling:** Tailwind CSS with custom glassmorphism, dark mode gradients, Framer Motion animations, and responsive layouts.
- **Key Sections:**
  1. Hero / Introduction with animated vector human and tech taglines.
  2. About Me with skillset tags.
  3. Featured Projects (featuring **Aether AI Showcase** at the top with live browser screenshot preview, **Athena**, and **Rust Convolutional Neural Network**).
  4. Contact Form & Direct Links (Gmail, Phone, LinkedIn).
  5. Blog Section.

## Recent Overhauls & Changes
1. **Aether AI Showcase Integration:**
   - Captured a live browser screenshot of `https://aether.komlankodoh.com` using Puppeteer (`/src/images/aether-preview.png`).
   - Placed Aether AI Showcase at the **very top** of the Featured Projects section with live preview link, source code link, description, and preview image.
2. **Design Language & UI/UX Upgrade:**
   - Refactored `ShowProject.tsx` with glassmorphism container styling, subtle borders (`border-zinc-800`), hover card scales, pill badge styling, and clean gradients.
3. **Resilience & Build Stability:**
   - Removed rigid Contentful dependencies so the portfolio builds and develops cleanly offline or without API keys.
   - Provided robust local project data and fallback components for blog posts.

## Development & Build Commands
- **Start Dev Server:** `npm run dev` (runs `gatsby develop -H 0.0.0.0`)
- **Production Build:** `npm run build` (runs tailwind compilation and `gatsby build`)
- **Format Code:** `npm run format`
