import { API, SERVER } from '@/utils/API'
import { Product } from '@/utils/Product'
import { Banner } from '@/utils/Banner'
import { Category } from '@/utils/Category'

import { OverviewPage } from '@/components/pages'

const getProducts = () => SERVER.request<Product[]>(API.routes.products.list)

const getBanners = () => SERVER.request<Banner[]>(API.routes.banners.list)

const getCategories = () =>
  SERVER.request<Category[]>(API.routes.categories.list)

export default async function overview() {
  const prefetchProducts = await getProducts()
  const prefetchBanners = await getBanners()
  const prefetchCategories = await getCategories()

  return (
    <OverviewPage
      prefetchProducts={prefetchProducts}
      prefetchBanners={prefetchBanners}
      prefetchCategories={prefetchCategories}
    />
  )
}
