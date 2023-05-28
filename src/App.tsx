import { Fragment, PropsWithChildren } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { ROOT_ROUTES } from './routes'
import RedirectRoute from './routes/page'
import { DefaultLayout, ContentLayout, NoLayout } from '@/components/layouts'

import './App.css'

const APP_LAYOUTS = {
  default: DefaultLayout,
  content: ContentLayout,
  none: NoLayout,
} as const
export type AppLayout = keyof typeof APP_LAYOUTS

const queryClient = new QueryClient()
const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
const LayoutComponent = ({
  layout = 'default',
  children,
}: PropsWithChildren<{ layout: AppLayout }>) => {
  const APPLayout = APP_LAYOUTS[layout]
  return <APPLayout>{children}</APPLayout>
}
const RouteContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ROOT_ROUTES.map(({ path, component: Component = Fragment }) => (
          <Route
            key={path}
            path={path}
            element={
              <LayoutComponent layout={Component.layouts}>
                <Component />
              </LayoutComponent>
            }
          />
        ))}
        {/* default route */}
        <Route path="*" element={<RedirectRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

const AppContent = () => {
  return (
    <QueryProvider>
      <RouteContent />
    </QueryProvider>
  )
}

function App() {
  return <AppContent />
}

export default App
