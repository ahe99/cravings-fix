'use client'

import React, { Fragment, useMemo } from 'react'
import {
  Box,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { MdShoppingCart, MdPerson } from 'react-icons/md'
import Link from 'next/link'

import { useAuth } from '@/hooks'

import { MainMenu } from './MainMenu'

export const Header = () => {
  const { logout, isLoggedIn, userQuery } = useAuth()

  const ProfileMenuButton = useMemo(() => {
    if (isLoggedIn) {
      return (
        <Menu>
          <MenuButton
            as={IconButton}
            color="brown.800"
            colorScheme="brown"
            bg=""
            _hover={{ bg: 'brown.100' }}
            aria-label="Profile"
            icon={<MdPerson className="text-4xl" />}
            onClick={() => {
              console.log('click')
            }}
          />
          <MenuList>
            <MenuItem className="font-bold text-brown-800 hover:bg-brown-100">
              <Link className="h-full w-full" href="/my-profile">
                Profile
              </Link>
            </MenuItem>
            <MenuItem className="font-bold text-brown-800 hover:bg-brown-100">
              <Link className="h-full w-full" href="/orders">
                History Orders
              </Link>
            </MenuItem>
            <MenuItem
              className="h-full w-full font-bold text-red-400 hover:bg-red-100"
              onClick={logout}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      )
    } else {
      return (
        <IconButton
          aria-label="shopping cart"
          color="brown.800"
          colorScheme="brown"
          bg=""
          _hover={{ bg: 'brown.100' }}
          icon={
            <Link href="/login">
              <MdPerson className="text-4xl" />
            </Link>
          }
        />
      )
    }
  }, [isLoggedIn])

  return (
    <Fragment>
      <header className="header-container">
        <Box className="header-content">
          <MainMenu.Portrait />

          <MainMenu.Lanscape />
          <Box className={`flex flex-row items-center gap-4`}>
            {isLoggedIn && (
              <Box
                h="full"
                color="brown.800"
                fontSize="xl"
                className="sm:block hidden"
              >
                {` ${userQuery.data?.username ?? ''}, welcome!`}
              </Box>
            )}
            {ProfileMenuButton}
            <IconButton
              aria-label="shopping cart"
              color="brown.800"
              colorScheme="brown"
              bg=""
              _hover={{ bg: 'brown.100' }}
              icon={
                <Link href="/cart">
                  <MdShoppingCart className="text-4xl" />
                </Link>
              }
            />
          </Box>
        </Box>
      </header>
      <div className="h-16 w-full" />
    </Fragment>
  )
}
