import { useMemo } from 'react'
import { Button, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { useUsers } from '@/hooks'
import { UsersTable } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './UsersPage.module.css'

export const UsersPage = () => {
  const users = useUsers()

  const usersData = useMemo(() => users.query.data ?? [], [users.query.data])

  return (
    <div className={CSS.users_page}>
      <div className={CSS.header}>
        <Breadcrumbs />
        <Button
          type="primary"
          className={CSS.add_button}
          icon={<PlusOutlined />}
        >
          NEW
        </Button>
      </div>
      <Card>
        <UsersTable users={usersData} />
      </Card>
    </div>
  )
}
