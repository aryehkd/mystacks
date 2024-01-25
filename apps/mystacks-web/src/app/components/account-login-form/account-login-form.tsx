import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoginFieldName } from '@mystacks/account'

/* eslint-disable-next-line */
export interface AccountLoginFormProps {
    username: string
    password: string
    handleLoginInputChange: (newValue: string, fieldName: LoginFieldName) => void
    submitLogin: () => void
}


export const AccountLoginForm = (props: AccountLoginFormProps) => {
    const { username, password, handleLoginInputChange, submitLogin } = props

    return (
        <StyledBox>
            <Typography variant='h4'>Account Login</Typography>
            <StyledTextField 
                id="account-login-username-field" 
                label="Username" 
                variant="outlined" 
                value={username}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleLoginInputChange(event.target.value, 'username');
                }}
            />
            <StyledTextField 
                id="account-login-password-field" 
                label="Password" 
                variant="outlined" 
                type="password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleLoginInputChange(event.target.value, 'password');
                }}
            />
            <Button onClick={submitLogin} variant="outlined">Submit</Button>
        </StyledBox>
    )
}

export default AccountLoginForm;

const StyledBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    margin: "10px 0"
  }));
