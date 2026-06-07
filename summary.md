# Summary

## Sana
2026-06-05

## Bugun Qilingan Ishlar
Bugun Carlen backend catalog domain migration qilindi. Eski real-estate `Property` terminologiyasi asosiy catalog entity uchun `Product` terminologiyasiga o'tkazildi.

## Asosiy O'zgarishlar
- `property` module o'rniga `product` module yaratildi.
- GraphQL API product-only operationlarga o'tkazildi:
  - `createProduct`
  - `getProduct`
  - `getProducts`
  - `updateProduct`
  - `getAgentProducts`
  - `getAllProductsByAdmin`
  - `likeTargetProduct`
  - `removeProductByAdmin`
- Product DTO, input, update, enum va schema fayllari qo'shildi.
- Mongo catalog collection `products` qilib belgilandi.
- `MemberType.USER`, `MemberType.AGENT`, `MemberType.ADMIN` o'zgarishsiz qoldi.
- Product ownership hali ham `MemberType.AGENT` orqali ishlaydi.
- `memberProperties` counter `memberProducts` ga o'tkazildi.
- Like, view, comment va notification group qiymatlari `PROPERTY` dan `PRODUCT` ga o'tkazildi.
- Favorites va visited aggregations `products` collection bilan ishlaydigan qilindi.
- Batch ranking product fieldlari va `memberProducts` asosida yangilandi.
- `properties` dan `products` ga copy qilish uchun migration script qo'shildi:
  - `scripts/migrate-properties-to-products.ts`
  - `npm run migrate:properties-to-products`

## Product Enum Values
- `ProductType`: `CHEVROLET`, `HYUNDAI`, `KIA`, `BMW`, `TOYOTA`, `MERSEDES`, `RENAULT`
- `ProductTransmission`: `AUTOMATIC`, `MANUAL`
- `ProductStatus`: `HOLD`, `ACTIVE`, `SOLD`, `DELETE`
- `ProductFuelType`: `DIESEL`, `HYBRID`, `ELECTIRIC`, `LPG`

## Validation
Quyidagi tekshiruvlar muvaffaqiyatli o'tdi:

- `npx jest apps/carlen-api/src/components/product/product-domain.spec.ts --runInBand`
- `npx tsc -p apps/carlen-api/tsconfig.app.json --noEmit`
- `npx tsc -p apps/carlen-batch/tsconfig.app.json --noEmit`
- `npm run build`

## Qolgan Ishlar
- Frontend GraphQL operationlarini eski property contractlardan product contractlarga o'tkazish kerak.
- Eski Mongo `properties` datalarini `products` collectionga migration qilish va yangi required car fieldlarini tekshirish/enrich qilish kerak.
- Agar eski like/view/comment history saqlanishi kerak bo'lsa, `PROPERTY` social group datalarini `PRODUCT` ga backfill qilish kerak.
