export type Override<T, O extends { [F in keyof Partial<T>]: unknown }> = Omit<
  T,
  keyof O
> &
  O
