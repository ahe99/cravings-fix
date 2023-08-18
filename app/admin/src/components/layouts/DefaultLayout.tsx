import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'

import CSS from './DefaultLayout.module.css'

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }, [isLoggedIn])

  return (
    <div className={CSS.default_layout}>
      <DefaultAside />
      <DefaultBody>{children}</DefaultBody>
    </div>
  )
}

const DefaultAside = () => {
  return (
    <div className={CSS.aside}>
      <div className={CSS.banner_container}>
        <div className={CSS.banner_left_top}>
          <div>
            <div>Discover</div>
            <div>Asian</div>
            <div>Flavors</div>
          </div>
        </div>

        <div className={CSS.banner_right_bottom}>
          <div>
            <div>Satisfying</div>
            <div>Your</div>
            <div>Cravings</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DefaultBody = ({ children }: PropsWithChildren) => {
  return <div className={CSS.body}>{children}</div>
}
