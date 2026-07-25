import { supabase } from './supabase-client.js'
import { renderLogin } from './login.js'
import { renderTimeline } from './timeline.js'
import { renderDetail } from './booking-detail.js'
import { renderBookingNew } from './booking-new.js'

const app = document.getElementById('app')

function navigate(hash) {
  window.location.hash = hash
}

async function route() {
  const hash = window.location.hash || '#timeline'
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    renderLogin(app, navigate)
    return
  }

  if (hash === '#login') {
    navigate('#timeline')
    return
  }

  if (hash === '#new') {
    renderBookingNew(app, navigate)
    return
  }

  if (hash.startsWith('#detail/')) {
    const detailPath = hash.slice('#detail/'.length)
    const [encodedRef, query = ''] = detailPath.split('?')
    const ref = decodeURIComponent(encodedRef)
    const detailParams = new URLSearchParams(query)
    const isReturn = detailParams.get('leg') === 'return'
    const sourceTab = detailParams.get('from') === 'past' ? 'past' : 'future'
    renderDetail(app, ref, navigate, isReturn, sourceTab)
    return
  }

  const timelineQuery = hash.startsWith('#timeline?') ? hash.slice('#timeline?'.length) : ''
  const selectedTab = new URLSearchParams(timelineQuery).get('tab') === 'past' ? 'past' : 'future'
  renderTimeline(app, navigate, selectedTab)
}

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    navigate('#login')
    renderLogin(app, navigate)
  }
})

window.addEventListener('hashchange', route)
route()
