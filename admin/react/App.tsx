import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import LoginPage from './pages/LoginPage'
import AdminPanelPage from './pages/AdminPanelPage'
import TimelinePage from './pages/TimelinePage'
import NewBookingPage from './pages/NewBookingPage'
import BookingDetailPage from './pages/BookingDetailPage'
import BudgetPage from './pages/BudgetPage'
import ProfitLossPage from './pages/ProfitLossPage'
import PriceControlPage from './pages/PriceControlPage'
import { clearTimelineCache } from './pages/timeline-logic'

const navigate = (hash: string) => { window.location.hash = hash }

export default function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const [hash, setHash] = useState(window.location.hash || '#timeline')

  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      if (mounted) setSession(data.session)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((event: string, nextSession: Session | null) => {
      if (event === 'SIGNED_OUT') {
        clearTimelineCache()
        setSession(null)
        navigate('#login')
      } else if (nextSession) {
        setSession(nextSession)
        if (window.location.hash === '#login' || !window.location.hash) navigate('#timeline')
      }
    })
    const onHashChange = () => setHash(window.location.hash || '#timeline')
    window.addEventListener('hashchange', onHashChange)
    return () => {
      mounted = false
      listener.subscription.unsubscribe()
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  if (session === undefined) return <div className="react-route-loading">Yükleniyor…</div>
  if (!session) return <LoginPage onSuccess={() => navigate('#timeline')} />

  if (hash === '#login') {
    navigate('#timeline')
    return null
  }
  if (hash === '#new') return <NewBookingPage navigate={navigate} />
  if (hash === '#budget') return <BudgetPage navigate={navigate} />
  if (hash.startsWith('#profit-loss')) {
    const profitQuery = hash.startsWith('#profit-loss?') ? hash.slice('#profit-loss?'.length) : ''
    return <ProfitLossPage key={hash} navigate={navigate} initialPeriod={new URLSearchParams(profitQuery).get('period')} />
  }
  if (hash === '#admin') return <AdminPanelPage navigate={navigate} />
  if (hash === '#prices') return <PriceControlPage navigate={navigate} />
  if (hash.startsWith('#detail/')) {
    const detailPath = hash.slice('#detail/'.length)
    const [encodedRef, query = ''] = detailPath.split('?')
    const params = new URLSearchParams(query)
    return <BookingDetailPage
      key={hash}
      bookingRef={decodeURIComponent(encodedRef)}
      isReturn={params.get('leg') === 'return'}
      sourceTab={params.get('from') === 'profit-loss' ? 'profit-loss' : params.get('from') === 'past' ? 'past' : params.get('from') === 'cancelled' ? 'cancelled' : 'future'}
      profitPeriod={params.get('profitPeriod')}
      navigate={navigate}
    />
  }

  const timelineQuery = hash.startsWith('#timeline?') ? hash.slice('#timeline?'.length) : ''
  const timelineParams = new URLSearchParams(timelineQuery)
  const timelineTabParam = timelineParams.get('tab')
  const selectedTab = timelineTabParam === 'past' ? 'past' : timelineTabParam === 'cancelled' ? 'cancelled' : 'future'
  const initialDate = timelineParams.get('date') || null
  return <TimelinePage key={selectedTab} selectedTab={selectedTab} navigate={navigate} initialDate={initialDate} />
}
