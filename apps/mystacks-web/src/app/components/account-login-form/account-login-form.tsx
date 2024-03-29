import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoginFieldName, LoginFieldNames } from '@mystacks/types'
import { OutlinedTextInput, PrimaryButton } from "../../elements" 

/* eslint-disable-next-line */
export interface AccountLoginFormProps {
    username: string
    password: string
    handleLoginInputChange: (newValue: string, fieldName: LoginFieldName) => void
    submitLogin: () => void
}


export const AccountLoginForm = (props: AccountLoginFormProps) => {
    const { username, password, handleLoginInputChange, submitLogin } = props

    const handleChange = (newValue: string, id: string) => {
        handleLoginInputChange(newValue, id as LoginFieldName)
    }
    
    return (
        <StyledBox>
            <ComponentHeadline variant='h4'>Sign In.</ComponentHeadline>
            <OutlinedTextInput 
                id={LoginFieldNames.Username} 
                label="Username" 
                value={username}
                handleChange={handleChange}
            />
            <OutlinedTextInput 
                id={LoginFieldNames.Password} 
                label="Password" 
                value={password}
                type="password"
                handleChange={handleChange}
            />
            <ActionsContainer>
                <PrimaryButton onClick={submitLogin}>Login</PrimaryButton>
            </ActionsContainer>

            <SubActionsContainer>
                <Typography variant='h6'>Don't have an account?</Typography>
                <StyledLink href="/sign-up" variant="subtitle1" underline="hover">
                    Create One Now
                </StyledLink>
            </SubActionsContainer>
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

const ActionsContainer = styled(Box)(({ theme }) => ({
    marginTop: "20px",
}));

const SubActionsContainer = styled(Box)(({ theme }) => ({
    marginTop: "20px",
}));

const ComponentHeadline = styled(Typography)(({ theme }) => ({
    margin: "0 0 20px 0",
    fontWeight: 700
}));

const StyledLink = styled(Link)(({ theme }) => ({
    color: "#000"
}));
