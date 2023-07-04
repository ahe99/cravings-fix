import {
  Input as InputBase,
  InputProps as InputBaseProps,
  InputGroup,
  InputLeftElement,
  FormLabel,
  FormControl,
  Box,
  InputRightElement,
} from '@chakra-ui/react'

interface InputProps extends InputBaseProps {
  label?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
  disabled?: boolean
  required?: boolean
}

export const Input = ({
  label,
  leftIcon,
  rightIcon,
  error,
  disabled,
  required,
  ...props
}: InputProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel className="text-start" htmlFor={props.name}>
        {label}
        {required && <span className="text-red-600">*</span>}
      </FormLabel>
      <InputGroup variant="outline">
        {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
        <InputBase
          id={props.name}
          className="border-2 border-brown-600 outline-brown-600 focus:border-4 focus:border-brown-900"
          disabled={disabled}
          {...props}
        />
        {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
      </InputGroup>
      <Box className="text-sm text-red-600">{error}</Box>
    </FormControl>
  )
}
