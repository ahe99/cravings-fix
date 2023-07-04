import React, { useMemo, useState, PropsWithChildren } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

interface PaginationProps {
  onChange?: (newPage: number) => void
  total: number
  currentPage: number
}

type PagiantionState = 'ALL' | 'HEAD' | 'TAIL' | 'MIDDLE'
const MAX_NUM = 5

const getPaginationState = ({
  total,
  currentPage,
}: {
  total: number
  currentPage: number
}): PagiantionState => {
  if (total < MAX_NUM) {
    return 'ALL'
  } else {
    if (currentPage <= 3) {
      return 'HEAD'
    } else if (currentPage >= total - 2) {
      return 'TAIL'
    } else {
      return 'MIDDLE'
    }
  }
}
const Dots = () => {
  return <div>...</div>
}
const ClickableText = ({
  children,
  onClick = () => {},
  isFoucsed,
  disabled,
}: PropsWithChildren<{
  onClick?: () => void
  isFoucsed?: boolean
  disabled?: boolean
}>) => {
  return (
    <div
      className={`rounded-md px-4 py-2 hover:cursor-pointer hover:bg-brown-400 hover:underline ${
        isFoucsed ? 'bg-brown-800 text-brown-200' : 'text-brown-800'
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export const Pagination = ({
  onChange = () => {},
  total = 1,
  currentPage = 1,
}: PaginationProps) => {
  const [paginationState, setPaginationState] = useState<PagiantionState>(
    getPaginationState({ total, currentPage: 1 }),
  )
  const handleClickIndex = (newNumber: number) => {
    setPaginationState(getPaginationState({ total, currentPage: newNumber }))
    onChange(newNumber)
  }

  const handleMoveNext = () => {
    if (currentPage === total) {
      return
    } else {
      const newNumber = currentPage + 1
      setPaginationState(getPaginationState({ total, currentPage: newNumber }))
      onChange(newNumber)
    }
  }
  const handleMovePrev = () => {
    if (currentPage === 1) {
      return
    } else {
      const newNumber = currentPage - 1
      setPaginationState(getPaginationState({ total, currentPage: newNumber }))
      onChange(newNumber)
    }
  }

  const PaginationContent = useMemo(() => {
    if (paginationState === 'ALL') {
      const numbers = new Array(total).fill('').map((_, index) => index + 1)
      return (
        <div className="flex flex-row items-center gap-2">
          {numbers.map((number) => (
            <ClickableText
              key={number}
              isFoucsed={currentPage === number}
              onClick={() => handleClickIndex(number)}
            >
              {number}
            </ClickableText>
          ))}
        </div>
      )
    } else if (paginationState === 'MIDDLE') {
      const range = [currentPage - 1, currentPage, currentPage + 1]
      return (
        <div className="flex flex-row items-center gap-2">
          <ClickableText
            isFoucsed={currentPage === 1}
            onClick={() => handleClickIndex(1)}
          >
            1
          </ClickableText>
          <Dots />
          {range.map((num) => (
            <ClickableText
              key={num}
              isFoucsed={num === currentPage}
              onClick={() => handleClickIndex(num)}
            >
              {num}
            </ClickableText>
          ))}
          <Dots />
          <ClickableText
            isFoucsed={currentPage === total}
            onClick={() => handleClickIndex(total)}
          >
            {total}
          </ClickableText>
        </div>
      )
    } else if (paginationState === 'HEAD') {
      const range = [1, 2, 3, 4]
      return (
        <div className="flex flex-row items-center gap-2">
          {range.map((num) => (
            <ClickableText
              key={num}
              isFoucsed={num === currentPage}
              onClick={() => handleClickIndex(num)}
            >
              {num}
            </ClickableText>
          ))}
          <Dots />
          <ClickableText
            isFoucsed={currentPage === total}
            onClick={() => handleClickIndex(total)}
          >
            {total}
          </ClickableText>
        </div>
      )
    } else if (paginationState === 'TAIL') {
      const range = [total - 3, total - 2, total - 1, total]
      return (
        <div className="flex flex-row items-center gap-2">
          <ClickableText
            isFoucsed={currentPage === 1}
            onClick={() => handleClickIndex(1)}
          >
            1
          </ClickableText>

          <Dots />
          {range.map((num) => (
            <ClickableText
              key={num}
              isFoucsed={num === currentPage}
              onClick={() => handleClickIndex(num)}
            >
              {num}
            </ClickableText>
          ))}
        </div>
      )
    }
  }, [paginationState, currentPage, total])

  return (
    <div className="flex flex-row items-center gap-2">
      <ClickableText onClick={handleMovePrev}>
        <MdKeyboardArrowLeft className="text-3xl" />
      </ClickableText>
      {PaginationContent}

      <ClickableText onClick={handleMoveNext}>
        <MdKeyboardArrowRight className="text-3xl" />
      </ClickableText>
    </div>
  )
}
