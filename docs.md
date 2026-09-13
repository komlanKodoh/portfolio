# Portfolio Technical Documentation

## Architecture & Tech Stack
- **Static Site Generator:** Gatsby 4 (`gatsby`)
- **Language:** TypeScript & React 17
- **Styling Engine:** Tailwind CSS (`tailwindcss`, configured via `tailwind.config.js`)
- **Animation:** Framer Motion (`framer-motion`)
- **Icons & Assets:** Custom SVG components (`src/components/svg/`) and high-resolution project screenshots (`src/images/`).

## Directory Structure
```
portfolio/
├── gatsby-config.js      # Site metadata, plugins, manifest configuration
├── gatsby-node.js        # Node APIs and page generation hooks
├── package.json          # Dependencies and npm scripts
├── src/
│   ├── api/              # Gatsby functions
│   ├── components/       # UI building blocks, basic elements, SVG icons
│   ├── dynamic/          # Dynamic templates (blog, etc.)
│   ├── images/           # Static assets, screenshots (aether-preview.png, etc.)
│   ├── lib/              # Custom hooks and utility functions
│   ├── pages/            # Page components (index.tsx, blog/index.tsx, 404.js)
│   └── style/            # Tailwind CSS source and compiled files
└── agents.md             # Guide for future AI agents
```

## Adding / Updating Projects
To add or modify featured projects, edit `src/pages/index.tsx` inside the `Work` section. Ensure `imageSrc` points to an image inside `src/images/` or `gatsbyImageData` is provided.
