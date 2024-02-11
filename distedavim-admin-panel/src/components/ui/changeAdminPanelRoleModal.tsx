import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import FullScreenLoading from './FullScreenLoading';
import { dataProvider } from '../../../utils/provider/dataProvider';
import { AutocompleteInput, Edit, SimpleForm, useGetList, useGetRecordId, useNotify } from 'react-admin';
import DialogContent from '@mui/material/DialogContent';

interface ChangePasswordModalProps {
    isVisible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>

}

const ChangeRoleAdminModal: FC<ChangePasswordModalProps> = ({ isVisible, setVisible }) => {
    const [roleId, setRoleId] = useState<number>(0);
    const [isLoading, setLoading] = useState<boolean>(false);
    const notify = useNotify()
    const { data } = useGetList('auth/roles');
    const id = useGetRecordId();
    const handleChange = (value: number) => {
        setRoleId(value)
    };

    const handleClose = () => {
        setVisible(false);
    }


    const handleSubmit = () => {
        setLoading(true)
        dataProvider.update('users/change-user-role', {
            id,
            data: {
                role_id: roleId
            }
        } as any).then(() => {
            notify('Kullanıcı admin panel rolü başarıyla güncellendi',{type:'success'})
            setVisible(false)
        }).finally(() => {
            setLoading(false)
            notify('Kullanıcı admin panel rolü başarıyla güncellendi',{type:'error'})

        })

    }

    const filterToQuery = (searchText: string) => ({ name_like: `${searchText}` });

    return (
        <Edit>
            <Dialog open={isVisible}>
                <FullScreenLoading
                    visibled={isLoading}
                />
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <DialogTitle>
                        Kullanıcı Role Güncelleme
                    </DialogTitle>
                    <CloseIcon sx={{ mr: 3 }} onClick={() => handleClose()} />
                </div>
                <DialogContent>
                    <SimpleForm  toolbar={<></>}>
                        <AutocompleteInput
                            source="roles"
                            choices={data}
                            optionText="name"
                            optionValue="id"
                            filterToQuery={filterToQuery}
                            fullWidth
                            onChange={handleChange}
                        />
                    </SimpleForm>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} variant='contained'>Gönder</Button>
                </DialogActions>
            </Dialog>
        </Edit>
    );
}
export default ChangeRoleAdminModal;