import type { BlogPost } from './blog-data'

export function generateBlogPostStructuredData(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${url}/og-images/${post.slug}.png`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: 'https://github.com/ehsanghaffar',
    },
    publisher: {
      '@type': 'Person',
      name: 'Ehsan Ghaffar',
      url: 'https://eindev.ir',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    timeRequired: post.readTime,
  }
}

export function generateWebsiteStructuredData(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Suriya Prakash Portfolio',
    description: "Portfolio of Suriya Prakash R M — Full Stack Developer building scalable web apps, AI/ML systems, and DevOps automation.",
    url: url,
    author: {
      '@type': 'Person',
      name: 'Suriya Prakash R M',
      url: 'https://github.com/suriyaprakash-25',
    },
  }
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Suriya Prakash R M',
    url: 'https://suriyaprakash.dev',
    image: 'https://avatars.githubusercontent.com/u/183195307?v=4',
    sameAs: [
      'https://github.com/suriyaprakash-25',
      'https://www.linkedin.com/in/suriyaprakash-r-m-64133a327/',
    ],
    jobTitle: 'Full Stack Developer',
    knowsAbout: ['Web Development', 'AI/ML', 'DevOps', 'Next.js', 'Python', 'MLOps'],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'B.E. AI & Data Science — Batch 1 (24AD229)',
    },
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
