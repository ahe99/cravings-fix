import { TextEditor } from '@/components/organisms/TextEditor'
import { Button } from '@mui/material'
import { MdAdd } from 'react-icons/md'

import { Breadcrumbs } from '@/components/atoms'

import CSS from './NewsPage.module.css'

export const NewsPage = () => {
  return (
    <div className={CSS.news_page}>
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
      <TextEditor />
    </div>
  )
}
