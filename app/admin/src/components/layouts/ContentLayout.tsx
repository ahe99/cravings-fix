import { useState, PropsWithChildren } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

import { useAuth } from '@/hooks'

import { MainMenu } from '@/components/template'

import CSS from './ContentLayout.module.css'

const { Header, Sider, Content } = Layout

export const ContentLayout = ({ children }: PropsWithChildren) => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

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
          <div className={CSS.left}>
            <Button
              icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              onClick={menuAction.toggle}
              size="large"
            />
            <img className={CSS.logo} src="/logo.png" />
            <span className={CSS.divider} />

            <span className={CSS.title}>Admin</span>
          </div>

          <div className={CSS.right}>
            <Button onClick={logout} type="link" size="large" danger>
              LOGOUT
            </Button>
          </div>
        </Header>
        <Content className={CSS.content}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 1,
              y: 0,
            }}
            transition={{ ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  )
}
