require('dotenv').config();
const AWS = require('aws-sdk');
const credentials = new AWS.Credentials(
	process.env.ACCESS_KEY_ID,
	process.env.SECRET_ACCESS_KEY
);
AWS.config.update({ credentials: credentials, region: 'eu-central-1' });
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'dictionary_2';

const getWord = async (word) => {
	try {
		const params = {
			TableName: TABLE_NAME,
			KeyConditionExpression: 'word = :word',
			ExpressionAttributeValues: {
				':word': word.toUpperCase(),
			},
		};

		const results = await dynamoDb.query(params).promise();
		return results;
	} catch (error) {
		console.log(error);
		return error;
	}
};

const getWordAndPart = async (word, pos) => {
	try {
		const params = {
			TableName: TABLE_NAME,
			KeyConditionExpression: 'word = :word AND pos = :pos',
			ExpressionAttributeValues: {
				':word': word.toUpperCase(),
				':pos': pos.toLowerCase(),
			},
		};

		const results = await dynamoDb.query(params).promise();
		return results;
	} catch (error) {
		console.log(error);
		return error;
	}
};

const randomWordFromPart = async (part, letter = null) => {
	let words;
	if (letter) {
		words = (await getItemWithPartAndLetter(part, letter)).Items;
	} else {
		words = (await getItemWithPart(part)).Items;
	}

	const randomItemNumber = Math.floor(Math.random() * (words.length - 1));
	return words[randomItemNumber];
};

const getItemWithPart = async (part) => {
	const params = {
		TableName: TABLE_NAME,
		FilterExpression: 'pos = :pos',
		ExpressionAttributeValues: {
			':pos': part,
		},
	};
	return;
};

const getItemWithPartAndLetter = async (part, letter) => {
	const params = {
		TableName: TABLE_NAME,
		FilterExpression: 'pos = :pos AND contains(#word,:letter)',
		ExpressionAttributeValues: {
			':pos': part,
			':letter': letter,
		},
		ExpressionAttributeNames: {
			'#word': 'word',
		},
	};
	return await dynamoDb.scan(params).promise();

	/*
    FilterExpression: "contains(#pos, :pos) AND contains(#word, :word)",
const returnWordPartOfSpeechByLetter = async (pos, word) => {
  let params = {
    FilterExpression: "contains(#pos, :pos) AND contains(#word, :word)",
    ExpressionAttributeNames: {
      "#pos": "pos",
      "#word": "word",
    },
    ExpressionAttributeValues: {
      ":pos": pos,
      ":word": word,
    },
    TableName: "dictionary2",
  };
  return await dynamoDb
    .scan(params)
    .promise()
    .then((response) => {
      const randNum = Math.floor(Math.random() * response.Count) + 1;
      return buildResponse(200, response.Items[randNum]);
    })
    .catch(() => {
      return buildResponse(404, { error: "error" });
    });
};

//returnWordPartOfSpeechByLetter("n.", "A");

    */
};

module.exports = {
	getWord,
	getWordAndPart,
	randomWordFromPart,
	getItemWithPartAndLetter,
};
