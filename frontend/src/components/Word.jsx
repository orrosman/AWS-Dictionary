import React from 'react';

const Word = (props) => {
	const { word } = props;
	return (
		<div>
			<p>
				Word: <strong>{word.word}</strong>{' '}
			</p>
			<p>
				Part of the sentence: <strong>{word.pos}</strong>
			</p>
			<div>
				Definitions:
				<ul>
					{word.definitions.map((def, i) => (
						<li key={i}>{def}</li>
					))}
				</ul>
			</div>
		</div>
	);
};
export default Word;
