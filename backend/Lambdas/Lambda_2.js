require('dotenv').config();

const AWS = require('aws-sdk');
const credentials = new AWS.Credentials(
	process.env.ACCESS_KEY_ID,
	process.env.SECRET_ACCESS_KEY
);
AWS.config.update({ credentials: credentials, region: 'eu-central-1' });

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const S3 = new AWS.S3();

const TABLE_NAME = 'dictionary_2';

const handler = async () => {
	const params = { Bucket: 'dictionary-or', Key: 'dictionary.json' };

	const allData = await S3.getObject(params).promise();
	const data = JSON.parse(allData.Body.toString());
	console.log(data);

	await Promise.all(
		data.map((word, index) => {
			var params = {
				TableName: TABLE_NAME,
				Item: word,
			};
			console.log(`${index} : ${word.word}`);
			return dynamoDb.put(params).promise();
		})
	);

	const response = {
		statusCode: 200,
		body: JSON.stringify('Done'),
	};
	return response;
};
handler();
