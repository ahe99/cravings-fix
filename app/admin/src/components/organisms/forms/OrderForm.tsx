import { Button, Form, Input } from 'antd'
import { EditOutlined, MoneyCollectOutlined } from '@ant-design/icons'

import { APIRequestEditOrder } from '@/hooks'

import CSS from './OrderForm.module.css'

type FieldType = {
  Edit: APIRequestEditOrder
}

interface OrderFormProps {
  Edit: {
    initialValues: FieldType['Edit']
    onSubmit: (formValues: FieldType['Edit']) => void
    onSubmitFailed?: (errorInfo: unknown) => void
  }
}

export const OrderForm = {
  Edit: ({
    initialValues,
    onSubmit,
    onSubmitFailed = () => {},
  }: OrderFormProps['Edit']) => (
    <Form
      name="basic"
      title="Edit a Order"
      className={CSS.order_form}
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
      <Form.Item<FieldType['Edit']> label="Buyer" name={['user', 'username']}>
        <Input addonBefore={<EditOutlined />} disabled />
      </Form.Item>

      <Form.Item label="Items">
        {initialValues.orderItems.map(
          ({ _id, quantity, price, food: { name } }) => {
            return (
              <div key={_id} className={CSS.order_item}>
                <div>{name}</div>
                <div>x{quantity}</div>
                <div>Price: {price}</div>
              </div>
            )
          },
        )}
      </Form.Item>

      <Form.Item<FieldType['Edit']> label="TotalPrice" name="totalPrice">
        <Input addonBefore={<MoneyCollectOutlined />} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  ),
}
