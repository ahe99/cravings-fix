import { PropsWithChildren } from 'react'

export const ContentLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <ContentHeader />

      <div>
        <ContentBody>{children}</ContentBody>
      </div>
    </div>
  )
}
const ContentHeader = () => {
  return <div>header</div>
}

const ContentBody = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>
}
