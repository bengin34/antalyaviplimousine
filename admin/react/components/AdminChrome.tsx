import { supabase } from '../lib/supabase'
import type { Navigate } from '../types'
import { clearTimelineCache } from '../pages/timeline-logic'

type AdminView = 'timeline' | 'budget' | 'profit-loss' | 'driver-comms'

export function Topbar({ navigate, title = '🚗 VIP Yönetim', back, showAdmin = false }: {
  navigate: Navigate
  title?: string
  back?: string
  showAdmin?: boolean
}) {
  if (back) {
    return (
      <div className="topbar">
        <button className="detail-back" onClick={() => navigate(back)}>← Geri</button>
        <span className="topbar-title">{title}</span>
        <span />
      </div>
    )
  }

  const logout = async () => {
    clearTimelineCache()
    await supabase.auth.signOut()
  }

  return (
    <div className="topbar">
      <span className="topbar-title">{title}</span>
      <div className="topbar-actions">
        <button className="topbar-new" onClick={() => navigate('#new')}>+ Yeni Kayıt</button>
        {showAdmin && (
          <button className="topbar-icon" aria-label="Yönetici paneli" title="Yönetici paneli" onClick={() => navigate('#admin')}>⚙️</button>
        )}
        <button className="topbar-logout" onClick={logout}>Çıkış</button>
      </div>
    </div>
  )
}

export function AdminTabs({ active, navigate }: { active: AdminView; navigate: Navigate }) {
  const open = (view: AdminView) => {
    if (view === active) return
    if (view === 'budget') navigate('#budget')
    else if (view === 'profit-loss') navigate('#profit-loss')
    else if (view === 'driver-comms') navigate('#driver-comms')
    else navigate('#timeline')
  }

  const tabs: Array<[AdminView, string]> = [
    ['timeline', 'Transferler'], ['budget', 'Bütçe'], ['profit-loss', 'Kâr/Zarar'], ['driver-comms', '📱 Şoför'],
  ]

  return (
    <div className="timeline-tabs timeline-tabs-with-budget" role="tablist" aria-label="Yönetim sayfaları">
      {tabs.map(([view, label]) => (
        <button
          key={view}
          className={`timeline-tab${active === view ? ' active' : ''}`}
          type="button"
          role="tab"
          aria-selected={active === view}
          onClick={() => open(view)}
        >{label}</button>
      ))}
    </div>
  )
}
