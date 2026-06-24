const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins for local testing, can be customized in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-inferred-preferences', 'x-location-country', 'x-preferred-max-price']
}));

// Body parsing middleware
app.use(express.json());

// Routes configuration
app.use('/api/admin', require('./routes/admin'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/queries', require('./routes/queries'));
app.use('/api/hotels', require('./routes/hotels'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/slides', require('./routes/slides'));

// Default Health/Info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    appName: 'Avenue Global T&T Web API',
    status: 'Running',
    version: '1.0.0',
    mode: process.env.NODE_ENV || 'development',
    affordableBaseline: process.env.AFFORDABLE_BASELINE_PRICE || 1500
  });
});

// Database connection & Server Startup
async function startServer() {
  let mongoUri = process.env.MONGODB_URI;
  let mongoServer = null;

  try {
    // If no URI is provided, boot in-memory MongoDB Server for instant plug-and-play execution
    if (!mongoUri) {
      console.log('⚠️  No MONGODB_URI environment variable detected. Starting MongoMemoryServer fallback...');
      mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log(`🚀 In-Memory MongoDB running at: ${mongoUri}`);
    }

    await mongoose.connect(mongoUri);
    console.log('⭐ Connected to MongoDB successfully.');

    // Seed default packages, hotels, settings, and reviews if empty
    await seedDefaultPackages();
    await seedDefaultHotels();
    await seedDefaultSettings();
    await seedDefaultReviews();
    await seedDefaultSlides();

    app.listen(PORT, () => {
      console.log(`⚡ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB / start Express server:', err);
    process.exit(1);
  }
}

// Seeding helper logic
async function seedDefaultPackages() {
  const Package = require('./models/Package');
  try {
    const count = await Package.countDocuments();
    if (count === 0) {
      console.log('🌱 No packages found in database. Seeding default travel packages...');
      
      const defaultPackages = [
        // Standard Tour Packages
        {
          title: 'Tropical Bali Paradise Escape',
          description: 'Experience the stunning beaches, vibrant culture, and lush volcanic hillsides of Bali. Tour includes luxury villa stays, guided temple tours, scuba diving, and local organic dining guides.',
          price: 95000,
          duration: '6 Days / 5 Nights',
          destination: 'Bali, Indonesia',
          category: 'Tour',
          imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Scenic Swiss Alps Alpine Tour',
          description: 'A premium, scenic tour of Switzerland. Journey through Zurich, Lucerne, and Interlaken. Ride the Glacier Express and enjoy breathtaking views of the Matterhorn with professional ski options.',
          price: 180000,
          duration: '8 Days / 7 Nights',
          destination: 'Swiss Alps, Switzerland',
          category: 'Tour',
          imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Historical Tour of Rome & Florence',
          description: 'Walk through history. Explore the Roman Colosseum, Vatican Museums, and Florence Cathedral. Includes fast-track entry tickets, high-speed rail transit, and culinary classes.',
          price: 145000,
          duration: '7 Days / 6 Nights',
          destination: 'Rome & Florence, Italy',
          category: 'Tour',
          imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Mystical Kyoto Zen Getaway',
          description: 'Immerse yourself in Kyoto\'s historic shrines, bamboo forests, and traditional tea ceremonies. Includes boutique ryokan accommodation, bullet train passes, and private guide tours.',
          price: 115000,
          duration: '5 Days / 4 Nights',
          destination: 'Kyoto, Japan',
          category: 'Tour',
          imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Affordable Goa Beach Cruise',
          description: 'Relax on the sunny shores of Goa. Enjoy catamaran cruises, historic Portuguese churches, and delicious Goan seafood on an absolute budget.',
          price: 35000,
          duration: '4 Days / 3 Nights',
          destination: 'Goa, India',
          category: 'Tour',
          imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Grand Canyon Hiking Adventure',
          description: 'Discover the majesty of the Grand Canyon. Guided trails, sunset photographers, and luxury glamping on the canyon rim. Highly recommended for nature enthusiasts.',
          price: 75000,
          duration: '5 Days / 4 Nights',
          destination: 'Arizona, USA',
          category: 'Tour',
          imageUrl: 'https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=800&q=80'
        },
        // Readymade Holiday Packages
        {
          title: 'Golden Triangle India Luxury Holiday',
          description: 'A glorious holiday covering Delhi, Agra, and Jaipur. Includes 5-star heritage hotel stays, private chauffeur, and premium entry to historic monuments.',
          price: 125000,
          duration: '6 Days / 5 Nights',
          destination: 'Jaipur, India',
          category: 'Holiday',
          imageUrl: 'https://images.unsplash.com/photo-1477584308802-e26a79bfc57a?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Goa Beachfront Resort Family Holiday',
          description: 'A customizable, readymade family holiday at a premium resort in South Goa. Includes buffet breakfast, direct beach access, and sightseeing tours.',
          price: 85000,
          duration: '5 Days / 4 Nights',
          destination: 'Goa, India',
          category: 'Holiday',
          imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Ladakh Bike Trip & Camping Holiday',
          description: 'An adventurous holiday through Leh, Pangong Lake, and Nubra Valley. Ride through the highest motorable passes and camp under the stars.',
          price: 65000,
          duration: '7 Days / 6 Nights',
          destination: 'Ladakh, India',
          category: 'Holiday',
          imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
        }
      ];

      await Package.insertMany(defaultPackages);
      console.log('✅ Default travel packages successfully seeded into database!');
    }
  } catch (err) {
    console.error('⚠️ Seeding packages failed:', err);
  }
}

async function seedDefaultHotels() {
  const Hotel = require('./models/Hotel');
  try {
    const count = await Hotel.countDocuments();
    if (count === 0) {
      console.log('🌱 No hotels found in database. Seeding default network hotels...');
      
      const defaultHotels = [
        {
          name: 'The Taj Mahal Palace',
          location: 'Mumbai, Maharashtra',
          pricePerNight: 22000,
          rating: 5,
          description: 'A legendary landmark of Mumbai. Offers fine dining restaurant networks, bespoke spa therapy, and panoramic views of the Gateway of India.',
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
          amenities: ['Spa', 'Sea View', 'Pool', 'WiFi', 'Bar']
        },
        {
          name: 'The Oberoi Amarvilas',
          location: 'Agra, Uttar Pradesh',
          pricePerNight: 28000,
          rating: 5,
          description: 'Located just 600 meters from the Taj Mahal. Every room offers uninterrupted views of this monument to love.',
          imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
          amenities: ['Taj View', 'Pool', 'WiFi', 'Gym', 'Lounge']
        },
        {
          name: 'Kumarakom Lake Resort',
          location: 'Kumarakom, Kerala',
          pricePerNight: 16500,
          rating: 4,
          description: 'Experience luxury backwater living. Heritage villas, private pools, traditional houseboats, and ayurvedic backwater therapies.',
          imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
          amenities: ['Backwater View', 'Spa', 'Pool', 'WiFi', 'Boating']
        }
      ];

      await Hotel.insertMany(defaultHotels);
      console.log('✅ Default network hotels successfully seeded into database!');
    }
  } catch (err) {
    console.error('⚠️ Seeding hotels failed:', err);
  }
}

async function seedDefaultSettings() {
  const Settings = require('./models/Settings');
  try {
    const count = await Settings.countDocuments();
    if (count === 0) {
      console.log('🌱 No settings found in database. Seeding default site settings...');
      const defaultSettings = new Settings({});
      await defaultSettings.save();
      console.log('✅ Default settings successfully seeded into database!');
    }
  } catch (err) {
    console.error('⚠️ Seeding settings failed:', err);
  }
}

async function seedDefaultReviews() {
  const Review = require('./models/Review');
  try {
    const count = await Review.countDocuments();
    if (count === 0) {
      console.log('🌱 No reviews found in database. Seeding default customer reviews...');
      
      const defaultReviews = [
        {
          name: 'Vikram Malhotra',
          designation: 'VP Operations, TechCorp',
          rating: 5,
          comment: 'Avenue Global T&T managed our entire corporate retreat to Kumarakom Lake Resort flawlessly. The team was responsive, customized every segment, and accommodated all stay requests. Truly premium service!'
        },
        {
          name: 'Ananya Sharma',
          designation: 'Adventure Enthusiast',
          rating: 5,
          comment: 'My Ladakh bike trip holiday package was curated perfectly to my riding speed and comfort. Unbelievable mountain views, vetted support vehicles, and top-tier support. Highly recommend!'
        },
        {
          name: 'Rajesh Kapoor',
          designation: 'Family Trip Organizer',
          rating: 4,
          comment: 'The Taj Mahal Agra hotel rate they pre-negotiated was unmatched. Our family golden triangle holiday was stress-free and very customizable. Excellent support team.'
        }
      ];

      await Review.insertMany(defaultReviews);
      console.log('✅ Default customer reviews successfully seeded into database!');
    }
  } catch (err) {
    console.error('⚠️ Seeding reviews failed:', err);
  }
}

async function seedDefaultSlides() {
  const Slide = require('./models/Slide');
  try {
    const count = await Slide.countDocuments();
    if (count === 0) {
      console.log('🌱 No slideshow slides found in database. Seeding default slides...');
      
      const defaultSlides = [
        {
          title: 'The Majestic Taj Mahal',
          subtitle: 'Experience the eternal symbol of love and architectural marvel in Agra.',
          image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=80',
          destination: 'Agra, India',
          link: '/catalog?destination=Agra',
          order: 0
        },
        {
          title: 'Tranquil Kerala Backwaters',
          subtitle: 'Sail through palm-fringed tropical lagoons on traditional houseboats.',
          image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80',
          destination: 'Kerala, India',
          link: '/catalog?destination=Kerala',
          order: 1
        },
        {
          title: 'Royal Palaces of Jaipur',
          subtitle: 'Step into the vibrant colors, majestic fortresses, and heritage of the Pink City.',
          image: 'https://images.unsplash.com/photo-1477584308802-e26a79bfc57a?auto=format&fit=crop&w=1920&q=80',
          destination: 'Jaipur, India',
          link: '/catalog?destination=Jaipur',
          order: 2
        },
        {
          title: 'Breathtaking Ladakh Heights',
          subtitle: 'Witness the azure waters of Pangong Tso surrounded by majestic snow-capped peaks.',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80',
          destination: 'Ladakh, India',
          link: '/catalog?destination=Ladakh',
          order: 3
        }
      ];

      await Slide.insertMany(defaultSlides);
      console.log('✅ Default slideshow slides successfully seeded into database!');
    }
  } catch (err) {
    console.error('⚠️ Seeding slides failed:', err);
  }
}

startServer();

