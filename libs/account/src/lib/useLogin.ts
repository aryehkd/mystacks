import { useState } from 'react'
import { request } from '@mystacks/utils'
import { useHookstate, State } from '@hookstate/core';
import { AppState, LoginFieldName, LoginFieldNames } from "@mystacks/types"
import { useNavigate } from "react-router-dom";


export const useLogin = (appState:  State<Partial<AppState>>) => {
  const globalState = useHookstate(appState);
  const navigate = useNavigate();

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleLoginInputChange = (newInputValue: string, fieldName: LoginFieldName) => {
    switch (fieldName) {
      case LoginFieldNames.Username:
        setUsername(newInputValue)
        break;
      case LoginFieldNames.Password:
        setPassword(newInputValue)
        break;
      default:
        console.error("No input fieldName specified on input");
    }
  }

  const submitLogin = () => {
    // TODO: add validation and errors

    const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      // TODO: this is a temp login setup till a real system is added
      const raw = JSON.stringify({
          "account": {
              "username": username,
              "password": password,
          }
      });

      const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow' as RequestRedirect
      };        
        
      request("https://login-u6erzcpcda-uc.a.run.app", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result?.error) throw new Error(result?.error)
          else {
            console.log('login successful', result.data.account)
            globalState.set(currentState => {return {...currentState, userId: result.data.account}})
            console.log('redirect')
            navigate("/")
          }
        })
        .catch(error => console.log('error', error));
  }
  
  return {
    username,
    password,
    handleLoginInputChange,
    submitLogin
  }
}