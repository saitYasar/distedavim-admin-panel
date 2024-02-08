import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    SimpleForm,
    ReferenceInput,
    TextInput,
    Create,
    useRecordContext
} from "react-admin";

  const PostTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
  };

export const PostList = () => (
  <List>
   <Datagrid>
   <TextField source="id" />
      <ReferenceField source="userId" reference="users" />
      <TextField source="title" />
   <EditButton />
    </Datagrid>
  </List>
);
export const PostEdit = () => (
    <Edit title={<PostTitle />}>
        
        <SimpleForm>
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="id" InputProps={{ disabled: true }} />
            {/* <TextInput source="id" /> */}
            <TextInput source="title" />
            {/* <TextInput source="body" /> */}
            <TextInput source="body" multiline rows={5} />

            <span>deneme 12</span>
        </SimpleForm>
    </Edit>
);
export const PostCreate = () => (
      <Create>
        <SimpleForm>
          <ReferenceInput source="userId" reference="users" />
          <TextInput source="title" />
          <TextInput source="body" multiline rows={5} />
        </SimpleForm>
      </Create>
);
    