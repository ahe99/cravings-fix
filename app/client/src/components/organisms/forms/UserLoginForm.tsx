import { Fragment } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { MdEmail, MdLock } from 'react-icons/md'
import { Button } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DevTool } from '@hookform/devtools'
import { z } from 'zod'

import { Checkbox, Input } from '@/components/atoms'

const UserLoginFormSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  remember_me: z.boolean(),
})

type UserLoginFormDataType = z.infer<typeof UserLoginFormSchema>
interface UserLoginFormProps {
  onSubmit: (formData: {}) => void
}

export const UserLoginForm = ({ onSubmit }: UserLoginFormProps) => {
  const { formState, control, handleSubmit } = useForm<UserLoginFormDataType>({
    resolver: zodResolver(UserLoginFormSchema),
    defaultValues: {
      remember_me: false,
    },
  })

  return (
    <Fragment>
      <DevTool control={control} />
      <form
        onSubmit={handleSubmit(
          (credential) => {
            onSubmit(processFormData(credential))
          },
          (error) => {
            console.log(error)
          },
        )}
        className="flex flex-col gap-2"
      >
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <Input
              type="text"
              placeholder="email"
              disabled={formState.isSubmitting}
              label="Email"
              leftIcon={<MdEmail />}
              onChange={(e) => onChange(e.target.value)}
              value={value}
              name={name}
              required
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <Input
              type="password"
              placeholder="password"
              disabled={formState.isSubmitting}
              onChange={(e) => onChange(e.target.value)}
              value={value}
              label="Password"
              leftIcon={<MdLock />}
              name={name}
              error={error?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="remember_me"
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <Checkbox
              isChecked={value}
              onClick={() => onChange(!value)}
              label={'RememberMe'}
            />
          )}
        />
        <Button
          disabled={formState.isSubmitting}
          className="hover:text-border-brown-800 bg-brown-800 text-base text-brown-200 hover:bg-brown-200"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          {'Login'}
        </Button>
      </form>
    </Fragment>
  )
}

export const processFormData = (formData: UserLoginFormDataType): {} => {
  const { email, password, remember_me: rememberMe } = formData
  return {
    email,
    password,
    rememberMe,
  }
}
