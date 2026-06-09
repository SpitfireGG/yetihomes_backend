# AUDIT_BACKEND.md — Backend API Changes

## Schema Changes (Prisma)

**File:** `prisma/schema.prisma`

| Change | Type | Details |
|--------|------|---------|
| `RoadType` enum | Added | Values: `PITCHED`, `CONCRETE`, `GRAVEL`, `UNDER_CONSTRUCTION`, `NONE` |
| `Property.propertyCode` | Added | `String? @db.VarChar(6)` — admin-fillable, max 6 chars (e.g. "YC-0098") |
| `HouseDetails.facingDirection` | Added | `FacingDirection?` — 8 compass directions (was only on LandDetails) |
| `HouseDetails.roadType` | Added | `RoadType?` — Nepal-relevant road types |
| `ApartmentDetails.facingDirection` | Added | `FacingDirection?` — 8 compass directions |
| `ApartmentDetails.roadType` | Added | `RoadType?` — Nepal-relevant road types |
| `HouseSubType` enum | Updated | Added `DUPLEX`, `TOWNHOUSE` (were in DB but missing from schema) |

**Migration:** `prisma db push` applied successfully. No `prisma migrate` was used because the database pre-existed without migration history.

---

## API DTOs Updated

| File | Change |
|------|--------|
| `src/modules/marketplace/dtos/base-property-dto.ts` | Added `propertyCode` field with `@IsString()`, `@IsOptional()`, `@MaxLength(6)` |
| `src/modules/marketplace/houses/dto/create-houses-details.dto.ts` | Added `facingDirection` (`FacingDirection`) and `roadType` (`RoadType`) optional enum fields |
| `src/modules/marketplace/apartments/dto/create-apartment-details.dto.ts` | Added `facingDirection` (`FacingDirection`) and `roadType` (`RoadType`) optional enum fields |
| `src/modules/marketplace/search/search.dto.ts` | Added `roadType` (`RoadType`) optional enum filter |

All update DTOs use `PartialType(CreateXxxDto)` so they automatically inherit the new fields.

---

## Services & Controllers Updated

### PropertiesController (`src/modules/marketplace/properties/properties.controller.ts`)
- Added `propertyCode` to destructuring in both `create()` and `update()` methods
- Added `propertyCode` to Prisma `create` and `update` data
- Added `propertyCode` to `PROPERTY_SELECT` constant

### SearchService (`src/modules/marketplace/search/search.service.ts`)
- Added `propertyCode` to both `search()` and `getBySlug()` select queries
- Added `facingDirection` and `roadType` to `houseDetails` and `apartmentDetails` selects
- Updated `facingDirection` filter to search across all 3 detail types (land, house, apartment) via OR
- Added `roadType` filter for house and apartment details
- Added `getNewListings()` method — returns properties created in last 7 days, max 10, sorted newest first

### SearchController (`src/modules/marketplace/search/search.controller.ts`)
- Added `GET /properties/search/new-listings` route

### Houses/Lands/Apartments Services & Controllers
- Updated `findAll()` to accept `page` and `limit` query params
- Default page: 1, default limit: 20
- Response shape: `{ data: [...], meta: { total, page, limit, totalPages } }`

### PropertiesController findAll
- Updated to accept pagination query params
- Same paginated response shape

---

## Endpoints Summary

| Endpoint | Method | Pagination | New/Changed |
|----------|--------|------------|-------------|
| `/api/properties/search` | GET | Cursor-based (already existed) | Added `roadType` filter, `facingDirection` now searches all detail types |
| `/api/properties/search/new-listings` | GET | — | **NEW** — last 7 days, max 10 |
| `/api/properties` | GET | Page/limit (added) | Added pagination |
| `/api/houses` | GET | Page/limit (added) | Added pagination |
| `/api/lands` | GET | Page/limit (added) | Added pagination |
| `/api/apartments` | GET | Page/limit (added) | Added pagination |
| `/api/properties/:id` | GET | — | Returns `propertyCode`, `facingDirection`/`roadType` on all detail types |
| `/api/properties` | POST | — | Accepts `propertyCode`, `facingDirection`/`roadType` on house/apartment details |
| `/api/properties/:id` | PATCH | — | Accepts `propertyCode`, `facingDirection`/`roadType` on house/apartment details |

---

## Build Verification
- `npm run build` (nest build): ✅ Passes with zero errors
