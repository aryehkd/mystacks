import { useState } from 'react'
import { request } from '@mystacks/utils'
import { useNavigate } from "react-router-dom";
import { useHookstate } from '@hookstate/core';
import { AppStateType, SignUpFieldName, SignUpFieldNames } from "@mystacks/types"

export const useSignUp = (appState:  AppStateType) => {
  const globalState = useHookstate(appState);
  const navigate = useNavigate();

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ email, setEmail ] = useState('')

  const handleSignupInputChange = (newInputValue: string, fieldName: SignUpFieldName) => {
    switch (fieldName) {
      case SignUpFieldNames.Username:
        setUsername(newInputValue)
        break;
      case SignUpFieldNames.Password:
        setPassword(newInputValue)
        break;
      case SignUpFieldNames.Email:
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
        .then(response => response.json())
        .then(result => {
            if (result?.error) throw new Error(result?.error)
            else {
                console.log('login successful', result.data.account)
            }

            const userId = result.data.account

            window.sessionStorage.setItem("userId", userId)
            globalState.set(currentState => {return {...currentState, userId: userId, firstLogin: true}})
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