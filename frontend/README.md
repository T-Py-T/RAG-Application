<!-- frontend/README.md -->
<!-- Summarizes the bounded Next.js interface implemented in this directory. -->
<!-- It does not document live data, production deployment, or unimplemented integrations. -->

# HomeScope frontend

This Next.js interface demonstrates neighborhood search with a small synthetic dataset stored in
`lib/neighborhoods.ts`. It supports direct filters, a deterministic natural-language parser, result cards, a map,
and sample detail pages.

The values are illustrative. The interface does not query live listings or resident data and must not be used for
housing or investment decisions.

## Local commands

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm test
pnpm lint
pnpm typecheck
pnpm build
pnpm dev
```

Open `http://127.0.0.1:3000` after starting the development server. See the repository root README for the complete
architecture, backend setup, limitations, and security guidance.
