import { useParams } from 'react-router-dom'

import { NewsEditPage } from '@/components/pages'

const NewsEditRoute = () => {
  const { newsId = '' } = useParams()
  return <NewsEditPage newsId={newsId} />
}
NewsEditRoute.layouts = 'content'
NewsEditRoute.displayName = 'NewsEditRoute'
export default NewsEditRoute
