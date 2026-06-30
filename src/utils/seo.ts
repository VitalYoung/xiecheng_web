import siteData from '../data/site.json';

export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

export function buildPageMeta(overrides: Partial<SEOMeta> = {}): SEOMeta {
  const baseTitle = `${siteData.company.name} - ${siteData.company.slogan}`;
  return {
    title: baseTitle,
    description: siteData.company.description,
    ogType: 'website',
    ...overrides,
  };
}

export function buildOrganizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteData.company.name,
    url: siteData.site.url,
    description: siteData.company.description,
    telephone: siteData.company.phone,
    email: siteData.company.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
      streetAddress: siteData.company.address,
    },
  };
}

export function buildLocalBusinessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteData.company.name,
    '@id': `${siteData.site.url}/#business`,
    url: siteData.site.url,
    telephone: siteData.company.phone,
    email: siteData.company.email,
    description: siteData.company.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
      streetAddress: siteData.company.address,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    image: `${siteData.site.url}/images/og-image.png`,
  };
}

export function buildBreadcrumbLd(pages: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pages.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: page.name,
      item: `${siteData.site.url}${page.url}`,
    })),
  };
}

export function buildFaqLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildArticleLd(article: {
  headline: string;
  description: string;
  datePublished: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    author: {
      '@type': 'Organization',
      name: siteData.company.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteData.company.name,
    },
    image: article.image ? `${siteData.site.url}${article.image}` : undefined,
  };
}
