const express = require('express');
const app = express();
const port = 3000;

const dictionaryRouter = require('./routes/dictionary');

app.use('/', dictionaryRouter);

app.listen(port, () => {
	console.log(`Server running on ${port}`);
});
