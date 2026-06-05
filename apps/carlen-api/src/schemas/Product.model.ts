import { Schema } from 'mongoose';
import {
	ProductFuelType,
	ProductLocation,
	ProductStatus,
	ProductTransmission,
	ProductType,
} from '../libs/enums/product.enum';

const ProductSchema = new Schema(
	{
		productType: {
			type: String,
			enum: ProductType,
			required: true,
		},

		productModel: {
			type: String,
			required: true,
		},

		productStatus: {
			type: String,
			enum: ProductStatus,
			default: ProductStatus.ACTIVE,
		},

		productLocation: {
			type: String,
			enum: ProductLocation,
			required: true,
		},

		productAddress: {
			type: String,
			required: true,
		},

		productYear: {
			type: Number,
			required: true,
		},

		productTitle: {
			type: String,
			required: true,
		},

		productPrice: {
			type: Number,
			required: true,
		},

		productTransmission: {
			type: String,
			enum: ProductTransmission,
			required: true,
		},

		productMileage: {
			type: Number,
			required: true,
		},

		productFuelType: {
			type: String,
			enum: ProductFuelType,
			required: true,
		},

		productDoors: {
			type: Number,
			required: true,
		},

		productSeats: {
			type: Number,
			required: true,
		},

		productViews: {
			type: Number,
			default: 0,
		},

		productLikes: {
			type: Number,
			default: 0,
		},

		productComments: {
			type: Number,
			default: 0,
		},

		productRank: {
			type: Number,
			default: 0,
		},

		productImages: {
			type: [String],
			required: true,
		},

		productDesc: {
			type: String,
		},

		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},

		soldAt: {
			type: Date,
		},

		deletedAt: {
			type: Date,
		},
	},
	{ timestamps: true, collection: 'products' },
);

ProductSchema.index({ productType: 1, productModel: 1, productTitle: 1, productYear: 1 }, { unique: true });

export default ProductSchema;
