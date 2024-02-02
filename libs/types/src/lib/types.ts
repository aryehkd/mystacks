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
export type LoginFieldName = 'accountLoginUsernameField' | 'accountLoginPasswordField'

export enum SignUpFieldNames {
  Username = "accountCreationUsernameField",
  Password = "accountCreationPasswordField",
  Email = "accountCreationEmailField"
}
export type SignUpFieldName = 'accountCreationUsernameField' | 'accountCreationPasswordField' | 'accountCreationEmailField'

export type FieldName = LoginFieldName | SignUpFieldName

export enum BookProgressStates {
  ToRead = "toRead",
  CurrentlyReading = "currentlyReading",
  Recommended = "recommended",
  Completed = "completed"
}
export type BookProgressState = 'toRead' | 'currentlyReading' | 'recommended' | 'completed'

export type BookRating = 0 | .5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5