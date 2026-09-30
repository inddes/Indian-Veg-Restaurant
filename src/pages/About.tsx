import { Link } from 'react-router-dom';
import { Sprout, Leaf, ChefHat, Heart, ChevronRight, UtensilsCrossed, MapPin } from 'lucide-react';

const highlights = [
  {
    icon: Sprout,
    title: '100% Vegetarian',
    description: 'A completely vegetarian kitchen with plenty of delicious choices.',
    color: 'green',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description: 'Carefully selected ingredients prepared fresh for great flavour and quality.',
    color: 'orange',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    icon: ChefHat,
    title: 'Authentic Flavours',
    description: 'Traditional Indian favourites alongside exciting Indo-Chinese classics.',
    color: 'red',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    icon: Heart,
    title: 'Made for Everyone',
    description: 'A welcoming place for families, friends and food lovers to eat, share and enjoy.',
    color: 'amber',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
];

export default function About() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-orange-50 via-white to-white">
      {/* Hero section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full mb-6">
              <Sprout className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-semibold text-sm">Pure Vegetarian Kitchen</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Authentic Flavours. Fresh Ingredients.{' '}
              <span className="text-orange-600">Made with Love.</span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
              We bring together the rich traditions of Indian cuisine and the bold flavours of
              Indo-Chinese favourites—all completely vegetarian. From comforting Indian classics
              to sizzling Indo-Chinese dishes, every meal is freshly prepared using quality
              ingredients, aromatic spices and recipes created to bring people together.
            </p>

            {/* CTA */}
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                Come Hungry. <span className="text-orange-600">Leave Happy.</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <UtensilsCrossed className="w-5 h-5" />
                  <span>Explore Our Menu</span>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-orange-300 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span>Visit Us</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-200/60 rounded-2xl rotate-12 hidden md:block"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-200/50 rounded-2xl -rotate-12 hidden md:block"></div>
              <img
                src="https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="A beautifully presented Indian vegetarian dining table with colorful dishes"
                className="relative rounded-3xl shadow-2xl w-full h-72 sm:h-80 md:h-96 lg:h-[480px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hidden sm:flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🌱</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Spice Garden</p>
                  <p className="text-xs text-gray-500">Indian & Indo-Chinese · Pure Veg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights section */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
              Why Diners Love Us
            </h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto">
              Every detail of our kitchen and dining experience is crafted with care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 ${item.iconBg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${item.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden relative">
          <div className="absolute -right-6 -top-6 opacity-10">
            <UtensilsCrossed className="w-40 h-40" />
          </div>
          <div className="absolute -left-6 -bottom-6 opacity-10">
            <Heart className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Come Hungry. Leave Happy.
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              Whether it is a family dinner, a quick lunch, or a celebration with friends, we would love to serve you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center space-x-2 bg-white text-orange-600 hover:bg-gray-100 px-7 py-3.5 rounded-xl font-semibold transition-colors duration-200"
              >
                <span>Explore Our Menu</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-7 py-3.5 rounded-xl font-semibold transition-colors duration-200"
              >
                <MapPin className="w-5 h-5" />
                <span>Visit Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
