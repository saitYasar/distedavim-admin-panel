
import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import customAuthProvider from '../../../utils/provider/authProvider';
import { useRedirect } from 'react-admin';
import CloseIcon from '@mui/icons-material/Close';
import FullScreenLoading from '../../components/ui/FullScreenLoading';

interface AuthVerifySms {
    id: string;
    phone_gsm: string;
    phone_country_code: string;
  }

interface VerifySmsModalProps {
    isVisible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    authVerifySms: AuthVerifySms;

}

const VerifySmsModal: FC<VerifySmsModalProps> = ({ isVisible, authVerifySms, setVisible }) => {
    const [otp, setOtp] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    const redirect = useRedirect();
    const handleAgainSms = () => {
        setOtp("")
        setLoading(true)
        customAuthProvider.createSmsAuth({
            phone_country_code: authVerifySms.phone_country_code,
            phone_gsm: authVerifySms.phone_gsm,
            user_id: authVerifySms.id
        }).finally(() => {
            setLoading(false)
        })

    }

    const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 6) {
            setOtp(event.target.value);
        }
    };

    const handleClose = () => {
        setVisible(false);
    }

    const handleSubmitSms = () => {
        setLoading(true)
        customAuthProvider.verifySmsAuth({
            otp,
            phone_country_code: authVerifySms.phone_country_code,
            phone_gsm: authVerifySms.phone_gsm
        }).then(() => {
            redirect("/")
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <Dialog open={isVisible}>
            <FullScreenLoading
                visibled={isLoading}
            />
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <DialogTitle>Kullanıcı Doğrulama</DialogTitle>
                <CloseIcon sx={{ mr: 3 }} onClick={() => handleClose()} />
            </div>
            <DialogContent>
                <DialogContentText>
                    Telefonunuza gelen kodu lütfen buradaki alana giriniz.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    name="otp"
                    id="otp"
                    label="Code"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={otp}
                    onChange={handleOtpChange}
                    maxRows={6}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAgainSms}>Kodu tekrar gönder</Button>
                <Button onClick={handleSubmitSms} variant='contained'>Gönder</Button>
            </DialogActions>
        </Dialog>
    );
}

export default VerifySmsModal;