const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'dictionary_2';

exports.handler = async (event) => {
	const { pos } = event.pathParameters;

	const params = {
		TableName: TABLE_NAME,
		FilterExpression: 'pos = :pos',
		ExpressionAttributeValues: {
			':pos': pos,
		},
	};

	let words = (await dynamoDb.scan(params).promise()).Items;

	const randomItemNumber = Math.floor(Math.random() * (words.length - 1));
	return buildResponse(200, words[randomItemNumber]);
};

const buildResponse = (statusCode, body) => {
	return {
		statusCode: statusCode,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Methods': 'GET',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(body),
	};
};
