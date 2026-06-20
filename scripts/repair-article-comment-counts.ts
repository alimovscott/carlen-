import * as mongoose from 'mongoose';
import { CommentGroup, CommentStatus } from '../apps/carlen-api/src/libs/enums/comment.enum';

const uri = process.env.NODE_ENV === 'production' ? process.env.MONGO_PROD : process.env.MONGO_DEV;

const repair = async () => {
	if (!uri) throw new Error('MONGO_DEV or MONGO_PROD is required');

	await mongoose.connect(uri);
	const db = mongoose.connection.db;
	const comments = db.collection('comments');
	const boardArticles = db.collection('boardArticles');

	const counts = await comments
		.aggregate<{ _id: mongoose.Types.ObjectId; total: number }>([
			{
				$match: {
					commentGroup: CommentGroup.ARTICLE,
					commentStatus: CommentStatus.ACTIVE,
				},
			},
			{ $group: { _id: '$commentRefId', total: { $sum: 1 } } },
		])
		.toArray();

	const bulkUpdates = counts.map((count) => ({
		updateOne: {
			filter: { _id: count._id },
			update: { $set: { articleComments: count.total } },
		},
	}));

	if (bulkUpdates.length > 0) {
		await boardArticles.bulkWrite(bulkUpdates);
	}

	const activeArticleIds = counts.map((count) => count._id);
	const zeroResult = await boardArticles.updateMany(
		activeArticleIds.length > 0 ? { _id: { $nin: activeArticleIds } } : {},
		{ $set: { articleComments: 0 } },
	);

	console.log(
		`article comment counts repaired. counted=${counts.length}, zeroed=${zeroResult.modifiedCount}`,
	);
	await mongoose.disconnect();
};

repair().catch(async (err) => {
	console.error(err);
	await mongoose.disconnect();
	process.exit(1);
});
