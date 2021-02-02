import { SelectedItem } from '../model/menu-model';
import {
	SelectedItemsActions,
	ADD_ITEM,
	REMOVE_ITEM,
	CLEANUP_ITEMS_SUCCESS,
} from './selected-items.actions';

export interface State {
	selectedItems: SelectedItem[];
	subTotal: number;
	tax: number;
	totalCost: number;
}

const initialState: State = {
	selectedItems: [],
	subTotal: 0,
	tax: 0,
	totalCost: 0,
};
const salesTaxRate = 7 / 100;

export function SelectedItemsReducer(
	state: State = initialState,
	action: SelectedItemsActions
) {
	switch (action.type) {
		case ADD_ITEM:
			let isFound = false;
			const newSelectedItems = [
				...state.selectedItems.map((menuItem) => {
					if (menuItem.name === action.payload.name) {
						isFound = true;
						return { ...menuItem, qty: menuItem.qty + 1 };
					}
					return menuItem;
				}),
			];
			if (!isFound) {
				newSelectedItems.push({ ...action.payload, qty: 1 });
			}

			return {
				...state,
				selectedItems: newSelectedItems,
				subTotal: state.subTotal + action.payload.price,
				tax: state.tax + salesTaxRate * action.payload.price,
				totalCost:
					state.totalCost +
					action.payload.price +
					salesTaxRate * action.payload.price,
			};
		case REMOVE_ITEM:
			const newItemList = [...state.selectedItems];
			const item = state.selectedItems[action.payload.index];
			if (item.qty === 1) {
				newItemList.splice(action.payload.index, 1);
			} else {
				newItemList[action.payload.index] = {
					...item,
					qty: item.qty - 1,
				};
			}

			return {
				...state,
				selectedItems: newItemList,
				subTotal: state.subTotal - item.price,
				tax: state.tax - salesTaxRate * item.price,
				totalCost:
					state.totalCost - item.price - salesTaxRate * item.price,
			};
		case CLEANUP_ITEMS_SUCCESS:
			return initialState;
		default:
			return state;
	}
}
