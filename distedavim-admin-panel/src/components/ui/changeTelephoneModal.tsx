
import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import FullScreenLoading from './FullScreenLoading';
import { Edit, SimpleForm, useGetRecordId, useNotify, useRefresh } from 'react-admin';
import PhoneInputMask from "./PhoneInputMask"
import { dataProvider } from '../../../utils/provider/dataProvider';

interface ChangePasswordModalProps {
    isVisible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePhoneModal: FC<ChangePasswordModalProps> = ({ isVisible, setVisible }) => {
    const [gsm, setGsm] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const refresh = useRefresh()
    const notify = useNotify()
    const id = useGetRecordId();

    const handleClose = () => {
        setVisible(false);
    }

    const handleSubmit = () => {
        setLoading(true)
        dataProvider.update('users/change-phone', {
            id,
            data: {
                phone_gsm : gsm,
                phone_country_code: 90
            }
        } as any).then(() => {
            setVisible(false)
            notify("Telefon numarası başarıyla güncellendi", {type : "success"})
            refresh()
        })
        .catch(() => {
            notify("Bu numara zaten kayıtlı", {type : "error"})
            setVisible(false)
        }
        )
        .finally(() => {
            setLoading(false)
            setGsm("")
        })

    }


    return (
        <Edit>
            <Dialog
                maxWidth="xl"
                open={isVisible}>
                <FullScreenLoading
                    visibled={isLoading}
                />
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <DialogTitle>
                        Kullanıcı Telefonunu Güncelleme
                    </DialogTitle>
                    <CloseIcon sx={{ mr: 3 }} onClick={() => handleClose()} />
                </div>
                <DialogContent >
                    <SimpleForm toolbar={<></>}>

                        <PhoneInputMask
                            onChange={(e) => setGsm(e.target.value)}
                            value={gsm}
                            source="gsm"
                            label="Yetkili Kişi Telefon Numarası"
                            fullWidth />
                    </SimpleForm>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} variant='contained'>Gönder</Button>
                </DialogActions>
            </Dialog>
        </Edit>

    );
}

export default ChangePhoneModal;