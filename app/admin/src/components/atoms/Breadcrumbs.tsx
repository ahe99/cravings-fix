import { useLocation, Link } from 'react-router-dom'

import BreadcrumbsBase from '@mui/material/Breadcrumbs'

import CSS from './Breadcrumbs.module.css'

const getPageTitleByPath = (currentPath = '') => {
  const mapping = {
    dashboard: 'Dashboard',
    customers: 'Customers',
    orders: 'Orders',
    products: 'Products',
    admins: 'Admins',
  }

  const pageTitle = mapping[currentPath as keyof typeof mapping]

  return typeof pageTitle === 'string' ? pageTitle : currentPath
}

export const Breadcrumbs = () => {
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
