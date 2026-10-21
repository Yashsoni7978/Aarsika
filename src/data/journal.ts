export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "HERITAGE" | "FRAGRANCE" | "INGREDIENTS" | "CRAFT" | "RAJASTHAN" | "GIFTING";
  date: string;
  readTime: string;
  author: string;
  mainImage: string;
  excerpt: string;
  content: string[];
  featured?: boolean;
  relatedProductSlugs?: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "art-1",
    slug: "secrets-of-kannauj-hydro-distillation",
    title: "The Copper Degs of Kannauj: Distilling the Rain",
    subtitle: "A journey inside the world's oldest surviving perfume capital.",
    category: "CRAFT",
    date: "SEPTEMBER 18, 2026",
    readTime: "6 MIN READ",
    author: "JAIPUR ARCHIVES",
    mainImage: "/images/artist bottle filling.webp",
    excerpt: "For over four centuries, master distillers in Kannauj have captured the smell of monsoon rain hitting dried earth (Mitti Attar) using only fire, water, and copper vessels.",
    content: [
      "In the ancient town of Kannauj along the banks of the Ganges, the air smells perpetually of Damask roses, wet clay, and smoldering wood fires.",
      "The process of deg-bhapka is entirely manual, governed by touch, sight, and instinct rather than digital thermometers. Copper stills (degs) are sealed with fresh river mud and heated over wood fires.",
      "Vapors travel through hollow bamboo pipes (chonga) into receivers submerged in cold water baths, where pure Mysore sandalwood oil absorbs every volatile scent nuance over weeks of painstaking work."
    ],
    featured: true,
    relatedProductSlugs: ["gul-e-rooh", "saffron-sandal"]
  },
  {
    id: "art-2",
    slug: "language-of-rose-in-rajput-courts",
    title: "The Language of the Rose in Royal Jaipur",
    subtitle: "How Damask rose water became court etiquette in Rajasthan.",
    category: "HERITAGE",
    date: "AUGUST 29, 2026",
    readTime: "4 MIN READ",
    author: "ROYAL HERITAGE CELL",
    mainImage: "/images/rose ingrediant.webp",
    excerpt: "In the royal courts of Jaipur, presenting rose attar in crystal itra-dans was the highest gesture of hospitality extended to visiting dignitaries.",
    content: [
      "When guests entered the marble courtyards of the City Palace, attar-keepers would sprinkle chilled rose water over their hands and dab concentrated rose oil onto their velvet cuffs.",
      "The Damask rose (Rosa damascena) brought from Persia flourished in the micro-climate of Rajasthan, giving birth to Gul-e-Rooh—the 'Flower of the Soul'."
    ],
    relatedProductSlugs: ["gul-e-rooh", "raatraani"]
  },
  {
    id: "art-3",
    slug: "agarwood-notes-and-ancient-resins",
    title: "Dark Resins & Wild Assam Agarwood",
    subtitle: "Understanding the complex olfactive layers of authentic Oud.",
    category: "INGREDIENTS",
    date: "JULY 14, 2026",
    readTime: "7 MIN READ",
    author: "OLFACTIVE ARCHIVES",
    mainImage: "/images/oud-e-jaipur.jpg",
    excerpt: "Oud is not merely a scent; it is an ancient resin born of nature's healing response, yielding dark, smoked, and leather-tinged majesty.",
    content: [
      "Wild Assam agarwood is prized above all others for its complex multi-layered progression—opening with smoked frankincense and settling into warm amber leather.",
      "In Oud-e-Jaipur, we blend 15-year aged Assam agarwood resin with sweet saffron and amber to create a regal evening fragrance."
    ],
    relatedProductSlugs: ["resham-oudh", "chocolate-oudh"]
  },
  {
    id: "art-4",
    slug: "art-of-gifting-in-royal-tradition",
    title: "The Etiquette of Royal Fragrance Gifting",
    subtitle: "Why velvet chests and attar flacons remain timeless tokens.",
    category: "GIFTING",
    date: "JUNE 02, 2026",
    readTime: "5 MIN READ",
    author: "JAIPUR ARCHIVES",
    mainImage: "/images/combo gifting box.webp",
    excerpt: "Gifting fragrance in Indian culture is a prayer for prosperity and longevity. Discover how to curate a bespoke gift chest.",
    content: [
      "A royal gift box is an immersive sensory unboxing—velvet linings, gold embossed calligraphy notes, and hand-cut glass flacons nestled inside.",
      "Whether celebrating a wedding, milestone, or festive occasion, an attar gift set endures for years as a cherished family heirloom."
    ],
    relatedProductSlugs: ["royal-gift-box", "saffron-sandal"]
  }
];
