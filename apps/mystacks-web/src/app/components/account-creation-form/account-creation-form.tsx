import { Box, Typography } from '@mui/material';
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
            <Typography variant='h4'>Account Creation</Typography>
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
            <PrimaryButton onClick={submitSignUp}>Submit</PrimaryButton>
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