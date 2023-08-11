import { useMemo } from 'react'
import { Button } from '@mui/material'
import { MdAdd } from 'react-icons/md'

import { useBanners } from '@/hooks'
import { BannersTable } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './BannersPage.module.css'

export const BannersPage = () => {
  const banners = useBanners()

  const bannersData = useMemo(() => banners.query.data ?? [], [banners.query.data])

  return (
    <div className={CSS.banners_page}>
      <div className={CSS.header}>
        <Breadcrumbs />
        <Button
          variant="contained"
          className={CSS.add_button}
          endIcon={<MdAdd />}
        >
          New
        </Button>
      </div>

      <BannersTable banners={bannersData} />
    </div>
  )
}
