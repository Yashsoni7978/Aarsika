// DRAFT: verify oil composition with supplier before final labels or claims
// TODO: JSON file store is not concurrency-safe; migrate to real database before launch.

export interface ProductVariant {
  size: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number; // TODO: set real stock
  batchNo?: number; // default 1
  batchSize?: number; // default 69
  nextSerial?: number; // default 1
  onRequest?: boolean; // default false
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  accent?: string; // used ONLY as a thin 2px line colour under the product name
  type: string;
  category: "ATTAR" | "EAU DE PARFUM" | "OUD" | "PERFUME OILS" | "MUSK" | "GIFTING" | "DISCOVERY SETS" | "PERSONAL CARE" | "INCENSE";
  subcategory?: string;
  fragranceFamily: "FLORAL" | "WOODY" | "SPICY" | "FRESH" | "MUSKY" | "OUD" | "ORIENTAL";
  gender: "Unisex" | "Feminine" | "Masculine";
  occasion: "Everyday" | "Evening" | "Festive" | "Occasions";
  price: number;
  compareAtPrice?: number;
  shortDescription?: string;
  description?: string;
  sku: string;
  barcode: string;
  stock: number;
  reservedQuantity: number;
  lowStockThreshold: number;
  weight: string;
  dimensions: string;
  mainImage: string;
  secondaryImage: string;
  gallery: string[];
  variants: ProductVariant[];
  sizeOptions: string[];
  defaultSize: string;
  ingredients: string[];
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  concentration: string;
  longevity: string;
  sillage: string;
  application: string;
  benefits: string[];
  howToWear: string;
  warnings: string;
  shippingInformation: string;
  returnEligibility: string;
  tags: string[];
  collections: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  colorTheme: "pink" | "blue" | "emerald" | "ivory" | "gold";
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
}

const createStandardVariants = (slugUpper: string): ProductVariant[] => [
  { size: "3 ml", price: 249, sku: `AAR-${slugUpper}-03`, stock: 69, batchNo: 1, batchSize: 69, nextSerial: 1, onRequest: false },
  { size: "6 ml", price: 399, sku: `AAR-${slugUpper}-06`, stock: 69, batchNo: 1, batchSize: 69, nextSerial: 1, onRequest: false },
  { size: "12 ml", price: 499, sku: `AAR-${slugUpper}-12`, stock: 69, batchNo: 1, batchSize: 69, nextSerial: 1, onRequest: false },
  { size: "30 ml", price: 999, sku: `AAR-${slugUpper}-30`, stock: 69, batchNo: 1, batchSize: 69, nextSerial: 1, onRequest: false },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "sehar-e-gulab",
    name: "Sehar E Gulab",
    tagline: "The first light, captured in roses.",
    accent: "#D98BA0",
    type: "Attar Oil",
    category: "ATTAR",
    subcategory: "Rose Attar",
    fragranceFamily: "FLORAL",
    gender: "Unisex",
    occasion: "Everyday",
    price: 249,
    shortDescription: "A fragrance inspired by fresh roses in soft morning light.",
    description: "A fragrance inspired by fresh roses in soft morning light. Delicate floral notes unfold into a gentle, warm finish, an elegant scent that feels romantic, graceful and timeless.",
    sku: "AAR-SEHAR-E-GULAB-03",
    barcode: "890432100101",
    stock: 69,
    reservedQuantity: 0,
    lowStockThreshold: 10,
    weight: "0.20 kg",
    dimensions: "5 x 5 x 12 cm",
    mainImage: "/photos/attars/sehar-e-gulab.jpg",
    secondaryImage: "/photos/attars/sehar-e-gulab-jaipur-alt 2nd.jpg",
    gallery: ["/photos/attars/sehar-e-gulab-clean 1st.jpg", "/photos/attars/sehar-e-gulab-jaipur-alt 2nd.jpg", "/photos/attars/sehar-e-gulab-jaipur 3rd.jpg"],
    sizeOptions: ["3 ml", "6 ml", "12 ml", "30 ml"],
    defaultSize: "12 ml",
    variants: createStandardVariants("SEHAR-E-GULAB"),
    notes: {
      top: ["Fresh rose", "green notes"],
      heart: ["Rose", "soft floral accords"],
      base: ["Musk", "sandalwood", "warm amber"]
    },
    ingredients: ["Pure Concentrated Attar Oils", "Essential Oils"],
    concentration: "100% Pure Attar Oil",
    longevity: "8-12 Hours",
    sillage: "Intimate to Moderate",
    application: "Glass Wand Applicator",
    benefits: ["Alcohol-free pure attar oil", "Long-lasting daily fragrance"],
    howToWear: "Apply a drop to pulse points on clean skin.",
    warnings: "For external application only.",
    shippingInformation: "Ships across India. Free shipping on all orders.",
    returnEligibility: "Non-returnable item once unsealed.",
    tags: ["rose", "floral", "attar", "everyday"],
    collections: ["attar", "floral"],
    isBestseller: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 42,
    colorTheme: "pink",
    seoTitle: "Sehar E Gulab Pure Attar | Aarsika Fine Fragrance",
    seoDescription: "Discover Sehar E Gulab pure attar oil by Aarsika. Delicate fresh roses in morning light.",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-10-09T00:00:00Z"
  },
  {
    id: "p2",
    slug: "maati",
    name: "Maati",
    tagline: "The first rain, forever in a bottle.",
    accent: "#A67B5B",
    type: "Attar Oil",
    category: "ATTAR",
    subcategory: "Earthy Attar",
    fragranceFamily: "WOODY",
    gender: "Unisex",
    occasion: "Everyday",
    price: 249,
    shortDescription: "Maati evokes the unmistakable scent of the earth after monsoon rain.",
    description: "Maati evokes the unmistakable scent of the earth after the first monsoon rain. Earthy and quietly comforting, it brings together the impression of wet soil, mineral-rich clay and soft woods.",
    sku: "AAR-MAATI-03",
    barcode: "890432100102",
    stock: 69,
    reservedQuantity: 0,
    lowStockThreshold: 10,
    weight: "0.20 kg",
    dimensions: "5 x 5 x 12 cm",
    mainImage: "/photos/attars/maati.jpg",
    secondaryImage: "/photos/attars/maati-first-rain 2nd.jpg",
    gallery: ["/photos/attars/maati-golden-earth 1st.jpg", "/photos/attars/maati-first-rain 2nd.jpg", "/photos/attars/maati-heritage 3rd.jpg"],
    sizeOptions: ["3 ml", "6 ml", "12 ml", "30 ml"],
    defaultSize: "12 ml",
    variants: createStandardVariants("MAATI"),
    notes: {
      top: ["Petrichor accord", "wet earth", "green notes"],
      heart: ["Vetiver", "earthy accords", "soft woods"],
      base: ["Sandalwood", "musk", "warm clay accord"]
    },
    ingredients: ["Pure Clay Extract", "Essential Oils"],
    concentration: "100% Pure Attar Oil",
    longevity: "8-12 Hours",
    sillage: "Intimate",
    application: "Glass Wand Applicator",
    benefits: ["Earthy petrichor scent", "Calming daily ritual"],
    howToWear: "Apply a small touch on pulse points.",
    warnings: "For external application only.",
    shippingInformation: "Ships across India. Free shipping on all orders.",
    returnEligibility: "Non-returnable item once unsealed.",
    tags: ["petrichor", "earthy", "attar", "woody"],
    collections: ["attar", "woody"],
    isBestseller: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 38,
    colorTheme: "ivory",
    seoTitle: "Maati Pure Attar | Aarsika Fine Fragrance",
    seoDescription: "Discover Maati petrichor attar oil by Aarsika. Capturing the scent of earth after first rain.",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-10-09T00:00:00Z"
  },
  {
    id: "p3",
    slug: "saanjh",
    name: "Saanjh",
    tagline: "The calm after the chaos.",
    accent: "#E3CBA8",
    type: "Attar Oil",
    category: "ATTAR",
    subcategory: "Musk Attar",
    fragranceFamily: "MUSKY",
    gender: "Unisex",
    occasion: "Everyday",
    price: 249,
    shortDescription: "Saanjh captures the quiet transition from a busy day to a peaceful evening.",
    description: "Saanjh captures the quiet transition from a busy day to a peaceful evening. Fresh green nuances and delicate florals soften into musk, sandalwood and amber, an intimate, comforting fragrance for everyday rituals.",
    sku: "AAR-SAANJH-03",
    barcode: "890432100103",
    stock: 69,
    reservedQuantity: 0,
    lowStockThreshold: 10,
    weight: "0.20 kg",
    dimensions: "5 x 5 x 12 cm",
    mainImage: "/photos/attars/saanjh.jpg",
    secondaryImage: "/photos/attars/saanjh-quiet-evening 2nd.jpg",
    gallery: ["/photos/attars/saanjh-courtyard 1st.jpg", "/photos/attars/saanjh-quiet-evening 2nd.jpg", "/photos/attars/saanjh-golden-hour 1st.jpg"],
    sizeOptions: ["3 ml", "6 ml", "12 ml", "30 ml"],
    defaultSize: "12 ml",
    variants: createStandardVariants("SAANJH"),
    notes: {
      top: ["Soft citrus", "green notes", "aldehydes"],
      heart: ["White musk", "jasmine", "rose"],
      base: ["Musk", "sandalwood", "amber"]
    },
    ingredients: ["Botanical Extracts", "Pure Essential Oils"],
    concentration: "100% Pure Attar Oil",
    longevity: "8-12 Hours",
    sillage: "Moderate",
    application: "Glass Wand Applicator",
    benefits: ["Soothing evening scent", "Intimate skin finish"],
    howToWear: "Apply softly on wrists and neckline.",
    warnings: "For external application only.",
    shippingInformation: "Ships across India. Free shipping on all orders.",
    returnEligibility: "Non-returnable item once unsealed.",
    tags: ["musk", "evening", "attar"],
    collections: ["attar"],
    isBestseller: false,
    inStock: true,
    rating: 4.7,
    reviewsCount: 29,
    colorTheme: "gold",
    seoTitle: "Saanjh Pure Attar | Aarsika Fine Fragrance",
    seoDescription: "Discover Saanjh musk attar oil by Aarsika. Comforting evening fragrance for everyday rituals.",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-10-09T00:00:00Z"
  },
  {
    id: "p4",
    slug: "shaam-ka-noor",
    name: "Shaam Ka Noor",
    tagline: "When evenings turn into stories.",
    accent: "#B5532E",
    type: "Attar Oil",
    category: "ATTAR",
    subcategory: "Floral Oud",
    fragranceFamily: "OUD",
    gender: "Unisex",
    occasion: "Evening",
    price: 249,
    shortDescription: "Shaam Ka Noor opens with spice and citrus before settling into a rich floral-oud heart.",
    description: "Shaam Ka Noor opens with a gentle sparkle of spice and citrus before settling into a rich floral-oud heart. Amber, sandalwood and musk create a warm, lingering finish suited to unhurried evenings and memorable occasions.",
    sku: "AAR-SHAAM-KA-NOOR-03",
    barcode: "890432100104",
    stock: 69,
    reservedQuantity: 0,
    lowStockThreshold: 10,
    weight: "0.20 kg",
    dimensions: "5 x 5 x 12 cm",
    mainImage: "/photos/attars/shaam-ka-noor.jpg",
    secondaryImage: "/photos/attars/shaam-ka-noor-sunset 2nd.jpg",
    gallery: ["/photos/attars/shaam-ka-noor-main 1st.jpg", "/photos/attars/shaam-ka-noor-sunset 2nd.jpg", "/photos/attars/shaam-ka-noor-collection 3rd.jpg"],
    sizeOptions: ["3 ml", "6 ml", "12 ml", "30 ml"],
    defaultSize: "12 ml",
    variants: createStandardVariants("SHAAM-KA-NOOR"),
    notes: {
      top: ["Saffron", "spices", "citrus"],
      heart: ["Rose", "oud", "jasmine"],
      base: ["Amber", "sandalwood", "musk"]
    },
    ingredients: ["Aged Agarwood Oil", "Saffron Extract"],
    concentration: "100% Pure Attar Oil",
    longevity: "10-14 Hours",
    sillage: "Rich & Warm",
    application: "Glass Wand Applicator",
    benefits: ["Rich evening warmth", "Deep lingering finish"],
    howToWear: "Dab lightly on collar points and wrists.",
    warnings: "For external application only.",
    shippingInformation: "Ships across India. Free shipping on all orders.",
    returnEligibility: "Non-returnable item once unsealed.",
    tags: ["oud", "evening", "attar", "saffron"],
    collections: ["attar", "oud"],
    isBestseller: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 51,
    colorTheme: "emerald",
    seoTitle: "Shaam Ka Noor Attar | Aarsika Fine Fragrance",
    seoDescription: "Discover Shaam Ka Noor attar oil by Aarsika. Rich floral oud and amber for unhurried evenings.",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-10-09T00:00:00Z"
  },
  {
    id: "p5",
    slug: "raat-ki-rani",
    name: "Raat Ki Rani",
    tagline: "A night bloom, forever with you.",
    accent: "#1F2A52",
    type: "Attar Oil",
    category: "ATTAR",
    subcategory: "Night Jasmine Attar",
    fragranceFamily: "FLORAL",
    gender: "Unisex",
    occasion: "Evening",
    price: 249,
    shortDescription: "Inspired by flowers that reveal their beauty after dusk.",
    description: "Inspired by flowers that reveal their beauty after dusk, Raat Ki Rani begins with a delicate freshness before unfolding into a rich white-floral heart. Sandalwood, musk and vanilla leave a soft, warm trail with an air of mystery.",
    sku: "AAR-RAAT-KI-RANI-03",
    barcode: "890432100105",
    stock: 69,
    reservedQuantity: 0,
    lowStockThreshold: 10,
    weight: "0.20 kg",
    dimensions: "5 x 5 x 12 cm",
    mainImage: "/photos/attars/raat-ki-rani.jpg",
    secondaryImage: "/photos/attars/raat-ki-rani-twilight 2nd.jpg",
    gallery: ["/photos/attars/raat-ki-rani-heritage 1st.jpg", "/photos/attars/raat-ki-rani-twilight 2nd.jpg", "/photos/attars/raat-ki-rani-moonlit 3rd.jpg"],
    sizeOptions: ["3 ml", "6 ml", "12 ml", "30 ml"],
    defaultSize: "12 ml",
    variants: createStandardVariants("RAAT-KI-RANI"),
    notes: {
      top: ["Night-blooming floral accord", "jasmine", "citrus"],
      heart: ["Tuberose", "ylang-ylang", "soft spices"],
      base: ["Sandalwood", "musk", "amber", "vanilla"]
    },
    ingredients: ["Night Jasmine Absolute", "Vanilla Extract"],
    concentration: "100% Pure Attar Oil",
    longevity: "8-12 Hours",
    sillage: "Enchanting Floral",
    application: "Glass Wand Applicator",
    benefits: ["Captivating night floral", "Smooth vanilla sandalwood base"],
    howToWear: "Apply on wrists and behind ears.",
    warnings: "For external application only.",
    shippingInformation: "Ships across India. Free shipping on all orders.",
    returnEligibility: "Non-returnable item once unsealed.",
    tags: ["jasmine", "tuberose", "night-bloom", "attar"],
    collections: ["attar", "floral"],
    isBestseller: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 33,
    colorTheme: "blue",
    seoTitle: "Raat Ki Rani Attar | Aarsika Fine Fragrance",
    seoDescription: "Discover Raat Ki Rani night-blooming jasmine attar by Aarsika.",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-10-09T00:00:00Z"
  },
  {
    id: "p6",
    slug: "resham-oudh",
    name: "Resham Oudh",
    tagline: "Tradition in every drop.",
    accent: "#9A6A1E",
    type: "Attar Oil",
    category: "ATTAR",
    subcategory: "Silken Oud Attar",
    fragranceFamily: "OUD",
    gender: "Unisex",
    occasion: "Occasions",
    price: 249,
    shortDescription: "Resham Oudh brings together woody accords and the glow of amber.",
    description: "Resham Oudh brings together the richness of woody accords and the glow of amber in a smooth, enveloping fragrance. Saffron and gentle spice introduce the scent, while rose and sandalwood soften its oud heart.",
    sku: "AAR-RESHAM-OUDH-03",
    barcode: "890432100106",
    stock: 69,
    reservedQuantity: 0,
    lowStockThreshold: 10,
    weight: "0.20 kg",
    dimensions: "5 x 5 x 12 cm",
    mainImage: "/photos/attars/resham-oudh.jpg",
    secondaryImage: "/photos/attars/resham-oudh-palace 2nd.jpg",
    gallery: ["/photos/attars/resham-oudh-ad 1st.jpg", "/photos/attars/resham-oudh-palace 2nd.jpg", "/photos/attars/resham-oudh-collection 3rd.jpg"],
    sizeOptions: ["3 ml", "6 ml", "12 ml", "30 ml"],
    defaultSize: "12 ml",
    variants: createStandardVariants("RESHAM-OUDH"),
    notes: {
      top: ["Saffron", "bergamot", "soft spices"],
      heart: ["Oud", "rose", "sandalwood"],
      base: ["Amber", "musk", "vanilla"]
    },
    ingredients: ["Pure Oud Extract", "Rose & Saffron Oils"],
    concentration: "100% Pure Attar Oil",
    longevity: "12+ Hours",
    sillage: "Velvety & Enveloping",
    application: "Glass Wand Applicator",
    benefits: ["Smooth silken oud", "Warm amber trail"],
    howToWear: "Apply sparingly on pulse points.",
    warnings: "For external application only.",
    shippingInformation: "Ships across India. Free shipping on all orders.",
    returnEligibility: "Non-returnable item once unsealed.",
    tags: ["oud", "amber", "saffron", "attar"],
    collections: ["attar", "oud"],
    isBestseller: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 47,
    colorTheme: "gold",
    seoTitle: "Resham Oudh Attar | Aarsika Fine Fragrance",
    seoDescription: "Discover Resham Oudh attar oil by Aarsika. Silken woody accords and amber warmth.",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-10-09T00:00:00Z"
  },
  {
    id: "p7",
    slug: "mehfil",
    name: "Mehfil",
    tagline: "For evenings worth remembering.",
    accent: "#0F4C3A",
    type: "Attar Oil",
    category: "ATTAR",
    subcategory: "Celebration Attar",
    fragranceFamily: "OUD",
    gender: "Unisex",
    occasion: "Occasions",
    price: 249,
    shortDescription: "Mehfil is inspired by gatherings that turn ordinary evenings into unforgettable stories.",
    description: "Mehfil is inspired by gatherings that turn ordinary evenings into unforgettable stories. Saffron and citrus open the fragrance with warmth and brightness, while rose, jasmine and amber lend softness and depth. Oud, sandalwood and musk complete the composition.",
    sku: "AAR-MEHFIL-03",
    barcode: "890432100107",
    stock: 69,
    reservedQuantity: 0,
    lowStockThreshold: 10,
    weight: "0.20 kg",
    dimensions: "5 x 5 x 12 cm",
    mainImage: "/photos/attars/mehfil-1st.jpg",
    secondaryImage: "/photos/attars/mehfil-1st.jpg",
    gallery: ["/photos/attars/mehfil-1st.jpg", "/photos/attars/mehfil-1st.jpg", "/photos/attars/mehfil-1st.jpg"],
    sizeOptions: ["3 ml", "6 ml", "12 ml", "30 ml"],
    defaultSize: "12 ml",
    variants: createStandardVariants("MEHFIL"),
    notes: {
      top: ["Saffron", "citrus", "soft spices"],
      heart: ["Rose", "jasmine", "amber"],
      base: ["Oud", "sandalwood", "musk", "vanilla"]
    },
    ingredients: ["Saffron Oil", "Sandalwood & Oud Oils"],
    concentration: "100% Pure Attar Oil",
    longevity: "10-14 Hours",
    sillage: "Radiant & Inviting",
    application: "Glass Wand Applicator",
    benefits: ["Celebratory scent profile", "Rich multi-faceted bouquet"],
    howToWear: "Apply generously on cuffs and neck.",
    warnings: "For external application only.",
    shippingInformation: "Ships across India. Free shipping on all orders.",
    returnEligibility: "Non-returnable item once unsealed.",
    tags: ["mehfil", "saffron", "oud", "attar"],
    collections: ["attar", "oud"],
    isBestseller: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 40,
    colorTheme: "emerald",
    seoTitle: "Mehfil Attar Oil | Aarsika Fine Fragrance",
    seoDescription: "Discover Mehfil attar oil by Aarsika. Inspired by unforgettable gatherings.",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-10-09T00:00:00Z"
  },
  {
    id: "p9",
    slug: "discovery-set-attar",
    name: "Attar Discovery Set",
    type: "Discovery Set",
    category: "DISCOVERY SETS",
    subcategory: "Sampler Sets",
    fragranceFamily: "FLORAL",
    gender: "Unisex",
    occasion: "Everyday",
    price: 499,
    shortDescription: "Three to four attars, 3 ml each. Find your signature before you choose a full bottle. Free shipping across India.",
    description: "Three to four attars, 3 ml each. Find your signature before you choose a full bottle. Free shipping across India.",
    sku: "AAR-DISC-ATT-3",
    barcode: "890432100109",
    stock: 50,
    reservedQuantity: 0,
    lowStockThreshold: 10,
    weight: "0.30 kg",
    dimensions: "18 x 12 x 4 cm",
    mainImage: "/images/royal-gift-box.jpg",
    secondaryImage: "/images/gul-e-rooh.jpg",
    gallery: ["/images/royal-gift-box.jpg"],
    sizeOptions: ["3 x 3ml Discovery Vials"],
    defaultSize: "3 x 3ml Discovery Vials",
    variants: [
      { size: "3 x 3ml Discovery Vials", price: 499, sku: "AAR-DISC-ATT-3", stock: 50, batchNo: 1, batchSize: 50, nextSerial: 1, onRequest: false }
    ],
    notes: {
      top: ["Fresh Rose", "Petrichor", "Saffron"],
      heart: ["Jasmine", "Vetiver", "White Musk"],
      base: ["Sandalwood", "Oud", "Amber"]
    },
    ingredients: ["Three to four pure attar samples"],
    concentration: "100% Pure Attar Oil",
    longevity: "8-12 Hours",
    sillage: "Personal",
    application: "Sample Vials",
    benefits: ["Explore signature attars", "Includes free shipping across India"],
    howToWear: "Test each attar on clean skin across different days.",
    warnings: "External use only.",
    shippingInformation: "Ships across India in presentation sleeve.",
    returnEligibility: "Non-returnable item once opened.",
    tags: ["discovery", "samples", "attar", "gift"],
    collections: ["discovery-sets"],
    isBestseller: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 64,
    colorTheme: "gold",
    seoTitle: "Attar Discovery Set (₹499) | Aarsika Fine Fragrance",
    seoDescription: "Explore three to four attars, 3 ml each for ₹499 with free shipping across India.",
    createdAt: "2026-01-05T00:00:00Z",
    updatedAt: "2026-10-09T00:00:00Z"
  }
];
