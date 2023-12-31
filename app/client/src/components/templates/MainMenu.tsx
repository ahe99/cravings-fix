'use client'
import { useRef } from 'react'
import Link from 'next/link'
import {
  Box,
  IconButton,
  useDisclosure,
  DrawerBody,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Button,
} from '@chakra-ui/react'
import { MdMenu } from 'react-icons/md'
import { useRouter } from 'next/navigation'

import { Logo } from '@/components/atoms'
import { useAuth, useToast } from '@/hooks'

const ROUTES = [
  {
    id: 'news',
    name: 'NEWS',
    route: '/news',
  },
  {
    id: 'products',
    name: 'PRODUCTS',
    route: '/products',
  },
  {
    id: 'aboutUs',
    name: 'ABOUT US',
    route: '/about',
  },
]

const MenuPortrait = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth()
  const { toast } = useToast()

  const btnRef = useRef<any>(null)

  const handleLogin = async () => {
    router.push('/login')
    onClose()
  }

  const handleLogout = () => {
    router.push('/')
    logout()
    onClose()
    toast.success({ title: 'Logout Successfully!' })
  }

  return (
    <Box className="flex h-full flex-row items-center gap-2 lg:hidden">
      <IconButton
        aria-label="menu"
        ref={btnRef}
        color="brown.800"
        colorScheme="brown"
        bg=""
        _hover={{ bg: 'brown.100' }}
        icon={<MdMenu className="text-4xl" />}
        onClick={onOpen}
      />
      <Link className="cursor-pointer" href={'/'}>
        <Logo />
      </Link>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader className="border-b-4 border-dashed border-brown-800">
            <Link className="cursor-pointer" href={'/'}>
              <Logo />
            </Link>
          </DrawerHeader>

          <DrawerBody>
            <ul className="flex w-full flex-col gap-2">
              {ROUTES.map(({ id, name, route }) => (
                <NavItem
                  key={id}
                  name={name}
                  route={route}
                  className="h-full w-full rounded-md p-4 text-lg"
                  onClick={onClose}
                />
              ))}
            </ul>
          </DrawerBody>

          <DrawerFooter>
            {isLoggedIn ? (
              <Button
                className="w-full text-xl font-normal text-brown-800 duration-300 hover:bg-brown-200"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            ) : (
              <Button
                className="w-full text-xl font-normal text-brown-800 duration-300 hover:bg-brown-200"
                onClick={handleLogin}
              >
                LOGIN
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
const MenuLandscape = () => {
  return (
    <ul className="hidden h-full flex-shrink-0 flex-row items-center gap-2 lg:flex">
      <li>
        <Link className="cursor-pointer" href={'/'}>
          <Logo />
        </Link>
      </li>
      {ROUTES.map(({ id, name, route }) => (
        <NavItem
          key={id}
          name={name}
          route={route}
          className="rounded-md p-2 text-lg"
        />
      ))}
    </ul>
  )
}

const NavItem = ({
  name,
  route,
  className,
  onClick = () => {},
}: {
  name: string
  route: string
  className?: string
  onClick?: () => void
}) => {
  return (
    <li>
      <Link
        className={`${className} inline-block h-full w-full text-brown-800 duration-300 hover:cursor-pointer hover:bg-brown-100`}
        href={route}
        onClick={onClick}
      >
        {name}
      </Link>
    </li>
  )
}
export const MainMenu = {
  Portrait: MenuPortrait,
  Lanscape: MenuLandscape,
}
