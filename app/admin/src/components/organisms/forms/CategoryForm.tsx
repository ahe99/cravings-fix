import { Button, Form, Input } from 'antd'
import { EditOutlined, ProfileOutlined } from '@ant-design/icons'

import { APIRequestCreateCategory, APIRequestEditCategory } from '@/hooks'

import CSS from './CategoryForm.module.css'

type FieldType = {
  Create: APIRequestCreateCategory
  Edit: APIRequestEditCategory
}

interface CategoryFormProps {
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

export const CategoryForm = {
  Create: ({
    initialValues,
    onSubmit,
    onSubmitFailed = () => {},
  }: CategoryFormProps['Create']) => (
    <Form
      name="basic"
      title="Create a Category"
      className={CSS.user_login_form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      size="large"
      initialValues={initialValues}
      onFinish={onSubmit}
      onFinishFailed={onSubmitFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType['Create']>
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the Name!' }]}
      >
        <Input addonBefore={<EditOutlined />} />
      </Form.Item>

      <Form.Item<FieldType['Create']> label="Description" name="description">
        <Input.TextArea />
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
  }: CategoryFormProps['Edit']) => (
    <Form
      name="basic"
      title="Edit a Category"
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
      <Form.Item<FieldType['Edit']> label="Name" name="name">
        <Input addonBefore={<EditOutlined />} />
      </Form.Item>

      <Form.Item<FieldType['Edit']> label="Description" name="description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  ),
}
