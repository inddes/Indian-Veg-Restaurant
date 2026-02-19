import { Heart, Users, Award, Leaf, Sparkles, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      <div
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Spice Garden</h1>
          <p className="text-xl text-gray-200">Where Tradition Meets Taste</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Established with a vision to bring authentic vegetarian cuisine to food lovers,
                Spice Garden has been serving delectable Indian and Indo-Chinese dishes for years.
                Our journey began with a simple belief: vegetarian food can be incredibly delicious
                and satisfying.
              </p>
              <p>
                Every recipe in our kitchen has been perfected over time, using traditional cooking
                methods passed down through generations. We take pride in sourcing the freshest
                ingredients and authentic spices to create dishes that remind you of home-cooked meals.
              </p>
              <p>
                Today, Spice Garden stands as a testament to our commitment to quality, authenticity,
                and customer satisfaction. We are more than just a restaurant; we are a family that
                welcomes you with open arms and serves you with love.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Delicious food"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img
              src="https://images.pexels.com/photos/3758134/pexels-photo-3758134.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Traditional cooking"
              className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-12 text-white mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Makes Us Special</h2>
            <p className="text-lg opacity-90">
              Our commitment to excellence in every aspect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Vegetarian</h3>
              <p className="opacity-90">
                Pure vegetarian menu with no compromise on taste or quality
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fresh Ingredients</h3>
              <p className="opacity-90">
                Daily sourced vegetables and authentic spices for the best flavors
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Authentic Recipes</h3>
              <p className="opacity-90">
                Traditional cooking techniques for authentic taste in every bite
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on the quality of ingredients or preparation. Every dish
                is prepared with utmost care and attention to detail.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Family Friendly</h3>
              <p className="text-gray-600">
                Our warm and welcoming atmosphere makes everyone feel at home. We are perfect
                for family gatherings, celebrations, and casual dining.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Hygiene & Safety</h3>
              <p className="text-gray-600">
                We maintain the highest standards of cleanliness and hygiene in our kitchen
                and dining areas. Your health and safety are our top priority.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-2xl p-12 text-center">
          <Clock className="w-16 h-16 text-orange-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Us</h2>
          <p className="text-xl text-gray-700 mb-2">Open Daily</p>
          <p className="text-2xl font-bold text-orange-600 mb-6">11:00 AM - 11:00 PM</p>
          <p className="text-gray-700 mb-2">123 MG Road, Bangalore</p>
          <p className="text-gray-700 mb-6">Karnataka 560001</p>
          <a
            href="tel:+919876543210"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Call: +91 98765 43210
          </a>
        </div>
      </div>
    </div>
  );
}
