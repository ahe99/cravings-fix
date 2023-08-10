const DEFAULT_DELAY_TIME = 200

type Debounce = <T extends any[]>(
  fn: (...args: T) => unknown,
  delay?: number,
) => (...args: T) => unknown

const debounce: Debounce = (fn = () => {}, delay = DEFAULT_DELAY_TIME) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => fn(...args), delay)
  }
}

export default debounce
