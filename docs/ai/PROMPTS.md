# Useful Prompts

## Prompts Used In This Session

### Analyze Monorepo Migration State

```text
Analyze current Nestar monorepo structure to transform existing NestJS monorepo Nestar platform into Carshop platform.
```

Use this to have Codex inspect project structure, modules, GraphQL contracts, schemas, DTOs, and migration risks.

### Create Safe Rename Plan

```text
Safe rename layer, no business logic change. Rename all visible project/app identifiers from Nestar to Carlen. Do not change domain logic. Keep APIs and database collections unchanged. Update package names, environment labels, constants. Run lint and typecheck after refactoring. Please make plan first.
```

Use this when the next session needs a careful plan before applying a branding-only rename.

### Implement Safe Rename Layer

```text
Please implement the approved safe Nestar to Carlen rename plan. Only rename visible project/app identifiers. Do not change GraphQL APIs, DTOs, domain logic, Mongoose models, or MongoDB collection names. Run non-mutating lint and TypeScript checks after the refactor.
```

Use this to execute only the branding-safe rename layer.

### Create Migration Documentation Pack

```text
Create a docs folder with BACKEND_MIGRATION.md, DECISIONS.md, FRONTEND_MIGRATION.md, COMPLETED_TASKS.md, NEXT_STEPS.md, and PROMPTS.md. Use everything completed and discussed in this Codex session. Do not change application source code. Only create documentation files. Be precise and technical. Use markdown tables where useful.
```

Use this to regenerate or update migration documentation.

## Reusable Prompts For Next Codex Sessions

### Backend Domain Migration Plan

```text
Plan the next backend migration layer from Property/Agent real estate terminology to Carlen carshop terminology. Do not implement yet. Inspect the current repo first. Produce a decision-complete plan for introducing VehicleListing and Dealer while preserving GraphQL compatibility and Mongo collection safety.
```

### Vehicle Listing Schema Design

```text
Analyze the current Property schema, DTOs, inputs, enums, resolver, and service. Propose a Carlen VehicleListing schema with fields for brand, model, trim, year, mileage, fuel type, transmission, body type, color, VIN, condition, price, photos, description, dealer, status, views, likes, comments, and rank. Include migration and compatibility notes.
```

### GraphQL Compatibility Strategy

```text
Create a GraphQL compatibility/deprecation plan for renaming Property operations and types to VehicleListing operations and types. Keep existing clients working during migration. Include old-to-new operation mappings, resolver alias strategy, test cases, and frontend rollout sequence.
```

### Frontend Carlen Terminology Migration

```text
Inspect the Next.js frontend and create a precise migration plan from Nestar real estate UI terminology to Carlen carshop UI terminology. Keep current backend GraphQL operations unchanged for phase 1. Map pages, components, hooks, GraphQL documents, and visible labels.
```

### Lint Cleanup Plan

```text
Plan a formatting/lint cleanup pass isolated from business logic. Inspect the current ESLint and Prettier failures, group them by type, and propose a safe sequence that avoids behavior changes. Do not change source code until the plan is approved.
```

### Mongo Data Migration Plan

```text
Plan MongoDB migration options for moving from real estate collections and fields to carshop collections and fields. Compare keeping properties, creating vehicles, and dual-write/alias strategies. Include risks, rollback strategy, and required scripts.
```

### Post-Migration Validation

```text
Create a validation checklist for the Carlen migration. Include TypeScript checks, GraphQL schema snapshot comparison, API smoke tests, frontend route smoke tests, Mongo collection verification, and old-branding search commands.
```
