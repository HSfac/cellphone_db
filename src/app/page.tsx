'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Smartphone, 
  Star, 
  CheckCircle, 
  Phone, 
  Shield,
  Truck,
  Users,
  Clock,
  MapPin,
  TrendingDown,
  ArrowRight,
  Flame,
  ThumbsUp,
  TrendingUp
} from 'lucide-react'

const leadSchema = z.object({
  name: z.string().min(2, '이름은 2글자 이상 입력해주세요'),
  phone: z.string().regex(/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/, '올바른 휴대폰 번호를 입력해주세요'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  preferred_phone_brand: z.string().min(1, '선호 브랜드를 선택해주세요'),
  budget_range: z.string().min(1, '예산 범위를 선택해주세요'),
  purchase_timeline: z.string().min(1, '구매 시기를 선택해주세요'),
  interested_features: z.array(z.string()).min(1, '관심 기능을 1개 이상 선택해주세요'),
})

type LeadForm = z.infer<typeof leadSchema>

const phoneBrands = [
  'iPhone (Apple)',
  'Galaxy (Samsung)',
  'Pixel (Google)',
  'LG',
  '기타 Android',
  '아직 모르겠음'
]

const budgetRanges = [
  '30만원 이하',
  '30-50만원',
  '50-80만원',
  '80-100만원',
  '100만원 이상',
  '예산 미정'
]

const purchaseTimelines = [
  '1주일 이내',
  '1개월 이내',
  '3개월 이내',
  '6개월 이내',
  '정확한 시기 미정'
]

const phoneFeatures = [
  '카메라 성능',
  '배터리 수명',
  '게임 성능',
  '디스플레이 품질',
  '5G 지원',
  '무선 충전',
  '방수 기능',
  '저장공간',
  '가격 대비 성능'
]

const iPhones = [
  {
    name: 'iPhone 15 Pro Max',
    originalPrice: 1750000,
    discountPrice: 1320000,
    discount: 25,
    image: '📱',
    features: ['A17 Pro 칩', '티타늄 디자인', '5배 줌 카메라'],
    badge: '인기'
  },
  {
    name: 'iPhone 15 Pro',
    originalPrice: 1550000,
    discountPrice: 1200000,
    discount: 23,
    image: '📱',
    features: ['A17 Pro 칩', '티타늄 디자인', '3배 줌']
  },
  {
    name: 'iPhone 15',
    originalPrice: 1250000,
    discountPrice: 950000,
    discount: 24,
    image: '📱',
    features: ['A16 바이오닉', '다이나믹 아일랜드', '48MP 카메라']
  },
  {
    name: 'iPhone 14',
    originalPrice: 1190000,
    discountPrice: 850000,
    discount: 29,
    image: '📱',
    features: ['A15 바이오닉', '듀얼 카메라', 'MagSafe']
  }
]

const galaxyPhones = [
  {
    name: 'Galaxy S24 Ultra',
    originalPrice: 1398000,
    discountPrice: 980000,
    discount: 30,
    image: '📱',
    features: ['S펜 내장', '200MP 카메라', 'AI 번역'],
    badge: '신제품'
  },
  {
    name: 'Galaxy S24+',
    originalPrice: 1180000,
    discountPrice: 850000,
    discount: 28,
    image: '📱',
    features: ['AI 사진 편집', '50MP 카메라', '무선 충전']
  },
  {
    name: 'Galaxy S24',
    originalPrice: 950000,
    discountPrice: 720000,
    discount: 24,
    image: '📱',
    features: ['AI 기능', '50MP 카메라', '컴팩트 사이즈']
  },
  {
    name: 'Galaxy S23',
    originalPrice: 999000,
    discountPrice: 650000,
    discount: 35,
    image: '📱',
    features: ['Snapdragon 8', '50MP 카메라', '8K 동영상']
  }
]

const reviews = [
  {
    name: '김민수',
    phone: 'iPhone 15 Pro',
    rating: 5,
    review: '정말 저렴하게 잘 샀어요! 정품이고 A/S도 완벽해요. 강력 추천합니다!'
  },
  {
    name: '박지영',
    phone: 'Galaxy S24 Ultra',
    rating: 5,
    review: '다른 곳보다 30만원 더 저렴했어요. 직원분들도 친절하고 설명도 자세히 해주셨습니다.'
  },
  {
    name: '이준호',
    phone: 'iPhone 14',
    rating: 5,
    review: '온라인으로 주문했는데 당일 배송에 설정까지 완료해서 받았어요. 너무 편리했습니다!'
  }
]

const testimonials = [
  {
    name: '이서영',
    age: 28,
    job: '직장인',
    content: '3곳 비교해보니 여기가 제일 저렴했어요. 40만원 절약했습니다!',
    savings: 400000
  },
  {
    name: '박준혁',
    age: 35,
    job: '사업자',
    content: '정품 확인하고 당일 배송까지! 완전 만족합니다.',
    savings: 250000
  },
  {
    name: '최민지',
    age: 24,
    job: '대학생',
    content: '학생할인까지 적용해주셔서 정말 감사해요.',
    savings: 180000
  }
]

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 32 })

  // 카운트다운 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      interested_features: []
    }
  })

  const onSubmit = async (data: LeadForm) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert('제출에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.')
      console.error('Error submitting lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = getValues('interested_features')
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature]
    setValue('interested_features', updatedFeatures)
  }

  const watchedFeatures = watch('interested_features') || []

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-12 text-center max-w-md w-full mx-auto"
        >
          <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-3xl font-light text-gray-900 mb-4">완료되었습니다</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            고객님의 정보를 성공적으로 받았습니다. 
            최적의 제품을 준비하여 곧 연락드리겠습니다.
          </p>
          <div className="bg-blue-50/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/30">
            <p className="text-sm text-blue-600">
              맞춤형 추천과 특별 혜택 정보를 30분 내에 연락드립니다
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 전체 컨테이너를 모바일 너비로 제한 */}
      <div className="max-w-md mx-auto bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/50">
        
        {/* 섹션 1: 헤더 */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50"
        >
          <div className="px-6 py-6">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center mr-3">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-light text-gray-900">휴대폰핫성지</h1>
            </div>
            <p className="text-center text-gray-500 text-sm mt-2 font-light">프리미엄 모바일 스토어</p>
          </div>
        </motion.header>

        {/* 섹션 2: 타이머 카운트다운 */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-8 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame className="w-8 h-8 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-xl font-medium mb-4">특가 마감까지</h2>
            <div className="flex justify-center space-x-4 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs opacity-80">시간</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs opacity-80">분</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs opacity-80">초</div>
              </div>
            </div>
            <p className="text-sm opacity-90 font-light">
              지금 주문시 최대 50만원 추가할인!
            </p>
          </motion.div>
        </motion.section>

        {/* 섹션 3: 실제 고객 후기 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-6 py-8 bg-gray-50/50"
        >
          <div className="text-center mb-6">
            <ThumbsUp className="w-6 h-6 mx-auto mb-3 text-blue-500" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">실제 고객 절약 후기</h3>
            <p className="text-sm text-gray-500 font-light">이번 주에만 128명이 절약했어요</p>
          </div>
          
          <div className="space-y-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-blue-600">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.age}세 {testimonial.job}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">-{testimonial.savings.toLocaleString()}원</p>
                    <p className="text-xs text-gray-500">절약</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 font-light leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 섹션 4: 히어로 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-b from-white to-gray-50/50 px-6 py-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-light text-gray-900 leading-tight">
              다르게 생각하자.
              <br />
              <span className="text-blue-500">적게 내자.</span>
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              정품보증 프리미엄 스토어
              <br />
              최대 50% 특별할인 진행중
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-black/5 backdrop-blur-sm rounded-full border border-gray-200/50">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-700 font-medium">한정 특가 진행중</span>
            </div>
          </motion.div>
        </motion.section>

        {/* 섹션 5: 가격 비교표 */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="px-6 py-8"
        >
          <div className="text-center mb-8">
            <TrendingDown className="w-6 h-6 mx-auto mb-3 text-green-500" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">가격 비교</h3>
            <p className="text-sm text-gray-500 font-light">iPhone 15 Pro 기준</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 shadow-lg">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">대형마트</span>
                <span className="font-medium text-gray-900">₩1,550,000</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">온라인쇼핑몰</span>
                <span className="font-medium text-gray-900">₩1,480,000</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">통신사 대리점</span>
                <span className="font-medium text-gray-900">₩1,450,000</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-blue-50/50 rounded-2xl px-4">
                <span className="text-sm font-medium text-blue-600">휴대폰핫성지</span>
                <span className="font-bold text-blue-600">₩1,200,000</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="bg-green-100/70 rounded-2xl p-4">
                <p className="text-lg font-bold text-green-700">최대 350,000원 절약!</p>
                <p className="text-xs text-green-600 font-light">타사 대비 평균 23% 저렴</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 섹션 6: 베스트셀러 */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="px-6 py-8 bg-gray-50/50"
        >
          <div className="text-center mb-8">
            <TrendingUp className="w-6 h-6 mx-auto mb-3 text-orange-500" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">이번 주 베스트셀러</h3>
            <p className="text-sm text-gray-500 font-light">가장 많이 팔린 TOP 3</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 shadow-sm flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-sm font-bold text-yellow-600">1</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">iPhone 15 Pro</h4>
                <p className="text-xs text-gray-500">이번 주 43대 판매</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-red-600">₩1,200,000</p>
                <p className="text-xs text-gray-400 line-through">₩1,550,000</p>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 shadow-sm flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-sm font-bold text-gray-600">2</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Galaxy S24 Ultra</h4>
                <p className="text-xs text-gray-500">이번 주 38대 판매</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-red-600">₩980,000</p>
                <p className="text-xs text-gray-400 line-through">₩1,398,000</p>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 shadow-sm flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-sm font-bold text-orange-600">3</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">iPhone 14</h4>
                <p className="text-xs text-gray-500">이번 주 35대 판매</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-red-600">₩850,000</p>
                <p className="text-xs text-gray-400 line-through">₩1,190,000</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 섹션 7: 특별 공지 */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mx-6 my-8"
        >
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 text-white text-center">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <h3 className="text-xl font-medium mb-4">특별 이벤트</h3>
              <div className="space-y-2 text-sm font-light opacity-90">
                <p>✓ iPhone 15 Pro Max 430,000원 할인</p>
                <p>✓ Galaxy S24 Ultra 418,000원 할인</p>
                <p>✓ 당일배송 + 무료설정 포함</p>
              </div>
              <div className="mt-6 text-xs text-gray-300 font-light">
                12월 31일까지 한정
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 섹션 8: iPhone 시리즈 */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="px-6 py-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light text-gray-900 mb-3">아이폰</h3>
            <p className="text-sm text-gray-500 font-light">Apple 정품 • 공식인증점</p>
          </div>
          
          <div className="space-y-4">
            {iPhones.map((phone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative"
              >
                {phone.badge && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {phone.badge}
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-2xl">{phone.image}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{phone.name}</h4>
                      <p className="text-sm text-gray-500 font-light">Apple</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 line-through font-light">
                      ₩{phone.originalPrice.toLocaleString()}
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      ₩{phone.discountPrice.toLocaleString()}
                    </div>
                    <div className="text-xs text-blue-500 font-medium">
                      {(phone.originalPrice - phone.discountPrice).toLocaleString()}원 할인
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {phone.features.map((feature, idx) => (
                    <span key={idx} className="bg-gray-100/70 text-gray-700 text-xs px-3 py-1 rounded-full font-light">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 섹션 9: Galaxy 시리즈 */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="px-6 py-12 bg-gray-50/50"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light text-gray-900 mb-3">갤럭시</h3>
            <p className="text-sm text-gray-500 font-light">Samsung 정품 • 공식대리점</p>
          </div>
          
          <div className="space-y-4">
            {galaxyPhones.map((phone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative"
              >
                {phone.badge && (
                  <div className="absolute -top-2 -right-2 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {phone.badge}
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-2xl">{phone.image}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{phone.name}</h4>
                      <p className="text-sm text-gray-500 font-light">Samsung</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 line-through font-light">
                      ₩{phone.originalPrice.toLocaleString()}
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      ₩{phone.discountPrice.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      {(phone.originalPrice - phone.discountPrice).toLocaleString()}원 할인
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {phone.features.map((feature, idx) => (
                    <span key={idx} className="bg-gray-100/70 text-gray-700 text-xs px-3 py-1 rounded-full font-light">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 섹션 10: 서비스 */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="px-6 py-12"
        >
          <h3 className="text-2xl font-light text-gray-900 text-center mb-12">우리의 서비스</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 text-center border border-gray-200/50 shadow-lg">
              <Shield className="w-8 h-8 text-gray-700 mx-auto mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">정품보증</h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">100% 정품 인증서 제공</p>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 text-center border border-gray-200/50 shadow-lg">
              <Truck className="w-8 h-8 text-gray-700 mx-auto mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">당일배송</h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">서울/경기 무료배송</p>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 text-center border border-gray-200/50 shadow-lg">
              <Users className="w-8 h-8 text-gray-700 mx-auto mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">전문상담</h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">10년 경력 전문가팀</p>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 text-center border border-gray-200/50 shadow-lg">
              <Clock className="w-8 h-8 text-gray-700 mx-auto mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">즉시개통</h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">30분 내 완료</p>
            </div>
          </div>
        </motion.section>

        {/* 섹션 11: 고객 후기 */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className="px-6 py-12 bg-gray-50/50"
        >
          <h3 className="text-2xl font-light text-gray-900 text-center mb-12">고객 후기</h3>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.1 + index * 0.1 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-medium text-gray-700">{review.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-500 font-light">{review.phone}</p>
                  </div>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 font-light leading-relaxed">{review.review}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 섹션 12: 상담 신청 폼 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="px-6 py-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light text-gray-900 mb-4">지금 시작하세요</h3>
            <p className="text-gray-600 font-light">
              30초만 입력하시면 맞춤 견적을 받아보실 수 있습니다
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="이름"
                  className="w-full px-4 py-4 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-900 placeholder-gray-400 font-light"
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-red-500 font-light">{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('phone')}
                  type="text"
                  placeholder="휴대폰 번호"
                  className="w-full px-4 py-4 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-900 placeholder-gray-400 font-light"
                />
                {errors.phone && (
                  <p className="mt-2 text-xs text-red-500 font-light">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="이메일"
                  className="w-full px-4 py-4 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-900 placeholder-gray-400 font-light"
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-500 font-light">{errors.email.message}</p>
                )}
              </div>

              <div>
                <select
                  {...register('preferred_phone_brand')}
                  className="w-full px-4 py-4 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-900 font-light"
                >
                  <option value="">관심 브랜드를 선택하세요</option>
                  {phoneBrands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
                {errors.preferred_phone_brand && (
                  <p className="mt-2 text-xs text-red-500 font-light">{errors.preferred_phone_brand.message}</p>
                )}
              </div>

              <div>
                <select
                  {...register('budget_range')}
                  className="w-full px-4 py-4 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-900 font-light"
                >
                  <option value="">예산 범위를 선택하세요</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                {errors.budget_range && (
                  <p className="mt-2 text-xs text-red-500 font-light">{errors.budget_range.message}</p>
                )}
              </div>

              <div>
                <select
                  {...register('purchase_timeline')}
                  className="w-full px-4 py-4 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-900 font-light"
                >
                  <option value="">구매 시기를 선택하세요</option>
                  {purchaseTimelines.map((timeline) => (
                    <option key={timeline} value={timeline}>{timeline}</option>
                  ))}
                </select>
                {errors.purchase_timeline && (
                  <p className="mt-2 text-xs text-red-500 font-light">{errors.purchase_timeline.message}</p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-700 mb-4 font-light">관심 기능 (복수 선택 가능)</p>
                <div className="grid grid-cols-2 gap-3">
                  {phoneFeatures.map((feature) => (
                    <motion.button
                      key={feature}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleFeatureToggle(feature)}
                      className={`p-3 rounded-xl text-xs font-light transition-all duration-200 ${
                        watchedFeatures.includes(feature)
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-white/70 backdrop-blur-xl text-gray-700 border border-gray-200/50 hover:bg-gray-50'
                      }`}
                    >
                      {feature}
                    </motion.button>
                  ))}
                </div>
                {errors.interested_features && (
                  <p className="mt-2 text-xs text-red-500 font-light">{errors.interested_features.message}</p>
                )}
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gray-900 text-white font-medium py-4 px-6 rounded-2xl hover:bg-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                  처리중...
                </div>
              ) : (
                <>
                  <span>무료 상담 신청하기</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              개인정보는 상담 목적으로만 사용되며 제3자에게 제공되지 않습니다.
            </p>
          </div>
        </motion.section>

        {/* 섹션 13: 푸터 */}
        <footer className="bg-gray-900 text-white px-6 py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <Smartphone className="w-4 h-4 text-gray-900" />
              </div>
              <h4 className="text-lg font-light">휴대폰핫성지</h4>
            </div>
            
            <div className="space-y-3 text-sm font-light opacity-80">
              <div className="flex items-center justify-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>1588-1234</span>
              </div>
              <div className="flex items-center justify-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>평일 09:00-22:00, 주말 10:00-20:00</span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>서울시 강남구 테헤란로 123</span>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6 text-xs text-gray-400 font-light">
              <p>&copy; 2024 휴대폰핫성지. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}
