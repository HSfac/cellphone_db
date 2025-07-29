-- 휴대폰 리드 테이블 생성
CREATE TABLE IF NOT EXISTS phone_leads (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    preferred_phone_brand VARCHAR(50) NOT NULL,
    budget_range VARCHAR(50) NOT NULL,
    purchase_timeline VARCHAR(50) NOT NULL,
    interested_features TEXT[] NOT NULL DEFAULT '{}',
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100), 
    utm_campaign VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 업데이트 시간 자동 갱신을 위한 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_phone_leads_updated_at 
    BEFORE UPDATE ON phone_leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_phone_leads_created_at ON phone_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_phone_leads_utm_source ON phone_leads(utm_source);
CREATE INDEX IF NOT EXISTS idx_phone_leads_preferred_brand ON phone_leads(preferred_phone_brand);
CREATE INDEX IF NOT EXISTS idx_phone_leads_budget_range ON phone_leads(budget_range);

-- RLS (Row Level Security) 정책 설정 (선택사항)
ALTER TABLE phone_leads ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 삽입할 수 있도록 허용 (공개 폼이므로)
CREATE POLICY "Anyone can insert phone leads" ON phone_leads
    FOR INSERT 
    WITH CHECK (true);

-- 관리자만 조회할 수 있도록 제한 (필요시 수정)
CREATE POLICY "Only authenticated users can view phone leads" ON phone_leads
    FOR SELECT 
    USING (auth.role() = 'authenticated');

-- 댓글: 
-- 1. 이 스키마를 Supabase 대시보드의 SQL Editor에서 실행하세요
-- 2. RLS 정책은 보안 요구사항에 따라 조정하세요
-- 3. utm_* 필드들은 광고 성과 추적을 위해 사용됩니다 