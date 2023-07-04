export const FILE_ROUTES_EAGER = import.meta.glob(
  '/src/routes/**/[a-z[]*.tsx',
  {
    eager: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any
export const ROOT_ROUTES = Object.keys(FILE_ROUTES_EAGER).map((route) => {
  const path = route
    .replace(/\/src\/routes|page|\.tsx$/g, '')
    .replace(/\[\.{3}.+\]/, '*')
    .replace(/\[(.+)\]/, ':$1')
  return { path, component: FILE_ROUTES_EAGER[route].default }
})
