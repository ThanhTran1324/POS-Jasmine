export interface MenuItem {
	name: string;
	price: number;
}

export interface MenuGroup {
	id?: string;
	name: string;
	items?: MenuItem[];
}

export interface FbMenuResponseData {
	id: string;
	name: string;
	items: MenuItem[];
}

export interface SelectedItem {
	name: string;
	price: number;
	qty: number;
}
