# Cloudflare build repair

- [ ] Locate the Vite `index.html` entrypoint and confirm the frontend subfolder.
- [ ] Update `package.json` so the build runs Vite from the correct frontend folder.
- [ ] Add the top-level pnpm `onlyBuiltDependencies` configuration.
- [ ] Run typecheck and production build validation.
- [ ] Commit and push the fix to GitHub.
- [ ] Verify the Cloudflare deployment result and report any remaining limitation.
