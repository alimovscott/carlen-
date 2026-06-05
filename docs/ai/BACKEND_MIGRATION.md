# Backend Migration: Nestar to Carlen Product Domain

## Current Project Summary

Carlen is a NestJS GraphQL monorepo migrated from a real estate platform into a carshop platform. The backend now exposes the main catalog entity as `Product`.

| Area | Current State |
| --- | --- |
| API app | `apps/carlen-api` |
| Batch app | `apps/carlen-batch` |
| Framework | NestJS |
| API style | Code-first GraphQL |
| Database | MongoDB with Mongoose |
| Catalog domain | `Product` |
| Product owner role | `MemberType.AGENT` |

## Product Migration Completed

| Old Area | New Area | Notes |
| --- | --- | --- |
| `property` module | `product` module | Resolver/service/module pattern preserved. |
| `Property` / `Properties` DTOs | `Product` / `Products` DTOs | GraphQL object types now use product terminology. |
| `PropertyInput` / `PropertyUpdate` | `ProductInput` / `ProductUpdate` | Real-estate fields removed. |
| `PropertyType` / `PropertyStatus` / `PropertyLocation` | `ProductType` / `ProductStatus` / `ProductLocation` | Product enums registered for GraphQL. |
| `PropertySchema` | `ProductSchema` | Uses Mongo collection `products`. |
| `memberProperties` | `memberProducts` | Member product count and rank calculation updated. |
| `PROPERTY` social group | `PRODUCT` social group | Likes, views, comments, and notifications updated. |

## Product Model

Product enum values are:

| Enum | Values |
| --- | --- |
| `ProductType` | `CHEVROLET`, `HYUNDAI`, `KIA`, `BMW`, `TOYOTA`, `MERSEDES`, `RENAULT` |
| `ProductTransmission` | `AUTOMATIC`, `MANUAL` |
| `ProductStatus` | `HOLD`, `ACTIVE`, `SOLD`, `DELETE` |
| `ProductFuelType` | `DIESEL`, `HYBRID`, `ELECTIRIC`, `LPG` |

Product fields include type, model, status, location, address, year, title, price, transmission, mileage, fuel type, doors, seats, views, likes, comments, rank, images, description, owner `memberId`, sold/deleted timestamps, and Mongoose timestamps.

Removed real-estate fields: square, beds, rooms, barter, rent, and constructed date.

## GraphQL Contract

The backend now exposes product-only catalog operations:

| Operation Type | Product Operations |
| --- | --- |
| Mutations | `createProduct`, `updateProduct`, `likeTargetProduct`, `updateProductByAdmin`, `removeProductByAdmin` |
| Queries | `getProduct`, `getProducts`, `getAgentProducts`, `getAllProductsByAdmin`, `getFavorites`, `getVisited` |

Old `Property` GraphQL compatibility aliases were not kept.

## MongoDB Collections

| Collection | Status |
| --- | --- |
| `products` | New active catalog collection. |
| `properties` | Legacy source collection retained for migration/reference. |
| `members` | Uses `memberProducts` counter. |
| `likes`, `views`, `comments`, `notifications` | Use `PRODUCT` group for product records. |

A one-time migration path exists at `scripts/migrate-properties-to-products.ts`, runnable with `npm run migrate:properties-to-products`. It copies old `properties` documents to `products` without deleting the old collection and fills new vehicle fields with explicit fallback values.
