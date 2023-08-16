import type { Dayjs } from 'dayjs'

type CompareKey = number | string
type SortFn = (formmer: CompareKey, latter: CompareKey) => 1 | -1
export const sortFn: SortFn = (formmer, latter) => (formmer > latter ? 1 : -1)

type DateSortFn = (formmer: Dayjs, latter: Dayjs) => 1 | -1
export const dateSortFn: DateSortFn = (formmer, latter) =>
  formmer.isAfter(latter) ? 1 : -1
