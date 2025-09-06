import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { storage } from "./storage";
import { 
  insertUserSchema,
  insertFollowSchema,
  insertMessageSchema,
  insertGroupChatSchema,
  insertCommunityPostSchema,
  insertReviewSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.get("/api/users", async (req, res) => {
    try {
      const { search } = req.query;
      if (search) {
        const users = await storage.searchUsers(search as string);
        const usersWithoutPasswords = users.map(({ password, ...user }) => user);
        res.json(usersWithoutPasswords);
      } else {
        res.status(400).json({ error: "Search query required" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to search users" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // Follow routes
  app.post("/api/follows", async (req, res) => {
    try {
      const followData = insertFollowSchema.parse(req.body);
      const follow = await storage.followUser(followData);
      res.status(201).json(follow);
    } catch (error) {
      res.status(400).json({ error: "Invalid follow data" });
    }
  });

  app.delete("/api/follows/:followerId/:followingId", async (req, res) => {
    try {
      const success = await storage.unfollowUser(req.params.followerId, req.params.followingId);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Follow relationship not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to unfollow user" });
    }
  });

  app.get("/api/users/:id/followers", async (req, res) => {
    try {
      const followers = await storage.getFollowers(req.params.id);
      const followersWithoutPasswords = followers.map(({ password, ...user }) => user);
      res.json(followersWithoutPasswords);
    } catch (error) {
      res.status(500).json({ error: "Failed to get followers" });
    }
  });

  app.get("/api/users/:id/following", async (req, res) => {
    try {
      const following = await storage.getFollowing(req.params.id);
      const followingWithoutPasswords = following.map(({ password, ...user }) => user);
      res.json(followingWithoutPasswords);
    } catch (error) {
      res.status(500).json({ error: "Failed to get following" });
    }
  });

  app.get("/api/follows/:followerId/:followingId", async (req, res) => {
    try {
      const isFollowing = await storage.isFollowing(req.params.followerId, req.params.followingId);
      res.json({ isFollowing });
    } catch (error) {
      res.status(500).json({ error: "Failed to check follow status" });
    }
  });

  // Message routes
  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      
      // Broadcast message via WebSocket if connected
      if (req.app.locals.wss) {
        const messageWithSender = {
          ...message,
          sender: await storage.getUser(message.senderId)
        };
        
        req.app.locals.wss.clients.forEach((client: any) => {
          if (client.readyState === 1) { // WebSocket.OPEN
            client.send(JSON.stringify({
              type: 'new_message',
              data: messageWithSender
            }));
          }
        });
      }
      
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  app.get("/api/messages", async (req, res) => {
    try {
      const { groupId, recipientId, senderId } = req.query;
      const messages = await storage.getMessages(
        groupId as string,
        recipientId as string,
        senderId as string
      );
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to get messages" });
    }
  });

  app.patch("/api/messages/:id", async (req, res) => {
    try {
      const { content } = req.body;
      const message = await storage.updateMessage(req.params.id, content);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to update message" });
    }
  });

  app.delete("/api/messages/:id", async (req, res) => {
    try {
      const success = await storage.deleteMessage(req.params.id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Message not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  // Group Chat routes
  app.post("/api/groups", async (req, res) => {
    try {
      const groupData = insertGroupChatSchema.parse(req.body);
      const group = await storage.createGroupChat(groupData);
      res.status(201).json(group);
    } catch (error) {
      res.status(400).json({ error: "Invalid group data" });
    }
  });

  app.get("/api/groups/:id", async (req, res) => {
    try {
      const group = await storage.getGroupChat(req.params.id);
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }
      res.json(group);
    } catch (error) {
      res.status(500).json({ error: "Failed to get group" });
    }
  });

  app.get("/api/users/:id/groups", async (req, res) => {
    try {
      const groups = await storage.getUserGroups(req.params.id);
      res.json(groups);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user groups" });
    }
  });

  app.post("/api/groups/:id/members", async (req, res) => {
    try {
      const { userId, role } = req.body;
      const membership = await storage.joinGroup(req.params.id, userId, role);
      res.status(201).json(membership);
    } catch (error) {
      res.status(400).json({ error: "Failed to join group" });
    }
  });

  app.delete("/api/groups/:id/members/:userId", async (req, res) => {
    try {
      const success = await storage.leaveGroup(req.params.id, req.params.userId);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Membership not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to leave group" });
    }
  });

  app.get("/api/groups/:id/members", async (req, res) => {
    try {
      const members = await storage.getGroupMembers(req.params.id);
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to get group members" });
    }
  });

  // Community Post routes
  app.post("/api/posts", async (req, res) => {
    try {
      const postData = insertCommunityPostSchema.parse(req.body);
      const post = await storage.createPost(postData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid post data" });
    }
  });

  app.get("/api/posts", async (req, res) => {
    try {
      const { userId } = req.query;
      const posts = await storage.getPosts(userId as string);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to get posts" });
    }
  });

  app.patch("/api/posts/:id", async (req, res) => {
    try {
      const post = await storage.updatePost(req.params.id, req.body);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update post" });
    }
  });

  app.delete("/api/posts/:id", async (req, res) => {
    try {
      const success = await storage.deletePost(req.params.id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  app.post("/api/posts/:id/like", async (req, res) => {
    try {
      const { userId } = req.body;
      const liked = await storage.likePost(req.params.id, userId);
      res.json({ liked });
    } catch (error) {
      res.status(500).json({ error: "Failed to like post" });
    }
  });

  // Review routes
  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  app.get("/api/reviews", async (req, res) => {
    try {
      const { targetType, targetId, userId } = req.query;
      const reviews = await storage.getReviews(
        targetType as string,
        targetId as string,
        userId as string
      );
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to get reviews" });
    }
  });

  app.patch("/api/reviews/:id", async (req, res) => {
    try {
      const review = await storage.updateReview(req.params.id, req.body);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to update review" });
    }
  });

  app.delete("/api/reviews/:id", async (req, res) => {
    try {
      const success = await storage.deleteReview(req.params.id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Review not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  const httpServer = createServer(app);

  // WebSocket setup for real-time messaging
  const wss = new WebSocketServer({ 
    server: httpServer, 
    path: '/ws' 
  });

  app.locals.wss = wss;

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'join_group') {
          ws.groupId = message.groupId;
        }
        
        if (message.type === 'send_message') {
          // Handle real-time message sending
          const messageData = insertMessageSchema.parse(message.data);
          const newMessage = await storage.createMessage(messageData);
          
          // Broadcast to all clients in the same group/conversation
          wss.clients.forEach((client: any) => {
            if (client.readyState === 1 && 
                (client.groupId === newMessage.groupId || 
                 client.userId === newMessage.recipientId ||
                 client.userId === newMessage.senderId)) {
              client.send(JSON.stringify({
                type: 'new_message',
                data: newMessage
              }));
            }
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });

  return httpServer;
}
