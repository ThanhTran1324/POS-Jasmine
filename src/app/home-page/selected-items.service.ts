import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { State } from './selected-items.reducer';

@Injectable()
export class SelectedItemsService {
	constructor(private db: AngularFirestore) { }

	orderCollection = this.db.collection('orders');

	saveOrder(orderData: State) {
		return this.orderCollection.add(orderData);
	}
}
