import { State } from "@hookstate/core"

export interface Book {
  id: string
  savedDate: number
  bookInfo: BookInfo
  userRating?: UserRating
}

export interface AIRecommendation extends Book {
  recommendation: string
}

export interface BookSearchItem {
  id: string
  title: string
  author: string
}

export interface BookInfo {
  title: string
  author: string
  imgUrl: string
  industryIdentifiers: {
    isbn13?: string
    isbn10?: string
  }
  publisher?: string
  publishedDate?: string
  pageCount?: number
}

export interface UserRating {
  bookProgress?: BookProgressState
  rating?: BookRating
  notes?: string
  completedDate?: number
}

export type AppStateType = State<Partial<AppState>>

export interface AppState {
  userId: string
  books: Book[]
  firstLogin?: boolean
}

export interface PageProps {
  appState: AppStateType
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

export enum HomeLoadingStates {
  LoadNotStarted = "loadNotStarted",
  LoadingFirstTimeText = "loadingFirstTimeText",
  LoadingFirstTimeBooks = "loadingFirstTimeBooks",
  LoadComplete = "loadComplete",
  LoadingRegular = "loadingRegular",
}
export type HomeLoadingState = 'loadNotStarted' | 'loadingFirstTimeText' | 'loadingFirstTimeBooks' | 'loadComplete' | 'loadingRegular'