import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Supabase가 설정되지 않은 경우 모의 응답 반환
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, returning mock response:', body)
      return NextResponse.json(
        { 
          message: 'Lead submitted successfully (mock mode)', 
          data: { id: Date.now(), ...body } 
        },
        { status: 201 }
      )
    }
    
    // UTM 파라미터 추출 (광고 소스 추적용)
    const searchParams = new URL(request.url).searchParams
    const utmData = {
      utm_source: searchParams.get('utm_source') || null,
      utm_medium: searchParams.get('utm_medium') || null,
      utm_campaign: searchParams.get('utm_campaign') || null,
    }

    // Supabase에 데이터 삽입
    const { data, error } = await supabase
      .from('phone_leads')
      .insert([
        {
          ...body,
          ...utmData,
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit lead' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Lead submitted successfully', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 