import {
  ToastId,
  UseToastOptions,
  useToast as useToastBase,
} from '@chakra-ui/react'
import { useRef } from 'react'

interface CustomUseToastOptions extends UseToastOptions {
  record?: boolean
}

const DEFAULT_OPTIIONS: CustomUseToastOptions = {
  position: 'top',
  isClosable: true,
  record: true,
}

export const useToast = () => {
  const toastBase = useToastBase()
  const currentToast = useRef<ToastId>()

  const withParams = (
    toastFn: typeof toastBase,
    params: CustomUseToastOptions = DEFAULT_OPTIIONS,
  ): ((args: CustomUseToastOptions) => ToastId) => {
    return (args) => {
      const mergedParams = { ...params, ...args }
      if (mergedParams.record) {
        if (currentToast.current) {
          toastBase.close(currentToast.current)
        }
        currentToast.current = toastFn(mergedParams)

        return currentToast.current
      } else {
        return toastFn(mergedParams)
      }
    }
  }

  const success = withParams(toastBase, {
    ...DEFAULT_OPTIIONS,
    status: 'success',
  })
  const loading = withParams(toastBase, {
    ...DEFAULT_OPTIIONS,
    status: 'loading',
    isClosable: false,
  })
  const info = withParams(toastBase, {
    ...DEFAULT_OPTIIONS,
    status: 'info',
  })
  const error = withParams(toastBase, {
    ...DEFAULT_OPTIIONS,
    status: 'error',
  })
  const warning = withParams(toastBase, {
    ...DEFAULT_OPTIIONS,
    status: 'warning',
  })

  return {
    toast: {
      success,
      loading,
      info,
      error,
      warning,
    },
  }
}
