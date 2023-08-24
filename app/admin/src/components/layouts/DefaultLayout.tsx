import { PropsWithChildren, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useAuth } from '@/hooks'

import CSS from './DefaultLayout.module.css'

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }, [isLoggedIn])

  return (
    <motion.div
      key={pathname}
      className={CSS.default_layout}
      initial={{ scale: 0.8, opacity: 0.2 }}
      whileInView={{ scale: 1, opacity: 1 }}
      exit={{
        scale: 1,
        opacity: 1,
      }}
      transition={{ ease: 'easeInOut' }}
    >
      <DefaultAside />
      <DefaultBody>{children}</DefaultBody>
    </motion.div>
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
