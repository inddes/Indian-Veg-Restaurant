export type CuisineType = 'indian' | 'chinese';

export interface Dish {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  cuisine: CuisineType;
  category: string;
  categoryLabel: string;
  image: string;
  alt: string;
  featured: boolean;
  available: boolean;
}

// ── Cuisine hero images ──────────────────────────────────────────────────
export const cuisineHeroImages: Record<CuisineType, string> = {
  indian: 'https://images.pexels.com/photos/35539324/pexels-photo-35539324.jpeg?auto=compress&cs=tinysrgb&w=1200',
  chinese: 'https://images.pexels.com/photos/28445828/pexels-photo-28445828.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

export const cuisineMeta: Record<
  CuisineType,
  {
    label: string;
    flag: string;
    description: string;
    accentBg: string;
    accentText: string;
    accentBorder: string;
    heroImage: string;
  }
> = {
  indian: {
    label: 'Indian Cuisine',
    flag: '🇮🇳',
    description:
      'Traditional vegetarian Indian favourites prepared with authentic spices and fresh ingredients.',
    accentBg: 'bg-orange-600',
    accentText: 'text-orange-600',
    accentBorder: 'border-orange-600',
    heroImage: cuisineHeroImages.indian,
  },
  chinese: {
    label: 'Indo-Chinese Cuisine',
    flag: '🥢',
    description:
      'Popular vegetarian Indo-Chinese dishes combining bold Chinese flavours with an Indian twist.',
    accentBg: 'bg-red-600',
    accentText: 'text-red-600',
    accentBorder: 'border-red-600',
    heroImage: cuisineHeroImages.chinese,
  },
};

// ── All dishes (single source of truth) ──────────────────────────────────
// Prices are in GBP. Images are verified dish-specific vegetarian food photography.

export const dishes: Dish[] = [
  // ── Indian Starters ──────────────────────────────────────────────────
  {
    id: 'in-s-1',
    slug: 'samosa',
    name: 'Vegetable Samosa',
    description: 'Crispy golden triangular pastries filled with spiced potatoes and peas, served with mint and tamarind chutney.',
    price: 3.95,
    cuisine: 'indian',
    category: 'starters',
    categoryLabel: 'Starters',
    image: 'https://images.pexels.com/photos/9027521/pexels-photo-9027521.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian samosas served with green and tamarind chutneys on a white plate',
    featured: true,
    available: true,
  },
  {
    id: 'in-s-2',
    slug: 'aloo-bonda',
    name: 'Aloo Bonda',
    description: 'Crispy potato-filled fritters with aromatic Indian spices.',
    price: 4.50,
    cuisine: 'indian',
    category: 'starters',
    categoryLabel: 'Starters',
    image: 'https://images.pexels.com/photos/31109618/pexels-photo-31109618.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Crispy vegetarian potato fritters (aloo bonda)',
    featured: false,
    available: true,
  },
  {
    id: 'in-s-3',
    slug: 'dhokla',
    name: 'Dhokla',
    description: 'Soft and fluffy steamed savoury bites from Gujarat.',
    price: 3.95,
    cuisine: 'indian',
    category: 'starters',
    categoryLabel: 'Starters',
    image: 'https://images.pexels.com/photos/35041878/pexels-photo-35041878.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Steamed yellow dhokla, a vegetarian Gujarati snack',
    featured: false,
    available: true,
  },
  {
    id: 'in-s-4',
    slug: 'masala-vada',
    name: 'Masala Vada',
    description: 'Crispy lentil fritters seasoned with herbs and spices.',
    price: 4.25,
    cuisine: 'indian',
    category: 'starters',
    categoryLabel: 'Starters',
    image: 'https://images.pexels.com/photos/21751212/pexels-photo-21751212.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Crispy vegetarian lentil fritters (masala vada)',
    featured: false,
    available: true,
  },
  {
    id: 'in-s-5',
    slug: 'paneer-tikka',
    name: 'Paneer Tikka',
    description: 'Marinated paneer and vegetables grilled with Indian spices.',
    price: 6.95,
    cuisine: 'indian',
    category: 'starters',
    categoryLabel: 'Starters',
    image: 'https://images.pexels.com/photos/3928854/pexels-photo-3928854.png?auto=compress&cs=tinysrgb&w=800',
    alt: 'Grilled vegetarian paneer tikka with bell peppers',
    featured: true,
    available: true,
  },

  // ── Indian South Indian ──────────────────────────────────────────────
  {
    id: 'in-si-1',
    slug: 'masala-dosa',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato masala.',
    price: 5.95,
    cuisine: 'indian',
    category: 'south_indian',
    categoryLabel: 'South Indian',
    image: 'https://images.pexels.com/photos/12392915/pexels-photo-12392915.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Crispy vegetarian masala dosa with potato filling and chutneys',
    featured: true,
    available: true,
  },
  {
    id: 'in-si-2',
    slug: 'idli-sambar',
    name: 'Idli Sambar',
    description: 'Steamed rice cakes served with lentil sambar and chutney.',
    price: 4.95,
    cuisine: 'indian',
    category: 'south_indian',
    categoryLabel: 'South Indian',
    image: 'https://images.pexels.com/photos/35514447/pexels-photo-35514447.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Steamed vegetarian rice cakes (idli) with sambar and chutney',
    featured: false,
    available: true,
  },
  {
    id: 'in-si-3',
    slug: 'uttapam',
    name: 'Uttapam',
    description: 'Thick savoury pancake topped with onions and tomatoes.',
    price: 5.50,
    cuisine: 'indian',
    category: 'south_indian',
    categoryLabel: 'South Indian',
    image: 'https://images.pexels.com/photos/20422130/pexels-photo-20422130.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian uttapam pancake topped with onions and tomatoes',
    featured: false,
    available: true,
  },
  {
    id: 'in-si-4',
    slug: 'medu-vada',
    name: 'Medu Vada',
    description: 'Crispy golden lentil donuts served with coconut chutney.',
    price: 4.75,
    cuisine: 'indian',
    category: 'south_indian',
    categoryLabel: 'South Indian',
    image: 'https://images.pexels.com/photos/20422135/pexels-photo-20422135.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Crispy vegetarian lentil donuts (medu vada) with coconut chutney',
    featured: false,
    available: true,
  },

  // ── Indian Curries & Gravies ─────────────────────────────────────────
  {
    id: 'in-c-1',
    slug: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes in a rich, creamy tomato gravy.',
    price: 8.50,
    cuisine: 'indian',
    category: 'curries_gravies',
    categoryLabel: 'Curries & Gravies',
    image: 'https://images.pexels.com/photos/11188417/pexels-photo-11188417.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian paneer butter masala in creamy tomato gravy',
    featured: true,
    available: true,
  },
  {
    id: 'in-c-2',
    slug: 'dal-makhani',
    name: 'Dal Makhani',
    description: 'Black lentils slow-cooked overnight with butter and cream.',
    price: 6.95,
    cuisine: 'indian',
    category: 'curries_gravies',
    categoryLabel: 'Curries & Gravies',
    image: 'https://images.pexels.com/photos/37182513/pexels-photo-37182513.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian dal makhani, slow-cooked black lentils with butter',
    featured: true,
    available: true,
  },
  {
    id: 'in-c-3',
    slug: 'palak-paneer',
    name: 'Palak Paneer',
    description: 'Cottage cheese in a smooth, creamy spinach gravy.',
    price: 7.50,
    cuisine: 'indian',
    category: 'curries_gravies',
    categoryLabel: 'Curries & Gravies',
    image: 'https://images.pexels.com/photos/31249589/pexels-photo-31249589.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian palak paneer, cottage cheese in creamy spinach gravy',
    featured: true,
    available: true,
  },
  {
    id: 'in-c-4',
    slug: 'malai-kofta',
    name: 'Malai Kofta',
    description: 'Vegetable and paneer dumplings in a rich cashew gravy.',
    price: 7.95,
    cuisine: 'indian',
    category: 'curries_gravies',
    categoryLabel: 'Curries & Gravies',
    image: 'https://images.pexels.com/photos/36343375/pexels-photo-36343375.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian malai kofta, vegetable and paneer dumplings in cashew gravy',
    featured: false,
    available: true,
  },
  {
    id: 'in-c-5',
    slug: 'chole-masala',
    name: 'Chole Masala',
    description: 'Punjabi-style spicy chickpea curry with aromatic spices.',
    price: 5.95,
    cuisine: 'indian',
    category: 'curries_gravies',
    categoryLabel: 'Curries & Gravies',
    image: 'https://images.pexels.com/photos/9287035/pexels-photo-9287035.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian chole masala, Punjabi-style spicy chickpea curry',
    featured: false,
    available: true,
  },
  {
    id: 'in-c-6',
    slug: 'chole-bhature',
    name: 'Chole Bhature',
    description: 'Fluffy deep-fried bread served with a rich and spicy chickpea curry.',
    price: 6.50,
    cuisine: 'indian',
    category: 'curries_gravies',
    categoryLabel: 'Curries & Gravies',
    image: 'https://images.pexels.com/photos/36388454/pexels-photo-36388454.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian chole bhature, fluffy fried bread with chickpea curry',
    featured: true,
    available: true,
  },
  {
    id: 'in-c-7',
    slug: 'pav-bhaji',
    name: 'Pav Bhaji',
    description: 'Buttery spiced vegetable mash served with toasted soft bread rolls.',
    price: 5.95,
    cuisine: 'indian',
    category: 'curries_gravies',
    categoryLabel: 'Curries & Gravies',
    image: 'https://images.pexels.com/photos/166654/pexels-photo-166654.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian pav bhaji, buttery spiced vegetable mash with bread rolls',
    featured: false,
    available: true,
  },
  {
    id: 'in-c-8',
    slug: 'dal-tadka',
    name: 'Dal Tadka',
    description: 'Yellow lentils tempered with ghee, cumin, garlic and dried red chillies.',
    price: 5.50,
    cuisine: 'indian',
    category: 'curries_gravies',
    categoryLabel: 'Curries & Gravies',
    image: 'https://images.pexels.com/photos/38108860/pexels-photo-38108860.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian dal tadka, yellow lentils tempered with ghee and cumin',
    featured: false,
    available: true,
  },

  // ── Indian Tandoori ──────────────────────────────────────────────────
  {
    id: 'in-t-1',
    slug: 'tandoori-paneer-tikka',
    name: 'Tandoori Paneer Tikka',
    description: 'Clay-oven grilled paneer with bell peppers and mint chutney.',
    price: 8.50,
    cuisine: 'indian',
    category: 'tandoori',
    categoryLabel: 'Tandoori',
    image: 'https://images.pexels.com/photos/33430556/pexels-photo-33430556.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Tandoori vegetarian paneer tikka with bell peppers and mint chutney',
    featured: false,
    available: true,
  },
  {
    id: 'in-t-2',
    slug: 'veg-seekh-kebab',
    name: 'Veg Seekh Kebab',
    description: 'Skewered vegetable kebabs grilled in the tandoor.',
    price: 6.95,
    cuisine: 'indian',
    category: 'tandoori',
    categoryLabel: 'Tandoori',
    image: 'https://images.pexels.com/photos/37080242/pexels-photo-37080242.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian seekh kebabs grilled on skewers',
    featured: false,
    available: true,
  },
  {
    id: 'in-t-3',
    slug: 'tandoori-mushroom',
    name: 'Tandoori Mushroom',
    description: 'Mushrooms marinated in yogurt and tandoori spices, grilled.',
    price: 6.50,
    cuisine: 'indian',
    category: 'tandoori',
    categoryLabel: 'Tandoori',
    image: 'https://images.pexels.com/photos/36701469/pexels-photo-36701469.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian tandoori mushrooms marinated in yogurt and spices',
    featured: false,
    available: true,
  },

  // ── Indian Rice & Biryani ────────────────────────────────────────────
  {
    id: 'in-r-1',
    slug: 'veg-biryani',
    name: 'Vegetable Biryani',
    description: 'Aromatic basmati rice layered with mixed vegetables and saffron.',
    price: 7.50,
    cuisine: 'indian',
    category: 'rice_biryani',
    categoryLabel: 'Rice & Biryani',
    image: 'https://images.pexels.com/photos/37303308/pexels-photo-37303308.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian vegetable biryani with saffron basmati rice',
    featured: true,
    available: true,
  },
  {
    id: 'in-r-2',
    slug: 'jeera-rice',
    name: 'Jeera Rice',
    description: 'Basmati rice tempered with fragrant cumin seeds.',
    price: 4.50,
    cuisine: 'indian',
    category: 'rice_biryani',
    categoryLabel: 'Rice & Biryani',
    image: 'https://images.pexels.com/photos/28674713/pexels-photo-28674713.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian jeera rice, basmati rice tempered with cumin seeds',
    featured: false,
    available: true,
  },
  {
    id: 'in-r-3',
    slug: 'peas-pulao',
    name: 'Peas Pulao',
    description: 'Fragrant basmati rice cooked with green peas and whole spices.',
    price: 5.25,
    cuisine: 'indian',
    category: 'rice_biryani',
    categoryLabel: 'Rice & Biryani',
    image: 'https://images.pexels.com/photos/35552983/pexels-photo-35552983.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian peas pulao, fragrant basmati rice with green peas',
    featured: false,
    available: true,
  },

  // ── Indian Breads ────────────────────────────────────────────────────
  {
    id: 'in-b-1',
    slug: 'butter-naan',
    name: 'Butter Naan',
    description: 'Soft leavened bread brushed with butter from the tandoor.',
    price: 2.95,
    cuisine: 'indian',
    category: 'breads',
    categoryLabel: 'Indian Breads',
    image: 'https://images.pexels.com/photos/16851842/pexels-photo-16851842.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian butter naan, soft leavened bread brushed with butter',
    featured: false,
    available: true,
  },
  {
    id: 'in-b-2',
    slug: 'garlic-naan',
    name: 'Garlic Naan',
    description: 'Naan bread topped with fresh garlic and coriander.',
    price: 3.50,
    cuisine: 'indian',
    category: 'breads',
    categoryLabel: 'Indian Breads',
    image: 'https://images.pexels.com/photos/10337726/pexels-photo-10337726.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian garlic naan topped with fresh garlic and coriander',
    featured: false,
    available: true,
  },
  {
    id: 'in-b-3',
    slug: 'tandoori-roti',
    name: 'Tandoori Roti',
    description: 'Whole wheat flatbread baked in the clay oven.',
    price: 1.95,
    cuisine: 'indian',
    category: 'breads',
    categoryLabel: 'Indian Breads',
    image: 'https://images.pexels.com/photos/28674556/pexels-photo-28674556.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian tandoori roti, whole wheat flatbread from the clay oven',
    featured: false,
    available: true,
  },
  {
    id: 'in-b-4',
    slug: 'laccha-paratha',
    name: 'Laccha Paratha',
    description: 'Flaky, layered whole wheat flatbread.',
    price: 2.75,
    cuisine: 'indian',
    category: 'breads',
    categoryLabel: 'Indian Breads',
    image: 'https://images.pexels.com/photos/39833406/pexels-photo-39833406.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian laccha paratha, flaky layered whole wheat flatbread',
    featured: false,
    available: true,
  },

  // ── Indo-Chinese Starters ────────────────────────────────────────────
  {
    id: 'ch-s-1',
    slug: 'chilli-paneer',
    name: 'Chilli Paneer',
    description: 'Paneer tossed with peppers, onions and a spicy Indo-Chinese sauce.',
    price: 6.95,
    cuisine: 'chinese',
    category: 'starters',
    categoryLabel: 'Starters',
    image: 'https://images.pexels.com/photos/29631468/pexels-photo-29631468.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian chilli paneer with peppers and onions in Indo-Chinese sauce',
    featured: true,
    available: true,
  },
  {
    id: 'ch-s-2',
    slug: 'chilli-gobi',
    name: 'Chilli Gobi',
    description: 'Crispy cauliflower tossed in a spicy chilli and garlic sauce.',
    price: 5.95,
    cuisine: 'chinese',
    category: 'starters',
    categoryLabel: 'Starters',
    image: 'https://images.pexels.com/photos/35071824/pexels-photo-35071824.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian chilli gobi, crispy cauliflower in spicy chilli garlic sauce',
    featured: false,
    available: true,
  },
  {
    id: 'ch-s-3',
    slug: 'honey-chilli-potato',
    name: 'Honey Chilli Potato',
    description: 'Crispy potatoes coated in a sweet and spicy chilli glaze.',
    price: 7.25,
    cuisine: 'chinese',
    category: 'starters',
    categoryLabel: 'Starters',
    image: 'https://images.pexels.com/photos/11485199/pexels-photo-11485199.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian honey chilli potato, crispy potatoes in sweet spicy glaze',
    featured: false,
    available: true,
  },
  {
    id: 'ch-s-4',
    slug: 'veg-spring-rolls',
    name: 'Veg Spring Rolls',
    description: 'Crispy golden rolls filled with seasoned vegetables.',
    price: 4.50,
    cuisine: 'chinese',
    category: 'starters',
    categoryLabel: 'Starters',
    image: 'https://images.pexels.com/photos/34767648/pexels-photo-34767648.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian spring rolls, crispy golden rolls filled with vegetables',
    featured: false,
    available: true,
  },

  // ── Indo-Chinese Manchurian ──────────────────────────────────────────
  {
    id: 'ch-m-1',
    slug: 'gobi-manchurian',
    name: 'Gobi Manchurian',
    description: 'Crispy cauliflower coated in a tangy Manchurian sauce.',
    price: 5.95,
    cuisine: 'chinese',
    category: 'manchurian',
    categoryLabel: 'Manchurian',
    image: 'https://images.pexels.com/photos/28674543/pexels-photo-28674543.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian gobi manchurian, crispy cauliflower in tangy Manchurian sauce',
    featured: true,
    available: true,
  },
  {
    id: 'ch-m-2',
    slug: 'veg-manchurian',
    name: 'Veg Manchurian',
    description: 'Vegetable balls in a tangy, spicy Indo-Chinese gravy.',
    price: 5.95,
    cuisine: 'chinese',
    category: 'manchurian',
    categoryLabel: 'Manchurian',
    image: 'https://images.pexels.com/photos/35066808/pexels-photo-35066808.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian veg manchurian, vegetable balls in Indo-Chinese gravy',
    featured: false,
    available: true,
  },
  {
    id: 'ch-m-3',
    slug: 'paneer-manchurian',
    name: 'Paneer Manchurian',
    description: 'Cottage cheese cubes in a spicy Manchurian gravy.',
    price: 6.95,
    cuisine: 'chinese',
    category: 'manchurian',
    categoryLabel: 'Manchurian',
    image: 'https://images.pexels.com/photos/31783383/pexels-photo-31783383.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian paneer manchurian, cottage cheese cubes in spicy Manchurian gravy',
    featured: false,
    available: true,
  },

  // ── Indo-Chinese Noodles ─────────────────────────────────────────────
  {
    id: 'ch-n-1',
    slug: 'veg-hakka-noodles',
    name: 'Vegetable Hakka Noodles',
    description: 'Stir-fried noodles with fresh vegetables and Indo-Chinese sauces.',
    price: 5.25,
    cuisine: 'chinese',
    category: 'noodles',
    categoryLabel: 'Noodles',
    image: 'https://images.pexels.com/photos/37165674/pexels-photo-37165674.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian vegetable hakka noodles stir-fried with vegetables',
    featured: true,
    available: true,
  },
  {
    id: 'ch-n-2',
    slug: 'schezwan-noodles',
    name: 'Schezwan Noodles',
    description: 'Spicy noodles tossed in fiery schezwan sauce with vegetables.',
    price: 5.95,
    cuisine: 'chinese',
    category: 'noodles',
    categoryLabel: 'Noodles',
    image: 'https://images.pexels.com/photos/35779075/pexels-photo-35779075.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian schezwan noodles in fiery schezwan sauce with vegetables',
    featured: false,
    available: true,
  },

  // ── Indo-Chinese Fried Rice ──────────────────────────────────────────
  {
    id: 'ch-fr-1',
    slug: 'veg-fried-rice',
    name: 'Veg Fried Rice',
    description: 'Classic fried rice with mixed vegetables and soy sauce.',
    price: 7.25,
    cuisine: 'chinese',
    category: 'fried_rice',
    categoryLabel: 'Fried Rice',
    image: 'https://images.pexels.com/photos/35588196/pexels-photo-35588196.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian veg fried rice with mixed vegetables and soy sauce',
    featured: false,
    available: true,
  },
  {
    id: 'ch-fr-2',
    slug: 'schezwan-fried-rice',
    name: 'Schezwan Fried Rice',
    description: 'Spicy fried rice tossed in schezwan sauce with vegetables.',
    price: 5.95,
    cuisine: 'chinese',
    category: 'fried_rice',
    categoryLabel: 'Fried Rice',
    image: 'https://images.pexels.com/photos/9148224/pexels-photo-9148224.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian schezwan fried rice in spicy schezwan sauce with vegetables',
    featured: false,
    available: true,
  },

  // ── Indo-Chinese Mains ───────────────────────────────────────────────
  {
    id: 'ch-im-1',
    slug: 'chilli-mushroom',
    name: 'Chilli Mushroom',
    description: 'Mushrooms tossed with peppers, onions and Indo-Chinese seasoning.',
    price: 6.95,
    cuisine: 'chinese',
    category: 'indo_chinese_mains',
    categoryLabel: 'Indo-Chinese Mains',
    image: 'https://images.pexels.com/photos/5848433/pexels-photo-5848433.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian chilli mushroom with peppers and Indo-Chinese seasoning',
    featured: false,
    available: true,
  },
  {
    id: 'ch-im-2',
    slug: 'veg-manchurian-gravy',
    name: 'Veg Manchurian Gravy',
    description: 'Vegetable Manchurian balls in a rich, spicy gravy served hot.',
    price: 5.95,
    cuisine: 'chinese',
    category: 'indo_chinese_mains',
    categoryLabel: 'Indo-Chinese Mains',
    image: 'https://images.pexels.com/photos/29631489/pexels-photo-29631489.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian veg manchurian gravy, vegetable balls in rich spicy gravy',
    featured: false,
    available: true,
  },
  {
    id: 'ch-im-3',
    slug: 'schezwan-chilli-potato',
    name: 'Schezwan Chilli Potato',
    description: 'Crispy potatoes in a fiery schezwan and chilli sauce.',
    price: 5.25,
    cuisine: 'chinese',
    category: 'indo_chinese_mains',
    categoryLabel: 'Indo-Chinese Mains',
    image: 'https://images.pexels.com/photos/28674530/pexels-photo-28674530.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian schezwan chilli potato, crispy potatoes in fiery schezwan sauce',
    featured: false,
    available: true,
  },

  // ── Indian Street Food / Chaat (Gallery additional items) ────────────
  {
    id: 'in-cf-1',
    slug: 'samosa-chaat',
    name: 'Samosa Chaat',
    description: 'Crushed crispy samosas topped with chickpeas, chutneys, yogurt and sev.',
    price: 4.95,
    cuisine: 'indian',
    category: 'starters',
    categoryLabel: 'Starters',
    image: 'https://images.pexels.com/photos/23286188/pexels-photo-23286188.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vegetarian samosa chaat, crushed samosas with chickpeas, chutneys and sev',
    featured: false,
    available: true,
  },
];

// ── Derived helpers ──────────────────────────────────────────────────────

export function getFeaturedDishes(): Dish[] {
  return dishes.filter((d) => d.featured);
}

export function getDishesByCuisine(cuisine: CuisineType): Dish[] {
  return dishes.filter((d) => d.cuisine === cuisine);
}

export function getDishBySlug(slug: string): Dish | undefined {
  return dishes.find((d) => d.slug === slug);
}

export interface Category {
  key: string;
  label: string;
  dishes: Dish[];
}

export function getCategoriesByCuisine(cuisine: CuisineType): Category[] {
  const cuisineDishes = getDishesByCuisine(cuisine);
  const categoryMap = new Map<string, Category>();

  for (const dish of cuisineDishes) {
    if (!categoryMap.has(dish.category)) {
      categoryMap.set(dish.category, {
        key: dish.category,
        label: dish.categoryLabel,
        dishes: [],
      });
    }
    categoryMap.get(dish.category)!.dishes.push(dish);
  }

  return Array.from(categoryMap.values());
}

export function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}
