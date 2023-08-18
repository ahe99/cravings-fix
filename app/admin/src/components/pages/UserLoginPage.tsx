import { Card } from 'antd'

import { UserLoginForm } from '@/components/organisms'

import { useAuth } from '@/hooks/useAuth'

import CSS from './UserLoginPage.module.css'

export const UserLoginPage = () => {
  const { login } = useAuth()

  return (
    <div className={CSS.login_page}>
      <img className={CSS.logo} src="/logo.png" />

      <Card>
        <UserLoginForm onSubmit={login} />
      </Card>
    </div>
  )
}
