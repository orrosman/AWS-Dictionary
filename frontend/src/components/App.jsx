import React, { useState } from 'react';
import { Container, InputGroup, Button, FormControl } from 'react-bootstrap';
import { getWordDefinition, getRandomWord } from '../utils/dictionary';
import Word from './Word';
import PoSDropdown from './PoSDropdown';

const App = () => {
	const [word, setWord] = useState('');
	const [pos, setPos] = useState('all');
	const [list, setList] = useState([]);

	const handleChange = (e) => {
		setWord(e.target.value);
	};

	const handleSearch = async (e) => {
		const wordDefinition = await getWordDefinition(word, pos);
		for (const word of wordDefinition) {
			setList([word]);
		}
	};

	const handleSelect = (pos) => {
		setPos(pos);
	};

	const handleRandom = async (pos) => {
		const radomWord = await getRandomWord(pos);
		setList([radomWord]);
		console.log(list);
	};

	return (
		<Container>
			<h4 className="text-center m-2">Search for a word definition</h4>

			<InputGroup className="mt-3">
				<Button variant="outline-secondary" onClick={handleSearch}>
					Search
				</Button>
				<FormControl placeholder="Enter word" onChange={handleChange} />
				<PoSDropdown onSelect={handleSelect} title={'Part of speech'} />
			</InputGroup>
			<div className="my-3">
				<PoSDropdown onSelect={handleRandom} title={'Random Word!🎓'} />
			</div>

			{list.map((word, i) => (
				<Word word={word} key={i} />
			))}
		</Container>
	);
};
export default App;
