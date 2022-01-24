require('dotenv').config();
const fileToImport = require('./dictionary.json');
const AWS = require('aws-sdk');
const credentials = new AWS.Credentials(
	process.env.ACCESS_KEY_ID,
	process.env.SECRET_ACCESS_KEY
);
AWS.config.update({ credentials: credentials, region: 'eu-central-1' });
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'dictionary_2';

const handler = async () => {
	const allData = fileToImport.map((item) => item);
	console.log(allData);
	for (let item of allData) {
		await dynamoDb
			.put({ TableName: TABLE_NAME, Item: { ...item, word: item.word } })
			.promise()
			.then(() => {
				console.log(item.word);
			});
	}
};
handler();
