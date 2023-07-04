import PaperBase from '@mui/material/Paper'

type PaperBaseType = typeof PaperBase

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PaperProps extends PaperBaseType {}

export const Paper = (props: PaperProps) => {
  return <PaperBase {...props} elevation={4} />
}
