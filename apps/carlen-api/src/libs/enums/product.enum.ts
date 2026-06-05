import { registerEnumType } from '@nestjs/graphql';

export enum ProductType {
	CHEVROLET = 'CHEVROLET',
	HYUNDAI = 'HYUNDAI',
	KIA = 'KIA',
	BMW = 'BMW',
	TOYOTA = 'TOYOTA',
	MERSEDES = 'MERSEDES',
	RENAULT = 'RENAULT',
}
registerEnumType(ProductType, {
	name: 'ProductType',
});

export enum ProductTransmission {
	AUTOMATIC = 'AUTOMATIC',
	MANUAL = 'MANUAL',
}
registerEnumType(ProductTransmission, {
	name: 'ProductTransmission',
});

export enum ProductStatus {
	HOLD = 'HOLD',
	ACTIVE = 'ACTIVE',
	SOLD = 'SOLD',
	DELETE = 'DELETE',
}
registerEnumType(ProductStatus, {
	name: 'ProductStatus',
});

export enum ProductFuelType {
	DIESEL = 'DIESEL',
	HYBRID = 'HYBRID',
	ELECTIRIC = 'ELECTIRIC',
	LPG = 'LPG',
}
registerEnumType(ProductFuelType, {
	name: 'ProductFuelType',
});

export enum ProductLocation {
	SEOUL = 'SEOUL',
	BUSAN = 'BUSAN',
	INCHEON = 'INCHEON',
	DAEGU = 'DAEGU',
	GYEONGJU = 'GYEONGJU',
	GWANGJU = 'GWANGJU',
	CHONJU = 'CHONJU',
	DAEJON = 'DAEJON',
	JEJU = 'JEJU',
}
registerEnumType(ProductLocation, {
	name: 'ProductLocation',
});
