/* eslint-disable no-useless-catch */
import { AuthProvider } from 'react-admin';
import { BACKEND_URL } from '../../src/constant/api';
import inMemoryJWT from '../middleware/inMemoryJWT';
import api from '../service/axios';

interface Credentials {
	phone_gsm: string;
	password: string;
}

interface AuthVerifySms {
	otp: string;
	phone_gsm: string;
	phone_country_code: string;
}

interface AuthCreateSms {
	user_id: string;
	phone_gsm: string;
	phone_country_code: string;
}

export interface AuthCheck {
	action: string;
	provider: string;
	object_id: string;
	object_name: string;
	object_type: string;
}

const customAuthProvider: AuthProvider = {
	getIdentity: () => {
		const myHeaders = new Headers();
		myHeaders.append('content-type', 'application/json');
		myHeaders.append(
			'Authorization',
			`Bearer ${inMemoryJWT.getToken()}`
		);
		const request = new Request(
			`${BACKEND_URL}/api/auth/check-admin-token`,
			{
				method: 'POST',
				headers: myHeaders,
			}
		);

		return fetch(request)
			.then((response) => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((response) => {
				const user = response;
				return Promise.resolve(user);
			})
			.catch(() => {
				localStorage.removeItem('token');
				return Promise.reject();
			});
	},

	getPermissions: async () => {
		try {
			const response = await api.post(
				`${BACKEND_URL}/api/auth/check-admin-token`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			return response.data.roles;
		} catch (error) {
			throw error;
		}
	},

	login: ({ phone_gsm, password }: Credentials) => {
		return api
			.post(`${BACKEND_URL}/api-patients/auth/admin/login`, {
				phone_gsm,
				password,
			})
			.then((response) => {
				const { access_token } = response.data.tokens;

				localStorage.setItem('token', access_token);
				inMemoryJWT.setToken(access_token);

				return response.data;
			})
			.catch((error) => {
				throw error;
			});
	},
	verifySmsAuth: ({
		otp,
		phone_country_code,
		phone_gsm,
	}: AuthVerifySms) => {
		const request = new Request(`${BACKEND_URL}/api/otp/verify`, {
			method: 'POST',
			body: JSON.stringify({ phone_gsm, otp, phone_country_code }),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		});
		return fetch(request)
			.then((response) => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((response) => {
				inMemoryJWT.setToken(response.tokens.access_token);
			});
	},
	createSmsAuth: ({
		user_id,
		phone_country_code,
		phone_gsm,
	}: AuthCreateSms) => {
		const request = new Request(`${BACKEND_URL}/api/otp/create`, {
			method: 'POST',
			body: JSON.stringify({
				phone_gsm,
				user_id,
				phone_country_code,
			}),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		});
		return fetch(request).then((response) => {
			if (response.status < 200 || response.status >= 300) {
				throw new Error(response.statusText);
			}
			return response.json();
		});
	},
	logout: () => {
		inMemoryJWT.eraseToken();
		return Promise.resolve();
	},

	checkAuth: (): Promise<any> => {
		const myHeaders = new Headers();
		myHeaders.append('content-type', 'application/json');
		myHeaders.append(
			'Authorization',
			`Bearer ${inMemoryJWT.getToken()}`
		);
		const request = new Request(
			`${BACKEND_URL}/api/auth/check-admin-token`,
			{
				method: 'POST',
				headers: myHeaders,
			}
		);

		return fetch(request)
			.then((response) => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(() => {
				return localStorage.getItem('token')
					? Promise.resolve()
					: Promise.reject();
			})
			.catch(() => {
				localStorage.getItem('token');
				return Promise.reject();
			});
	},

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	checkError: (error: any) => {
		const status = error.status;
		if (status === 401 || status === 403) {
			return Promise.reject();
		}
		// other error code (404, 500, etc): no need to log out
		return Promise.resolve();
	},
};

export default customAuthProvider;
