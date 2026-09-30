import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🌱</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Spice Garden</h3>
                <p className="text-xs text-orange-400">Pure Vegetarian</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Experience authentic Indian and Indo-Chinese vegetarian cuisine in a warm, family-friendly atmosphere.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 MG Road, Bangalore, Karnataka 560001</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-orange-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@spicegarden.com" className="hover:text-orange-400 transition-colors">
                  info@spicegarden.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Opening Hours</h4>
            <div className="flex items-start space-x-2 text-sm text-gray-400 mb-4">
              <Clock className="w-4 h-4 mt-1 flex-shrink-0" />
              <div>
                <p>Monday - Sunday</p>
                <p className="text-orange-400 font-medium">11:00 AM - 11:00 PM</p>
              </div>
            </div>
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Spice Garden. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
