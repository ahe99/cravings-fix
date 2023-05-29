import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RedirectRoute = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/dashboard')
  }, [])

  return (
    <div>
      <div>fallback</div>
    </div>
  )
}
RedirectRoute.layouts = 'default'
RedirectRoute.displayName = 'RedirectRoute'
export default RedirectRoute
