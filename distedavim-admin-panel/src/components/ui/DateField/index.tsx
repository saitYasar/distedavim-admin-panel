// CustomDateField.tsx

import React from 'react';
import { useRecordContext } from 'react-admin';

interface CustomDateFieldProps {
	source: string;
	label?: string;
}

const CustomDateField: React.FC<CustomDateFieldProps> = (
	props: CustomDateFieldProps
) => {
	const record = useRecordContext();
	const date = new Date(Number(record[props.source]));
	const formattedDate = date.toLocaleString('tr-TR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});

	return <span>{formattedDate}</span>;
};

export default CustomDateField;
