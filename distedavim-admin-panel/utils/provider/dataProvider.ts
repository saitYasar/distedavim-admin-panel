/* eslint-disable no-useless-catch */
import {
	CreateParams,
	DataProvider,
	DeleteManyParams,
	DeleteParams,
	GetListParams,
	GetManyParams,
	GetManyReferenceParams,
	GetOneParams,
	UpdateManyParams,
	UpdateParams,
} from 'react-admin';

import { paymentsFilterHandler } from '../filters/payments-filter-handler';
import { paymentsDailyFilterHandler } from '../filters/payments-daily-filter-handler';


import { BACKEND_URL } from '../../src/constant/api';

import api from '../service/axios';

const apiUrl = BACKEND_URL + '/api/admin';

api.defaults.baseURL = apiUrl;

export const dataProvider: DataProvider = {
	fileInterceptor: (params: any) => {
		const formData = new FormData();

		const params_values = Object.keys(params.data);

		if (
			!params_values?.includes('file') &&
			!params_values?.includes('files')
		)
			return { formData: null };

		for (const param in params.data) {
			if (param === 'file') {
				formData.append('file', params.data[param].rawFile);
				continue;
			}

			if (param === 'files') {
				params.data[param].forEach((file: any) => {
					formData.append('files', file.rawFile);
				});
				continue;
			}

			formData.append(param, params.data[param]);
		}

		return { formData };
	},

	header: () => {
		return {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
			// "Content-Type": "application/json",
		};
	},

	resourceMapper: (resource: string) => {
		if (resource === 'paymentpayments') {
			return 'payment/payments';
		}
		if (resource === 'authpermissions') {
			return 'auth/permissions';
		}
		if (resource === 'authroles') {
			return 'auth/roles';
		}

		if (resource === 'paymentsubmerchant_commissions') {
			return 'payment/submerchant_commissions';
		}

		if (resource === 'paymentsubmerchants') {
			return 'payment/submerchants';
		}

		if (resource === 'paymentprovider_choices') {
			return 'payment/provider_choices';
		}

		if (resource === 'paymenttransactions') {
			return 'payment/transactions';
		}

		if (resource === 'paymentinvoices') {
			return 'payment/invoices';
		}

		return resource;
	},

	extraHeaderMapper: (endpoint: string) => {
		if (endpoint === 'express_submerchants/create') {
			return {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'multipart/form-data',
			};
		}
		return {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
			'Content-Type': 'application/json',
		};
	},

	listFilterMapper: (
		resource: string,
		method: string,
		filter: any
	) => {
		if (resource === 'paymentpayments' && method === 'getList') {
			return paymentsFilterHandler(filter);
		}
		if (resource === 'daily-paying' && method === 'getList') {
			return paymentsDailyFilterHandler(filter);
		}
		return filter;
	},

	getList: async (resource: string, params: GetListParams) => {
		try {
			const { filter, pagination, sort } = params;
			const newFilters = dataProvider.listFilterMapper(
				resource,
				'getList',
				filter
			);
			const query = `?filter=${JSON.stringify(
				newFilters
			)}&range=${JSON.stringify([
				pagination.page,
				pagination.perPage,
			])}&sort=${JSON.stringify([
				sort.field ?? 'id',
				sort.order ?? 'DESC',
			])}`;
			const response = await api.get(
				`${dataProvider.resourceMapper(resource)}/list${query}`,
				{
					headers: dataProvider.header(),
				}
			);
			return {
				data: response.data.rows,
				total: response.data.count,
			};
		} catch (error: any) {
			if (error.response) {
				throw new Error(error.response.data.message);
			} else {
				throw new Error('Bilinmeyen bir hata oluştu');
			}
		}
	},

	getListMany: async (resource: string, params: GetListParams) => {
		const { filter, pagination, sort } = params;
		const filterParams = {
			column: filter.column,
			op: filter.op,
			value: filter.value,
			relation: filter.relation,
		};
		const query = `?filter=${JSON.stringify(
			filterParams
		)}&range=${JSON.stringify([
			pagination.page,
			pagination.perPage,
		])}&sort=${JSON.stringify([
			sort.field ?? 'id',
			sort.order ?? 'DESC',
		])}`;

		try {
			const response = await api.get(
				`${dataProvider.resourceMapper(resource)}/list${query}`,
				{
					headers: dataProvider.header(),
				}
			);

			return {
				data: response.data.rows,
				total: response.data.count,
			};
		} catch (error) {
			throw error;
		}
	},

	getOne: async (resource: string, params: GetOneParams) => {
		try {
			const response = await api.get(
				`${dataProvider.resourceMapper(resource)}/find/${params.id}`,
				{
					headers: dataProvider.header(),
				}
			);
			const data = response.data;
			const checkData = Array.isArray(data);
			return {
				data: checkData ? data[0] : data,
			};
		} catch (error) {
			throw error;
		}
	},

	getMany: async (resource: string, params: GetManyParams) => {
		try {
			const requests = params.ids.map((id) => {
				return api.get(
					`${dataProvider.resourceMapper(resource)}/find/${id}`,
					{
						headers: dataProvider.header(),
					}
				);
			});

			const responses = await Promise.all(requests);
			const data = await Promise.all(
				responses.map((response: any) => response.data)
			);
			const checkData = Array.isArray(data[0]);
			return {
				data: checkData ? data.map((item: any) => item[0]) : data,
			};
		} catch (error) {
			throw error;
		}
	},

	getManyReference: async (
		resource: string,
		params: GetManyReferenceParams
	) => {
		try {
			const { filter, pagination, sort } = params;
			const query = `?filter=${JSON.stringify({
				...filter,
				[params.target]: params.id,
			})}&range=${JSON.stringify([
				pagination.page,
				pagination.perPage,
			])}&sort=${JSON.stringify([
				sort.field ?? 'user_id',
				sort.order ?? 'DESC',
			])}`;

			const response = await api.get(
				`${dataProvider.resourceMapper(resource)}/list${query}`,
				{
					headers: dataProvider.header(),
				}
			);

			const data = response.data;
			return {
				data: data.rows.map((item: any, index: number) => {
					if (!item.id) {
						item.id = index;
					}
					return item;
				}),
				total: data.count,
			};
		} catch (error) {
			throw error;
		}
	},

	update: async (resource: string, params: UpdateParams) => {
		try {
			const { formData } = await dataProvider.fileInterceptor(params);
			const _formData = formData ? formData : params.data;
			const response = await api.post(
				`${dataProvider.resourceMapper(resource)}/update/${
					params.id
				}`,
				_formData,
				{
					headers: dataProvider.header(),
				}
			);

			return {
				data: response.data,
			};
		} catch (error) {
			throw error;
		}
	},

	updateMany: async (resource: string, params: UpdateManyParams) => {
		try {
			const response = await api.post(
				`${dataProvider.resourceMapper(resource)}/update/${params}`,
				{
					headers: dataProvider.header(),
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	create: async (resource: string, params: CreateParams) => {
		try {
			const path = `${dataProvider.resourceMapper(resource)}/create`;
			const headers = dataProvider.extraHeaderMapper(path);

			const { formData } = dataProvider.fileInterceptor(params);

			const _formData = formData ? formData : params.data;

			const response = await api.post(path, _formData, {
				headers: headers,
			});
			return {
				data: response.data,
			};
		} catch (error) {
			throw error;
		}
	},

	delete: async (resource: string, params: DeleteParams) => {
		try {
			const response = await api.post(
				`${dataProvider.resourceMapper(resource)}/delete/${
					params.id
				}`,
				{
					headers: dataProvider.header(),
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	deleteMany: async (
		resource: string,
		params: DeleteManyParams
	): Promise<any> => {
		try {
			const deletePromises = params.ids.map(async (id) => {
				const response = await api.post(
					`${dataProvider.resourceMapper(resource)}/delete/${id}`,

					{
						headers: dataProvider.header(),
					}
				);
				return response.data;
			});

			const results = await Promise.all(deletePromises);
			return {
				data: results,
			};
		} catch (error) {
			console.error('Error deleting many resources:', error);
			throw error;
		}
	},

	customPost: async (endpoint: string, params: any) => {
		try {
			const response = await api.post(endpoint, params, {
				headers: dataProvider.header(),
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	customGet: async (endpoint: string, params: any) => {
		try {
			const response = await api.get(
				`${endpoint}${params ? params : ''}`,
				{
					headers: dataProvider.header(),
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};
