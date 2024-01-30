import { useState } from 'react'
import { request } from '@mystacks/utils'
import { useNavigate } from "react-router-dom";
import { useHookstate, State } from '@hookstate/core';
import { AppState } from "@mystacks/types"

export type SignUpFieldName = 'username' | 'password' | 'email'

export const useSignUp = (appState:  State<Partial<AppState>>) => {
  const globalState = useHookstate(appState);
  const navigate = useNavigate();

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
                console.log(result)
                // TODO: get id
                globalState.set(currentState => {return {...currentState, userId: "getID"}})
                navigate("/")
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