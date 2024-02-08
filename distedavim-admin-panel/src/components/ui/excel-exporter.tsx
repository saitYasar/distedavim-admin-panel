import api from '../../../utils/service/axios';
import { Button, useNotify } from 'react-admin';
import { BACKEND_URL } from '../../constant/api';
import GetApp from '@mui/icons-material/GetApp';

export const FileExportButton = (opts: {
	endpoint: string;
	filter: string | null;
	label?: string;
}) => {
	const notify = useNotify();
	const filter = opts.filter ?? '{}';
	return (
		<Button
			label={opts.label || 'Dışarı Aktar'}
			startIcon={<GetApp />}
			onClick={async () => {
				try {
					const response = await api.get(
						`${BACKEND_URL}${opts.endpoint}?filter=${filter} `,
						{
							responseType: 'arraybuffer',
							headers: {
								'Content-Type': 'application/json',
								Accept:
									'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
								Authorization: `Bearer ${localStorage.getItem(
									'token'
								)}`,
							},
						}
					);
					const blob = new Blob([response.data], {
						type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					});
					const url = window.URL.createObjectURL(blob);
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', Date.now() + '.xlsx');
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				} catch (error) {
					notify('Indirirken hata olustu', { type: 'error' });
				}
			}}
		/>
	);
};
