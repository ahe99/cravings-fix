import { Button, Form, Input, Select } from 'antd'
import { MailOutlined } from '@ant-design/icons'

import { APIRequestCreateProduct, APIRequestEditProduct } from '@/hooks'
import { Category } from '@/models/Category'

import CSS from './ProductForm.module.css'

type FieldType = {
  Create: APIRequestCreateProduct
  Edit: APIRequestEditProduct
}

interface ProductFormProps {
  Create: {
    categoryOptions?: Category[]
    onSubmit: (formData: FieldType['Create']) => void
    onSubmitFailed?: (errorInfo: unknown) => void
  }
  Edit: {
    initialValues: FieldType['Edit']
    categoryOptions?: Category[]
    onSubmit: (formData: FieldType['Edit']) => void
    onSubmitFailed?: (errorInfo: unknown) => void
  }
}

export const ProductForm = {
  Create: ({
    categoryOptions = [],
    onSubmit,
    onSubmitFailed = () => {},
  }: ProductFormProps['Create']) => (
    <Form
      name="basic"
      className={CSS.product_form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      size="large"
      onFinish={onSubmit}
      onFinishFailed={onSubmitFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType['Create']>
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input addonBefore={<MailOutlined />} />
      </Form.Item>

      <Form.Item<FieldType['Create']>
        label="Category"
        name={['category', '_id']}
      >
        <Select>
          {categoryOptions.map(({ _id, name }) => (
            <Select.Option value={_id}>{name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item<FieldType['Create']> label="Price" name="price">
        <Input />
      </Form.Item>

      <Form.Item<FieldType['Create']>
        label="Stock Quantity"
        name="stockQuantity"
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType['Create']> label="Description" name="description">
        <Input.TextArea className={CSS.description} showCount />
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
    categoryOptions = [],
    onSubmit,
    onSubmitFailed = () => {},
  }: ProductFormProps['Edit']) => (
    <Form
      name="basic"
      className={CSS.product_form}
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
      <Form.Item<FieldType['Edit']>
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input addonBefore={<MailOutlined />} />
      </Form.Item>

      <Form.Item<FieldType['Edit']> label="Category" name={['category', '_id']}>
        <Select>
          {categoryOptions.map(({ _id, name }) => (
            <Select.Option value={_id}>{name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item<FieldType['Edit']> label="Price" name="price">
        <Input />
      </Form.Item>

      <Form.Item<FieldType['Edit']> label="Stock Quantity" name="stockQuantity">
        <Input />
      </Form.Item>

      <Form.Item<FieldType['Edit']> label="Description" name="description">
        <Input.TextArea className={CSS.description} showCount />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  ),
}
