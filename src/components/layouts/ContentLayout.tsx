import { PropsWithChildren } from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import CSS from './ContentLayout.module.css'

export const ContentLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={CSS.content_layout}>
      <ContentHeader />
      <ContentAside />
      <ContentBody>{children}</ContentBody>
    </div>
  )
}
const ContentHeader = () => {
  return <header className={CSS.header}>header</header>
}

const ContentBody = ({ children }: PropsWithChildren) => {
  return <main className={CSS.main}>{children}</main>
}

const ContentAside = () => {
  return (
    <aside className={CSS.left_drawer}>
      <List>
        <ListItem>1</ListItem>
        <ListItem>2</ListItem>
        <ListItem>3</ListItem>
        <ListItem>4</ListItem>
      </List>
    </aside>
  )
}
