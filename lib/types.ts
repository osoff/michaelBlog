export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  mainImage: any
  publishedAt: string
  readTime: number
  featured?: boolean
  content?: any[]
  category: Category
  author: Author
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface Author {
  _id?: string
  name: string
  slug: {
    current: string
  }
  image?: any
  role?: string
  bio?: string
  email?: string
  social?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface Category {
  _id?: string
  title: string
  slug: {
    current: string
  }
  description?: string
  color?: string
}
