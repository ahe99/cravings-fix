import { Fragment } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DevTool } from '@hookform/devtools'
import { z } from 'zod'

import { Input } from '@/components/atoms'

const UserRegisterFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

type UserRegisterFormDataType = z.infer<typeof UserRegisterFormSchema>
interface UserRegisterFormProps {
  onSubmit: (formData: UserRegisterFormDataType) => void
}

export const UserRegisterForm = ({ onSubmit }: UserRegisterFormProps) => {
  const { formState, control, handleSubmit } =
    useForm<UserRegisterFormDataType>({
      resolver: zodResolver(UserRegisterFormSchema),
    })

  return (
    <Fragment>
      <DevTool control={control} />
      <form
        onSubmit={handleSubmit(
          (credential) => {
            onSubmit(credential)
          },
          (error) => {
            console.log(error)
          },
        )}
        className="flex flex-col gap-2"
      >
        <Controller
          control={control}
          name="username"
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <Input
              type="text"
              placeholder="username"
              disabled={formState.isSubmitting}
              label="User Name"
              leftIcon={<MdPerson />}
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
        <Button
          disabled={formState.isSubmitting}
          className="hover:text-border-brown-800 bg-brown-800 text-base text-primary-200"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          REGISTER
        </Button>
      </form>
    </Fragment>
  )
}
