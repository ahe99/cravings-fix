import { Button, Form, Input, Radio, Select } from 'antd'
import {
  EditOutlined,
  MailOutlined,
  LockOutlined,
  ProfileOutlined,
} from '@ant-design/icons'

import { APIRequestCreateUser, APIRequestEditUser } from '@/hooks'

import CSS from './UserForm.module.css'

type FieldType = {
  Create: APIRequestCreateUser
  Edit: APIRequestEditUser
}

interface UserFormProps {
  Create: {
    initialValues?: FieldType['Create']
    onSubmit: (formValues: FieldType['Create']) => void
    onSubmitFailed?: (errorInfo: unknown) => void
  }
  Edit: {
    initialValues: FieldType['Edit']
    onSubmit: (formValues: FieldType['Edit']) => void
    onSubmitFailed?: (errorInfo: unknown) => void
  }
}

export const UserForm = {
  Create: ({
    onSubmit,
    onSubmitFailed = () => {},
  }: UserFormProps['Create']) => (
    <Form
      name="basic"
      title="Create a User"
      className={CSS.user_login_form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      size="large"
      initialValues={{
        role: 'ADMIN',
      }}
      onFinish={onSubmit}
      onFinishFailed={onSubmitFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType['Create']>
        label="Name"
        name="username"
        rules={[
          { max: 20, message: "Password can't be greater than 20 charaters !" },
        ]}
      >
        <Input addonBefore={<ProfileOutlined />} />
      </Form.Item>

      <Form.Item<FieldType['Create']>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input the Name!' }]}
      >
        <Input addonBefore={<EditOutlined />} type="email" />
      </Form.Item>

      <Form.Item<FieldType['Create']>
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 4, message: "Password can't be less than 4 charaters !" },
        ]}
      >
        <Input addonBefore={<LockOutlined />} />
      </Form.Item>

      <Form.Item<FieldType['Create']>
        label="Role"
        name="role"
        rules={[{ required: true, message: 'Please input the Name!' }]}
      >
        <Select>
          <Select.Option value="ADMIN">ADMIN</Select.Option>
          <Select.Option value="CUSTOMER">CUSTOMER</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  ),
  Edit: ({
    initialValues,
    onSubmit,
    onSubmitFailed = () => {},
  }: UserFormProps['Edit']) => (
    <Form
      name="basic"
      title="Edit a User"
      className={CSS.user_login_form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      size="large"
      initialValues={initialValues}
      onFinish={(formValues) =>
        onSubmit({ ...formValues, _id: initialValues._id })
      }
      onFinishFailed={onSubmitFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType['Edit']> label="Name" name="username">
        <Input addonBefore={<EditOutlined />} />
      </Form.Item>

      <Form.Item<FieldType['Edit']> label="Email" name="email">
        <Input addonBefore={<MailOutlined />} />
      </Form.Item>

      <Form.Item<FieldType['Edit']> label="Role" name="role">
        <Select>
          <Select.Option value="ADMIN">ADMIN</Select.Option>
          <Select.Option value="CUSTOMER">CUSTOMER</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  ),
}
