import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SignUpFieldName } from '@mystacks/account'

/* eslint-disable-next-line */
export interface AccountCreationFormProps {
    username: string
    password: string
    email: string
    handleSignupInputChange: (newValue: string, fieldName: SignUpFieldName) => void
    submitSignUp: () => void
}


export const AccountCreationForm = (props: AccountCreationFormProps) => {
    const { username, password, email, handleSignupInputChange, submitSignUp } = props

    return (
        <StyledBox>
            <Typography variant='h4'>Account Creation</Typography>
            <StyledTextField 
                id="account-creation-username-field" 
                label="Username" 
                variant="outlined" 
                value={username}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleSignupInputChange(event.target.value, 'username');
                }}
            />
            <StyledTextField 
                id="account-creation-password-field" 
                label="Password" 
                variant="outlined" 
                type="password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleSignupInputChange(event.target.value, 'password');
                }}
            />
            <StyledTextField 
                id="account-creation-email-field" 
                label="Email" 
                variant="outlined" 
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleSignupInputChange(event.target.value, 'email');
                }}
            />
            <Button onClick={submitSignUp} variant="outlined">Submit</Button>
        </StyledBox>
    )
}

export default AccountCreationForm;

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
