import { Menu, MenuProps } from 'antd'
import {
  HomeOutlined,
  BarChartOutlined,
  BarsOutlined,
  PieChartOutlined,
  FundOutlined,
  UserOutlined,
  ProfileOutlined,
  NotificationOutlined,
  PictureOutlined,
  TagsOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'

import CSS from './MainMenu.module.css'

type MenuItem = Required<MenuProps>['items'][number]
type GetItem = (item: {
  label: React.ReactNode
  key: React.Key
  icon?: React.ReactNode
  children?: MenuItem[]
  type?: 'group'
}) => MenuItem

const getItem: GetItem = ({ label, key, icon, children, type }) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const MAIN_ROUTES: MenuProps['items'] = [
  getItem({
    label: 'Dashboard',
    key: '/dashboard',
    icon: <FundOutlined />,
  }),
  getItem({
    label: 'Categories',
    key: '/categories',
    icon: <TagsOutlined />,
  }),
  getItem({
    label: 'Products',
    key: '/products',
    icon: <ShoppingOutlined />,
  }),
  getItem({
    label: 'Orders',
    key: '/orders',
    icon: <ProfileOutlined />,
  }),
  getItem({
    label: 'Banners',
    key: '/banners',
    icon: <PictureOutlined />,
  }),
  getItem({
    label: 'News',
    key: '/news',
    icon: <NotificationOutlined />,
  }),
  getItem({
    label: 'Users',
    key: '/users',
    icon: <UserOutlined />,
  }),
]

export const MainMenu = ({
  onClick = () => {},
}: {
  onClick: (key: string) => void
}) => {
  return (
    <Menu
      onClick={(e) => onClick(e.key)}
      style={{ width: '100%', border: 0 }}
      defaultSelectedKeys={['dashboard']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      className={CSS.main_menu}
      items={MAIN_ROUTES}
    />
  )
}
