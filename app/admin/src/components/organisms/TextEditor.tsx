import ReactQuill, { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import CSS from './TextEditor.module.css'

interface TextEditorProps extends ReactQuillProps {
  onChange?: (value: string) => void
}

export const TextEditor = ({
  onChange = () => {},
  ...restProps
}: TextEditorProps) => {
  return (
    <ReactQuill
      className={CSS.text_editor}
      theme="snow"
      onChange={(value, _, source) => {
        if (source === 'user') {
          onChange(value)
        }
      }}
      {...restProps}
    />
  )
}
