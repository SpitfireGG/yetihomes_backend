# AUDIT_ADMIN.md — Admin Panel Changes

## Type Definitions Updated

**File:** `src/@types/property.ts`

| Change | Details |
|--------|---------|
| `RoadType` type | Added: `"PITCHED" \| "CONCRETE" \| "GRAVEL" \| "UNDER_CONSTRUCTION" \| "NONE"` |
| `HouseSubType` type | Updated: Added `SEMI_BUNGALOW`, `COMMERCIAL`, `SEMI_COMMERCIAL`, `FLAT_SYSTEM_HOSUE`, `COLONY_HOUSE` (aligned with Prisma schema) |
| `ApartmentSubType` type | Updated: Added `LUXURY` (aligned with Prisma schema) |
| `LandSubType` type | Updated: Added `COLONY_LAND`, `GUTHI_LAND` (aligned with Prisma schema) |
| `Property.propertyCode` | Added: `string \| null` |
| `HouseDetails.facingDirection` | Added: `FacingDirection \| null` |
| `HouseDetails.roadType` | Added: `RoadType \| null` |
| `ApartmentDetails.facingDirection` | Added: `FacingDirection \| null` |
| `ApartmentDetails.roadType` | Added: `RoadType \| null` |
| `PropertyFormData.propertyCode` | Added: optional `string` |

---

## Forms Updated

### Create Property Form
**File:** `src/app/(admin)/properties/create/page.tsx`

| Change | Details |
|--------|---------|
| `propertyCode` input | Added in Basic Info tab after Title. Text input, placeholder "YC-0098", maxLength 6 |
| `houseSubTypes` dropdown | Updated with all 9 values from schema |
| `apartmentSubTypes` dropdown | Added `LUXURY` |
| `landSubTypes` dropdown | Added `COLONY_LAND`, `GUTHI_LAND` |
| `roadTypes` constant | Added: PITCHED, CONCRETE, GRAVEL, UNDER_CONSTRUCTION, NONE |
| HOUSE details tab | Added `facingDirection` and `roadType` select dropdowns |
| APARTMENT details tab | Added `facingDirection` and `roadType` select dropdowns |
| Form submission | `propertyCode` flows through `...formData` spread; `facingDirection`/`roadType` included in details objects |

### Edit Property Form
**File:** `src/app/(admin)/properties/edit/[id]/edit-property-client.tsx`

| Change | Details |
|--------|---------|
| `propertyCode` input | Added in Basic Info tab after Title. Text input, placeholder "YC-0098", maxLength 6 |
| `houseSubTypes` dropdown | Updated with all 9 values from schema |
| `apartmentSubTypes` dropdown | Added `LUXURY` |
| `landSubTypes` dropdown | Added `COLONY_LAND`, `GUTHI_LAND` |
| `roadTypes` constant | Added: PITCHED, CONCRETE, GRAVEL, UNDER_CONSTRUCTION, NONE |
| HOUSE details tab | Added `facingDirection` and `roadType` select dropdowns |
| APARTMENT details tab | Added `facingDirection` and `roadType` select dropdowns |
| Data loading | `propertyCode`, `facingDirection`, `roadType` loaded from existing property data into form state |
| Form submission | All new fields included in submitted details objects |

---

## Sub-Type Alignment (Admin ↔ Schema)

| Model | Admin Before | Admin After | Schema |
|-------|-------------|-------------|--------|
| HouseSubType | BUNGALOW, VILLA, DUPLEX, TOWNHOUSE | +SEMI_BUNGALOW, COMMERCIAL, SEMI_COMMERCIAL, FLAT_SYSTEM_HOSUE, COLONY_HOUSE | All 9 values |
| ApartmentSubType | STUDIO, APARTMENT, PENTHOUSE, CONDO | +LUXURY | All 5 values |
| LandSubType | RESIDENTIAL_PLOT, COMMERCIAL_LAND, AGRICULTURAL_LAND | +COLONY_LAND, GUTHI_LAND | All 5 values |

---

## Build Verification
- `npm run build` (next build): ✅ Passes with zero errors
