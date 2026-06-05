import * as mongoose from 'mongoose';

const PROPERTY_TYPE_TO_PRODUCT_TYPE: Record<string, string> = {
	APARTMENT: 'CHEVROLET',
	VILLA: 'HYUNDAI',
	HOUSE: 'KIA',
};

const PROPERTY_STATUS_TO_PRODUCT_STATUS: Record<string, string> = {
	ACTIVE: 'ACTIVE',
	SOLD: 'SOLD',
	DELETE: 'DELETE',
};

const uri = process.env.NODE_ENV === 'production' ? process.env.MONGO_PROD : process.env.MONGO_DEV;

const migrate = async () => {
	if (!uri) throw new Error('MONGO_DEV or MONGO_PROD is required');

	await mongoose.connect(uri);
	const db = mongoose.connection.db;
	const properties = db.collection('properties');
	const products = db.collection('products');

	const cursor = properties.find({});
	let copied = 0;
	let skipped = 0;

	for await (const property of cursor) {
		const exists = await products.findOne({ _id: property._id });
		if (exists) {
			skipped++;
			continue;
		}

		await products.insertOne({
			_id: property._id,
			productType: PROPERTY_TYPE_TO_PRODUCT_TYPE[property.propertyType] ?? 'CHEVROLET',
			productModel: property.propertyTitle ?? 'Unknown model',
			productStatus: PROPERTY_STATUS_TO_PRODUCT_STATUS[property.propertyStatus] ?? 'ACTIVE',
			productLocation: property.propertyLocation,
			productAddress: property.propertyAddress,
			productYear: property.constructedAt ? new Date(property.constructedAt).getFullYear() : new Date().getFullYear(),
			productTitle: property.propertyTitle,
			productPrice: property.propertyPrice,
			productTransmission: 'AUTOMATIC',
			productMileage: 0,
			productFuelType: 'DIESEL',
			productDoors: 4,
			productSeats: 5,
			productViews: property.propertyViews ?? 0,
			productLikes: property.propertyLikes ?? 0,
			productComments: property.propertyComments ?? 0,
			productRank: property.propertyRank ?? 0,
			productImages: property.propertyImages ?? [],
			productDesc: property.propertyDesc,
			memberId: property.memberId,
			soldAt: property.soldAt,
			deletedAt: property.deletedAt,
			createdAt: property.createdAt,
			updatedAt: property.updatedAt,
		});
		copied++;
	}

	console.log(`properties -> products migration complete. copied=${copied}, skipped=${skipped}`);
	await mongoose.disconnect();
};

migrate().catch(async (err) => {
	console.error(err);
	await mongoose.disconnect();
	process.exit(1);
});
