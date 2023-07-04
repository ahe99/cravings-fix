import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import { Input } from '../../atoms'

export const QuantitySelector = ({
  value = 1,
  maxValue = 9999,
  minValue = 0,
  onChange = () => {},
}: {
  value?: number
  maxValue?: number
  minValue?: number
  onChange?: (newValue: number) => void
}) => {
  const addQuantity = () => {
    onChange(value < maxValue ? value + 1 : value)
  }
  const minusQuantity = () => {
    onChange(value > minValue ? value - 1 : value)
  }

  const handleDirectlyInput = (newValue: number) => {
    if (newValue < minValue) {
      onChange(minValue)
    } else if (newValue > maxValue) {
      onChange(maxValue)
    } else {
      onChange(value)
    }
  }

  return (
    <Input
      variant="outline"
      className="border-2"
      value={value}
      onChange={(e) => handleDirectlyInput(Number(e.target.value))}
      leftIcon={
        <MdKeyboardArrowLeft
          onClick={minusQuantity}
          className="cursor-pointer text-2xl"
        />
      }
      rightIcon={
        <MdKeyboardArrowRight
          onClick={addQuantity}
          className="cursor-pointer text-2xl"
        />
      }
      type="number"
    />
  )
}
