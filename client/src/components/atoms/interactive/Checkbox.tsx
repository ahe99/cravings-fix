interface CheckboxProps {
  label?: string
  onClick?: () => void
  isChecked: boolean
}
export const Checkbox = ({
  label,
  onClick = () => {},
  isChecked,
}: CheckboxProps) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <div
        className={`h-4 w-4 rounded-sm border-2 border-brown-800 hover:cursor-pointer ${
          isChecked ? 'bg-brown-200' : 'bg-transparent'
        }`}
        onClick={onClick}
      />
      <div>{label}</div>
    </div>
  )
}
