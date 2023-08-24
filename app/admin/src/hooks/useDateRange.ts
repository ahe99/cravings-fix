import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

import { DATE_FORMAT } from '@/helpers/date'

type DateValue = Dayjs | null

const DEFAULT_DATE_RANGE: { start: DateValue; end: DateValue } = {
  start: dayjs(dayjs(), DATE_FORMAT),
  end: dayjs(dayjs(), DATE_FORMAT).subtract(7, 'days'),
}

export const useDateRange = (defaultDate = DEFAULT_DATE_RANGE) => {
  const [dateRange, setDateRange] = useState(defaultDate)
  return [dateRange, setDateRange] as const
}
