import { extendTheme } from '@chakra-ui/react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'

const tailwind = resolveConfig(tailwindConfig)

export const theme = extendTheme({
  colors: {
    ...tailwind.theme?.colors,
    ...tailwind.theme?.extend?.colors,
  },
})
