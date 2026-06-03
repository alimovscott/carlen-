# Next Steps

## Priority 1: Backend Cleanup

| Priority | Task | Notes |
| --- | --- | --- |
| 1 | Decide final domain names. | Choose between `Vehicle`, `VehicleListing`, `Car`, and `Dealer`. Recommended: `VehicleListing` for inventory and `Dealer` for sellers. |
| 2 | Fix known pre-existing backend issues separately from rename. | Keep this as a bugfix task, not part of branding migration. |
| 3 | Plan GraphQL compatibility/deprecation. | Decide whether new vehicle operations will coexist with old `Property` operations. |
| 4 | Design carshop schema fields. | Include brand, model, trim, year, mileage, fuel type, transmission, body type, color, VIN, condition, price, and images. |
| 5 | Plan Mongo data migration. | Decide whether to keep `properties` collection, add `vehicles`, or migrate with aliases. |

## Priority 2: Frontend Migration

| Priority | Task | Notes |
| --- | --- | --- |
| 1 | Audit Next.js routes and components. | Find Nestar, property, real estate, and agent terminology. |
| 2 | Change visible brand copy to Carlen. | Update metadata, navigation, auth pages, footer, dashboard labels, and empty states. |
| 3 | Change UI terminology to carshop language. | Use Car/Vehicle Listing and Dealer/Seller in visible copy. |
| 4 | Keep GraphQL calls compatible. | Continue calling `Property` and `Agent` backend contracts until backend migration. |
| 5 | Add frontend adapters. | Let UI use vehicle names while GraphQL documents keep current operation names. |

## Priority 3: Testing

| Priority | Task | Notes |
| --- | --- | --- |
| 1 | Add or repair smoke tests for renamed app paths. | Confirm `carlen-api` and `carlen-batch` build paths work. |
| 2 | Run TypeScript no-emit checks after every migration layer. | Use app-specific tsconfig files. |
| 3 | Decide lint cleanup strategy. | Existing lint debt should be fixed in a separate formatting/lint-only pass. |
| 4 | Capture GraphQL schema snapshot. | Useful before any GraphQL contract migration. |
| 5 | Add frontend route smoke checks. | Validate listing, detail, favorites, visited, dealer profile, auth. |

## Priority 4: Documentation

| Priority | Task | Notes |
| --- | --- | --- |
| 1 | Keep this docs pack updated after each migration layer. | Treat docs as migration state, not static notes. |
| 2 | Add API contract snapshots. | Include generated GraphQL schema or representative operation list when available. |
| 3 | Add frontend audit results. | Document old route/component names and chosen Carlen replacements. |
| 4 | Add data migration notes. | Record whether database rename, collection rename, or collection compatibility is chosen. |

## Recommended Tomorrow Sequence

1. Snapshot the current generated GraphQL schema.
2. Audit frontend route/component terminology.
3. Decide final backend domain names.
4. Draft vehicle listing schema and compatibility strategy.
5. Repair or isolate lint debt in a separate cleanup plan.
