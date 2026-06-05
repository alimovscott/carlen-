# Next Steps

## Priority 1: Product Migration Follow-Up

| Priority | Task | Notes |
| --- | --- | --- |
| 1 | Update frontend GraphQL calls. | Replace old property operations with product operations and product field names. |
| 2 | Review migrated product data. | `scripts/migrate-properties-to-products.ts` fills new vehicle fields with defaults that need enrichment. |
| 3 | Decide whether to migrate social history. | Old `PROPERTY` likes/views/comments are not automatically rewritten to `PRODUCT`. |
| 4 | Add focused product API tests. | Cover create/list/detail/update/admin, favorites/visited, comments, likes, and AGENT ownership. |
| 5 | Decide dealer terminology migration. | `MemberType.AGENT` remains unchanged by design. |

## Priority 2: Data And Operations

| Priority | Task | Notes |
| --- | --- | --- |
| 1 | Run the product data migration in a controlled environment. | Use `npm run migrate:properties-to-products`; do not delete `properties`. |
| 2 | Backfill `memberProducts` if existing member records still use `memberProperties`. | Use product counts by owner after product migration. |
| 3 | Backfill social group references if preserving old engagement data is required. | Convert old catalog-related `PROPERTY` groups to `PRODUCT` after confirming target IDs. |
| 4 | Capture generated GraphQL schema snapshot. | Useful for frontend and regression checks. |

## Priority 3: Validation

| Priority | Task | Notes |
| --- | --- | --- |
| 1 | Keep app-specific no-emit checks green. | `npx tsc -p apps/carlen-api/tsconfig.app.json --noEmit` and batch equivalent. |
| 2 | Keep full build green. | `npm run build`. |
| 3 | Plan lint cleanup separately. | `npm run lint` rewrites files with `--fix`. |
