import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FullScreenLoading from "../../ui/FullScreenLoading"
import { useAuthProvider, useNotify, useRedirect } from 'react-admin';
import { useState } from "react";
import PasswordComponent from "../../ui/PasswordInput";
interface FormSubmitEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement & {
        telephone: { value: string };
        password: { value: string };
    };
}

// interface AuthVerifySms {
//     id: string;
//     phone_gsm: string;
//     phone_country_code: string;
// }

export default function LoginPage() {
    const { login } = useAuthProvider();
    const notify = useNotify();
    // const [isVisible, setVisible] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const redirect = useRedirect();

    // const [verifySms, setVerifySms] = useState<AuthVerifySms>({} as AuthVerifySms)
    const handleSubmit = (event: FormSubmitEvent) => {
        event.preventDefault();
        setLoading(true)
        const phone = event.target.phone_gsm.value;

        login({ phone, password })
        .then(() => {
            redirect("/")
        })
        .catch((err) => {
            if (err.response.status === 403) {
                console.log()
                notify(err.response?.data?.message?.error?.message ?? "Bilinmeyen hata",{type:"error"})
            }
            if (err.response.status === 401) {
                console.log()
                notify(err?.response?.data?.message ?? "Bilinmeyen hata",{type:"error"})
            }
        }
        ).finally(() => {
            setLoading(false)
        });
    };


    return (
        <Container maxWidth="xs">
            {/* <VerifySmsModal
                isVisible={isVisible}
                setVisible={setVisible}
                authVerifySms={verifySms}
            /> */}
            <FullScreenLoading
                visibled={isLoading}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 800,
                }}
            >
                <Typography component="h1" variant="h5">
                    Giriş Yap
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone_gsm"
                        label="Telefon"
                        name="phone_gsm"
                        autoFocus
                        type="number"
                    />
                    <PasswordComponent
                        label="Şifre"
                        value={password}
                        onChange={(value: string) => setPassword(value)}
                    />


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Giriş Yap
                    </Button>
                   
                </Box>
            </Box>
        </Container>
    );
}
