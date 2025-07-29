# 📱 휴대폰 리드 수집 사이트

휴대폰 구매를 원하는 고객들의 정보를 수집하는 원페이지 웹사이트입니다.
Next.js와 Supabase를 활용하여 구축되었습니다.

## ✨ 주요 기능

- 🎯 **원페이지 구성**: 하나의 페이지에서 모든 정보 수집
- 📝 **상세한 폼 검증**: Zod를 활용한 클라이언트 사이드 검증
- 🎨 **모던 UI/UX**: Tailwind CSS + Framer Motion 애니메이션
- 📊 **광고 추적**: UTM 파라미터를 통한 광고 성과 분석
- 🔒 **안전한 데이터 저장**: Supabase를 통한 안전한 데이터베이스 관리
- 📱 **반응형 디자인**: 모바일/데스크톱 모든 기기 지원

## 🛠 기술 스택

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **애니메이션**: Framer Motion
- **폼 관리**: React Hook Form + Zod 검증
- **데이터베이스**: Supabase (PostgreSQL)
- **아이콘**: Lucide React

## 🚀 설치 및 실행

### 1. 저장소 클론 및 의존성 설치

```bash
# 프로젝트가 이미 생성되어 있으므로 의존성만 확인
npm install
```

### 2. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 설정에서 API URL과 anon key 확인
3. SQL Editor에서 `database/schema.sql` 파일의 내용 실행

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 확인할 수 있습니다.

## 📊 수집되는 데이터

### 고객 기본 정보
- 이름
- 휴대폰 번호  
- 이메일 주소

### 휴대폰 선호도
- 선호 브랜드 (iPhone, Galaxy, Pixel 등)
- 예산 범위
- 구매 희망 시기
- 관심 있는 기능들 (카메라, 배터리, 게임 성능 등)

### 광고 추적 정보
- UTM Source (광고 출처)
- UTM Medium (광고 매체)
- UTM Campaign (캠페인명)

## 🔧 커스터마이징

### 브랜드 옵션 수정
`src/app/page.tsx`의 `phoneBrands` 배열을 수정하여 브랜드 옵션을 변경할 수 있습니다.

### 예산 범위 조정
`budgetRanges` 배열을 수정하여 예산 옵션을 변경할 수 있습니다.

### 관심 기능 항목 추가
`phoneFeatures` 배열을 수정하여 새로운 기능 옵션을 추가할 수 있습니다.

### 스타일 변경
Tailwind CSS 클래스를 수정하여 디자인을 변경할 수 있습니다.

## 📈 광고 운영 가이드

### UTM 파라미터 활용
광고 링크에 UTM 파라미터를 추가하여 성과를 추적할 수 있습니다:

```
https://yoursite.com/?utm_source=google&utm_medium=cpc&utm_campaign=phone_discount
```

### 데이터 분석
Supabase 대시보드에서 다음과 같은 쿼리로 성과를 분석할 수 있습니다:

```sql
-- 광고 소스별 리드 수
SELECT utm_source, COUNT(*) as lead_count 
FROM phone_leads 
GROUP BY utm_source;

-- 브랜드별 선호도
SELECT preferred_phone_brand, COUNT(*) as count 
FROM phone_leads 
GROUP BY preferred_phone_brand 
ORDER BY count DESC;
```

## 🔒 보안 고려사항

- Supabase RLS(Row Level Security) 정책이 적용되어 있습니다
- 개인정보는 암호화되어 저장됩니다
- API 라우트에서 입력값 검증을 수행합니다

## 📝 라이센스

이 프로젝트는 개인/상업적 용도로 자유롭게 사용할 수 있습니다.

---

💡 **Tip**: 광고 운영 시 다양한 UTM 파라미터를 활용하여 어떤 광고가 가장 효과적인지 분석해보세요!
