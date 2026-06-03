# Frontend Migration: Nestar to Carlen

## Goal

Migrate the Next.js frontend from Nestar real estate terminology to Carlen carshop terminology while keeping current backend GraphQL calls compatible.

The backend currently still exposes `Property` and `Agent` GraphQL contracts, so the frontend should first change visible UI labels and route names without changing GraphQL operation names.

## Step-By-Step Plan

| Step | Action | Notes |
| --- | --- | --- |
| 1 | Audit current Next.js routes, layouts, components, hooks, and GraphQL documents. | Identify all visible Nestar, property, real estate, and agent terminology. |
| 2 | Rename visible brand copy from Nestar to Carlen. | Update nav, metadata, footer, auth screens, dashboard labels, and empty states. |
| 3 | Change UI terminology from real estate to carshop terms. | Keep backend field names in data mapping code for now. |
| 4 | Add frontend adapter names where useful. | Example: map backend `propertyTitle` to local `vehicleTitle` in view models. |
| 5 | Keep existing GraphQL queries and mutations unchanged. | Avoid backend contract breakage during this phase. |
| 6 | Update frontend routes after confirming UX direction. | Example: `/properties` can become `/cars` or `/vehicles`. |
| 7 | Add frontend tests or smoke checks for primary screens. | Focus on listing, detail, favorites, visited, dealer profile, auth. |
| 8 | Plan backend GraphQL domain migration separately. | Only then rename GraphQL operations/types. |

## Page And Component Mapping

| Old Nestar Frontend Concept | Carlen Frontend Concept | Backend Contract For Now |
| --- | --- | --- |
| Home / real estate landing | Carlen carshop home | No backend change required |
| Properties page | Cars or vehicle listings page | `getProperties` |
| Property detail page | Vehicle listing detail page | `getProperty` |
| Create property page | Create vehicle listing page | `createProperty` |
| Edit property page | Edit vehicle listing page | `updateProperty` |
| Agent properties | Dealer inventory | `getAgentProperties` |
| All properties admin page | Admin vehicle listings | `getAllPropertiesByAdmin` |
| Favorite properties | Favorite vehicles | `getFavorites` |
| Visited properties | Recently viewed vehicles | `getVisited` |
| Agents page | Dealers or sellers page | `getAgents` |
| Agent profile | Dealer profile | `getMember` / existing member contracts |
| Property comments | Listing comments | Existing comment contracts |

## UI Terminology Changes

| Current UI Term | New UI Term |
| --- | --- |
| Nestar | Carlen |
| Property | Car / Vehicle Listing |
| Properties | Cars / Vehicle Listings |
| Agent | Dealer / Seller |
| Agent properties | Dealer inventory |
| Property type | Body type or vehicle type |
| Property location | Vehicle location / dealer location |
| Property price | Vehicle price |
| Property images | Vehicle photos |
| Property description | Vehicle description |
| Favorites | Favorites |
| Visited | Recently viewed |

## GraphQL Query And Mutation Rename Plan

### Phase 1: UI-Only Rename

Keep backend GraphQL calls unchanged:

| Current GraphQL Name | Frontend Display Name |
| --- | --- |
| `getProperties` | Fetch vehicle listings |
| `getProperty` | Fetch vehicle detail |
| `createProperty` | Create vehicle listing |
| `updateProperty` | Update vehicle listing |
| `likeTargetProperty` | Favorite vehicle |
| `getAgentProperties` | Fetch dealer inventory |
| `getAllPropertiesByAdmin` | Fetch admin vehicle listings |

### Phase 2: Frontend Aliases And Adapters

Create local frontend wrappers without changing the backend:

| Adapter Name | Calls Backend |
| --- | --- |
| `fetchVehicleListings` | `getProperties` |
| `fetchVehicleListing` | `getProperty` |
| `createVehicleListing` | `createProperty` |
| `updateVehicleListing` | `updateProperty` |
| `favoriteVehicleListing` | `likeTargetProperty` |
| `fetchDealerInventory` | `getAgentProperties` |

### Phase 3: Backend Contract Rename

After backend domain migration:

- Add new GraphQL vehicle/dealer operations.
- Keep old `Property` operations temporarily as deprecated compatibility aliases.
- Update frontend GraphQL documents to call the new operations.
- Remove old aliases only after all clients are migrated.

## Compatibility Warning

The backend still exposes `Property`, `Agent`, and related real estate terms in GraphQL. Frontend code should isolate those names in data-fetching and adapter layers so UI components can use Carlen terminology now.
