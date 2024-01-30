import { Box, TextField, Button, Typography, Link, InputClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoginFieldName } from '@mystacks/account'
import { useRouterWrapper } from "@mystacks/utils";

/* eslint-disable-next-line */
export interface AccountLoginFormProps {
    username: string
    password: string
    handleLoginInputChange: (newValue: string, fieldName: LoginFieldName) => void
    submitLogin: () => void
    isStoryBook?: boolean
}


export const AccountLoginForm = (props: AccountLoginFormProps) => {
    const { username, password, handleLoginInputChange, submitLogin, isStoryBook } = props

    const navigate = useRouterWrapper()
    
    return (
        <StyledBox>
            <ComponentHeadline variant='h4'>Sign In.</ComponentHeadline>
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
            <StyledButton onClick={submitLogin} variant="contained">Submit</StyledButton>

            <Typography variant='body1'>Don't have an account?</Typography>
            <StyledLink href="#" variant="body2" underline="hover">
                Create One Now
            </StyledLink>
        </StyledBox>
    )
}

export default AccountLoginForm;

const StyledBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
}));

const ComponentHeadline = styled(Typography)(({ theme }) => ({
    margin: "0 0 20px 0",
    fontWeight: 700
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: "20px 0 15px 0",
    background: theme.palette.primary.contrastText,
    color: "white"
}));


const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.contrastText
}));


const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    margin: "10px 0",
    '& fieldset': {
        borderColor: 'black',
        borderWidth: 4,
    },

}));
