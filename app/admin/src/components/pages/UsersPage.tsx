import { useMemo, useState, Key } from 'react'
import { Button, Card } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import {
  useUsers,
  useRightDrawer,
  useMessage,
  APIRequestCreateUser,
  APIRequestEditUser,
} from '@/hooks'
import { User } from '@/models/User'
import { exceptionHandler } from '@/helpers/exceptionHandler'

import { UsersTable, UserForm } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './UsersPage.module.css'

export const UsersPage = () => {
  const { RightDrawer, actions } = useRightDrawer()
  const { message } = useMessage()
  const users = useUsers()

  const [clickedUser, setClickedUser] = useState<User | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<User['_id'][]>([])
  const usersData = useMemo(() => users.query.data ?? [], [users.query.data])

  const onCreateItem = () => {
    actions.open()
  }

  const onClickUserItem = (category: User) => {
    setClickedUser(category)
    actions.open()
  }

  const onCloseDrawer = () => {
    actions.close()
    setClickedUser(null)
  }

  const onSubmit = {
    create: async (formValues: APIRequestCreateUser) => {
      message.loading('In Progress...')
      try {
        await users.create.mutateAsync(formValues)
        message.success('Users Created!')

        actions.close()
      } catch (e) {
        message.error(exceptionHandler(e))
      }
    },
    edit: async (formValues: APIRequestEditUser) => {
      message.loading('In Progress...')
      try {
        await users.update.mutateAsync(formValues)
        message.success('Users Updated!')

        actions.close()
        setClickedUser(null)
      } catch (e) {
        message.error(exceptionHandler(e))
      }
    },
  }

  const onSelectItem = (selectedUsers: Key[]) => {
    setSelectedUsers(selectedUsers as User['_id'][])
  }

  const onDeleteItems = async () => {
    message.loading('In Progress...')
    try {
      for (const selectedUserKey of selectedUsers) {
        await users.delete.mutateAsync(selectedUserKey)
      }
      const isMultipleItemsDeleted = selectedUsers.length > 1
      message.success(
        isMultipleItemsDeleted ? 'Users Deleted!' : 'User Deleted!',
      )
      setSelectedUsers([])
    } catch (e) {
      message.error(exceptionHandler(e))
    }
  }
  return (
    <div className={CSS.users_page}>
      <div className={CSS.header}>
        <Breadcrumbs />
        <Button
          type="primary"
          className={CSS.add_button}
          icon={<PlusOutlined />}
          onClick={onCreateItem}
        >
          NEW
        </Button>

        {selectedUsers.length !== 0 && (
          <Button
            type="dashed"
            danger
            className={CSS.delete_button}
            icon={<DeleteOutlined />}
            onClick={onDeleteItems}
          >
            DELETE
          </Button>
        )}
      </div>
      <Card>
        <UsersTable
          users={usersData}
          onClickItem={onClickUserItem}
          onSelectItem={onSelectItem}
        />
      </Card>

      <RightDrawer
        onClose={onCloseDrawer}
        className={CSS.right_drawer}
        bodyStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card title={clickedUser !== null ? 'Edit a User' : 'Create a User'}>
          {clickedUser !== null ? (
            <UserForm.Edit
              initialValues={clickedUser}
              onSubmit={onSubmit.edit}
            />
          ) : (
            <UserForm.Create onSubmit={onSubmit.create} />
          )}
        </Card>
      </RightDrawer>
    </div>
  )
}
