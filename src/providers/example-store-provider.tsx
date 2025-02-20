// This is only an example of how to create a provider

'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type LoaderStore,
  createLoaderStore,
  initLoaderStore,
} from '@/stores/example-store'

type LoaderStoreApi = ReturnType<typeof createLoaderStore>

const LoaderStoreContext = createContext<LoaderStoreApi | undefined>(undefined)

type LoaderStoreProviderProps = {
  children: ReactNode
}

function LoaderStoreProvider({ children }: LoaderStoreProviderProps) {
  const storeRef = useRef<LoaderStoreApi>(null)
  if (!storeRef.current) {
    storeRef.current = createLoaderStore(initLoaderStore())
  }

  return (
    <LoaderStoreContext.Provider value={storeRef.current}>
      {children}
    </LoaderStoreContext.Provider>
  )
}

function useLoaderStore<T>(selector: (store: LoaderStore) => T): T {
  const loaderStoreContext = useContext(LoaderStoreContext)

  if (!loaderStoreContext) {
    throw new Error(`useLoaderStore must be used within LoaderStoreProvider`)
  }

  return useStore(loaderStoreContext, selector)
}

export { LoaderStoreProvider, useLoaderStore }
