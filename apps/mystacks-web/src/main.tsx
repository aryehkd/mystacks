import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { hookstate } from '@hookstate/core';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
} from "react-router-dom";

const appState = hookstate<Partial<AppState>>({});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage appState={appState}/>,
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
