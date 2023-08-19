import { Button, Upload, UploadProps } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import CSS from './BannerForm.module.css'

const { Dragger } = Upload
interface BannerFormProps {
  onSubmit: (formData: FormData) => void
  onSubmitFailed?: (errorInfo: unknown) => void
}

export const BannerForm = ({ onSubmit }: BannerFormProps) => {
  const onUpload: UploadProps['customRequest'] = (info) => {
    const form = new FormData()
    form.append('images', info.file)
    onSubmit(form)
  }

  return (
    <Dragger
      name="file"
      accept="image/webp"
      listType="picture"
      customRequest={onUpload}
      multiple={true}
    >
      <div className={CSS.banner_form}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </div>
    </Dragger>
  )
}
