import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 환경 변수가 제대로 설정되었는지 확인하는 함수
export const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && 
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'
}


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