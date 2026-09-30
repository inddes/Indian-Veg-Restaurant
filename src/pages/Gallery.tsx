import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { UtensilsCrossed, Home } from 'lucide-react';

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
  category: 'food' | 'interior';
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'food' | 'interior'>('all');
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  async function fetchGalleryImages() {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order');

    if (data) setImages(data);
  }

  const filteredImages = images.filter(
    (image) => activeFilter === 'all' || image.category === activeFilter
  );

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a visual journey through our delicious food and welcoming ambiance
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-lg shadow-md p-1 flex-wrap gap-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeFilter === 'all'
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('food')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                activeFilter === 'food'
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Food</span>
            </button>
            <button
              onClick={() => setActiveFilter('interior')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                activeFilter === 'interior'
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Interior</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.image_url}
                  alt={image.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-semibold text-lg">{image.caption}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                    {image.category === 'food' ? '🍽️ Food' : '🏠 Interior'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No images found in this category.</p>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Experience It In Person</h3>
          <p className="mb-6">Visit us to enjoy the ambiance and taste the delicious food</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+447455154515"
              className="inline-block bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call to Book: +44 7455 154515
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
