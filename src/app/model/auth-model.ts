export interface AuthData {
	email: string;
	password: string;
}

export interface UnsplashResponseData {
	urls: {
		raw: string;
		regular: string;
		full: string;
		small: string;
		thumb: string;
	};
}

export interface ResponseUserData {
	user: {
		refreshToken: string;
		email: string;
	};
}
