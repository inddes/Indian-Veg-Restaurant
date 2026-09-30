import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Phone, UtensilsCrossed } from 'lucide-react';

type CuisineType = 'indian' | 'chinese';

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

interface Category {
  key: string;
  label: string;
  dishes: Dish[];
}

const indianHero = 'https://images.pexels.com/photos/35539324/pexels-photo-35539324.jpeg?auto=compress&cs=tinysrgb&w=1200';
const chineseHero = 'https://images.pexels.com/photos/28445828/pexels-photo-28445828.jpeg?auto=compress&cs=tinysrgb&w=1200';

const indianCategories: Category[] = [
  {
    key: 'starters',
    label: 'Starters',
    dishes: [
      {
        id: 'in-s-1',
        name: 'Aloo Bonda',
        description: 'Crispy potato-filled fritters with aromatic Indian spices.',
        price: 4.50,
        image: 'https://images.pexels.com/photos/31109618/pexels-photo-31109618.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-s-2',
        name: 'Dhokla',
        description: 'Soft and fluffy steamed savoury bites from Gujarat.',
        price: 3.95,
        image: 'https://images.pexels.com/photos/35041878/pexels-photo-35041878.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-s-3',
        name: 'Masala Vada',
        description: 'Crispy lentil fritters seasoned with herbs and spices.',
        price: 4.25,
        image: 'https://images.pexels.com/photos/21751212/pexels-photo-21751212.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-s-4',
        name: 'Paneer Tikka',
        description: 'Marinated paneer and vegetables grilled with Indian spices.',
        price: 6.95,
        image: 'https://images.pexels.com/photos/3928854/pexels-photo-3928854.png?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
    ],
  },
  {
    key: 'south_indian',
    label: 'South Indian',
    dishes: [
      {
        id: 'in-si-1',
        name: 'Masala Dosa',
        description: 'Crispy rice crepe filled with spiced potato masala.',
        price: 5.95,
        image: 'https://images.pexels.com/photos/12392915/pexels-photo-12392915.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-si-2',
        name: 'Idli Sambar',
        description: 'Steamed rice cakes served with lentil sambar and chutney.',
        price: 4.95,
        image: 'https://images.pexels.com/photos/35514447/pexels-photo-35514447.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-si-3',
        name: 'Uttapam',
        description: 'Thick savoury pancake topped with onions and tomatoes.',
        price: 5.50,
        image: 'https://images.pexels.com/photos/20422130/pexels-photo-20422130.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-si-4',
        name: 'Medu Vada',
        description: 'Crispy golden lentil donuts served with coconut chutney.',
        price: 4.75,
        image: 'https://images.pexels.com/photos/20422135/pexels-photo-20422135.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
    ],
  },
  {
    key: 'curries_gravies',
    label: 'Curries & Gravies',
    dishes: [
      {
        id: 'in-c-1',
        name: 'Paneer Butter Masala',
        description: 'Cottage cheese cubes in a rich, creamy tomato gravy.',
        price: 8.50,
        image: 'https://images.pexels.com/photos/11188417/pexels-photo-11188417.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-c-2',
        name: 'Dal Makhani',
        description: 'Black lentils slow-cooked overnight with butter and cream.',
        price: 6.95,
        image: 'https://images.pexels.com/photos/37182513/pexels-photo-37182513.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-c-3',
        name: 'Palak Paneer',
        description: 'Cottage cheese in a smooth, creamy spinach gravy.',
        price: 7.50,
        image: 'https://images.pexels.com/photos/31249589/pexels-photo-31249589.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-c-4',
        name: 'Malai Kofta',
        description: 'Vegetable and paneer dumplings in a rich cashew gravy.',
        price: 7.95,
        image: 'https://images.pexels.com/photos/36343375/pexels-photo-36343375.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-c-5',
        name: 'Chole Masala',
        description: 'Punjabi-style spicy chickpea curry with aromatic spices.',
        price: 5.95,
        image: 'https://images.pexels.com/photos/9287035/pexels-photo-9287035.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
    ],
  },
  {
    key: 'tandoori',
    label: 'Tandoori',
    dishes: [
      {
        id: 'in-t-1',
        name: 'Tandoori Paneer Tikka',
        description: 'Clay-oven grilled paneer with bell peppers and mint chutney.',
        price: 8.50,
        image: 'https://images.pexels.com/photos/33430556/pexels-photo-33430556.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-t-2',
        name: 'Veg Seekh Kebab',
        description: 'Skewered vegetable kebabs grilled in the tandoor.',
        price: 6.95,
        image: 'https://images.pexels.com/photos/37080242/pexels-photo-37080242.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-t-3',
        name: 'Tandoori Mushroom',
        description: 'Mushrooms marinated in yogurt and tandoori spices, grilled.',
        price: 6.50,
        image: 'https://images.pexels.com/photos/36701469/pexels-photo-36701469.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
    ],
  },
  {
    key: 'rice_biryani',
    label: 'Rice & Biryani',
    dishes: [
      {
        id: 'in-r-1',
        name: 'Veg Biryani',
        description: 'Aromatic basmati rice layered with mixed vegetables and saffron.',
        price: 7.50,
        image: 'https://images.pexels.com/photos/37303308/pexels-photo-37303308.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-r-2',
        name: 'Jeera Rice',
        description: 'Basmati rice tempered with fragrant cumin seeds.',
        price: 4.50,
        image: 'https://images.pexels.com/photos/28674713/pexels-photo-28674713.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-r-3',
        name: 'Peas Pulao',
        description: 'Fragrant basmati rice cooked with green peas and whole spices.',
        price: 5.25,
        image: 'https://images.pexels.com/photos/35552983/pexels-photo-35552983.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
    ],
  },
  {
    key: 'breads',
    label: 'Indian Breads',
    dishes: [
      {
        id: 'in-b-1',
        name: 'Butter Naan',
        description: 'Soft leavened bread brushed with butter from the tandoor.',
        price: 2.95,
        image: 'https://images.pexels.com/photos/16851842/pexels-photo-16851842.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-b-2',
        name: 'Garlic Naan',
        description: 'Naan bread topped with fresh garlic and coriander.',
        price: 3.50,
        image: 'https://images.pexels.com/photos/10337726/pexels-photo-10337726.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-b-3',
        name: 'Tandoori Roti',
        description: 'Whole wheat flatbread baked in the clay oven.',
        price: 1.95,
        image: 'https://images.pexels.com/photos/28674556/pexels-photo-28674556.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'in-b-4',
        name: 'Laccha Paratha',
        description: 'Flaky, layered whole wheat flatbread.',
        price: 2.75,
        image: 'https://images.pexels.com/photos/39833406/pexels-photo-39833406.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
    ],
  },
];

const chineseCategories: Category[] = [
  {
    key: 'starters',
    label: 'Starters',
    dishes: [
      {
        id: 'ch-s-1',
        name: 'Chilli Paneer',
        description: 'Paneer tossed with peppers, onions and a spicy Indo-Chinese sauce.',
        price: 6.95,
        image: 'https://images.pexels.com/photos/29631468/pexels-photo-29631468.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'ch-s-2',
        name: 'Chilli Gobi',
        description: 'Crispy cauliflower tossed in a spicy chilli and garlic sauce.',
        price: 5.95,
        image: 'https://images.pexels.com/photos/35071824/pexels-photo-35071824.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'ch-s-3',
        name: 'Honey Chilli Potato',
        description: 'Crispy potatoes coated in a sweet and spicy chilli glaze.',
        price: 7.25,
        image: 'https://images.pexels.com/photos/11485199/pexels-photo-11485199.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'ch-s-4',
        name: 'Veg Spring Rolls',
        description: 'Crispy golden rolls filled with seasoned vegetables.',
        price: 4.50,
        image: 'https://images.pexels.com/photos/34767648/pexels-photo-34767648.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
    ],
  },
  {
    key: 'manchurian',
    label: 'Manchurian',
    dishes: [
      {
        id: 'ch-m-1',
        name: 'Gobi Manchurian',
        description: 'Crispy cauliflower coated in a tangy Manchurian sauce.',
        price: 5.95,
        image: 'https://images.pexels.com/photos/28674543/pexels-photo-28674543.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'ch-m-2',
        name: 'Veg Manchurian',
        description: 'Vegetable balls in a tangy, spicy Indo-Chinese gravy.',
        price: 5.95,
        image: 'https://images.pexels.com/photos/35066808/pexels-photo-35066808.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'ch-m-3',
        name: 'Paneer Manchurian',
        description: 'Cottage cheese cubes in a spicy Manchurian gravy.',
        price: 6.95,
        image: 'https://images.pexels.com/photos/31783383/pexels-photo-31783383.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
    ],
  },
  {
    key: 'noodles',
    label: 'Noodles',
    dishes: [
      {
        id: 'ch-n-1',
        name: 'Vegetable Hakka Noodles',
        description: 'Stir-fried noodles with fresh vegetables and Indo-Chinese sauces.',
        price: 5.25,
        image: 'https://images.pexels.com/photos/37165674/pexels-photo-37165674.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'ch-n-2',
        name: 'Schezwan Noodles',
        description: 'Spicy noodles tossed in fiery schezwan sauce with vegetables.',
        price: 5.95,
        image: 'https://images.pexels.com/photos/35779075/pexels-photo-35779075.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
    ],
  },
  {
    key: 'fried_rice',
    label: 'Fried Rice',
    dishes: [
      {
        id: 'ch-fr-1',
        name: 'Veg Fried Rice',
        description: 'Classic fried rice with mixed vegetables and soy sauce.',
        price: 7.25,
        image: 'https://images.pexels.com/photos/35588196/pexels-photo-35588196.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'ch-fr-2',
        name: 'Schezwan Fried Rice',
        description: 'Spicy fried rice tossed in schezwan sauce with vegetables.',
        price: 5.95,
        image: 'https://images.pexels.com/photos/9148224/pexels-photo-9148224.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
    ],
  },
  {
    key: 'indo_chinese_mains',
    label: 'Indo-Chinese Mains',
    dishes: [
      {
        id: 'ch-im-1',
        name: 'Chilli Mushroom',
        description: 'Mushrooms tossed with peppers, onions and Indo-Chinese seasoning.',
        price: 6.95,
        image: 'https://images.pexels.com/photos/5848433/pexels-photo-5848433.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'ch-im-2',
        name: 'Veg Manchurian Gravy',
        description: 'Vegetable Manchurian balls in a rich, spicy gravy served hot.',
        price: 5.95,
        image: 'https://images.pexels.com/photos/29631489/pexels-photo-29631489.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
      {
        id: 'ch-im-3',
        name: 'Schezwan Chilli Potato',
        description: 'Crispy potatoes in a fiery schezwan and chilli sauce.',
        price: 5.25,
        image: 'https://images.pexels.com/photos/28674530/pexels-photo-28674530.jpeg?auto=compress&cs=tinysrgb&w=800',
        available: true,
      },
    ],
  },
];

const cuisineData: Record<CuisineType, Category[]> = {
  indian: indianCategories,
  chinese: chineseCategories,
};

const cuisineMeta: Record<CuisineType, {
  label: string;
  flag: string;
  description: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  heroImage: string;
}> = {
  indian: {
    label: 'Indian Cuisine',
    flag: '🇮🇳',
    description: 'Traditional vegetarian Indian favourites prepared with authentic spices and fresh ingredients.',
    accentBg: 'bg-orange-600',
    accentText: 'text-orange-600',
    accentBorder: 'border-orange-600',
    heroImage: indianHero,
  },
  chinese: {
    label: 'Indo-Chinese Cuisine',
    flag: '🥢',
    description: 'Popular vegetarian Indo-Chinese dishes combining bold Chinese flavours with an Indian twist.',
    accentBg: 'bg-red-600',
    accentText: 'text-red-600',
    accentBorder: 'border-red-600',
    heroImage: chineseHero,
  },
};

export default function Menu() {
  const [activeCuisine, setActiveCuisine] = useState<CuisineType>('indian');
  const categories = cuisineData[activeCuisine];
  const meta = cuisineMeta[activeCuisine];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      {/* Hero header */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={meta.heroImage}
            alt={meta.label}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-orange-50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-600/90 px-4 py-2 rounded-full mb-6">
            <Leaf className="w-5 h-5 text-white" />
            <span className="text-white font-semibold text-sm">100% Pure Vegetarian</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Menu</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Explore our carefully crafted selection of vegetarian dishes, made fresh with premium ingredients.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Cuisine selection cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {(Object.keys(cuisineMeta) as CuisineType[]).map((cuisine) => {
            const cm = cuisineMeta[cuisine];
            const isActive = activeCuisine === cuisine;
            return (
              <button
                key={cuisine}
                onClick={() => setActiveCuisine(cuisine)}
                className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 text-left ${
                  isActive
                    ? `ring-2 ${cm.accentBorder} scale-[1.02] shadow-2xl`
                    : 'ring-1 ring-gray-200 hover:shadow-xl hover:scale-[1.01]'
                }`}
              >
                <div className="relative h-40 sm:h-44 overflow-hidden">
                  <img
                    src={cm.heroImage}
                    alt={cm.label}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isActive ? 'scale-105' : 'group-hover:scale-105'
                    }`}
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isActive ? `${cm.accentBg} opacity-30` : 'bg-black/40'
                    }`}
                  ></div>
                  <div className="absolute inset-0 flex flex-col justify-center px-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-3xl">{cm.flag}</span>
                      <h3 className="text-2xl font-bold text-white">
                        {cm.label}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-100 leading-relaxed line-clamp-2">
                      {cm.description}
                    </p>
                    <div className={`mt-3 inline-flex items-center space-x-1 text-sm font-semibold transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-orange-300'
                    }`}>
                      <span>{isActive ? 'Currently Viewing' : 'View Dishes'}</span>
                      {isActive && <Leaf className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Menu sections */}
        <div key={activeCuisine} className="space-y-16 pb-16">
          {categories.map((category) => (
            <div key={category.key} className="animate-fadeIn">
              {/* Category header */}
              <div className="flex items-center mb-8">
                <div className={`w-1.5 h-10 ${meta.accentBg} rounded-full mr-4`}></div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {category.label}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {category.dishes.length} {category.dishes.length === 1 ? 'dish' : 'dishes'}
                  </p>
                </div>
              </div>

              {/* Dish cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                  >
                    {/* Dish image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {!dish.available && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-sm font-semibold bg-red-600 px-4 py-1.5 rounded-full">
                            Currently Unavailable
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <div className="flex items-center space-x-1 bg-green-600 px-2.5 py-1 rounded-full shadow-md">
                          <Leaf className="w-3.5 h-3.5 text-white" />
                          <span className="text-white text-xs font-medium">Veg</span>
                        </div>
                      </div>
                    </div>

                    {/* Dish content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                        {dish.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                        {dish.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-2xl font-bold ${meta.accentText}`}>
                          £{dish.price.toFixed(2)}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Leaf className="w-4 h-4 text-green-500" />
                          <span className="text-xs font-medium text-green-600">Pure Veg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mb-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 md:p-10 text-white text-center overflow-hidden relative">
          <div className="absolute -right-8 -top-8 opacity-10">
            <UtensilsCrossed className="w-40 h-40" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Have Questions About Our Menu?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
              Our team is happy to help you choose the perfect dishes for your meal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+447455154515"
                className="inline-flex items-center justify-center space-x-2 bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                <Phone className="w-5 h-5" />
                <span>Call: +44 7455 154515</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                <span>Book a Table</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
