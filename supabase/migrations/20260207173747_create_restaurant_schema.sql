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
  - `category` (text) - Category (starters, south_indian, curries_gravies, tandoori, rice_biryani, breads, manchurian, noodles, fried_rice, indo_chinese_mains)
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

-- Insert menu items
-- Indian Starters
INSERT INTO menu_items (name, description, price, category, cuisine_type, image_url, is_featured, is_available) VALUES
('Aloo Bonda', 'Crispy potato-filled fritters with aromatic Indian spices.', 80.00, 'starters', 'indian', 'https://images.pexels.com/photos/31109618/pexels-photo-31109618.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Dhokla', 'Soft and fluffy steamed savoury bites from Gujarat.', 70.00, 'starters', 'indian', 'https://images.pexels.com/photos/35041878/pexels-photo-35041878.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Masala Vada', 'Crispy lentil fritters seasoned with herbs and spices.', 75.00, 'starters', 'indian', 'https://images.pexels.com/photos/21751212/pexels-photo-21751212.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Paneer Tikka', 'Marinated paneer and vegetables grilled with Indian spices.', 180.00, 'starters', 'indian', 'https://images.pexels.com/photos/3928854/pexels-photo-3928854.png?auto=compress&cs=tinysrgb&w=800', true, true),

-- Indian South Indian
('Masala Dosa', 'Crispy rice crepe filled with spiced potato masala.', 110.00, 'south_indian', 'indian', 'https://images.pexels.com/photos/12392915/pexels-photo-12392915.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Idli Sambar', 'Steamed rice cakes served with lentil sambar and chutney.', 90.00, 'south_indian', 'indian', 'https://images.pexels.com/photos/35514447/pexels-photo-35514447.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Uttapam', 'Thick savoury pancake topped with onions and tomatoes.', 100.00, 'south_indian', 'indian', 'https://images.pexels.com/photos/20422130/pexels-photo-20422130.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Medu Vada', 'Crispy golden lentil donuts served with coconut chutney.', 85.00, 'south_indian', 'indian', 'https://images.pexels.com/photos/20422135/pexels-photo-20422135.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Indian Curries & Gravies
('Paneer Butter Masala', 'Cottage cheese cubes in a rich, creamy tomato gravy.', 220.00, 'curries_gravies', 'indian', 'https://images.pexels.com/photos/11188417/pexels-photo-11188417.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Dal Makhani', 'Black lentils slow-cooked overnight with butter and cream.', 180.00, 'curries_gravies', 'indian', 'https://images.pexels.com/photos/37182513/pexels-photo-37182513.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Palak Paneer', 'Cottage cheese in a smooth, creamy spinach gravy.', 200.00, 'curries_gravies', 'indian', 'https://images.pexels.com/photos/31249589/pexels-photo-31249589.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Malai Kofta', 'Vegetable and paneer dumplings in a rich cashew gravy.', 210.00, 'curries_gravies', 'indian', 'https://images.pexels.com/photos/36343375/pexels-photo-36343375.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Chole Masala', 'Punjabi-style spicy chickpea curry with aromatic spices.', 160.00, 'curries_gravies', 'indian', 'https://images.pexels.com/photos/9287035/pexels-photo-9287035.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Indian Tandoori
('Tandoori Paneer Tikka', 'Clay-oven grilled paneer with bell peppers and mint chutney.', 190.00, 'tandoori', 'indian', 'https://images.pexels.com/photos/33430556/pexels-photo-33430556.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Veg Seekh Kebab', 'Skewered vegetable kebabs grilled in the tandoor.', 170.00, 'tandoori', 'indian', 'https://images.pexels.com/photos/37080242/pexels-photo-37080242.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Tandoori Mushroom', 'Mushrooms marinated in yogurt and tandoori spices, grilled.', 175.00, 'tandoori', 'indian', 'https://images.pexels.com/photos/36701469/pexels-photo-36701469.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Indian Rice & Biryani
('Veg Biryani', 'Aromatic basmati rice layered with mixed vegetables and saffron.', 200.00, 'rice_biryani', 'indian', 'https://images.pexels.com/photos/37303308/pexels-photo-37303308.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Jeera Rice', 'Basmati rice tempered with fragrant cumin seeds.', 120.00, 'rice_biryani', 'indian', 'https://images.pexels.com/photos/28674713/pexels-photo-28674713.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Peas Pulao', 'Fragrant basmati rice cooked with green peas and whole spices.', 140.00, 'rice_biryani', 'indian', 'https://images.pexels.com/photos/35552983/pexels-photo-35552983.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Indian Breads
('Butter Naan', 'Soft leavened bread brushed with butter from the tandoor.', 50.00, 'breads', 'indian', 'https://images.pexels.com/photos/16851842/pexels-photo-16851842.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Garlic Naan', 'Naan bread topped with fresh garlic and coriander.', 60.00, 'breads', 'indian', 'https://images.pexels.com/photos/10337726/pexels-photo-10337726.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Tandoori Roti', 'Whole wheat flatbread baked in the clay oven.', 30.00, 'breads', 'indian', 'https://images.pexels.com/photos/28674556/pexels-photo-28674556.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Laccha Paratha', 'Flaky, layered whole wheat flatbread.', 45.00, 'breads', 'indian', 'https://images.pexels.com/photos/39833406/pexels-photo-39833406.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Indo-Chinese Starters
('Chilli Paneer', 'Paneer tossed with peppers, onions and a spicy Indo-Chinese sauce.', 180.00, 'starters', 'chinese', 'https://images.pexels.com/photos/29631468/pexels-photo-29631468.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Chilli Gobi', 'Crispy cauliflower tossed in a spicy chilli and garlic sauce.', 160.00, 'starters', 'chinese', 'https://images.pexels.com/photos/35071824/pexels-photo-35071824.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Honey Chilli Potato', 'Crispy potatoes coated in a sweet and spicy chilli glaze.', 130.00, 'starters', 'chinese', 'https://images.pexels.com/photos/11485199/pexels-photo-11485199.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Veg Spring Rolls', 'Crispy golden rolls filled with seasoned vegetables.', 120.00, 'starters', 'chinese', 'https://images.pexels.com/photos/37261945/pexels-photo-37261945.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Indo-Chinese Manchurian
('Gobi Manchurian', 'Crispy cauliflower coated in a tangy Manchurian sauce.', 150.00, 'manchurian', 'chinese', 'https://images.pexels.com/photos/28674543/pexels-photo-28674543.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Veg Manchurian', 'Vegetable balls in a tangy, spicy Indo-Chinese gravy.', 150.00, 'manchurian', 'chinese', 'https://images.pexels.com/photos/35066808/pexels-photo-35066808.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Paneer Manchurian', 'Cottage cheese cubes in a spicy Manchurian gravy.', 170.00, 'manchurian', 'chinese', 'https://images.pexels.com/photos/31783383/pexels-photo-31783383.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Indo-Chinese Noodles
('Vegetable Hakka Noodles', 'Stir-fried noodles with fresh vegetables and Indo-Chinese sauces.', 140.00, 'noodles', 'chinese', 'https://images.pexels.com/photos/37165674/pexels-photo-37165674.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Schezwan Noodles', 'Spicy noodles tossed in fiery schezwan sauce with vegetables.', 160.00, 'noodles', 'chinese', 'https://images.pexels.com/photos/35779075/pexels-photo-35779075.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Indo-Chinese Fried Rice
('Veg Fried Rice', 'Classic fried rice with mixed vegetables and soy sauce.', 130.00, 'fried_rice', 'chinese', 'https://images.pexels.com/photos/35588196/pexels-photo-35588196.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Schezwan Fried Rice', 'Spicy fried rice tossed in schezwan sauce with vegetables.', 150.00, 'fried_rice', 'chinese', 'https://images.pexels.com/photos/9148224/pexels-photo-9148224.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),

-- Indo-Chinese Mains
('Chilli Mushroom', 'Mushrooms tossed with peppers, onions and Indo-Chinese seasoning.', 170.00, 'indo_chinese_mains', 'chinese', 'https://images.pexels.com/photos/5848433/pexels-photo-5848433.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Veg Manchurian Gravy', 'Vegetable Manchurian balls in a rich, spicy gravy served hot.', 160.00, 'indo_chinese_mains', 'chinese', 'https://images.pexels.com/photos/29631489/pexels-photo-29631489.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Schezwan Chilli Potato', 'Crispy potatoes in a fiery schezwan and chilli sauce.', 140.00, 'indo_chinese_mains', 'chinese', 'https://images.pexels.com/photos/28674530/pexels-photo-28674530.jpeg?auto=compress&cs=tinysrgb&w=800', false, true);

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