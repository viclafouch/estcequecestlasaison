## Documentation & Dependencies

### CLAUDE.md Updates

After modifying a workspace, **always check** if `CLAUDE.md` needs updates:

- Adding/removing a library → Update Tech Stack or Libraries section
- Changing architecture (icons, routing, state) → Update relevant section
- Adding new patterns or conventions → Document them

**NEVER put code examples in CLAUDE.md files.** Describe concepts, list functions, explain logic - but no code blocks. Code changes too often and documentation becomes stale.

### Dependency Hygiene

When removing or replacing a library:

1. **Remove from `package.json`** - both `dependencies` and `devDependencies`
2. **Run `pnpm install`** - update lockfile
3. **Search for imports** - ensure no remaining references
4. **Update CLAUDE.md** - remove mentions of old library

When adding a library:

1. **Check if already installed** - avoid duplicates
2. **Add to correct section** - `dependencies` vs `devDependencies`
3. **Update CLAUDE.md** - document purpose and usage

### Checklist After Major Changes

- [ ] `CLAUDE.md` reflects current tech stack
- [ ] No unused dependencies in `package.json`
- [ ] No orphan imports in codebase
- [ ] `pnpm lint:fix` passes
