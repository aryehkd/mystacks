import { useState } from 'react'
import { request } from '@mystacks/utils'
import { useNavigate } from "react-router-dom";

export type SignUpFieldName = 'username' | 'password' | 'email'

export const useSignUp = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ email, setEmail ] = useState('')

  const handleSignupInputChange = (newInputValue: string, fieldName: SignUpFieldName) => {
    switch (fieldName) {
      case 'username':
        setUsername(newInputValue)
        break;
      case 'password':
        setPassword(newInputValue)
        break;
      case 'email':
        setEmail(newInputValue)
        break;
      default:
        console.error("No input fieldName specified on input");
    }
  }

  const submitSignUp = () => {
    // TODO: add validation and errors

    const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const d = new Date();

        // TODO: this is a temp login setup till a real system is added
        const raw = JSON.stringify({
            "account": {
                "username": username,
                "password": password,
                "email": email,
                'account-created': d.getTime()
            }
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow' as RequestRedirect
        };
          
          
        request("https://createuseraccount-u6erzcpcda-uc.a.run.app", requestOptions)
            .then(response => response.text())
            .then(result => {
                // TODO: sign user in here when router is added 
                console.log(result)
            })
            .catch(error => console.log('error', error));
  }

  return {
    username,
    password,
    email,
    handleSignupInputChange,
    submitSignUp
  }
}