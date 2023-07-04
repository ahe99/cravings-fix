'use client'
import React, { Fragment } from 'react'
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

import { MainMenu } from './MainMenu'

export const Header = () => {
  return (
    <Fragment>
      <header className="header-container">
        <Box className="header-content">
          <MainMenu.Portrait />

          <MainMenu.Lanscape />
          <Box className="grid grid-cols-2 gap-4">
            <IconButton
              aria-label="shopping cart"
              color="brown.800"
              colorScheme="brown"
              bg=""
              _hover={{ bg: 'brown.100' }}
              icon={
                <Link href="cart">
                  <MdShoppingCart className="text-4xl" />
                </Link>
              }
            />
            <Menu>
              <MenuButton
                as={IconButton}
                color="brown.800"
                colorScheme="brown"
                bg=""
                _hover={{ bg: 'brown.100' }}
                aria-label="Profile"
                icon={<MdPerson className="text-4xl" />}
              />
              <ProfileMenu.Auth />
            </Menu>
          </Box>
        </Box>
      </header>
      <div className="h-20 w-full" />
    </Fragment>
  )
}

const ProfileMenu = {
  Auth: () => (
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
        onClick={() => console.log('logout')}
      >
        Logout
      </MenuItem>
    </MenuList>
  ),
  Default: () => (
    <MenuList>
      <MenuItem className="font-bold text-brown-800 hover:bg-brown-100">
        <Link href="/login">Login</Link>
      </MenuItem>
      <MenuItem className="font-bold text-brown-800 hover:bg-brown-100">
        <Link href="/register">Register</Link>
      </MenuItem>
    </MenuList>
  ),
}
