import WaitlistPage from './pages/WaitlistPage'
import OperatorPage from './pages/OperatorPage'

export default function App() {
  const path = window.location.pathname
  if (path === '/operators') return <OperatorPage />
  return <WaitlistPage />
}
