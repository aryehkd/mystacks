import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SignUpFieldName, SignUpFieldNames } from '@mystacks/types'
import { OutlinedTextInput, PrimaryButton } from "../../elements" 

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

    const handleChange = (newValue: string, id: string) => {
        handleSignupInputChange(newValue, id as SignUpFieldName)
    }

    return (
        <StyledBox>
            <ComponentHeadline variant='h4'>Create Account.</ComponentHeadline>
            <OutlinedTextInput 
                id={SignUpFieldNames.Username} 
                label="Username" 
                value={username}
                handleChange={handleChange}
            />
            <OutlinedTextInput 
                id={SignUpFieldNames.Password} 
                label="Password" 
                type="password"
                value={password}
                handleChange={handleChange}
            />
            <OutlinedTextInput 
                id={SignUpFieldNames.Email} 
                label="Email" 
                value={email}
                handleChange={handleChange}
            />

            <ActionsContainer>
                <PrimaryButton onClick={submitSignUp}>Create</PrimaryButton>
            </ActionsContainer>

            <SubActionsContainer>
                <Typography variant='h6'>Already have an account?</Typography>
                <StyledLink href="/login" variant="subtitle1" underline="hover">
                    Sign In.
                </StyledLink>
            </SubActionsContainer>
        </StyledBox>
    )
}

export default AccountCreationForm;

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
    color: theme.palette.primary.contrastText
}));