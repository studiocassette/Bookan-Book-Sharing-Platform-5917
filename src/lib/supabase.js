import { createClient } from '@supabase/supabase-js'

// Configuration temporaire - sera remplacée par les vraies credentials
const SUPABASE_URL = 'https://demo.supabase.co'
const SUPABASE_ANON_KEY = 'demo-key'

// Pour le développement, nous utilisons une configuration mock
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

export default supabaseClient