import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import {
	ProductFuelType,
	ProductLocation,
	ProductStatus,
	ProductTransmission,
	ProductType,
} from '../../enums/product.enum';
import { availableProductSorts } from '../../config';
import { Direction } from '../../enums/common.enum';
import { ObjectId } from 'mongoose';

@InputType()
export class ProductInput {
	@IsNotEmpty()
	@Field(() => ProductType)
	productType: ProductType;

	@IsNotEmpty()
	@Length(1, 100)
	@Field(() => String)
	productModel: string;

	@IsNotEmpty()
	@Field(() => ProductLocation)
	productLocation: ProductLocation;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	productAddress: string;

	@IsNotEmpty()
	@IsInt()
	@Min(1886)
	@Field(() => Int)
	productYear: number;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	productTitle: string;

	@IsNotEmpty()
	@Field(() => Number)
	productPrice: number;

	@IsNotEmpty()
	@Field(() => ProductTransmission)
	productTransmission: ProductTransmission;

	@IsNotEmpty()
	@IsInt()
	@Field(() => Int)
	productMileage: number;

	@IsNotEmpty()
	@Field(() => ProductFuelType)
	productFuelType: ProductFuelType;

	@IsNotEmpty()
	@IsInt()
	@Min(1)
	@Field(() => Int)
	productDoors: number;

	@IsNotEmpty()
	@IsInt()
	@Min(1)
	@Field(() => Int)
	productSeats: number;

	@IsNotEmpty()
	@Field(() => [String])
	productImages: string[];

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	productDesc?: string;

	memberId?: Object;
}

@InputType()
export class PricesRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
export class MileageRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
export class PeriodsRange {
	@Field(() => Date)
	start: Date;

	@Field(() => Date)
	end: Date;
}

@InputType()
export class ProductsSearch {
	@IsOptional()
	@Field(() => String, { nullable: true })
	memberId?: ObjectId;

	@IsOptional()
	@Field(() => [ProductLocation], { nullable: true })
	locationList?: ProductLocation[];

	@IsOptional()
	@Field(() => [ProductType], { nullable: true })
	typeList?: ProductType[];

	@IsOptional()
	@Field(() => [Int], { nullable: true })
	seatsList?: Number[];

	@IsOptional()
	@Field(() => [Int], { nullable: true })
	doorsList?: Number[];

	@IsOptional()
	@Field(() => [ProductTransmission], { nullable: true })
	transmissionList?: ProductTransmission[];

	@IsOptional()
	@Field(() => [ProductFuelType], { nullable: true })
	fuelTypeList?: ProductFuelType[];

	@IsOptional()
	@Field(() => PricesRange, { nullable: true })
	pricesRange?: PricesRange;

	@IsOptional()
	@Field(() => PeriodsRange, { nullable: true })
	periodsRange?: PeriodsRange;

	@IsOptional()
	@Field(() => MileageRange, { nullable: true })
	mileageRange?: MileageRange;

	@IsOptional()
	@Field(() => String, { nullable: true })
	text?: string;
}

@InputType()
export class ProductsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availableProductSorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => ProductsSearch)
	search: ProductsSearch;
}

@InputType()
export class AgentProductsSearch {
	@IsOptional()
	@Field(() => ProductStatus, { nullable: true })
	productStatus?: ProductStatus;
}

@InputType()
export class AgentProductsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availableProductSorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => AgentProductsSearch)
	search: AgentProductsSearch;
}

@InputType()
export class AllProductsSearch {
	@IsOptional()
	@Field(() => ProductStatus, { nullable: true })
	productStatus?: ProductStatus;

	@IsOptional()
	@Field(() => [ProductLocation], { nullable: true })
	productLocationList?: ProductLocation[];
}

@InputType()
export class AllProductsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availableProductSorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => AllProductsSearch)
	search: AllProductsSearch;
}

@InputType()
export class OrdinaryInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;
}
