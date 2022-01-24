const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'dictionary_2';

exports.handler = async (event) => {
	const { word } = event.pathParameters;

	try {
		const params = {
			TableName: TABLE_NAME,
			KeyConditionExpression: 'word = :word',
			ExpressionAttributeValues: {
				':word': word.toUpperCase(),
			},
		};

		const results = await dynamoDb.query(params).promise();
		// return results;
		return buildResponse(200, results.Items);
	} catch (error) {
		console.log(error);
		return error;
	}
};

const buildResponse = (statusCode, body) => {
	return {
		statusCode: statusCode,
		headers: {
			'Content-Type': 'application-json',
		},
		body: JSON.stringify(body),
	};
};
