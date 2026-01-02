# CLAUDE.md

This file provides guidance to Claude Code when working with the Angular Three documentation.

## Repository Overview

This is the Astro-based documentation site for Angular Three. It uses Starlight theme.

## Source Code Reference

The Angular Three source code lives at: `/Users/nartc/code/github/angular-threejs/angular-three`

When documenting APIs, reference the source repo for:

- **JSDoc comments** - All public APIs have comprehensive JSDoc (recently added)
- **README files** - `libs/*/README.md` and `libs/**/README.md` contain detailed API docs
- **Usage examples** - `apps/examples/src/app/` has real-world usage
- **Stories** - `libs/soba/.storybook/` and `libs/soba/src/*.stories.ts`

### Key Source Directories

| Path                   | Description                                                                  |
| ---------------------- | ---------------------------------------------------------------------------- |
| `libs/core/`           | Core renderer, canvas, directives, utilities                                 |
| `libs/soba/`           | High-level components (cameras, controls, loaders, materials, staging, etc.) |
| `libs/cannon/`         | Cannon.js physics integration                                                |
| `libs/rapier/`         | Rapier physics integration                                                   |
| `libs/postprocessing/` | Post-processing effects                                                      |
| `libs/theatre/`        | Theatre.js animation integration                                             |
| `libs/tweakpane/`      | Tweakpane debug UI integration                                               |

## Documentation Structure

```
src/content/
├── docs/
│   ├── index.mdx              # Home page
│   ├── blog/                   # Version announcements
│   ├── learn/                  # Tutorials and guides
│   │   ├── getting-started/    # Installation, first scene
│   │   ├── basics/             # Core concepts
│   │   └── advanced/           # Advanced topics, performance
│   └── reference/              # API reference
│       ├── core/               # Core library APIs
│       ├── soba/               # Soba components
│       └── plugin/             # Nx plugin
├── references/                 # Detailed API references (markdown)
│   └── soba/                   # Soba component references
└── snippets/                   # Reusable code snippets
```

## Commands

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Writing Documentation

### API Documentation Pattern

When documenting a component/function:

1. Check the source README in angular-three repo (e.g., `libs/soba/loaders/README.md`)
2. Check JSDoc comments in the source files
3. Use the new non-deprecated APIs (e.g., `gltfResource` not `injectGLTF`)
4. Use Signal semantics in descriptions (not "function returning")

### Code Examples

- Use Angular 19+ syntax (signals, new control flow)
- Import from published packages: `angular-three`, `angular-three-soba/*`
- Keep examples minimal but complete

### Frontmatter

```yaml
---
title: Component Name
description: Brief description
---
```

## API Naming Conventions

### Deprecated → New APIs

| Deprecated          | New API           | Package                           |
| ------------------- | ----------------- | --------------------------------- |
| `injectGLTF`        | `gltfResource`    | `angular-three-soba/loaders`      |
| `injectTexture`     | `textureResource` | `angular-three-soba/loaders`      |
| `injectFont`        | `fontResource`    | `angular-three-soba/loaders`      |
| `injectFBX`         | `fbxResource`     | `angular-three-soba/loaders`      |
| `injectAnimations`  | `animations`      | `angular-three-soba/misc`         |
| `injectFBO`         | `fbo`             | `angular-three-soba/misc`         |
| `injectDepthBuffer` | `depthBuffer`     | `angular-three-soba/misc`         |
| `injectHelper`      | `helper`          | `angular-three-soba/abstractions` |
| `injectProgress`    | `progress`        | `angular-three-soba/loaders`      |

### Signal Semantics

Functions accepting `() => T` are designed for Angular Signals. Document as:

- "Signal of X" (not "function returning X")
- "Signal containing X" (not "factory function")

## Cross-Referencing Source

To get accurate API information, read from the source repo:

```
# READMEs with full API docs
/Users/nartc/code/github/angular-threejs/angular-three/libs/soba/loaders/README.md
/Users/nartc/code/github/angular-threejs/angular-three/libs/soba/staging/README.md
/Users/nartc/code/github/angular-threejs/angular-three/libs/core/README.md
# etc.

# Source files with JSDoc
/Users/nartc/code/github/angular-threejs/angular-three/libs/soba/loaders/src/lib/*.ts
/Users/nartc/code/github/angular-threejs/angular-three/libs/core/src/lib/*.ts
# etc.
```

## Sidebar Configuration

The sidebar is configured in `astro.sidebar.mjs`. Update this when adding new pages.
