import { useState } from 'react'
import { Drawer, DrawerProps } from 'antd'

export const useRightDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)

  const drawerActions = {
    open: () => {
      setIsOpen(true)
    },
    close: () => {
      setIsOpen(false)
    },
    toggle: () => {
      setIsOpen((prev) => !prev)
    },
  }

  return {
    RightDrawer: (props: DrawerProps) => (
      <Drawer open={isOpen} placement="right" {...props} />
    ),
    actions: drawerActions,
  }
}
