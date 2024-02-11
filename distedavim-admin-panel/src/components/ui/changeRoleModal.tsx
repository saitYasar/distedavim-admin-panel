
import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import FullScreenLoading from './FullScreenLoading';
import { dataProvider } from '../../../utils/provider/dataProvider';
import {  Edit, Identifier, RaRecord, SimpleForm, useGetRecordId, useRefresh } from 'react-admin';
import { RoleEnumSelect } from './RoleEnumInput'


interface ChangePasswordModalProps {
    isVisible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    submerchantId: number

}

const ChangeRoleModal: FC<ChangePasswordModalProps> = ({ isVisible, setVisible, submerchantId }) => {
    const [roleId, setRoleId] = useState<number>(0);
    const [isLoading, setLoading] = useState<boolean>(false);
    const id = useGetRecordId();
    const refresh = useRefresh()
    const handleChange = (event: RaRecord<Identifier> | React.ChangeEvent<HTMLInputElement>) => {
        setRoleId(event.target.value)
    };

    const handleClose = () => {
        setVisible(false);
    }

    const handleSubmit = () => {
        setLoading(true)
        dataProvider.update('/submerchant/user-role', {
            id,
            data: {
                role: roleId,
                submerchant_id: submerchantId
            }
        } as any).then(() => {
            setVisible(false)
            refresh()
        }).finally(() => {
            setLoading(false)
        })

    }

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
                <DialogContent >
                    <SimpleForm toolbar={<></>}>
                        <RoleEnumSelect
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

export default ChangeRoleModal;