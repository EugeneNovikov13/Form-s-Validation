import { victoryCombination } from '../constants/constants';

export const checkVictory = (cells, sym) => {
	return victoryCombination.some(comb => comb.every(el => cells[el].value === sym));
};
