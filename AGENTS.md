# Carlen Backend Agent Instruction

Carlen is NESTJS Graphl monorepo migrated from Real estate platform into a carshop platform

## Read First

Before changing code, read the current AI handoff docs:

- `docs/BACKEND_MIGRATION.md`
- `docs/DECISIONS.md`
- `docs/COMPLETED_TASK.md`
- `docs/NEXT_STEPS.md`

Use those files as the source of truth for AI Agent related migration history, accepted decisons, remaining work and validation status.

## Project Shape

- Backend apps are `carlen-api` and `carlen-batch.`
- Keep the existing NestJS resolver/service/module pattern based on MVC and DI.
- Keep DTOs, enums, schemas under `apps/carlen-api/src/libs`.
- Keep shared modules reusable: auth, member, like, view, comment, follow, board article, socket.

## Domain Rules

- Use Carlen/product terminology for the main catolog entity.
- Do not reitroduce property or real-estate fields.
- Keep `MemberType.USER`,`MemberType.AGENT`and `MemberType.ADMIN` unchanged.
- Product ownership continues to use `MemberType.AGENT` unless a later migration explicitly changes it.
- Product enum values are:
  - `productType`: `CHEVROLET`,`HYUNDAI`, `KIA`,`BMW`,`TOYOTA`,`MERSEDES-BENZ`, `RENAULT`
  - `productTransmission`: `AUTOMATIC`, `MANUAL`
  - `productStatus`: `HOLD`,`ACTIVE`,`SOLD`,`DELETE`

## Workflow

1. Anylyze before editing.
2. Keep changes small and consistent with existing patterns.
3. Do not remove working logic unless it is replaced safely.
4. Update `docs/ai/COMPLETED_TASK.md` after major completed work.
5. Add or update focused tests when behavior changes.

## Valadition

Use these checks for backend work:

```bash
npx tsc -p apps/carlen-api/tsconfig.app.json --noEmit
npx tsc -p apps/carlen-batch/tsconfig.app.json --noEmit
npx run build
```

`npm run lint` runs ESlint with `--fix`, so use it only when file rewriting is acceptable!
