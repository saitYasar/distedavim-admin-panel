import { useMediaQuery, Theme } from "@mui/material";
import { useState } from "react";
import { List, SimpleList, Datagrid, TextField, EmailField, ArrayField, FunctionField, Show, SimpleShowLayout, ShowButton, Edit, SimpleForm, ReferenceInput, TextInput, useRecordContext, EditButton, Create, SaveButton, PasswordInput, Filter, FilterButtonProps, TopToolbar, Button, TabbedShowLayout, ReferenceField, ReferenceManyField, useShowController, } from "react-admin";
import { LanguageSelectInput } from "../../components/ui/LanguageSelectInput";
import PhoneInputMask from "../../components/ui/PhoneInputMask";
import ChangePasswordModal from "../../components/ui/changePasswordModal";
import ChangeTelephoneModal from "../../components/ui/changeTelephoneModal";
import ChangeRoleModal from "../../components/ui/changeRoleModal";
import ChangeRoleAdminModal from "../../components/ui/changeAdminPanelRoleModal";

const UserTitle = () => {
    const record = useRecordContext();
    return <span>Kullanıcı {record ? `"${record.title}"` : ''}</span>;
};

interface formDataI {
    name: string;
    email: string;
    gsm: string;
    password: string;
    lang_id: string;
    country_code: number;
}
const PostFilter = (props: FilterButtonProps) => (
    <Filter {...props}>
        <TextInput label="Adı" source="name" alwaysOn />
        <TextInput label="Email" source="email" alwaysOn />
        <TextInput label="Telefon" source="phone" alwaysOn />
    </Filter>
);

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List
            filters={<PostFilter />}
        >
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField source="id" />
                    <TextField source="name" label="İsim" />
                    <TextField source="last_name" label="Soy isim" />
                    <EmailField source="email" label="Email" />
                    <TextField source="phone" />
                    <ShowButton label="Goster" />
                    <EditButton />

                </Datagrid>
            )}
        </List>
    );
};




export const UserListShow = (props: any) => {
    const handleChangeSubmerchantRole = (record: any) => {
        setSubmerchantId(record?.submerchant_id)
        setChangeRoleModal(true)
    }
    const ActionButton = () => (
        <TopToolbar>
            <EditButton label="Kullanıcıyı Düzenle" />
            {/* {permissions?.find((item: any) => item?.name === "SUPER_ADMIN") && <Button
                color="primary"
                label="Şifreyi Güncelle"
                onClick={() => setChangePasswordModal(true)}
            />} */}


            <Button
                color="primary"
                label="Telefon Güncelle"
                onClick={() => setChangeTelephoneModal(true)}
            />
            <Button
                color="primary"
                label="Admin Panel Rolünü Güncelle"
                onClick={() => setChangeRoleAdminModalData(true)}
            />

        </TopToolbar>
    );
    const [changeTelephoneModal, setChangeTelephoneModal] =
        useState<boolean>(false);

    const [changeRoleModal, setChangeRoleModal] = useState<boolean>(false);
    const [submerchantId, setSubmerchantId] = useState<number>(0)
    const [changeRoleAdminModalData, setChangeRoleAdminModalData] = useState<boolean>(false);
    const [changePasswordModal, setChangePasswordModal] =
        useState<boolean>(false);
    const { record } = useShowController(props);
    return (
        <>
            {changePasswordModal && (
                <ChangePasswordModal
                    isVisible={changePasswordModal}
                    setVisible={setChangePasswordModal}
                />
            )}
            {changeTelephoneModal && (
                <ChangeTelephoneModal
                    isVisible={changeTelephoneModal}
                    setVisible={setChangeTelephoneModal}
                />
            )}
            {
                changeRoleModal && (
                    <ChangeRoleModal
                        submerchantId={submerchantId}
                        isVisible={changeRoleModal}
                        setVisible={setChangeRoleModal}
                    />
                )
            }

            {
                changeRoleAdminModalData && (
                    <ChangeRoleAdminModal
                        isVisible={changeRoleAdminModalData}
                        setVisible={setChangeRoleAdminModalData}
                    />
                )
            }
            <Show actions={<ActionButton />} title={record?.name}>
                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="Kullanıcı Bilgileri">
                        <TextField source="name" label="Adı" />
                        <TextField source="email" label="Email" />
                        <TextField source="phone" label="Phone" />
                        <TextField source="language" label="languages" />

                        {/* <FunctionField label="Oluşturulma Tarihi"
                    render={() => (
                        <CustomDateField source="created_at" />

                    )}

                /> */}
                    </TabbedShowLayout.Tab>
                </TabbedShowLayout>
            </Show></>

    );
};
export const UserEdit = () => {
    const transform = (formData: formDataI) => ({
        name: formData.name,
        email: formData.email,
        lang_id: formData.lang_id,
      });
    return (
        <Edit redirect="show" transform={transform}>
            <SimpleForm 
            toolbar={
                <Button label="Kaydet" type="submit" variant="contained" sx={{ m: 3 }} size="medium" />
            }
            >
                    <TextInput
                        source="name"
                        label="Ad Soyad"
                        name="name"
                        required
                        autoComplete='off'
                        fullWidth
                    />

                    <TextInput
                        source="email"
                        label="Email"
                        name="email"
                        required
                        type="email"
                        autoComplete='off'
                        fullWidth
                    />

                    <LanguageSelectInput />
                
            </SimpleForm>
        </Edit>
    )
}

export const UserCreate = () => {
    const [gsm, setGsm] = useState<string>('');

    const transform = (formData: formDataI) => ({
        name: formData.name,
        email: formData.email,
        gsm: gsm,
        password: formData.password,
        lang_id: formData.lang_id,
        country_code: 90,
    });

    return (
        <Create transform={transform} redirect="show">
            <SimpleForm toolbar={<SaveButton label="KAYDET" />}>
                <TextInput
                    source="name"
                    label="Ad Soyad"
                    name="name"
                    required
                    autoComplete="off"
                    fullWidth
                />
                <TextInput
                    source="email"
                    label="Email"
                    name="email"
                    required
                    type="email"
                    autoComplete="off"
                    fullWidth
                />
                <PhoneInputMask
                    onChange={(e) => setGsm(e.target.value)}
                    value={gsm}
                    source="gsm"
                    label="Telefon Numarası"
                    fullWidth
                />
                <PasswordInput
                    source="password"
                    label="Şifre"
                    name="password"
                    autoComplete="off"
                    type="password"
                    required
                    fullWidth
                />
                <LanguageSelectInput />
            </SimpleForm>
        </Create>
    );
};
export default UserListShow;