import { useMemo } from 'react'
import { Button } from '@mui/material'
import { MdAdd } from 'react-icons/md'

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
          variant="contained"
          className={CSS.add_button}
          endIcon={<MdAdd />}
        >
          New
        </Button>
      </div>

      <UsersTable users={usersData} />
    </div>
  )
}
