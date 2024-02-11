import {
	TextField,
	Datagrid,
	DateField,
	List,
	Pagination,
	ReferenceField,
  } from "react-admin";

export const TreatmentsList = () => {
	return (
	  <List
		sort={{ field: "id", order: "DESC" }}
		perPage={10}
		pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
	  >
		<Datagrid>
		  <TextField source="id" />
		  <TextField source="address" label="Adres" />
          <TextField source="name" label="Klinik İsmi"/>

		  <TextField source="phone" label="Telefon Numarası" />
		  <TextField source="review_rating" label="Değerlendirme Puanı" />
		  <TextField source="service_provider_score" label="Doktor Skoru" />
		  <TextField source="url" label="Klinik Url" />
		  <DateField source="created_at" label="Oluşturulma Tarihi" />
		  <DateField source="updated_at" label="Son Güncellenme Tarihi" />
		</Datagrid>
	  </List>
	);
  };