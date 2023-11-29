import { MdSearch } from 'react-icons/md'
import { Box, Select } from '@chakra-ui/react'

import { Checkbox, Input } from '@/components/atoms'
import { Category } from '@/models/Category'

export const SORT_BASE_OPTIONS = [
  { label: 'Date (Aesc)', value: 'ASCEND_CREATE_TIME' },
  { label: 'Date (Desc)', value: 'DESCEND_CREATE_TIME' },
  { label: 'Price (Aesc)', value: 'ASCEND_PRICE' },
  { label: 'Price (Aesc)', value: 'DESCEND_PRICE' },
] as const

export type SortBaseType = (typeof SORT_BASE_OPTIONS)[number]['value'] | null

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
      <Box className="mb-2 flex flex-col items-start justify-between gap-2 border-b-2 border-brown-800 pb-2 sm:flex-row sm:items-center">
        <Box className="flex flex-row flex-wrap gap-2 ">
          <Checkbox
            label="All"
            isChecked={categoryOptions.length === selectedOptions.length}
            onClick={onSelectAllCategory}
          />
          {categoryOptions.map((category) => (
            <Checkbox
              key={category._id}
              label={category.name}
              isChecked={selectedOptions.includes(category)}
              onClick={() => onSelectCategory(category)}
            />
          ))}
        </Box>
        <Box className="flex flex-col items-center gap-2 self-end sm:self-auto">
          <Input
            rightIcon={<MdSearch />}
            variant="outline"
            size="md"
            onChange={(e) => onChangeSearchText(e.target.value)}
            type="text"
          />
          <Select
            variant="outline"
            size="md"
            className="rounded-md border-2 border-brown-600 focus:border-4 focus:border-brown-900"
            onChange={(e) => onChangeSortBase(e.target.value as SortBaseType)}
            placeholder="sort by"
          >
            {SORT_BASE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
    </Box>
  )
}
