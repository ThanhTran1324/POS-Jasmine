import { createReducer, Action, on } from '@ngrx/store';
import { SelectedItem } from '../model/menu-model';
import * as selectedItemsActions from './selected-items.actions';

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

const SelectedItemsReducer = createReducer(
	initialState,
	on(selectedItemsActions.AddItem, (state, { newItem }) => {
		let isFound2 = false;
		const newSelectedItems2 = [
			...state.selectedItems.map((menuItem) => {
				if (menuItem.name == newItem.name) {
					isFound2 = true;
					return { ...menuItem, qty: menuItem.qty + 1 };
				}
				return menuItem;
			}),
		];

		if (!isFound2) {
			newSelectedItems2.push({ ...newItem, qty: 1 });
		}

		return {
			...state,
			selectedItems: newSelectedItems2,
			subTotal: state.subTotal + newItem.price,
			tax: state.tax + newItem.price * salesTaxRate,
			totalCost:
				state.totalCost + newItem.price + newItem.price * salesTaxRate,
		};

		// let isFound = false;
		// const newSelectedItems = [
		// 	...state.selectedItems.map((menuItem) => {
		// 		if (menuItem.name === newItem.name) {
		// 			isFound = true;
		// 			return { ...menuItem, qty: menuItem.qty + 1 };
		// 		}
		// 		return menuItem;
		// 	}),
		// ];
		// if (!isFound) {
		// 	newSelectedItems.push({ ...newItem, qty: 1 });
		// }

		// return {
		// 	...state,
		// 	selectedItems: newSelectedItems,
		// 	subTotal: state.subTotal + newItem.price,
		// 	tax: state.tax + salesTaxRate * newItem.price,
		// 	totalCost:
		// 		state.totalCost + newItem.price + salesTaxRate * newItem.price,
		// };
	}),

	on(selectedItemsActions.RemoveItem, (state, { itemIndex }) => {
		const newItemList = [...state.selectedItems];
		const itemToRemove = newItemList[itemIndex];
		if (itemToRemove.qty == 1) {
			newItemList.splice(itemIndex, 1);
		} else {
			newItemList[itemIndex] = {
				...itemToRemove,
				qty: itemToRemove.qty - 1,
			};
		}

		return {
			...state,
			selectedItems: newItemList,
			subTotal: state.subTotal - itemToRemove.price,
			tax: state.tax - itemToRemove.price * salesTaxRate,
			totalCost:
				state.totalCost - itemToRemove.price * (1 + salesTaxRate),
		};

		// const newItemList = [...state.selectedItems];
		// const item = state.selectedItems[itemIndex];
		// if (item.qty === 1) {
		// 	newItemList.splice(itemIndex, 1);
		// } else {
		// 	newItemList[itemIndex] = {
		// 		...item,
		// 		qty: item.qty - 1,
		// 	};
		// }

		// return {
		// 	...state,
		// 	selectedItems: newItemList,
		// 	subTotal: state.subTotal - item.price,
		// 	tax: state.tax - salesTaxRate * item.price,
		// 	totalCost: state.totalCost - item.price - salesTaxRate * item.price,
		// };
	}),

	on(selectedItemsActions.CleanItemsSuccess, (state) => initialState)
);

export function reducer(state: State | undefined, action: Action) {
	return SelectedItemsReducer(state, action);
}

// export function SelectedItemsReducer(
// 	state: State = initialState,
// 	action: SelectedItemsActions
// ) {
// 	switch (action.type) {
// 		case ADD_ITEM:
// 			let isFound = false;
// 			const newSelectedItems = [
// 				...state.selectedItems.map((menuItem) => {
// 					if (menuItem.name === action.payload.name) {
// 						isFound = true;
// 						return { ...menuItem, qty: menuItem.qty + 1 };
// 					}
// 					return menuItem;
// 				}),
// 			];
// 			if (!isFound) {
// 				newSelectedItems.push({ ...action.payload, qty: 1 });
// 			}

// 			return {
// 				...state,
// 				selectedItems: newSelectedItems,
// 				subTotal: state.subTotal + action.payload.price,
// 				tax: state.tax + salesTaxRate * action.payload.price,
// 				totalCost:
// 					state.totalCost +
// 					action.payload.price +
// 					salesTaxRate * action.payload.price,
// 			};
// 		case REMOVE_ITEM:
// 			const newItemList = [...state.selectedItems];
// 			const item = state.selectedItems[action.payload.index];
// 			if (item.qty === 1) {
// 				newItemList.splice(action.payload.index, 1);
// 			} else {
// 				newItemList[action.payload.index] = {
// 					...item,
// 					qty: item.qty - 1,
// 				};
// 			}

// 			return {
// 				...state,
// 				selectedItems: newItemList,
// 				subTotal: state.subTotal - item.price,
// 				tax: state.tax - salesTaxRate * item.price,
// 				totalCost:
// 					state.totalCost - item.price - salesTaxRate * item.price,
// 			};
// 		case CLEANUP_ITEMS_SUCCESS:
// 			return initialState;
// 		default:
// 			return state;
// 	}
// }
