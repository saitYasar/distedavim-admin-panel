import {
	TextField,
	Datagrid,
	DateField,
	List,
	Pagination,
	ReferenceField,
  } from "react-admin";
  
  export const PaymentsReviewsList = () => {
	return (
	  <List
		sort={{ field: "id", order: "DESC" }}
		perPage={10}
		pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
	  >
		<Datagrid>
		  <TextField source="id" />
		  <TextField source="payment_id" label="Ödeme ID" />
		  <ReferenceField
			label="Firma"
			source="submerchant_id"
			reference="submerchants"
		  >
			<TextField source="name" />
		  </ReferenceField>
		  <TextField source="payment_score" label="Ödeme Skoru" />
		  <TextField source="payment_comment" label="Ödeme Yorumu" />
		  <TextField source="service_provider_score" label="Doktor Skoru" />
		  <TextField source="service_provider_comment" label="Doktor Yorumu" />
		  <DateField source="created_at" label="Oluşturulma Tarihi" />
		  <DateField source="updated_at" label="Son Güncellenme Tarihi" />
		</Datagrid>
	  </List>
	);
  };
  