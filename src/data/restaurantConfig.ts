export interface RestaurantConfig {
  name: string;
  tagline: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  openingHoursDays: string;
  openingHoursTimes: string;
  mapLatitude: number;
  mapLongitude: number;
  mapsUrl: string;
  mapEmbedUrl: string;
  social: {
    facebook: string;
    instagram: string;
  };
}

export const restaurantConfig: RestaurantConfig = {
  name: 'Spice Garden',
  tagline: 'Pure Vegetarian',
  address: 'Mawney Road, Romford',
  postcode: 'RM7 8AJ',
  city: 'Romford',
  country: 'United Kingdom',
  phone: '+44 7455 154515',
  phoneDisplay: '+44 7455 154515',
  email: 'contact@spicegarden.co.uk',
  openingHoursDays: 'Monday – Sunday',
  openingHoursTimes: '11:00 AM – 11:00 PM',
  mapLatitude: 51.582664,
  mapLongitude: 0.162262,
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.582664,0.162262',
  mapEmbedUrl:
    'https://www.google.com/maps?q=51.582664,0.162262&z=15&output=embed',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
};

export const fullAddress = `${restaurantConfig.address}, ${restaurantConfig.postcode}, ${restaurantConfig.country}`;
