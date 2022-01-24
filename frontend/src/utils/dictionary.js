const axios = require('axios');
const baseUrl =
	'https://d9ksdduklc.execute-api.eu-central-1.amazonaws.com/dictionary';

export const getWordDefinition = async (word, pos) => {
	return pos === 'all'
		? (await axios.get(`${baseUrl}/${word}`)).data
		: (await axios.get(`${baseUrl}/${word}/${pos}`)).data.Items;
};

export const getRandomWord = async (pos) => {
	return (await axios.get(`${baseUrl}/part-of-speech/${randomPos()}`)).data;
};

const randomPos = () => {
	const poses = ['n.', 'v.', 'adj.', 'prep.', 'pron.', 'interj.', 'conj.'];
	const random = Math.floor(Math.random() * poses.length - 1);
	return poses[random];
};
