import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Leaf } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<'indian' | 'chinese'>('indian');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetchMenuItems(activeTab);
  }, [activeTab]);

  async function fetchMenuItems(cuisineType: string) {
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .eq('cuisine_type', cuisineType)
      .order('category')
      .order('name');

    if (data) setMenuItems(data);
  }

  const categories = {
    indian: [
      { key: 'starters', label: 'Starters' },
      { key: 'main_course', label: 'Main Course' },
      { key: 'breads', label: 'Breads' },
      { key: 'rice', label: 'Rice' },
    ],
    chinese: [
      { key: 'starters', label: 'Starters' },
      { key: 'noodles', label: 'Noodles' },
      { key: 'fried_rice', label: 'Fried Rice' },
      { key: 'manchurian', label: 'Manchurian' },
    ],
  };

  const getItemsByCategory = (category: string) => {
    return menuItems.filter((item) => item.category === category);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our delicious vegetarian offerings from Indian and Chinese cuisines
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => setActiveTab('indian')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'indian'
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              🇮🇳 Indian Cuisine
            </button>
            <button
              onClick={() => setActiveTab('chinese')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'chinese'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              🥢 Chinese Cuisine
            </button>
          </div>
        </div>

        <div className="space-y-12">
          {categories[activeTab].map((category) => {
            const items = getItemsByCategory(category.key);
            if (items.length === 0) return null;

            return (
              <div key={category.key} className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span
                    className={`w-2 h-8 ${
                      activeTab === 'indian' ? 'bg-orange-600' : 'bg-red-600'
                    } rounded-full mr-4`}
                  ></span>
                  {category.label}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200"
                    >
                      <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {!item.is_available && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">Unavailable</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            {item.name}
                            <Leaf className="w-4 h-4 text-green-600 flex-shrink-0" />
                          </h3>
                          <span
                            className={`text-xl font-bold flex-shrink-0 ${
                              activeTab === 'indian' ? 'text-orange-600' : 'text-red-600'
                            }`}
                          >
                            ₹{item.price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Have Questions About Our Menu?</h3>
          <p className="mb-6">Our team is happy to help you choose the perfect dishes</p>
          <a
            href="tel:+919876543210"
            className="inline-block bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Call Us: +91 98765 43210
          </a>
        </div>
      </div>
    </div>
  );
}
