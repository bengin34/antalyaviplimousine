import { supabase } from './supabase-client.js'
import { renderLogin } from './login.js'
import { renderTimeline } from './timeline.js'
import { renderDetail } from './booking-detail.js'

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

  if (hash.startsWith('#detail/')) {
    const ref = hash.slice('#detail/'.length)
    renderDetail(app, ref, navigate)
    return
  }

  renderTimeline(app, navigate)
}

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    navigate('#login')
    renderLogin(app, navigate)
  }
})

window.addEventListener('hashchange', route)
route()
