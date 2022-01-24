import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const PoSDropdown = (props) => {
	const { onSelect, title } = props;
	return (
		<DropdownButton
			variant="outline-secondary"
			title={title}
			id="input-group-dropdown-2"
			align="end"
			onSelect={onSelect}
		>
			<Dropdown.Item eventKey={'all'}>Everything</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Item eventKey={'n.'}>Noun</Dropdown.Item>
			<Dropdown.Item eventKey={'v.'}>Verb</Dropdown.Item>
			<Dropdown.Item eventKey={'adj.'}>Adjective</Dropdown.Item>
			<Dropdown.Item eventKey={'prep.'}>Preposition</Dropdown.Item>
			<Dropdown.Item eventKey={'pron.'}>Pronoun</Dropdown.Item>
			<Dropdown.Item eventKey={'interj.'}>Interjection</Dropdown.Item>
			<Dropdown.Item eventKey={'conj.'}>Conjunction</Dropdown.Item>
		</DropdownButton>
	);
};
export default PoSDropdown;
