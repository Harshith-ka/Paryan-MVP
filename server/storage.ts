import { 
  type User, 
  type InsertUser,
  type Follow,
  type InsertFollow,
  type Message,
  type InsertMessage,
  type GroupChat,
  type InsertGroupChat,
  type GroupMember,
  type CommunityPost,
  type InsertCommunityPost,
  type Review,
  type InsertReview
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  searchUsers(query: string): Promise<User[]>;
  
  // Follow methods
  followUser(follow: InsertFollow): Promise<Follow>;
  unfollowUser(followerId: string, followingId: string): Promise<boolean>;
  getFollowers(userId: string): Promise<User[]>;
  getFollowing(userId: string): Promise<User[]>;
  isFollowing(followerId: string, followingId: string): Promise<boolean>;
  
  // Message methods
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(groupId?: string, recipientId?: string, senderId?: string): Promise<Message[]>;
  updateMessage(id: string, content: string): Promise<Message | undefined>;
  deleteMessage(id: string): Promise<boolean>;
  
  // Group Chat methods
  createGroupChat(group: InsertGroupChat): Promise<GroupChat>;
  getGroupChat(id: string): Promise<GroupChat | undefined>;
  getUserGroups(userId: string): Promise<GroupChat[]>;
  joinGroup(groupId: string, userId: string, role?: 'admin' | 'moderator' | 'member'): Promise<GroupMember>;
  leaveGroup(groupId: string, userId: string): Promise<boolean>;
  getGroupMembers(groupId: string): Promise<GroupMember[]>;
  
  // Community Post methods
  createPost(post: InsertCommunityPost): Promise<CommunityPost>;
  getPosts(userId?: string): Promise<CommunityPost[]>;
  updatePost(id: string, updates: Partial<CommunityPost>): Promise<CommunityPost | undefined>;
  deletePost(id: string): Promise<boolean>;
  likePost(postId: string, userId: string): Promise<boolean>;
  
  // Review methods
  createReview(review: InsertReview): Promise<Review>;
  getReviews(targetType?: string, targetId?: string, userId?: string): Promise<Review[]>;
  updateReview(id: string, updates: Partial<Review>): Promise<Review | undefined>;
  deleteReview(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private follows: Map<string, Follow>;
  private messages: Map<string, Message>;
  private groupChats: Map<string, GroupChat>;
  private groupMembers: Map<string, GroupMember>;
  private posts: Map<string, CommunityPost>;
  private reviews: Map<string, Review>;
  private postLikes: Map<string, Set<string>>; // postId -> userId set

  constructor() {
    this.users = new Map();
    this.follows = new Map();
    this.messages = new Map();
    this.groupChats = new Map();
    this.groupMembers = new Map();
    this.posts = new Map();
    this.reviews = new Map();
    this.postLikes = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      joinDate: new Date(),
      verified: false,
      badges: [],
      followersCount: 0,
      followingCount: 0,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async searchUsers(query: string): Promise<User[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.users.values()).filter(user =>
      user.username.toLowerCase().includes(lowerQuery) ||
      user.firstName.toLowerCase().includes(lowerQuery) ||
      user.lastName.toLowerCase().includes(lowerQuery) ||
      (user.location && user.location.toLowerCase().includes(lowerQuery))
    );
  }

  // Follow methods
  async followUser(follow: InsertFollow): Promise<Follow> {
    const id = randomUUID();
    const followRecord: Follow = {
      ...follow,
      id,
      createdAt: new Date()
    };
    this.follows.set(id, followRecord);
    
    // Update follower counts
    const follower = await this.getUser(follow.followerId);
    const following = await this.getUser(follow.followingId);
    
    if (follower) {
      await this.updateUser(follow.followerId, { followingCount: follower.followingCount + 1 });
    }
    if (following) {
      await this.updateUser(follow.followingId, { followersCount: following.followersCount + 1 });
    }
    
    return followRecord;
  }

  async unfollowUser(followerId: string, followingId: string): Promise<boolean> {
    const followRecord = Array.from(this.follows.values()).find(
      f => f.followerId === followerId && f.followingId === followingId
    );
    
    if (!followRecord) return false;
    
    this.follows.delete(followRecord.id);
    
    // Update follower counts
    const follower = await this.getUser(followerId);
    const following = await this.getUser(followingId);
    
    if (follower && follower.followingCount > 0) {
      await this.updateUser(followerId, { followingCount: follower.followingCount - 1 });
    }
    if (following && following.followersCount > 0) {
      await this.updateUser(followingId, { followersCount: following.followersCount - 1 });
    }
    
    return true;
  }

  async getFollowers(userId: string): Promise<User[]> {
    const followRecords = Array.from(this.follows.values()).filter(
      f => f.followingId === userId
    );
    
    const followers = [];
    for (const record of followRecords) {
      const user = await this.getUser(record.followerId);
      if (user) followers.push(user);
    }
    
    return followers;
  }

  async getFollowing(userId: string): Promise<User[]> {
    const followRecords = Array.from(this.follows.values()).filter(
      f => f.followerId === userId
    );
    
    const following = [];
    for (const record of followRecords) {
      const user = await this.getUser(record.followingId);
      if (user) following.push(user);
    }
    
    return following;
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    return Array.from(this.follows.values()).some(
      f => f.followerId === followerId && f.followingId === followingId
    );
  }

  // Message methods
  async createMessage(message: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const messageRecord: Message = {
      ...message,
      id,
      createdAt: new Date()
    };
    this.messages.set(id, messageRecord);
    
    // Update group last activity if it's a group message
    if (message.groupId) {
      const group = this.groupChats.get(message.groupId);
      if (group) {
        this.groupChats.set(message.groupId, { ...group, lastActivity: new Date() });
      }
    }
    
    return messageRecord;
  }

  async getMessages(groupId?: string, recipientId?: string, senderId?: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(msg => {
        if (groupId) return msg.groupId === groupId;
        if (recipientId && senderId) {
          return (msg.recipientId === recipientId && msg.senderId === senderId) ||
                 (msg.recipientId === senderId && msg.senderId === recipientId);
        }
        if (recipientId) return msg.recipientId === recipientId;
        if (senderId) return msg.senderId === senderId;
        return true;
      })
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async updateMessage(id: string, content: string): Promise<Message | undefined> {
    const message = this.messages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, content, editedAt: new Date() };
    this.messages.set(id, updatedMessage);
    return updatedMessage;
  }

  async deleteMessage(id: string): Promise<boolean> {
    return this.messages.delete(id);
  }

  // Group Chat methods
  async createGroupChat(group: InsertGroupChat): Promise<GroupChat> {
    const id = randomUUID();
    const groupRecord: GroupChat = {
      ...group,
      id,
      createdAt: new Date(),
      lastActivity: new Date(),
      memberCount: 1
    };
    this.groupChats.set(id, groupRecord);
    
    // Add creator as admin
    await this.joinGroup(id, group.createdBy, 'admin');
    
    return groupRecord;
  }

  async getGroupChat(id: string): Promise<GroupChat | undefined> {
    return this.groupChats.get(id);
  }

  async getUserGroups(userId: string): Promise<GroupChat[]> {
    const userMemberships = Array.from(this.groupMembers.values()).filter(
      m => m.userId === userId
    );
    
    const groups = [];
    for (const membership of userMemberships) {
      const group = this.groupChats.get(membership.groupId);
      if (group) groups.push(group);
    }
    
    return groups;
  }

  async joinGroup(groupId: string, userId: string, role: 'admin' | 'moderator' | 'member' = 'member'): Promise<GroupMember> {
    const id = randomUUID();
    const membership: GroupMember = {
      id,
      groupId,
      userId,
      role,
      joinedAt: new Date()
    };
    this.groupMembers.set(id, membership);
    
    // Update group member count
    const group = this.groupChats.get(groupId);
    if (group) {
      this.groupChats.set(groupId, { ...group, memberCount: group.memberCount + 1 });
    }
    
    return membership;
  }

  async leaveGroup(groupId: string, userId: string): Promise<boolean> {
    const membership = Array.from(this.groupMembers.values()).find(
      m => m.groupId === groupId && m.userId === userId
    );
    
    if (!membership) return false;
    
    this.groupMembers.delete(membership.id);
    
    // Update group member count
    const group = this.groupChats.get(groupId);
    if (group && group.memberCount > 0) {
      this.groupChats.set(groupId, { ...group, memberCount: group.memberCount - 1 });
    }
    
    return true;
  }

  async getGroupMembers(groupId: string): Promise<GroupMember[]> {
    return Array.from(this.groupMembers.values()).filter(
      m => m.groupId === groupId
    );
  }

  // Community Post methods
  async createPost(post: InsertCommunityPost): Promise<CommunityPost> {
    const id = randomUUID();
    const postRecord: CommunityPost = {
      ...post,
      id,
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      shares: 0
    };
    this.posts.set(id, postRecord);
    this.postLikes.set(id, new Set());
    return postRecord;
  }

  async getPosts(userId?: string): Promise<CommunityPost[]> {
    const posts = Array.from(this.posts.values());
    return userId 
      ? posts.filter(p => p.userId === userId)
      : posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updatePost(id: string, updates: Partial<CommunityPost>): Promise<CommunityPost | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...updates, updatedAt: new Date() };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    this.postLikes.delete(id);
    return this.posts.delete(id);
  }

  async likePost(postId: string, userId: string): Promise<boolean> {
    const post = this.posts.get(postId);
    if (!post) return false;
    
    const likes = this.postLikes.get(postId) || new Set();
    const wasLiked = likes.has(userId);
    
    if (wasLiked) {
      likes.delete(userId);
      post.likes--;
    } else {
      likes.add(userId);
      post.likes++;
    }
    
    this.postLikes.set(postId, likes);
    this.posts.set(postId, post);
    return !wasLiked;
  }

  // Review methods
  async createReview(review: InsertReview): Promise<Review> {
    const id = randomUUID();
    const reviewRecord: Review = {
      ...review,
      id,
      createdAt: new Date(),
      helpful: 0,
      verified: false
    };
    this.reviews.set(id, reviewRecord);
    return reviewRecord;
  }

  async getReviews(targetType?: string, targetId?: string, userId?: string): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => {
        if (targetType && review.targetType !== targetType) return false;
        if (targetId && review.targetId !== targetId) return false;
        if (userId && review.userId !== userId) return false;
        return true;
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateReview(id: string, updates: Partial<Review>): Promise<Review | undefined> {
    const review = this.reviews.get(id);
    if (!review) return undefined;
    
    const updatedReview = { ...review, ...updates };
    this.reviews.set(id, updatedReview);
    return updatedReview;
  }

  async deleteReview(id: string): Promise<boolean> {
    return this.reviews.delete(id);
  }
}

export const storage = new MemStorage();
