import { Spin } from 'antd'

import CSS from './LoadingPage.module.css'

export const LoadingPage = () => {
  return (
    <div className={CSS.loading_page}>
      <Spin size="large" />
      <div>LOADING...</div>
    </div>
  )
}
