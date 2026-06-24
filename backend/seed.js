const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('./models/Package');

dotenv.config();

const defaultPackages = [
  {
    title: 'Tropical Bali Paradise Escape',
    description: 'Experience the stunning beaches, vibrant culture, and lush volcanic hillsides of Bali. Tour includes luxury villa stays, guided temple tours, scuba diving, and local organic dining guides.',
    price: 1200,
    duration: '6 Days / 5 Nights',
    destination: 'Bali, Indonesia',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Scenic Swiss Alps Alpine Tour',
    description: 'A premium, scenic tour of Switzerland. Journey through Zurich, Lucerne, and Interlaken. Ride the Glacier Express and enjoy breathtaking views of the Matterhorn with professional ski options.',
    price: 2400,
    duration: '8 Days / 7 Nights',
    destination: 'Swiss Alps, Switzerland',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Historical Tour of Rome & Florence',
    description: 'Walk through history. Explore the Roman Colosseum, Vatican Museums, and Florence Cathedral. Includes fast-track entry tickets, high-speed rail transit, and culinary classes.',
    price: 1850,
    duration: '7 Days / 6 Nights',
    destination: 'Rome & Florence, Italy',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Mystical Kyoto Zen Getaway',
    description: 'Immerse yourself in Kyoto\'s historic shrines, bamboo forests, and traditional tea ceremonies. Includes boutique ryokan accommodation, bullet train passes, and private guide tours.',
    price: 1450,
    duration: '5 Days / 4 Nights',
    destination: 'Kyoto, Japan',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Affordable Goa Beach Cruise',
    description: 'Relax on the sunny shores of Goa. Enjoy catamaran cruises, historic Portuguese churches, and delicious Goan seafood on an absolute budget.',
    price: 490,
    duration: '4 Days / 3 Nights',
    destination: 'Goa, India',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Grand Canyon Hiking Adventure',
    description: 'Discover the majesty of the Grand Canyon. Guided trails, sunset photographers, and luxury glamping on the canyon rim. Highly recommended for nature enthusiasts.',
    price: 950,
    duration: '5 Days / 4 Nights',
    destination: 'Arizona, USA',
    imageUrl: 'https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=800&q=80'
  }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/avenue_travels';
    console.log(`Connecting to database: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing packages...');
    await Package.deleteMany({});

    console.log('Seeding new packages...');
    await Package.insertMany(defaultPackages);

    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
