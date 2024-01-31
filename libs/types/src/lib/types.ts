import { State } from "@hookstate/core"

export interface Book {
  title: string
  author: string
  imgUrl: string
}

export interface AppState {
  userId: string
}

export interface PageProps {
  appState: State<Partial<AppState>>
}

export enum LoginFieldNames {
  Username = "accountLoginUsernameField",
  Password = "accountLoginPasswordField"
}

export enum SignUpFieldNames {
  Username = "accountCreationUsernameField",
  Password = "accountCreationPasswordField",
  Email = "accountCreationEmailField"
}

export type LoginFieldName = 'accountLoginUsernameField' | 'accountLoginPasswordField'
export type SignUpFieldName = 'accountCreationUsernameField' | 'accountCreationPasswordField' | 'accountCreationEmailField'

export type FieldName = LoginFieldName | SignUpFieldName