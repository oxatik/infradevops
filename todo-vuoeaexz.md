# Cloudflare build repair

- [ ] Locate the Vite `index.html` entrypoint and confirm the frontend subfolder.
- [ ] Update `package.json` so the build runs Vite from the correct frontend folder.
- [ ] Add the top-level pnpm `onlyBuiltDependencies` configuration.
- [ ] Run typecheck and production build validation.
- [ ] Commit and push the fix to GitHub.
- [ ] Verify the Cloudflare deployment result and report any remaining limitation.
- [ ] Read the attached text file and identify its requested project changes.
- [ ] Apply the relevant changes to the existing frontend.
- [ ] Validate the updated project and publish a checkpoint.
- [ ] Read package.json, server/index.ts, and wrangler.jsonc.
- [ ] Remove --packages=external from the build script.
- [ ] Ensure server/index.ts has a default Worker fetch export.
- [ ] Validate, commit, and push the fix to main.
- [ ] Run the exact cat and grep commands against the current files.
- [ ] Ensure package.json contains no packages=external flag.
- [ ] Ensure server/index.ts contains export default with fetch.
- [ ] Ensure wrangler.jsonc contains the required main and assets directory.
- [ ] Re-run all verification commands, validate, and push the corrected state.
