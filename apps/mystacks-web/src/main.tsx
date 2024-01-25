import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { hookstate } from '@hookstate/core';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  HomePage,
  AccountPage,
  LoginPage,
  SignUpPage,
} from './app/pages'

import { AppState } from '@mystacks/types'

import {
  createBrowserRouter,
  RouterProvider,
  LoaderFunctionArgs,
  redirect
} from "react-router-dom";

const appState = hookstate<Partial<AppState>>({});

const requireLogin = async (args: LoaderFunctionArgs<any>) => {
  const currentState = appState.get()

  if (!currentState?.userId) {
    return redirect("/login");
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
    path: "/account",
    element: <AccountPage appState={appState}/>,
    loader: requireLogin,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
