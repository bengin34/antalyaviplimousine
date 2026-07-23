import { supabase } from './supabase-client.js'

export function renderLogin(container, navigate) {
  container.innerHTML = `
    <div class="login-wrap">
      <div class="login-title">🚗 VIP Yönetim</div>
      <form class="login-form" id="login-form">
        <input class="input" type="email" id="login-email" placeholder="E-posta" autocomplete="email" required />
        <input class="input" type="password" id="login-password" placeholder="Şifre" autocomplete="current-password" required />
        <button class="btn" type="submit" id="login-btn">Giriş Yap</button>
        <div class="error-msg" id="login-error"></div>
      </form>
    </div>
  `

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const btn = document.getElementById('login-btn')
    const errEl = document.getElementById('login-error')
    const email = document.getElementById('login-email').value.trim()
    const password = document.getElementById('login-password').value

    btn.disabled = true
    btn.textContent = 'Giriş yapılıyor...'
    errEl.textContent = ''

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      errEl.textContent = 'E-posta veya şifre hatalı.'
      btn.disabled = false
      btn.textContent = 'Giriş Yap'
      return
    }

    navigate('#timeline')
  })
}
