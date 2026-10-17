export interface RawMaterial {
  id: string;
  name: string;
  origin: string;
  character: string;
  desc: string;
  imageWebp: string;
  imageAvif: string;
  alt: string;
}

/**
 * The 5 approved heritage ingredients for "The Raw Materials" section.
 * Order: Assam Oud, Night Jasmine, Kashmiri Saffron, Mysore Sandalwood, Vetiver (Khus)
 */
export const FIVE_HERITAGE_RAW_MATERIALS: RawMaterial[] = [
  {
    id: 'assam-oud',
    name: 'Assam Oud',
    origin: 'Upper Assam Wild Groves',
    character: 'Resinous smoky depth',
    desc: 'Aged resinous agarwood providing profound smokiness and magnetic warmth.',
    imageWebp: '/photos/ingredients/assam-oud.webp',
    imageAvif: '/photos/ingredients/assam-oud.avif',
    alt: 'Aged resinous Assam agarwood heartwood chips and incense wood',
  },
  {
    id: 'night-jasmine',
    name: 'Night Jasmine',
    origin: 'Rajasthan Palace Courtyards',
    character: 'Ethereal nocturnal sweetness',
    desc: 'Night-blooming white florals picked under moonlight with intoxicating sweetness.',
    imageWebp: '/photos/ingredients/night-jasmine.webp',
    imageAvif: '/photos/ingredients/night-jasmine.avif',
    alt: 'Porcelain white night-blooming jasmine flowers with dewdrops',
  },
  {
    id: 'kashmiri-saffron',
    name: 'Kashmiri Saffron',
    origin: 'Pampore, Kashmir',
    character: 'Exotic golden spice warmth',
    desc: 'Golden crimson threads infusing exotic spice and warm leather nuances.',
    imageWebp: '/photos/ingredients/kashmiri-saffron.webp',
    imageAvif: '/photos/ingredients/kashmiri-saffron.avif',
    alt: 'Vibrant crimson Kashmiri saffron threads on antique brass dish',
  },
  {
    id: 'mysore-sandalwood',
    name: 'Mysore Sandalwood',
    origin: 'Karnataka Sacred Forests',
    character: 'Sacred creamy calmness',
    desc: 'Creamy heartwood anchoring compositions with serene sacred comfort.',
    imageWebp: '/photos/ingredients/mysore-sandalwood.webp',
    imageAvif: '/photos/ingredients/mysore-sandalwood.avif',
    alt: 'Creamy Mysore sandalwood logs and carved aromatic wood shavings',
  },
  {
    id: 'vetiver-khus',
    name: 'Vetiver (Khus)',
    origin: 'North Indian Riverbanks',
    character: 'Earthy green root cooling',
    desc: 'Cooling wild riverbank roots evoking the first raindrops on parched clay.',
    imageWebp: '/photos/ingredients/vetiver-khus.webp',
    imageAvif: '/photos/ingredients/vetiver-khus.avif',
    alt: 'Natural aromatic golden-brown vetiver grass root bundles',
  },
];

export const RAW_MATERIALS: RawMaterial[] = [
  ...FIVE_HERITAGE_RAW_MATERIALS,
  {
    id: 'damask-rose',
    name: 'Damask Rose',
    origin: 'Pushkar & Kannauj',
    character: 'Velvety floral radiance',
    desc: 'Velvety petals harvested at dawn, offering a radiant, timeless floral signature.',
    imageWebp: '/photos/ingredients/damask-rose.webp',
    imageAvif: '/photos/ingredients/damask-rose.avif',
    alt: 'Fresh hand-picked Damask roses with morning dewdrops',
  },
  {
    id: 'mitti-earth',
    name: 'Mitti (Earth)',
    origin: 'Kannauj Baked Clay',
    character: 'First rain petrichor aura',
    desc: 'Baked terracotta earth distilling the serene intoxicating scent of monsoon.',
    imageWebp: '/photos/ingredients/mitti-earth.webp',
    imageAvif: '/photos/ingredients/mitti-earth.avif',
    alt: 'Baked Indian terracotta earthenware discs and petrichor rain-soaked clay',
  },
  {
    id: 'bourbon-vanilla',
    name: 'Vanilla',
    origin: 'Bourbon Cured Beans',
    character: 'Gourmand velvety warmth',
    desc: 'Slow-cured black vanilla pods infusing comforting warmth and sweet depth.',
    imageWebp: '/photos/ingredients/bourbon-vanilla.webp',
    imageAvif: '/photos/ingredients/bourbon-vanilla.avif',
    alt: 'Cured black Bourbon vanilla pods split open showing vanilla caviar seeds',
  },
  {
    id: 'tobacco-leaf',
    name: 'Tobacco Leaf',
    origin: 'Aromatic Sun-Cured',
    character: 'Rich honeyed leather smoke',
    desc: 'Sun-cured golden leaves imparting rich leathery depth and dry warmth.',
    imageWebp: '/photos/ingredients/tobacco-leaf.webp',
    imageAvif: '/photos/ingredients/tobacco-leaf.avif',
    alt: 'Golden-amber cured whole tobacco leaves with intricate veins',
  },
  {
    id: 'chocolate-oud',
    name: 'Chocolate & Oud',
    origin: 'Artisanal Perfume Blend',
    character: 'Dark cacao with aged oud wood',
    desc: 'Bittersweet dark cacao meeting aged resinous agarwood for smoky decadence.',
    imageWebp: '/photos/ingredients/chocolate-oud.webp',
    imageAvif: '/photos/ingredients/chocolate-oud.avif',
    alt: 'Dark artisanal raw chocolate chunks with resinous smoky oud chips',
  },
];
