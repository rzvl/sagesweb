// This is only an example of how to create a store.

import { createStore } from 'zustand/vanilla'

type LoaderState = {
  isLoading: boolean
  loaderText: string
}

type LoaderActions = {
  setIsLoading: (isLoading: boolean) => void
  setLoaderText: (text: string) => void
}

type LoaderStore = LoaderState & LoaderActions

function initLoaderStore(): LoaderState {
  return { isLoading: false, loaderText: '' }
}

const defaultInitState: LoaderState = {
  isLoading: false,
  loaderText: '',
}

function createLoaderStore(initState: LoaderState = defaultInitState) {
  return createStore<LoaderStore>()((set) => ({
    ...initState,
    setIsLoading: (isLoading) => set((state) => ({ ...state, isLoading })),
    setLoaderText: (loaderText) => set((state) => ({ ...state, loaderText })),
  }))
}

export type { LoaderStore }
export { initLoaderStore, createLoaderStore }
