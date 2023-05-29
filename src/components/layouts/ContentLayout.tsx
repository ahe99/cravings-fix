import { PropsWithChildren } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import BreadcrumbsBase from '@mui/material/Breadcrumbs'

import CSS from './ContentLayout.module.css'

const ContentBreadcrumbs = () => {
  const { pathname } = useLocation()
  const routes = pathname.split('/')
  const filterRoutes = routes.filter((_, index) => index !== 0)

  return (
    <BreadcrumbsBase className={CSS.breadcrumbs}>
      <Link className={CSS.breadcrumb_link} to="/">
        Home
      </Link>

      {filterRoutes.map((route, index) =>
        index === filterRoutes.length - 1 ? (
          <span key={route} className={CSS.breadcrumb_link_disabled}>
            {getPageTitleByPath(route)}
          </span>
        ) : (
          <Link className={CSS.breadcrumb_link} to={route} key={route}>
            {getPageTitleByPath(route)}
          </Link>
        ),
      )}
    </BreadcrumbsBase>
  )
}

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
  return (
    <main className={CSS.main}>
      <ContentBreadcrumbs />
      {children}
    </main>
  )
}

const getPageTitleByPath = (currentPath = '') => {
  const mapping = {
    dashboard: 'Dashboard',
    customers: 'Customers',
    orders: 'Oders',
    products: 'Products',
    admins: 'Admins',
  }

  const pageTitle = mapping[currentPath as keyof typeof mapping]

  return typeof pageTitle === 'string' ? pageTitle : currentPath
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
