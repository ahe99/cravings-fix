import { createTrackedSelector } from 'react-tracked'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface TokenState {
  token: string
  clear: () => void
  updateToken: (token: string) => void
  cancelTokenStorage: () => void
}

const tokenStore = create<TokenState>()(
  persist(
    devtools(
      (set) => ({
        token: '',
        clear: () => {
          set({ token: '' })
        },
        updateToken: (token) => {
          set({ token })
        },
        // used when not to persist auth sesstion
        cancelTokenStorage: () => {
          window.localStorage.removeItem('token_storage')
        },
      }),
      { name: 'Token store' },
    ),
    {
      name: 'token_storage',
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
)

/**
 * @description React custom hook which uses Zustand and to manage the API JWT token.
 */
export const useToken = createTrackedSelector(tokenStore)
