const express = require('express');
const router = express.Router();
const { getWord, getWordAndPart, randomWordFromPart } = require('../utils/db');

router.get('/part-of-speech/:part', async (req, res) => {
	const { part } = req.params;
	const { letter } = req.query;

	const result = await randomWordFromPart(part);

	res.json(result);
});

router.get('/:word/:partOfSpeech', async (req, res) => {
	const { word, partOfSpeech } = req.params;
	const result = await getWordAndPart(word, partOfSpeech);

	res.json(result);
});

router.get('/:word', async (req, res) => {
	const { word } = req.params;
	const result = await getWord(word);

	res.json(result);
});

module.exports = router;
