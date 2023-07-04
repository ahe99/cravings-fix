import { MdSearch } from 'react-icons/md'
import { Box, Select } from '@chakra-ui/react'

import { Checkbox, Input } from '@/components/atoms'
import { Category } from '@/utils/Category'

export const SORT_BASE_OPTIONS = [
  'ASCEND_CREATE_TIME',
  'DESCEND_CREATE_TIME',
  'ASCEND_PRICE',
  'DESCEND_PRICE',
] as const

export type SortBaseType = (typeof SORT_BASE_OPTIONS)[number] | null

interface ProductFilterProps {
  categoryOptions?: Category[]
  selectedOptions?: Category[]
  onChangeSearchText?: (newSearchText: string) => void
  onSelectCategory?: (selectedCategory: Category) => void
  onSelectAllCategory?: () => void
  onChangeSortBase?: (newSortBase: SortBaseType) => void
}

export const ProductFilter = ({
  categoryOptions = [],
  selectedOptions = [],
  onChangeSearchText = () => {},
  onSelectCategory = () => {},
  onSelectAllCategory = () => {},
  onChangeSortBase = () => {},
}: ProductFilterProps) => {
  return (
    <Box className="flex w-full flex-col">
      <Box className="mb-2 flex flex-col items-end justify-between border-b-2 border-brown-800 pb-2 md:flex-row">
        <Box className="flex flex-row flex-wrap gap-2 ">
          <Checkbox
            label="All"
            isChecked={categoryOptions.length === selectedOptions.length}
            onClick={onSelectAllCategory}
          />
          {categoryOptions.map((category) => (
            <Checkbox
              key={category.objectId}
              label={category.name}
              isChecked={selectedOptions.includes(category)}
              onClick={() => onSelectCategory(category)}
            />
          ))}
        </Box>
        <Box className="flex flex-shrink-0 flex-row items-center justify-between">
          <Input
            leftIcon={<MdSearch />}
            onChange={(e) => onChangeSearchText(e.target.value)}
            type="text"
          />
        </Box>
      </Box>
      <Box className="w-max self-end">
        <Select
          variant="outline"
          size="md"
          className="rounded-md border-2 border-brown-600 focus:border-4 focus:border-brown-900"
          onChange={(e) => onChangeSortBase(e.target.value as SortBaseType)}
          placeholder="sort by"
        >
          {SORT_BASE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  )
}
