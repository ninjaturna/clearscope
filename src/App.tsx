import WaitlistPage from './pages/WaitlistPage'
import OperatorPage from './pages/OperatorPage'
import BlogArticlePage from './pages/BlogArticlePage'
import BlogIndexPage from './pages/BlogIndexPage'
import BookingConfirmedPage from './pages/BookingConfirmedPage'

export default function App() {
  const path = window.location.pathname
  if (path === '/operators')         return <OperatorPage />
  if (path === '/blog')              return <BlogIndexPage />
  if (path.startsWith('/blog/'))     return <BlogArticlePage />
  if (path === '/booking-confirmed') return <BookingConfirmedPage />
  // Default: waitlist (also handles /waitlist)
  return <WaitlistPage />
}
