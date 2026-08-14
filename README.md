# infradevops.xyz

Dark, Terminal Noir–inspired portfolio for a blockchain infrastructure operator. The project is built as a static React experience in the Manus web-static template and is ready to deploy to Cloudflare Pages.

## Local development

```bash
pnpm install
pnpm dev
```

Check the production build with:

```bash
pnpm build
```

## Cloudflare Pages deployment

1. Push this repository to GitHub.
2. Create a Cloudflare Pages project and connect the repository.
3. Select **React (Vite)** as the framework preset.
4. Use `pnpm install` as the install command and `pnpm build` as the build command.
5. Set the output directory to `dist/public` if using the included server build, or `dist` when deploying directly as a Vite static site.

The page uses generated Manus storage URLs for the hero field, module illustration, timeline texture, avatar, and geometric logo. Keep those URLs intact.

## Content notes

The supplied brief requested anonymous testimonials. Those quotes are not rendered as endorsements because the site should not present invented user-generated feedback as real. They have been replaced with an **Operating Principles** section; add sourced, permissioned testimonials later if available.

Replace `hello@infradevops.xyz`, any personal location details, and any social placeholders before public launch.

## Project structure

```text
client/
  index.html
  public/robots.txt
  src/
    App.tsx
    index.css
    pages/Home.tsx
ideas.md
```
