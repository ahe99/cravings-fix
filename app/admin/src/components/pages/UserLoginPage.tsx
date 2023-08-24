import { Card } from 'antd'

import { UserLoginForm } from '@/components/organisms'

import { APIRequestUserLogin, useAuth, useMessage } from '@/hooks'
import { exceptionHandler } from '@/helpers/exceptionHandler'

import CSS from './UserLoginPage.module.css'

export const UserLoginPage = () => {
  const { login } = useAuth()
  const { message } = useMessage()

  const handleRequestLogin = async (credential: APIRequestUserLogin) => {
    message.loading('In Progress...')
    try {
      await login(credential)
      message.success('Login Successfully!')
    } catch (e) {
      message.error(exceptionHandler(e))
    }
  }

  return (
    <div className={CSS.login_page}>
      <img className={CSS.logo} src="/logo.png" />

      <Card>
        <UserLoginForm onSubmit={handleRequestLogin} />
      </Card>
    </div>
  )
}
