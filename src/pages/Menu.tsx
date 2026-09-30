import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Phone, UtensilsCrossed } from 'lucide-react';
import {
  type CuisineType,
  cuisineMeta,
  getCategoriesByCuisine,
  getDishBySlug,
  formatPrice,
} from '../data/menuData';
import { restaurantConfig } from '../data/restaurantConfig';

export default function Menu() {
  const location = useLocation();
  const [activeCuisine, setActiveCuisine] = useState<CuisineType>('indian');
  const highlightedSlugRef = useRef<string | null>(null);

  // ── Deep-linking: read hash on mount and on hash change ────────────────
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      const dish = getDishBySlug(hash);
      if (dish) {
        // Switch to the correct cuisine tab
        if (dish.cuisine !== activeCuisine) {
          setActiveCuisine(dish.cuisine);
        }
        // Defer scroll until the correct cuisine is rendered
        highlightedSlugRef.current = hash;
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  // ── Scroll to target dish after cuisine switch / render ────────────────
  useEffect(() => {
    if (!highlightedSlugRef.current) return;

    const slug = highlightedSlugRef.current;
    // Small timeout to allow DOM to render after cuisine switch
    const timer = setTimeout(() => {
      const el = document.getElementById(`dish-${slug}`);
      if (el) {
        const headerOffset = 90; // sticky header height + padding
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });

        // Briefly highlight the dish
        el.classList.add('ring-4', 'ring-orange-400', 'ring-offset-2');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-orange-400', 'ring-offset-2');
        }, 2500);
      }
      highlightedSlugRef.current = null;
    }, 100);

    return () => clearTimeout(timer);
  }, [activeCuisine, location.hash]);

  const categories = getCategoriesByCuisine(activeCuisine);
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
                onClick={() => {
                  setActiveCuisine(cuisine);
                  // Clear hash when manually switching cuisine
                  if (window.location.hash) {
                    window.history.replaceState(null, '', window.location.pathname);
                  }
                }}
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
                    id={`dish-${dish.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 scroll-mt-24"
                  >
                    {/* Dish image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.alt}
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
                          {formatPrice(dish.price)}
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
                href={`tel:${restaurantConfig.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center space-x-2 bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                <Phone className="w-5 h-5" />
                <span>Call: {restaurantConfig.phoneDisplay}</span>
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
