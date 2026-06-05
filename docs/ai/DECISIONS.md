# Migration Decisions

| Decision | Why It Was Made | Risks | Alternatives |
| --- | --- | --- | --- |
| Move from `Property` to `Product` as the catalog domain. | The Carlen backend is now a carshop platform and the approved plan required product-only catalog APIs. | Existing frontend clients using old `Property` operations must be updated. | Keep temporary GraphQL aliases for old operations. |
| Keep `MemberType.USER`, `MemberType.AGENT`, and `MemberType.ADMIN` unchanged. | The migration explicitly preserves member roles and ownership semantics. | `AGENT` still represents product sellers/dealers, which may be renamed later. | Introduce a new dealer role in a separate role migration. |
| Use `MemberType.AGENT` for product ownership. | Preserves existing authorization rules and minimizes auth blast radius. | Naming remains transitional. | Add `MemberType.DEALER`, requiring broader auth/data migration. |
| Use Mongo collection `products`. | Aligns storage with the product catalog domain. | Existing data in `properties` needs a migration copy. | Keep the `properties` collection under product code. |
| Do not keep old `Property` GraphQL aliases. | The implementation follows the product-only plan. | Frontend and external clients must switch operation/type/input names now. | Dual-run old and new operations during a compatibility window. |
| Use enum spellings exactly as requested. | The plan explicitly specified `MERSEDES` and `ELECTIRIC`. | These spellings may need correction later if product requirements change. | Use corrected values such as `MERCEDES`/`ELECTRIC`. |
| Keep existing location values under `ProductLocation`. | No new product location list was supplied. | Location values are geographic and may need refinement. | Introduce dealer/location-specific product location enums later. |

## Known Risks

- Frontend GraphQL documents must update from property operations to product operations.
- The migration script uses fallback values for new required car fields, so migrated data should be reviewed/enriched.
- Existing likes/views/comments with old `PROPERTY` groups will not automatically appear under `PRODUCT` unless migrated separately.
- Existing lint and Prettier debt remains outside this migration.
