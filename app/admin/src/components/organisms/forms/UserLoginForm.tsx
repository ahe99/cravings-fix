import { Button, Checkbox, Form, Input } from 'antd'

import { APIRequestUserLogin } from '@/hooks/useAuth'

import CSS from './UserLoginForm.module.css'

type FieldType = APIRequestUserLogin

interface UserLoginFormProps {
  onSubmit: (formData: FieldType) => void
  onSubmitFailed?: (errorInfo: unknown) => void
}
export const UserLoginForm = ({
  onSubmit,
  onSubmitFailed = () => {},
}: UserLoginFormProps) => (
  <Form
    name="basic"
    className={CSS.user_login_form}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    size="large"
    initialValues={{ rememberMe: true }}
    onFinish={onSubmit}
    onFinishFailed={onSubmitFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType> name="rememberMe" valuePropName="checked">
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>
  </Form>
)
