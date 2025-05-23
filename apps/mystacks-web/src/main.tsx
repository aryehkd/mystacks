import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { hookstate } from '@hookstate/core';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import {
  HomePage,
  BookInfoPage,
  LoginPage,
  SignUpPage,
  BookSearchPage,
  RecommendationsPage,
  AccountPage,
  Shelf,
} from './app/pages'

import { AppState } from '@mystacks/types'

import {
  createBrowserRouter,
  RouterProvider,
  LoaderFunctionArgs,
  redirect
} from "react-router-dom";

const appState = hookstate<Partial<AppState>>({});

const requireLogin = async (args: LoaderFunctionArgs) => {
  const currentState = appState.get()
  const savedUserId = window.sessionStorage.getItem("userId")

  if (!currentState?.userId && !savedUserId) {
    return redirect("/login");
  } else if (savedUserId) {
    appState.set(currentState => {return {...currentState, userId: savedUserId}})
  }

  return null
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage appState={appState}/>,
    loader: requireLogin,
  },
  {
    path: "/login",
    element: <LoginPage appState={appState}/>,
  },
  {
    path: "/sign-up",
    element: <SignUpPage appState={appState}/>,
  },
  {
    path: "/book-info",
    element: <BookInfoPage appState={appState}/>,
    loader: requireLogin,
  },
  {
    path: "/search",
    element: <BookSearchPage appState={appState}/>,
    loader: requireLogin,
  },
  {
    path: "/recommendations",
    element: <RecommendationsPage appState={appState}/>,
    loader: requireLogin,
  },
  {
    path: "/account",
    element: <AccountPage appState={appState}/>,
    loader: requireLogin,
  },
  {
    path: "/shelf",
    element: <Shelf appState={appState}/>,
    loader: requireLogin,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>
);
