// All homepage text strings for i18n (English).
// For Hindi, create home.hi.ts with the same keys.

export const HOME = {
  // Block 1: Announcement Bar
  announcement: {
    shipping: 'Complimentary delivery on orders ₹1,500 and above',
    discovery: 'The Discovery Set from',
    discoveryFallbackPrice: 499,
  },

  // Block 3: Hero
  hero: {
    buttonPrefix: 'Shop',
    batchPrefix: 'Batch',
    batchSoldOut: 'is sold out',
    batchOnly: 'Only',
    batchLeft: 'left in',
    batchOf: 'of',
    batchBottlesLeft: 'bottles left',
    joinWaitlist: 'Join the waitlist',
    moreAbout: 'MRP incl. tax',
  },

  // Block 4: Shop by Type
  shopByType: {
    heading: 'Shop by type',
    rows: [
      { name: 'Attars', href: '/attar', from: 'attar' },
      { name: 'Perfumes', href: '/perfumes', from: 'perfume' },
      { name: 'Gift sets', href: '/gifting', from: 'gifting' },
      { name: 'Discovery Set', href: '/discovery-sets', from: 'discovery' },
    ],
  },

  // Block 5: The Attars
  attars: {
    heading: 'The Attars',
    line: 'Seven attars for every mood and moment. From 3 ml to 30 ml.',
    linkText: 'View all attars',
    linkHref: '/attar',
  },

  // Block 6: The Perfumes
  perfumes: {
    heading: 'The Perfumes',
    line: 'Seven eau de parfums, composed for every day and every evening.',
    linkText: 'View all perfumes',
    linkHref: '/perfumes',
  },

  // Block 7: Discovery Set
  discovery: {
    heading: 'Start with the Discovery Set',
    copy: 'Three to four attars, 3 ml each. Find your signature before you choose a full bottle.',
    buttonText: 'Order the set',
    buttonHref: '/discovery-sets',
  },

  // Block 8: Shop by Moment
  shopByMoment: {
    heading: 'Shop by moment',
    items: [
      { word: 'Every day', line: 'Light and easy', slug: 'everyday' },
      { word: 'Office', line: 'Clean and composed', slug: 'office' },
      { word: 'Festive', line: 'Warm and celebratory', slug: 'festive' },
      { word: 'Night', line: 'Deep and lasting', slug: 'night' },
    ],
  },

  // Block 9: Numbered Batches
  batches: {
    heading: 'Numbered batches.',
    copy: 'Every fragrance is released in a small, numbered batch. When a batch is gone, it is gone until the next one. Your bottle arrives with its own number.',
    linkText: 'How batches work',
    linkHref: '/faq#batches',
  },

  // Block 10: The House
  house: {
    heading: 'A fragrance house for every story.',
    copy: 'Aarsika is a luxury Indian fragrance house for every age, every occasion and every mood. Attars, perfumes and bakhoor, composed for daily life and for the moments that matter.',
    linkText: 'Our story',
    linkHref: '/our-story',
  },

  // Block 11: Gifting
  gifting: {
    heading: 'Gifting',
    copy: 'Boxed gift sets for every occasion, ready to give.',
    linkText: 'Shop gift sets',
    linkHref: '/gifting',
  },

  // Block 12: Trust & WhatsApp
  trust: {
    line: 'Complimentary delivery on orders ₹1,500 and above · Replacement if a bottle arrives broken · GST invoice with every order',
    heading: 'Find your signature.',
    copy: 'New batches and offers, straight to your WhatsApp.',
    buttonText: 'Join',
    successText: 'Welcome aboard. We will be in touch.',
    errorText: 'Something went wrong. Please try again.',
  },

  // Block 13: Footer
  footer: {
    copyright: '© 2026 Aarsika. All rights reserved.',
  },
} as const;
