---
paths: "**/*.{ts,tsx}"
---

## TypeScript Rules

### TRUST INFERENCE (CRITICAL - MOST IMPORTANT RULE)

TypeScript's inference is extremely powerful. Let it do its job.

**NEVER add explicit types when TypeScript can infer them:**
- NO return types on functions
- NO type annotations on variables initialized with a value
- NO type annotations on parameters with default values
- NO type annotations on array/object literals
- NO type annotations on function expressions or arrow functions

**The ONLY exceptions where explicit types are allowed:**
- Uninitialized variables
- Generic type parameters that cannot be inferred
- Type narrowing with `as` when inference is impossible

**If you think you need an explicit type, you're probably wrong.** TypeScript will infer the correct type. Adding explicit types creates maintenance burden and can hide type errors.

### Type Safety
- NEVER recreate types that exist in schemas or libraries
- Reuse existing types from libraries, React, schemas, or internal code

### Constants Pattern
- Arrays/Objects: use `as const satisfies Type` for literal preservation + validation
- Primitives: simple assignment, no annotations

### Error Handling
- Every promise must have error handling
- Operations that can fail must run BEFORE irreversible mutations
