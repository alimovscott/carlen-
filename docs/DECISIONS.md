# Migration Decisions

| Decision | Why It Was Made | Risks | Alternatives |
| --- | --- | --- | --- |
| Start with a safe Nestar to Carlen rename layer. | Branding and app identity can be corrected without touching business logic. | Domain names such as `Property` and `Agent` still look like real estate. | Perform a full domain migration immediately, with higher risk and larger blast radius. |
| Keep backend domain logic unchanged. | The request explicitly required no business logic changes. | Real estate terminology remains inside code and GraphQL contracts. | Rename services, DTOs, GraphQL types, and schema fields now. |
| Keep GraphQL API names unchanged. | Preserves frontend and external client compatibility during the safe rename phase. | UI may say Carlen while API still says `Property`. | Introduce new GraphQL operations now and deprecate old ones. |
| Keep Mongo collection names unchanged. | Avoids data migration risk and prevents collection lookup regressions. | Database contains carshop data in real estate-named collections. | Rename collections and write migration scripts. |
| Rename app folders and Nest project IDs. | `apps/carlen-api` and `apps/carlen-batch` make the project identity visible and consistent. | Requires import, script, and build path updates. | Keep folders as `nestar-*` and only change package/messages. |
| Change Mongo database path from `/Nestar` to `/Carlen`. | Aligns runtime database target with the Carlen brand. | This points the app at a different database name; old data is not automatically copied. | Keep `/Nestar` until a database migration is ready. |
| Run non-mutating verification commands. | Avoids formatter or linter auto-fixes that would mix unrelated cleanup into the rename. | Existing lint debt remains. | Run `npm run lint` with `--fix` and accept broad formatting changes. |
| Defer carshop schema conversion. | Vehicle/dealer fields require product decisions and GraphQL/data migration planning. | The codebase remains in a transitional state. | Convert `Property` to vehicle listing immediately. |
| Treat frontend target name as Carlen. | Keeps frontend documentation consistent with the backend migration and app identity. | Any external naming plan would need separate docs later. | Document the frontend target under a different product name. |

## Known Risks

- The frontend may need to display carshop terminology while still calling `Property` GraphQL operations.
- The Mongo database name change to `Carlen` creates a new logical database target unless data is copied from `Nestar`.
- Repo-wide lint and Prettier issues remain outside the safe rename scope.
- `Property` and `Agent` names are temporarily confusing but intentionally preserved for compatibility.
- Later domain migration must coordinate backend contracts, frontend query names, and data migration.
