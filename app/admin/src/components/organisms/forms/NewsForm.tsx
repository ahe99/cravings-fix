import { useState } from 'react'
import { Button, Form, Input, Select, Radio } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import { News } from '@/models/News'
import { APIRequestCreateNews, APIRequestEditNews } from '@/hooks'

import CSS from './NewsForm.module.css'
import { TextEditor } from '..'

type FieldType = {
  Create: APIRequestCreateNews
  Edit: APIRequestEditNews
}

interface NewsFormProps {
  Create: {
    onSubmit: (formValues: FieldType['Create']) => void
    onSubmitFailed?: (errorInfo: unknown) => void
  }
  Edit: {
    initialValues: FieldType['Edit']
    onSubmit: (formValues: FieldType['Edit']) => void
    onSubmitFailed?: (errorInfo: unknown) => void
  }
}

export const NewsForm = {
  Create: ({
    onSubmit,
    onSubmitFailed = () => {},
  }: NewsFormProps['Create']) => {
    const [content, setContent] = useState('')

    const handleSubmit = (values: FieldType['Create']) => {
      onSubmit({ ...values, content })
    }

    return (
      <Form
        name="basic"
        title="Create News"
        className={CSS.news_form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        size="large"
        layout="vertical"
        initialValues={{ policy: 'PRIVATE' }}
        onFinish={handleSubmit}
        onFinishFailed={onSubmitFailed}
        autoComplete="off"
      >
        <div className={CSS.info}>
          <div className={CSS.title_policy}>
            <Form.Item<FieldType['Create']>
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input addonBefore={<EditOutlined />} showCount />
            </Form.Item>
            <Form.Item<FieldType['Create']>
              label="Policy"
              name="policy"
              rules={[{ required: true, message: 'Please select the policy!' }]}
            >
              <Radio.Group>
                <Radio.Button value="PUBLIC">PUBLIC</Radio.Button>
                <Radio.Button value="PRIVATE">PRIVATE</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </div>
          <Form.Item<FieldType['Create']>
            label="Description"
            name="description"
          >
            <Input.TextArea className={CSS.description} />
          </Form.Item>
        </div>

        <TextEditor value={content} onChange={(value) => setContent(value)} />

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={CSS.submit_button}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  },
  Edit: ({
    initialValues,
    onSubmit,
    onSubmitFailed = () => {},
  }: NewsFormProps['Edit']) => {
    const [content, setContent] = useState(initialValues.content)

    const handleSubmit = (values: FieldType['Edit']) => {
      onSubmit({
        ...values,
        _id: initialValues._id,
        content,
      })
    }

    return (
      <Form
        name="basic"
        title="Edit News"
        className={CSS.news_form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        size="large"
        initialValues={initialValues}
        onFinish={handleSubmit}
        onFinishFailed={onSubmitFailed}
        autoComplete="off"
      >
        <div className={CSS.info}>
          <div className={CSS.title_policy}>
            <Form.Item<FieldType['Edit']>
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input addonBefore={<EditOutlined />} showCount />
            </Form.Item>
            <Form.Item<FieldType['Edit']>
              label="Policy"
              name="policy"
              rules={[{ required: true, message: 'Please select the policy!' }]}
            >
              <Radio.Group>
                <Radio.Button value="PUBLIC">PUBLIC</Radio.Button>
                <Radio.Button value="PRIVATE">PRIVATE</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </div>
          <Form.Item<FieldType['Edit']> label="Description" name="description">
            <Input.TextArea className={CSS.description} />
          </Form.Item>
        </div>

        <TextEditor value={content} onChange={(value) => setContent(value)} />

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={CSS.submit_button}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    )
  },
}
