
import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import FullScreenLoading from './FullScreenLoading';
import PasswordInput from './PasswordInput'
import { dataProvider } from '../../../utils/provider/dataProvider';
import { useGetRecordId, useNotify } from 'react-admin';


interface ChangePasswordModalProps {
    isVisible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>

}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({ isVisible, setVisible }) => {
    const [password, setPassword] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const notify = useNotify()
    const id = useGetRecordId();
    const handleChange = (value: string) => {
        setPassword(value);
    };

    const handleClose = () => {
        setVisible(false);
    }

    const handleSubmit = () => {
        setLoading(true)

        dataProvider.update('users/change-password', {
            id,
            data: {
                password
            }
        } as any).then(() => {
            setVisible(false)
            notify('Şifre başarıyla güncellendi',{type:'success'})
        }).finally(() => {
            setLoading(false)
            notify('Şifre Güncellenemedi',{type:'error'})
        })
    }
    return (
        <Dialog open={isVisible}>
            <FullScreenLoading
                visibled={isLoading}
            />
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <DialogTitle>
                    Kullanıcı Şifreyi Güncelleme
                </DialogTitle>
                <CloseIcon sx={{ mr: 3 }} onClick={() => handleClose()} />
            </div>
            <DialogContent>

                <PasswordInput
                    label='Şifre'
                    value={password}
                    onChange={handleChange}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} variant='contained'>Gönder</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChangePasswordModal;