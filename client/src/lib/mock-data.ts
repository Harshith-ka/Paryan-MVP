export interface Destination {
  id: string;
  name: string;
  location: string;
  country: string;
  region: string;
  type: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  currency: string;
  tags: string[];
  featured: boolean;
}

export interface Stay {
  id: string;
  name: string;
  type: 'homestay' | 'eco-lodge' | 'guesthouse' | 'traditional-house' | 'farm-stay';
  location: string;
  country: string;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  host: {
    name: string;
    avatar: string;
    verified: boolean;
    responseRate: number;
  };
  features: string[];
}

export interface Activity {
  id: string;
  name: string;
  category: 'workshop' | 'cultural' | 'food' | 'nature' | 'festival';
  location: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  duration: string;
  maxParticipants: number;
  included: string[];
  difficulty: 'easy' | 'moderate' | 'challenging';
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  location?: string;
  bio?: string;
  joinDate: Date;
  verified: boolean;
  badges: string[];
}

export interface CommunityPost {
  id: string;
  userId: string;
  title?: string;
  content: string;
  images?: string[];
  location?: string;
  tags?: string[];
  createdAt?: Date;
  likes: number;
  comments: number;
  shares?: number;
}

export const mockDestinations: Destination[] = [
  {
    id: "1",
    name: "Grindelwald",
    location: "Swiss Alps",
    country: "Switzerland",
    region: "Europe",
    type: "mountain",
    description: "Traditional Alpine village nestled beneath the Eiger North Face with cheese-making traditions and mountain culture.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    rating: 4.9,
    reviewCount: 234,
    priceFrom: 85,
    currency: "CHF",
    tags: ["Mountain", "Hiking", "Cheese Making"],
    featured: true
  },
  {
    id: "2",
    name: "Hallstatt",
    location: "Salzkammergut",
    country: "Austria",
    region: "Europe",
    type: "historic",
    description: "Picturesque lakeside village with 16th-century Alpine houses and traditional salt mining heritage.",
    image: "https://pixabay.com/get/g66c7309062004245fe68acd92af597d89406b33e4bb4b79a74b08ee4bef49290ddf2ecb6f2f4d5894c44e4de6a4005afd64bd71f4d1a90d67b86e888a62656b2_1280.jpg",
    rating: 4.8,
    reviewCount: 456,
    priceFrom: 120,
    currency: "EUR",
    tags: ["Historic", "Lake", "Salt Mines"],
    featured: true
  },
  {
    id: "3",
    name: "Shirakawa-go",
    location: "Gifu Prefecture",
    country: "Japan",
    region: "Asia",
    type: "historic",
    description: "UNESCO World Heritage village famous for traditional gassho-zukuri farmhouses with steep thatched roofs.",
    image: "https://pixabay.com/get/g4871ad06eeba1a0207272a65d325c2ce5a6431ffcc6b85e1c4c3c2d88a4478452f6a03ce90fb597a1283d0a2ad191fbacb3ae6119e16afce72ad309a5bba8e8b_1280.jpg",
    rating: 4.7,
    reviewCount: 189,
    priceFrom: 65,
    currency: "USD",
    tags: ["Historic", "UNESCO", "Traditional Architecture"],
    featured: true
  },
  {
    id: "4",
    name: "Sapa",
    location: "Lao Cai Province",
    country: "Vietnam",
    region: "Asia",
    type: "mountain",
    description: "Mountain town surrounded by rice terraces and home to ethnic minority communities.",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    rating: 4.6,
    reviewCount: 278,
    priceFrom: 25,
    currency: "USD",
    tags: ["Rice Terraces", "Ethnic Culture", "Trekking"],
    featured: true
  },
  {
    id: "5",
    name: "Monsaraz",
    location: "Alentejo",
    country: "Portugal",
    region: "Europe",
    type: "historic",
    description: "Medieval fortified village overlooking vast plains with traditional pottery and wine-making.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    rating: 4.8,
    reviewCount: 123,
    priceFrom: 55,
    currency: "EUR",
    tags: ["Historic", "Medieval", "Wine", "Pottery"],
    featured: false
  },
  {
    id: "6",
    name: "Ait Benhaddou",
    location: "Ouarzazate Province",
    country: "Morocco",
    region: "Africa",
    type: "desert",
    description: "Ancient fortified village (ksar) made of clay brick and a UNESCO World Heritage site.",
    image: "https://pixabay.com/get/g5ced6fec85a48082363506d6f4241e744e087c02a3c9e482fe1643b94da50d3bcf290c52a4a0a20082b5ebdf28d2624f1fe04a1038655225e334f0a8524616de_1280.jpg",
    rating: 4.7,
    reviewCount: 201,
    priceFrom: 35,
    currency: "USD",
    tags: ["Desert", "UNESCO", "Berber Culture"],
    featured: false
  }
];

export const mockStays: Stay[] = [
  {
    id: "1",
    name: "Casa Maria - Family Farm",
    type: "homestay",
    location: "Tuscany",
    country: "Italy",
    description: "Traditional farmhouse stay with organic garden, cooking classes, and wine tasting. Family has been farming here for 4 generations.",
    images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
    rating: 4.9,
    reviewCount: 127,
    pricePerNight: 89,
    currency: "EUR",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "Garden", "Parking"],
    host: {
      name: "Maria & Giuseppe",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      verified: true,
      responseRate: 98
    },
    features: ["Organic Farm", "Cooking Classes", "Wine Tasting"]
  },
  {
    id: "2",
    name: "Alpine Green Lodge",
    type: "eco-lodge",
    location: "Grindelwald",
    country: "Switzerland",
    description: "Sustainable mountain lodge with solar power, local materials, and guided hiking. Perfect for nature lovers seeking authentic Alpine experience.",
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
    rating: 4.8,
    reviewCount: 89,
    pricePerNight: 145,
    currency: "CHF",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Solar Power", "Hiking Guides", "Breakfast", "Mountain View"],
    host: {
      name: "Klaus Weber",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      verified: true,
      responseRate: 95
    },
    features: ["Eco-friendly", "Mountain Guides", "Solar Powered"]
  },
  {
    id: "3",
    name: "Yamada Traditional Ryokan",
    type: "traditional-house",
    location: "Shirakawa-go",
    country: "Japan",
    description: "200-year-old traditional house with tatami rooms, futon beds, and authentic kaiseki meals. Experience rural Japanese lifestyle.",
    images: ["https://pixabay.com/get/gce39e3c5643acb40739d7ebe84cc5a5c03253d48131f61b1827600e2a0134b6be1ae795ce2ed0d34208070597581942148118738b2ba8ae6ea59a5b9afd2ccab_1280.jpg"],
    rating: 4.9,
    reviewCount: 156,
    pricePerNight: 185,
    currency: "USD",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["Tatami Rooms", "Kaiseki Meals", "Traditional Bath", "Garden"],
    host: {
      name: "Yamada Family",
      avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      verified: true,
      responseRate: 99
    },
    features: ["Historic Building", "Traditional Architecture", "Cultural Experience"]
  }
];

export const mockActivities: Activity[] = [
  {
    id: "1",
    name: "Traditional Pottery Workshop",
    category: "workshop",
    location: "Monsaraz",
    country: "Portugal",
    description: "Learn ancient Portuguese pottery techniques passed down through generations. Create your own ceramic piece to take home.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    rating: 4.9,
    reviewCount: 89,
    price: 45,
    currency: "EUR",
    duration: "3 hours",
    maxParticipants: 8,
    included: ["Materials", "Instructions", "Take-home piece"],
    difficulty: "easy"
  },
  {
    id: "2",
    name: "Alpine Cheese Making",
    category: "food",
    location: "Grindelwald",
    country: "Switzerland",
    description: "Join local farmers in traditional cheese making process using Alpine milk and century-old techniques.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    rating: 4.8,
    reviewCount: 156,
    price: 75,
    currency: "CHF",
    duration: "4 hours",
    maxParticipants: 12,
    included: ["Cheese tasting", "Lunch", "Take-home cheese"],
    difficulty: "easy"
  },
  {
    id: "3",
    name: "Rice Terrace Trek",
    category: "nature",
    location: "Sapa",
    country: "Vietnam",
    description: "Guided trek through stunning rice terraces with local ethnic minority guides. Learn about traditional farming.",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    rating: 4.7,
    reviewCount: 234,
    price: 35,
    currency: "USD",
    duration: "Full day",
    maxParticipants: 15,
    included: ["Guide", "Lunch", "Water", "Transportation"],
    difficulty: "moderate"
  }
];

export const mockUsers: User[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    location: "San Francisco, USA",
    bio: "Adventure seeker and cultural enthusiast. Love connecting with local communities.",
    joinDate: new Date("2023-01-15"),
    verified: true,
    badges: ["Verified Traveler", "Community Contributor"]
  },
  {
    id: "2",
    firstName: "Marco",
    lastName: "Rossi",
    email: "marco@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    location: "Tuscany, Italy",
    bio: "Local guide and host sharing the beauty of traditional Italian village life.",
    joinDate: new Date("2022-08-20"),
    verified: true,
    badges: ["Local Guide", "Superhost"]
  },
  {
    id: "3",
    firstName: "Elena",
    lastName: "Rodriguez",
    email: "elena@example.com",
    avatar: "https://pixabay.com/get/g02ede038f51efe637b99cea91202e2a909623ab5476fbc4b578d9ac9378c445ea2c479fb333cd1c72aac6c133ca440f564addb966b5ef2fd44f91fc2c5e283a4_1280.jpg",
    location: "Barcelona, Spain",
    bio: "Solo traveler passionate about sustainable tourism and cultural exchange.",
    joinDate: new Date("2023-03-10"),
    verified: true,
    badges: ["Eco Traveler", "Cultural Ambassador"]
  }
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: "1",
    userId: "1",
    title: "Amazing pottery workshop in Portugal!",
    content: "Just completed the most incredible pottery workshop in Monsaraz. The local artisan taught us techniques passed down for generations. Highly recommend!",
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
    location: "Monsaraz, Portugal",
    tags: ["pottery", "workshop", "portugal"],
    createdAt: new Date("2024-01-15T10:30:00"),
    likes: 42,
    comments: 12,
    shares: 5
  },
  {
    id: "2",
    userId: "2",
    title: "Harvest season in Tuscany",
    content: "The grape harvest has begun! Our village is alive with celebration. Visitors are welcome to join our traditional harvest festival this weekend.",
    location: "Tuscany, Italy",
    tags: ["harvest", "festival", "tuscany", "wine"],
    createdAt: new Date("2024-01-14T15:45:00"),
    likes: 67,
    comments: 23,
    shares: 18
  },
  {
    id: "3",
    userId: "3",
    content: "Looking for travel companions for a rice terrace trek in Vietnam next month. Anyone interested in joining?",
    tags: ["travel", "vietnam", "trekking", "companions"],
    createdAt: new Date("2024-01-13T09:15:00"),
    likes: 28,
    comments: 15,
    shares: 8
  }
];
