# Backend Migration: Nestar to Carlen

## Original Project Summary

Nestar started as a NestJS GraphQL monorepo for a real estate platform. The backend used code-first GraphQL, MongoDB through Mongoose, and a monorepo layout with separate API and batch applications.

The original domain model centered on real estate concepts:

| Area | Original Concept |
| --- | --- |
| Inventory | `Property`, `Properties`, `PropertyType`, `PropertyLocation` |
| Sellers | `Agent` represented through `MemberType.AGENT` |
| Engagement | property likes, views, comments, favorites, visited properties |
| Storage | Mongo collection `properties` |

## New Project Summary

Carlen is the renamed backend platform for a carshop migration. The current state is a safe branding layer, not a full domain conversion.

| Area | Current State |
| --- | --- |
| API app | `apps/carlen-api` |
| Batch app | `apps/carlen-batch` |
| Framework | NestJS |
| API style | Code-first GraphQL |
| Database | MongoDB with Mongoose |
| Domain compatibility | Existing `Property` and `Agent` concepts remain active |

## Backend Migration Goal

The migration goal is staged:

1. Complete a safe project/application rename from Nestar to Carlen.
2. Preserve existing GraphQL, DTO, service, schema, and Mongo collection compatibility.
3. Plan the later business-domain migration from real estate terminology to carshop terminology.
4. Avoid mixing branding refactors with behavior changes.

## Naming Changes Completed

| Old Identifier | New Identifier | Notes |
| --- | --- | --- |
| `nestar` package name | `carlen` | Updated in package metadata. |
| `apps/nestar-api` | `apps/carlen-api` | API app folder/project identifier. |
| `apps/nestar-batch` | `apps/carlen-batch` | Batch app folder/project identifier. |
| `nestar-api` Nest project | `carlen-api` Nest project | Updated in Nest CLI config. |
| `nestar-batch` Nest project | `carlen-batch` Nest project | Updated in Nest CLI config. |
| `dist/apps/nestar-api` | `dist/apps/carlen-api` | TypeScript output path. |
| `dist/apps/nestar-batch` | `dist/apps/carlen-batch` | TypeScript output path. |
| Mongo database path `/Nestar` | Mongo database path `/Carlen` | Collection names unchanged. |
| `welcome to nestar-api!` | `welcome to carlen-api!` | Visible API root message. |

## Module Changes

The module layout remains functionally unchanged:

| Module | Current Status |
| --- | --- |
| `auth` | Unchanged |
| `member` | Unchanged |
| `property` | Unchanged, still the inventory compatibility module |
| `board-article` | Unchanged |
| `comment` | Unchanged |
| `like` | Unchanged |
| `view` | Unchanged |
| `follow` | Unchanged |
| `socket` | Unchanged |
| `batch` | Renamed app wrapper only; business behavior unchanged |

The batch app imports now point to `apps/carlen-api/...`, but the imported DTOs, enums, and schemas retain their original names.

## GraphQL Changes

No GraphQL contract rename has been performed yet.

| GraphQL Area | Current Compatibility Status |
| --- | --- |
| Object types | `Property`, `Properties`, `Member`, etc. remain unchanged. |
| Inputs | `PropertyInput`, `PropertyUpdate`, `PropertiesInquiry`, etc. remain unchanged. |
| Queries | `getProperty`, `getProperties`, `getAgentProperties`, etc. remain unchanged. |
| Mutations | `createProperty`, `updateProperty`, `likeTargetProperty`, etc. remain unchanged. |
| Enums | `PropertyType`, `PropertyStatus`, `PropertyLocation`, `MemberType.AGENT` remain unchanged. |

Frontend clients must continue using the old GraphQL names until a later backend domain migration introduces vehicle/carshop contracts.

## MongoDB Collection And Schema Changes

The Mongo database name has moved to `Carlen`, but Mongo collection names and Mongoose schemas are unchanged.

| Mongo Area | Current Status |
| --- | --- |
| Database name | `/Carlen` |
| `properties` collection | Unchanged |
| `members` collection | Unchanged |
| `likes` collection | Unchanged |
| `views` collection | Unchanged |
| `comments` collection | Unchanged |
| `follows` collection | Unchanged |
| `boardArticles`/article collection usage | Unchanged |
| `notifications` collection | Unchanged |

## Compatibility Notes

- `Property` currently represents the future car inventory/listing concept.
- `Agent` currently represents the future dealer/seller concept.
- Existing frontend GraphQL calls should not be renamed yet.
- Existing Mongo collection names should not be renamed until a data migration plan exists.
- The next major backend migration should introduce vehicle/dealer terminology in a controlled compatibility phase.
