'use client'
import {
  useRef,
  CSSProperties,
  Children,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'
import { AnimatePresence, PanInfo, motion } from 'framer-motion'

const DEFUALT_AUTOPLAY_TIME = 3000
const X_OFFSET = 100

export const Carousel = ({
  children,
  initPage = 0,
  allowPan = false,
  autoPlay = false,
  autoPlayTime = DEFUALT_AUTOPLAY_TIME,
  className = '',
  style = {},
}: PropsWithChildren<{
  initPage?: number
  autoPlay?: boolean
  allowPan?: boolean
  autoPlayTime?: number
  className?: string
  style?: CSSProperties
}>) => {
  const [currentPage, setCurrentPage] = useState(initPage)
  const childrenArray = Children.toArray(children)
  const total = childrenArray.length
  const autoPlayFlag = useRef(false)

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      if (autoPlay) {
        if (autoPlayFlag.current) {
          autoPlayFlag.current = false
        } else {
          moveToNextPage()
        }
      }
    }, autoPlayTime)
    return () => {
      clearInterval(intervalTimer)
    }
  }, [])

  const handlePan = (_: unknown, { offset }: PanInfo) => {
    if (allowPan) {
      const threshold = X_OFFSET / 2

      if (offset.x < -threshold) {
        autoPlayFlag.current = true
        moveToNextPage()
      } else if (offset.x > threshold) {
        autoPlayFlag.current = true
        moverToPrevPage()
      }
    }
  }

  const moveToNextPage = () => {
    setCurrentPage((prev) => {
      if (prev < total - 1) {
        return prev + 1
      } else {
        return 0
      }
    })
  }

  const moverToPrevPage = () => {
    setCurrentPage((prev) => {
      if (prev - 1 < 0) {
        return total - 1
      } else {
        return prev - 1
      }
    })
  }

  const moverToSpecificPage = (selectedPage: number) => {
    setCurrentPage(selectedPage)
  }

  const handleClickIndicator = (selectedPage: number) => {
    autoPlayFlag.current = true

    moverToSpecificPage(selectedPage)
  }

  return (
    <div className={`relative ${className}`} style={style}>
      <AnimatePresence>
        <motion.div
          key={currentPage}
          className="absolute h-full w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ ease: 'easeInOut' }}
          onPanEnd={handlePan}
        >
          {childrenArray.map((_children, index) => (
            <div
              key={index}
              className="absolute h-full w-full"
              style={{
                left: `calc(100%*${index - currentPage})`,
              }}
            >
              {_children}
            </div>
          ))}
        </motion.div>
        <div className="absolute bottom-2 right-2 flex flex-row items-end gap-2">
          {childrenArray.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full hover:h-4 hover:w-4 hover:cursor-pointer ${
                currentPage === index ? 'bg-orange-600' : 'bg-white'
              }`}
              onClick={() => handleClickIndicator(index)}
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}
