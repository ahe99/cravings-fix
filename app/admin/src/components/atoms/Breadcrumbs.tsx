import { useLocation, Link } from 'react-router-dom'

import { Breadcrumb as BreadcrumbsBase } from 'antd'

import CSS from './Breadcrumbs.module.css'

const breadcrumbNameMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/categories': 'Categories',
  '/products': 'Products',
  '/orders': 'Orders',
  '/banners': 'Banners',
  '/users': 'Users',
  '/news': 'News',
}

export const Breadcrumbs = () => {
  const { pathname } = useLocation()

  const pathSnippets = pathname.split('/').filter((i) => i)

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return {
      key: url,
      title: (
        <Link className={CSS.breadcrumb_link} to={url}>
          {breadcrumbNameMap[url]}
        </Link>
      ),
    }
  })
  const breadcrumbItems = [
    {
      title: (
        <Link className={CSS.breadcrumb_link} to="/">
          Home
        </Link>
      ),
      key: 'home',
    },
  ].concat(extraBreadcrumbItems)

  return (
    <BreadcrumbsBase
      className={CSS.breadcrumbs}
      items={breadcrumbItems}
      separator={<span className={CSS.breadcrumb_separator}>/</span>}
    />
  )
}
