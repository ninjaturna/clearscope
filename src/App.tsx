import WaitlistPage from './pages/WaitlistPage'
import OperatorPage from './pages/OperatorPage'
import BlogArticlePage from './pages/BlogArticlePage'

export default function App() {
  const path = window.location.pathname
  if (path === '/operators') return <OperatorPage />
  if (path.startsWith('/blog/')) return <BlogArticlePage />
  return <WaitlistPage />
}
