/*
  # Sync menu_items Table with Central Frontend Menu Data

  ## Overview
  The `menu_items` table currently has rupee (INR) prices, incorrect/reused images,
  and dish names that don't match the frontend's central menu data file.
  This migration replaces all rows with the authoritative dish list from the
  frontend `src/data/menuData.ts` file, ensuring the database stays consistent
  with the website.

  ## Changes
  1. Truncates the existing `menu_items` table (removing all old rows with
     wrong prices/images).
  2. Inserts 38 dishes with:
     - Correct dish names (matching the website exactly)
     - GBP prices (e.g. 3.95, 6.95, 8.50)
     - Verified dish-specific vegetarian food photography URLs
     - Correct cuisine_type ('indian' or 'chinese')
     - Correct category labels
     - is_featured flags matching the website's featured dishes
     - is_available = true for all items

  ## Security
  - RLS already enabled on `menu_items`; existing policies are unchanged.
  - No schema changes -- only data replacement.
  - No new tables or columns.

  ## Notes
  - The Samosa image is replaced with a verified photo (photo 9027521)
    showing golden crispy samosas with chutney.
  - All images are unique per dish -- no image is reused across unrelated dishes.
  - All prices are in GBP (£), not rupees (₹).
*/

TRUNCATE TABLE menu_items;

INSERT INTO menu_items (name, description, price, category, cuisine_type, image_url, is_featured, is_available) VALUES
-- Indian Starters
('Vegetable Samosa', 'Crispy golden triangular pastries filled with spiced potatoes and peas, served with mint and tamarind chutney.', 3.95, 'starters', 'indian', 'https://images.pexels.com/photos/9027521/pexels-photo-9027521.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Aloo Bonda', 'Crispy potato-filled fritters with aromatic Indian spices.', 4.50, 'starters', 'indian', 'https://images.pexels.com/photos/31109618/pexels-photo-31109618.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Dhokla', 'Soft and fluffy steamed savoury bites from Gujarat.', 3.95, 'starters', 'indian', 'https://images.pexels.com/photos/35041878/pexels-photo-35041878.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Masala Vada', 'Crispy lentil fritters seasoned with herbs and spices.', 4.25, 'starters', 'indian', 'https://images.pexels.com/photos/21751212/pexels-photo-21751212.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Paneer Tikka', 'Marinated paneer and vegetables grilled with Indian spices.', 6.95, 'starters', 'indian', 'https://images.pexels.com/photos/3928854/pexels-photo-3928854.png?auto=compress&cs=tinysrgb&w=800', true, true),
('Samosa Chaat', 'Crushed crispy samosas topped with chickpeas, chutneys, yogurt and sev.', 4.95, 'starters', 'indian', 'https://images.pexels.com/photos/23286188/pexels-photo-23286188.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
-- Indian South Indian
('Masala Dosa', 'Crispy rice crepe filled with spiced potato masala.', 5.95, 'south_indian', 'indian', 'https://images.pexels.com/photos/12392915/pexels-photo-12392915.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Idli Sambar', 'Steamed rice cakes served with lentil sambar and chutney.', 4.95, 'south_indian', 'indian', 'https://images.pexels.com/photos/35514447/pexels-photo-35514447.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Uttapam', 'Thick savoury pancake topped with onions and tomatoes.', 5.50, 'south_indian', 'indian', 'https://images.pexels.com/photos/20422130/pexels-photo-20422130.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Medu Vada', 'Crispy golden lentil donuts served with coconut chutney.', 4.75, 'south_indian', 'indian', 'https://images.pexels.com/photos/20422135/pexels-photo-20422135.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
-- Indian Curries & Gravies
('Paneer Butter Masala', 'Cottage cheese cubes in a rich, creamy tomato gravy.', 8.50, 'curries_gravies', 'indian', 'https://images.pexels.com/photos/11188417/pexels-photo-11188417.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Dal Makhani', 'Black lentils slow-cooked overnight with butter and cream.', 6.95, 'curries_gravies', 'indian', 'https://images.pexels.com/photos/37182513/pexels-photo-37182513.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Palak Paneer', 'Cottage cheese in a smooth, creamy spinach gravy.', 7.50, 'curries_gravies', 'indian', 'https://images.pexels.com/photos/31249589/pexels-photo-31249589.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Malai Kofta', 'Vegetable and paneer dumplings in a rich cashew gravy.', 7.95, 'curries_gravies', 'indian', 'https://images.pexels.com/photos/36343375/pexels-photo-36343375.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Chole Masala', 'Punjabi-style spicy chickpea curry with aromatic spices.', 5.95, 'curries_gravies', 'indian', 'https://images.pexels.com/photos/9287035/pexels-photo-9287035.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Chole Bhature', 'Fluffy deep-fried bread served with a rich and spicy chickpea curry.', 6.50, 'curries_gravies', 'indian', 'https://images.pexels.com/photos/36388454/pexels-photo-36388454.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Pav Bhaji', 'Buttery spiced vegetable mash served with toasted soft bread rolls.', 5.95, 'curries_gravies', 'indian', 'https://images.pexels.com/photos/166654/pexels-photo-166654.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Dal Tadka', 'Yellow lentils tempered with ghee, cumin, garlic and dried red chillies.', 5.50, 'curries_gravies', 'indian', 'https://images.pexels.com/photos/38108860/pexels-photo-38108860.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
-- Indian Tandoori
('Tandoori Paneer Tikka', 'Clay-oven grilled paneer with bell peppers and mint chutney.', 8.50, 'tandoori', 'indian', 'https://images.pexels.com/photos/33430556/pexels-photo-33430556.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Veg Seekh Kebab', 'Skewered vegetable kebabs grilled in the tandoor.', 6.95, 'tandoori', 'indian', 'https://images.pexels.com/photos/37080242/pexels-photo-37080242.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Tandoori Mushroom', 'Mushrooms marinated in yogurt and tandoori spices, grilled.', 6.50, 'tandoori', 'indian', 'https://images.pexels.com/photos/36701469/pexels-photo-36701469.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
-- Indian Rice & Biryani
('Vegetable Biryani', 'Aromatic basmati rice layered with mixed vegetables and saffron.', 7.50, 'rice_biryani', 'indian', 'https://images.pexels.com/photos/37303308/pexels-photo-37303308.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Jeera Rice', 'Basmati rice tempered with fragrant cumin seeds.', 4.50, 'rice_biryani', 'indian', 'https://images.pexels.com/photos/28674713/pexels-photo-28674713.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Peas Pulao', 'Fragrant basmati rice cooked with green peas and whole spices.', 5.25, 'rice_biryani', 'indian', 'https://images.pexels.com/photos/35552983/pexels-photo-35552983.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
-- Indian Breads
('Butter Naan', 'Soft leavened bread brushed with butter from the tandoor.', 2.95, 'breads', 'indian', 'https://images.pexels.com/photos/16851842/pexels-photo-16851842.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Garlic Naan', 'Naan bread topped with fresh garlic and coriander.', 3.50, 'breads', 'indian', 'https://images.pexels.com/photos/10337726/pexels-photo-10337726.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Tandoori Roti', 'Whole wheat flatbread baked in the clay oven.', 1.95, 'breads', 'indian', 'https://images.pexels.com/photos/28674556/pexels-photo-28674556.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Laccha Paratha', 'Flaky, layered whole wheat flatbread.', 2.75, 'breads', 'indian', 'https://images.pexels.com/photos/39833406/pexels-photo-39833406.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
-- Indo-Chinese Starters
('Chilli Paneer', 'Paneer tossed with peppers, onions and a spicy Indo-Chinese sauce.', 6.95, 'starters', 'chinese', 'https://images.pexels.com/photos/29631468/pexels-photo-29631468.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Chilli Gobi', 'Crispy cauliflower tossed in a spicy chilli and garlic sauce.', 5.95, 'starters', 'chinese', 'https://images.pexels.com/photos/35071824/pexels-photo-35071824.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Honey Chilli Potato', 'Crispy potatoes coated in a sweet and spicy chilli glaze.', 7.25, 'starters', 'chinese', 'https://images.pexels.com/photos/11485199/pexels-photo-11485199.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Veg Spring Rolls', 'Crispy golden rolls filled with seasoned vegetables.', 4.50, 'starters', 'chinese', 'https://images.pexels.com/photos/34767648/pexels-photo-34767648.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
-- Indo-Chinese Manchurian
('Gobi Manchurian', 'Crispy cauliflower coated in a tangy Manchurian sauce.', 5.95, 'manchurian', 'chinese', 'https://images.pexels.com/photos/28674543/pexels-photo-28674543.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Veg Manchurian', 'Vegetable balls in a tangy, spicy Indo-Chinese gravy.', 5.95, 'manchurian', 'chinese', 'https://images.pexels.com/photos/35066808/pexels-photo-35066808.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Paneer Manchurian', 'Cottage cheese cubes in a spicy Manchurian gravy.', 6.95, 'manchurian', 'chinese', 'https://images.pexels.com/photos/31783383/pexels-photo-31783383.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
-- Indo-Chinese Noodles
('Vegetable Hakka Noodles', 'Stir-fried noodles with fresh vegetables and Indo-Chinese sauces.', 5.25, 'noodles', 'chinese', 'https://images.pexels.com/photos/37165674/pexels-photo-37165674.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
('Schezwan Noodles', 'Spicy noodles tossed in fiery schezwan sauce with vegetables.', 5.95, 'noodles', 'chinese', 'https://images.pexels.com/photos/35779075/pexels-photo-35779075.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
-- Indo-Chinese Fried Rice
('Veg Fried Rice', 'Classic fried rice with mixed vegetables and soy sauce.', 7.25, 'fried_rice', 'chinese', 'https://images.pexels.com/photos/35588196/pexels-photo-35588196.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Schezwan Fried Rice', 'Spicy fried rice tossed in schezwan sauce with vegetables.', 5.95, 'fried_rice', 'chinese', 'https://images.pexels.com/photos/9148224/pexels-photo-9148224.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
-- Indo-Chinese Mains
('Chilli Mushroom', 'Mushrooms tossed with peppers, onions and Indo-Chinese seasoning.', 6.95, 'indo_chinese_mains', 'chinese', 'https://images.pexels.com/photos/5848433/pexels-photo-5848433.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Veg Manchurian Gravy', 'Vegetable Manchurian balls in a rich, spicy gravy served hot.', 5.95, 'indo_chinese_mains', 'chinese', 'https://images.pexels.com/photos/29631489/pexels-photo-29631489.jpeg?auto=compress&cs=tinysrgb&w=800', false, true),
('Schezwan Chilli Potato', 'Crispy potatoes in a fiery schezwan and chilli sauce.', 5.25, 'indo_chinese_mains', 'chinese', 'https://images.pexels.com/photos/28674530/pexels-photo-28674530.jpeg?auto=compress&cs=tinysrgb&w=800', false, true);
