import { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import CSS from './ContentLayout.module.css'

export const ContentLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={CSS.content_layout}>
      <ContentHeader />
      <ContentAside />
      <ContentBody>{children}</ContentBody>
    </div>
  )
}
const ContentHeader = () => {
  return <header className={CSS.header}>Cravings Fix | Admin</header>
}

const ContentBody = ({ children }: PropsWithChildren) => {
  return <main className={CSS.main}>{children}</main>
}

const MAIN_ROUTES = [
  { name: 'Dashboard', id: 'dashboard', url: '/dashboard' },
  { name: 'Customers', id: 'customers', url: '/customers' },
  { name: 'Orders', id: 'orders', url: '/orders' },
  { name: 'Products', id: 'products', url: '/products' },
  { name: 'Admins', id: 'admins', url: '/admins' },
]

const ContentAside = () => {
  const navigate = useNavigate()
  return (
    <aside className={CSS.left_drawer}>
      <List>
        {MAIN_ROUTES.map(({ name, id, url }) => (
          <ListItem
            className={CSS.nav_item}
            key={id}
            onClick={() => navigate(url)}
          >
            {name}
          </ListItem>
        ))}
      </List>
    </aside>
  )
}
