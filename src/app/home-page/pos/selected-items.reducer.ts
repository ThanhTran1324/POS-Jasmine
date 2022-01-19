import { createReducer, Action, on } from '@ngrx/store';
import { SelectedItem } from '../../model/menu-model';
import * as selectedItemsActions from './selected-items.actions';

export interface State {
	selectedItems: SelectedItem[];
	subTotal: number;
	tax: number;
	totalCost: number;
	activatedDiscount: number;
	discountOptionList: number[];
}

const salesTaxRate = 7 / 100;
const discountOptionList = [0, 0.01, 0.02, 0.03, 0.05, 0.1, 0.2, 0.3, 0.5];
const initialState: State = {
	selectedItems: [],
	subTotal: 0,
	tax: 0,
	totalCost: 0,
	activatedDiscount: 0,
	discountOptionList,
};

const SelectedItemsReducer = createReducer(
	initialState,
	on(selectedItemsActions.AddItem, (state, { newItem }) => {
		let isFound2 = false;
		const newSelectedItems2 = [
			...state.selectedItems.map((menuItem) => {
				if (menuItem.name === newItem.name) {
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
			subTotal:
				(1 - state.activatedDiscount) * newItem.price + state.subTotal,
			tax:
				(1 - state.activatedDiscount) * newItem.price * salesTaxRate +
				state.tax,
			totalCost:
				(1 - state.activatedDiscount) *
					(newItem.price + newItem.price * salesTaxRate) +
				state.totalCost,
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
			subTotal:
				state.subTotal -
				(1 - state.activatedDiscount) * itemToRemove.price,
			tax:
				state.tax -
				(1 - state.activatedDiscount) *
					(itemToRemove.price * salesTaxRate),
			totalCost:
				state.totalCost -
				(1 - state.activatedDiscount) *
					(itemToRemove.price * (1 + salesTaxRate)),
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

	on(selectedItemsActions.CleanItemsSuccess, (state) => initialState),

	on(selectedItemsActions.setDiscount, (state, { selectedDiscount }) => {
		const previousDiscount = state.activatedDiscount;
		if (previousDiscount === 0) {
			return {
				...state,
				activatedDiscount: selectedDiscount,
				subTotal: (1 - selectedDiscount) * state.subTotal,
				tax: (1 - selectedDiscount) * state.tax,
				totalCost: (1 - selectedDiscount) * state.totalCost,
			};
		}

		return {
			...state,
			activatedDiscount: selectedDiscount,
			subTotal:
				(state.subTotal / (1 - previousDiscount)) *
				(1 - selectedDiscount),
			tax: (state.tax / (1 - previousDiscount)) * (1 - selectedDiscount),
			totalCost:
				(state.totalCost / (1 - previousDiscount)) *
				(1 - selectedDiscount),
		};
	})
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
