import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) throw new Error('Supabase ortam değişkenleri eksik')

export const supabase = createClient(url, key, {
  auth: { autoRefreshToken: true, persistSession: true },
})
