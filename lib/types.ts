export interface Bank {
  id: string
  name: string
  logo: string
  description: string
  rating?: number
  tariffCount: number
  minPrice: number
  hasOnlineOpening: boolean
  hasFreeTariff: boolean
  regions: string[]
}

export interface Tariff {
  id: string
  bankId: string
  bankName: string
  bankLogo: string
  name: string
  price: number
  priceLabel: string
  description: string
  targetAudience: string
  operationsLimit: number
  transferCommission: string
  cashWithdrawalCommission: string
  freeTransfers: number
  features: string[]
  requirements: string[]
  isRecommended?: boolean
  recommendationReason?: string
}

export interface Promotion {
  id: string
  bankId: string
  bankName: string
  bankLogo: string
  title: string
  description: string
  type: "cashback" | "free_service" | "bonus"
  expiresAt?: string
  link: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: "news" | "guides" | "reviews" | "comparisons"
  publishedAt: string
  readTime: number
  author: {
    name: string
    avatar?: string
  }
}

export interface SelectionParams {
  businessType: "ip" | "ooo" | "self_employed"
  monthlyTurnover: number
  monthlyPayments: number
  region: string
}
