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