import { useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'

export default function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (loginError) setError('E-posta veya şifre hatalı.')
    else onSuccess()
  }

  return (
    <div className="login-wrap">
      <div className="login-title">🚗 VIP Yönetim</div>
      <form className="login-form" onSubmit={submit}>
        <input className="input" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="E-posta" autoComplete="email" required />
        <input className="input" type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Şifre" autoComplete="current-password" required />
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}</button>
        <div className="error-msg">{error}</div>
      </form>
    </div>
  )
}
