/*
  # Restaurant Website Schema

  ## Overview
  Creates tables for an Indian vegetarian restaurant website including menu items, 
  testimonials, gallery images, and contact form submissions.

  ## New Tables
  
  ### `menu_items`
  Stores restaurant menu items for both Indian and Chinese cuisine
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Dish name
  - `description` (text) - Dish description
  - `price` (decimal) - Price in rupees
  - `category` (text) - Category (starters, main_course, breads, rice, noodles, fried_rice, manchurian)
  - `cuisine_type` (text) - Either 'indian' or 'chinese'
  - `image_url` (text) - URL to dish image
  - `is_featured` (boolean) - Whether to show on homepage
  - `is_available` (boolean) - Current availability
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `testimonials`
  Customer reviews and testimonials
  - `id` (uuid, primary key) - Unique identifier
  - `customer_name` (text) - Customer's name
  - `rating` (integer) - Rating out of 5
  - `review` (text) - Review text
  - `is_featured` (boolean) - Whether to show on homepage
  - `created_at` (timestamptz) - Creation timestamp

  ### `gallery_images`
  Restaurant and food photos for gallery
  - `id` (uuid, primary key) - Unique identifier
  - `image_url` (text) - URL to image
  - `caption` (text) - Image caption
  - `category` (text) - Either 'food' or 'interior'
  - `display_order` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ### `contact_submissions`
  Contact form submissions from customers
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Customer name
  - `email` (text) - Customer email
  - `phone` (text) - Customer phone
  - `message` (text) - Message content
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for menu_items, testimonials, and gallery_images
  - Public insert access for contact_submissions
  - Admin-only write access for menu_items, testimonials, and gallery_images
*/

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL,
  category text NOT NULL,
  cuisine_type text NOT NULL CHECK (cuisine_type IN ('indian', 'chinese')),
  image_url text DEFAULT '',
  is_featured boolean DEFAULT false,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review text NOT NULL,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text DEFAULT '',
  category text NOT NULL CHECK (category IN ('food', 'interior')),
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for menu_items
CREATE POLICY "Anyone can view available menu items"
  ON menu_items FOR SELECT
  TO anon, authenticated
  USING (is_available = true);

CREATE POLICY "Anyone can view all menu items for display"
  ON menu_items FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policies for testimonials
CREATE POLICY "Anyone can view featured testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (is_featured = true);

-- Policies for gallery_images
CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policies for contact_submissions
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_menu_items_cuisine ON menu_items(cuisine_type);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_featured ON menu_items(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_gallery_display_order ON gallery_images(display_order);

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category, cuisine_type, image_url, is_featured, is_available) VALUES
-- Indian Starters
('Samosa', 'Crispy pastry filled with spiced potatoes and peas', 40.00, 'starters', 'indian', 'https://images.pexels.com/photos/14477887/pexels-photo-14477887.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Paneer Tikka', 'Grilled cottage cheese marinated in aromatic spices', 180.00, 'starters', 'indian', 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Hara Bhara Kabab', 'Spinach and green peas patties with herbs', 150.00, 'starters', 'indian', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Aloo Tikki', 'Crispy potato patties served with chutneys', 60.00, 'starters', 'indian', 'https://images.pexels.com/photos/14477881/pexels-photo-14477881.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Indian Main Course
('Paneer Butter Masala', 'Cottage cheese in rich creamy tomato gravy', 220.00, 'main_course', 'indian', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Dal Makhani', 'Black lentils cooked overnight with butter and cream', 180.00, 'main_course', 'indian', 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Palak Paneer', 'Cottage cheese in creamy spinach gravy', 200.00, 'main_course', 'indian', 'https://images.pexels.com/photos/6210876/pexels-photo-6210876.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Malai Kofta', 'Vegetable dumplings in rich cashew gravy', 210.00, 'main_course', 'indian', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Chole Bhature', 'Spicy chickpeas with fluffy fried bread', 150.00, 'main_course', 'indian', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Indian Breads
('Butter Naan', 'Soft leavened bread brushed with butter', 50.00, 'breads', 'indian', 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Garlic Naan', 'Naan bread topped with garlic and herbs', 60.00, 'breads', 'indian', 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Tandoori Roti', 'Whole wheat bread from clay oven', 30.00, 'breads', 'indian', 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Laccha Paratha', 'Layered whole wheat flatbread', 45.00, 'breads', 'indian', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Indian Rice
('Veg Biryani', 'Aromatic basmati rice with mixed vegetables', 200.00, 'rice', 'indian', 'https://images.pexels.com/photos/3758134/pexels-photo-3758134.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Jeera Rice', 'Basmati rice tempered with cumin', 120.00, 'rice', 'indian', 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Peas Pulao', 'Fragrant rice with green peas', 140.00, 'rice', 'indian', 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Chinese Starters
('Veg Spring Rolls', 'Crispy rolls with mixed vegetables', 120.00, 'starters', 'chinese', 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Veg Momos', 'Steamed dumplings with vegetable filling', 100.00, 'starters', 'chinese', 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Crispy Veg', 'Vegetables tossed in sweet and sour sauce', 140.00, 'starters', 'chinese', 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Honey Chilli Potato', 'Crispy potatoes in honey chilli glaze', 130.00, 'starters', 'chinese', 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Chinese Noodles
('Hakka Noodles', 'Stir-fried noodles with vegetables', 140.00, 'noodles', 'chinese', 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Schezwan Noodles', 'Spicy noodles in schezwan sauce', 160.00, 'noodles', 'chinese', 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Singapore Noodles', 'Curry flavored rice noodles', 170.00, 'noodles', 'chinese', 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Chinese Fried Rice
('Veg Fried Rice', 'Classic fried rice with mixed vegetables', 130.00, 'fried_rice', 'chinese', 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Schezwan Fried Rice', 'Spicy fried rice in schezwan sauce', 150.00, 'fried_rice', 'chinese', 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Triple Schezwan Rice', 'Loaded fried rice with noodles and gravy', 180.00, 'fried_rice', 'chinese', 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Chinese Manchurian
('Veg Manchurian', 'Vegetable balls in tangy sauce', 150.00, 'manchurian', 'chinese', 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Paneer Manchurian', 'Cottage cheese in spicy manchurian gravy', 170.00, 'manchurian', 'chinese', 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Gobi Manchurian', 'Cauliflower in indo-chinese sauce', 140.00, 'manchurian', 'chinese', 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=800', false, true);

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, rating, review, is_featured) VALUES
('Rajesh Kumar', 5, 'Amazing food! The Paneer Butter Masala is the best I have had. The ambiance is great and staff is very courteous. Highly recommended for families.', true),
('Priya Sharma', 5, 'Authentic taste of Indian food. Their Dal Makhani reminds me of home-cooked food. The Chinese section is equally impressive. A must-visit!', true),
('Amit Patel', 4, 'Great vegetarian options. The Veg Biryani was aromatic and flavorful. Service was quick and the place is very clean and hygienic.', true),
('Neha Singh', 5, 'Love this place! Pure vegetarian with so many options. The Hakka Noodles and Spring Rolls are delicious. Perfect for a family dinner.', true);

-- Insert sample gallery images
INSERT INTO gallery_images (image_url, caption, category, display_order) VALUES
('https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Our signature Paneer Butter Masala', 'food', 1),
('https://images.pexels.com/photos/3758134/pexels-photo-3758134.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Aromatic Veg Biryani', 'food', 2),
('https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Delicious Hakka Noodles', 'food', 3),
('https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Crispy Spring Rolls', 'food', 4),
('https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Grilled Paneer Tikka', 'food', 5),
('https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Rich Dal Makhani', 'food', 6),
('https://images.pexels.com/photos/1024359/pexels-photo-1024359.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Cozy dining area', 'interior', 7),
('https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Modern restaurant interior', 'interior', 8);