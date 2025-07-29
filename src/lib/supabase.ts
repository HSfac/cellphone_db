import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type PhoneLead = {
  id?: number
  name: string
  phone: string
  email: string
  preferred_phone_brand: string
  budget_range: string
  purchase_timeline: string
  interested_features: string[]
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  created_at?: string
} 