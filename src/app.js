import { useState } from 'react';
import { checkVictory } from './utils/utils';
import { initField } from './constants/constants';
import { AppLayout } from './app-layout';

export const App = () => {
	const [sym, setSym] = useState('X');
	const [next, setNext] = useState(false);
	const [victory, setVictory] = useState(false);
	const [cells, setCells] = useState(initField);

	if (next) {
		checkVictory(cells, sym)
			? setVictory(true)
			: sym === 'X'
			? setSym('○')
			: setSym('X');
		setNext(false);
	}

	const handleCellClick = lab => {
		if (victory) return;
		const newCells = cells.map(el => (el.label === lab ? { ...el, value: sym } : el));
		setCells(newCells);
		setNext(true);
	};

	const refreshButtonClick = () => {
		setCells(initField);
		setNext(false);
		setVictory(false);
	};

	return (
		<AppLayout
			sym={sym}
			victory={victory}
			cells={cells}
			handleCellClick={handleCellClick}
			refreshButtonClick={refreshButtonClick}
		/>
	);
};
