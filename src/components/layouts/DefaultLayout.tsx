import { PropsWithChildren } from 'react'

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div>
        <DefaultBody>{children}</DefaultBody>
      </div>
    </div>
  )
}

const DefaultBody = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>
}
