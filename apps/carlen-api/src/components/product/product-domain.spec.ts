import ProductSchema from '../../schemas/Product.model';
import MemberSchema from '../../schemas/Member.model';
import { ProductFuelType, ProductStatus, ProductTransmission, ProductType } from '../../libs/enums/product.enum';
import { LikeGroup } from '../../libs/enums/like.enum';
import { ViewGroup } from '../../libs/enums/view.enum';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { NotificationGroup } from '../../libs/enums/notification.enum';

describe('Product domain migration', () => {
	it('uses the approved product enum values', () => {
		expect(Object.values(ProductType)).toEqual([
			'CHEVROLET',
			'HYUNDAI',
			'KIA',
			'BMW',
			'TOYOTA',
			'MERSEDES',
			'RENAULT',
		]);
		expect(Object.values(ProductTransmission)).toEqual(['AUTOMATIC', 'MANUAL']);
		expect(Object.values(ProductStatus)).toEqual(['HOLD', 'ACTIVE', 'SOLD', 'DELETE']);
		expect(Object.values(ProductFuelType)).toEqual(['DIESEL', 'HYBRID', 'ELECTIRIC', 'LPG']);
	});

	it('uses products collection and required product fields', () => {
		expect(ProductSchema.get('collection')).toBe('products');
		expect(ProductSchema.path('productType')).toBeDefined();
		expect(ProductSchema.path('productModel')).toBeDefined();
		expect(ProductSchema.path('productTransmission')).toBeDefined();
		expect(ProductSchema.path('productFuelType')).toBeDefined();
		expect(ProductSchema.path('productMileage')).toBeDefined();
		expect(ProductSchema.path('productImages')).toBeDefined();
		expect(ProductSchema.path('propertySquare')).toBeUndefined();
		expect(ProductSchema.path('propertyBeds')).toBeUndefined();
		expect(ProductSchema.path('propertyRooms')).toBeUndefined();
	});

	it('uses product counters and product social groups', () => {
		expect(MemberSchema.path('memberProducts')).toBeDefined();
		expect(MemberSchema.path('memberProperties')).toBeUndefined();
		expect(LikeGroup.PRODUCT).toBe('PRODUCT');
		expect(ViewGroup.PRODUCT).toBe('PRODUCT');
		expect(CommentGroup.PRODUCT).toBe('PRODUCT');
		expect(NotificationGroup.PRODUCT).toBe('PRODUCT');
	});
});
