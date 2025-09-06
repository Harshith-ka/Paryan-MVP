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
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string | null;
  location: string | null;
  bio: string | null;
  joinDate: Date;
  verified: boolean;
  isHost: boolean | null;
  badges: string[];
  followersCount: number;
  followingCount: number;
  createdAt: Date | null;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  groupId?: string;
  recipientId?: string;
  type: 'text' | 'image' | 'file';
  createdAt: Date;
  editedAt?: Date;
  replyToId?: string;
}

export interface GroupChat {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  isPrivate: boolean;
  createdBy: string;
  createdAt: Date;
  lastActivity: Date;
  memberCount: number;
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
}

export interface CommunityPost {
  id: string;
  userId: string;
  title?: string;
  content: string;
  images?: string[];
  location?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  comments: number;
  shares: number;
}

export interface Review {
  id: string;
  userId: string;
  targetType: 'stay' | 'activity' | 'host' | 'destination';
  targetId: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  createdAt: Date;
  helpful: number;
  verified: boolean;
}

export interface TravelGroup {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  category: string;
  memberCount: number;
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
  tags: string[];
  recentActivity: number;
}

export interface TripPlan {
  id: string;
  title: string;
  description: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget: number;
  currency: string;
  status: 'planning' | 'booked' | 'completed';
  userId: string;
  activities: string[];
  stays: string[];
  isPublic: boolean;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  destination: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  coverImage: string;
  rating: number;
  reviewCount: number;
  readTime: number;
  tags: string[];
  sections: {
    id: string;
    title: string;
    content: string;
    images?: string[];
  }[];
  lastUpdated: Date;
}

// Drizzle schema imports and types
import { z } from "zod";

export const insertUserSchema = z.object({
  username: z.string().min(3).max(30),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  avatar: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  isHost: z.boolean().nullable().optional(),
});

export const insertFollowSchema = z.object({
  followerId: z.string(),
  followingId: z.string(),
});

export const insertMessageSchema = z.object({
  content: z.string().min(1),
  senderId: z.string(),
  groupId: z.string().optional(),
  recipientId: z.string().optional(),
  type: z.enum(['text', 'image', 'file']).default('text'),
  replyToId: z.string().optional(),
});

export const insertGroupChatSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  isPrivate: z.boolean().default(false),
  createdBy: z.string(),
});

export const insertCommunityPostSchema = z.object({
  userId: z.string(),
  title: z.string().nullable().optional(),
  content: z.string().min(1),
  images: z.array(z.string()).optional(),
  location: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
});

export const insertReviewSchema = z.object({
  userId: z.string(),
  targetType: z.enum(['stay', 'activity', 'host', 'destination']),
  targetId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string().min(1),
  content: z.string().min(1),
  images: z.array(z.string()).optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertFollow = z.infer<typeof insertFollowSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertGroupChat = z.infer<typeof insertGroupChatSchema>;
export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;
export type InsertReview = z.infer<typeof insertReviewSchema>;
