import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, X, UtensilsCrossed, MapPin, Sparkles } from 'lucide-react';
import {
  type CuisineType,
  type Dish,
  dishes as allDishes,
  cuisineMeta,
} from '../data/menuData';

type Filter = 'all' | CuisineType;

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const filteredDishes = activeFilter === 'all'
    ? allDishes
    : allDishes.filter((dish) => dish.cuisine === activeFilter);

  const closeLightbox = useCallback(() => setSelectedDish(null), []);

  useEffect(() => {
    if (selectedDish) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [selectedDish]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeLightbox]);

  const filters: { key: Filter; label: string; flag?: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'indian', label: 'Indian Cuisine', flag: '🇮🇳' },
    { key: 'chinese', label: 'Indo-Chinese', flag: '🥢' },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-orange-50 via-orange-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-green-600/90 px-4 py-2 rounded-full mb-6">
            <Leaf className="w-5 h-5 text-white" />
            <span className="text-white font-semibold text-sm">100% Pure Vegetarian</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A feast for your eyes &ndash; explore our colourful, freshly prepared Indian and Indo-Chinese vegetarian favourites.
          </p>
          <p className="mt-3 text-sm font-semibold tracking-wide text-orange-600">
            100% Vegetarian &bull; Freshly Prepared &bull; Full of Flavour
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-xl shadow-md p-1.5 flex-wrap gap-1">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  activeFilter === filter.key
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filter.flag && <span className="text-base">{filter.flag}</span>}
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div key={activeFilter} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 animate-fadeIn">
          {filteredDishes.map((dish) => {
            const meta = cuisineMeta[dish.cuisine];
            return (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center space-x-1.5 mb-1">
                    <Leaf className="w-4 h-4 text-green-400" />
                    <span className="text-white font-bold text-base">{dish.name}</span>
                  </div>
                  <span className="inline-block px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium w-fit">
                    {meta.flag} {meta.label}
                  </span>
                  <div className="mt-2 inline-flex items-center space-x-1 text-orange-300 text-sm font-semibold">
                    <UtensilsCrossed className="w-4 h-4" />
                    <span>View Dish</span>
                  </div>
                </div>

                {/* Veg badge */}
                <div className="absolute top-2.5 left-2.5">
                  <div className="flex items-center space-x-1 bg-green-600 px-2 py-0.5 rounded-full shadow-md">
                    <Leaf className="w-3 h-3 text-white" />
                    <span className="text-white text-[10px] font-medium">Veg</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 md:p-12 text-white text-center overflow-hidden relative">
          <div className="absolute -right-8 -top-8 opacity-10">
            <Sparkles className="w-40 h-40" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Looks Delicious? It Tastes Even Better.</h3>
            <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto leading-relaxed">
              From comforting Indian classics to bold Indo-Chinese favourites, discover a vegetarian menu made to satisfy every craving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center space-x-2 bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span>Explore Our Menu</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                <MapPin className="w-5 h-5" />
                <span>Visit Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedDish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={closeLightbox}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors duration-200"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute top-3 left-3">
                <div className="flex items-center space-x-1 bg-green-600 px-2.5 py-1 rounded-full shadow-md">
                  <Leaf className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-medium">Veg</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Leaf className="w-5 h-5 text-green-500" />
                <h3 className="text-2xl font-bold text-gray-900">{selectedDish.name}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-3">
                {selectedDish.description}
              </p>
              <div className="mb-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    selectedDish.cuisine === 'indian'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {cuisineMeta[selectedDish.cuisine].flag} {cuisineMeta[selectedDish.cuisine].label}
                </span>
              </div>
              <Link
                to={`/menu#${selectedDish.slug}`}
                className="inline-flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span>View on Menu</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
