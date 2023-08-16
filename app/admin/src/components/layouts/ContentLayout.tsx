import { useState, PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import { MainMenu } from '@/components/template'

import CSS from './ContentLayout.module.css'

const { Header, Sider, Content } = Layout

export const ContentLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(true)

  const onClckNavItem = (key: string) => {
    navigate(key)
  }

  const menuAction = {
    show: () => {
      setCollapsed(true)
    },
    close: () => {
      setCollapsed(false)
    },
    toggle: () => {
      setCollapsed((prev) => !prev)
    },
  }

  return (
    <Layout className={CSS.content_layout}>
      <Sider
        className={CSS.sider}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div
          style={{
            height: '4rem',
          }}
        />

        <MainMenu onClick={onClckNavItem} />
      </Sider>

      <Layout>
        <Header className={CSS.header}>
          <Button
            icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            onClick={menuAction.toggle}
            size='large'
          />
          <img className={CSS.logo} src="/logo.png" />
          <span className={CSS.divider} />

          <span className={CSS.title}>Admin</span>
        </Header>
        <Content className={CSS.content}>{children}</Content>
      </Layout>
    </Layout>
  )
}
