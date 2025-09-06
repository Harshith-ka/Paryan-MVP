import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, MapPin, Camera, TrendingUp, Users, Calendar, HelpCircle, BookOpen } from "lucide-react";
import { mockCommunityPosts, mockUsers } from "@/lib/mock-data";

export default function Community() {
  const [newPost, setNewPost] = useState("");
  const [selectedTab, setSelectedTab] = useState("discussions");

  const tabs = [
    { id: "discussions", label: "Discussions", icon: MessageCircle },
    { id: "stories", label: "Travel Stories", icon: BookOpen },
    { id: "qa", label: "Q&A", icon: HelpCircle },
    { id: "meetups", label: "Meetups", icon: Calendar }
  ];

  const communityStats = [
    { number: "12,847", label: "Active Travelers", color: "terra" },
    { number: "3,456", label: "Village Hosts", color: "sage" },
    { number: "89", label: "Travel Groups", color: "amber" },
    { number: "1,234", label: "Shared Stories", color: "terra" }
  ];

  const trendingTopics = [
    { tag: "#HarvestSeason", count: "234 posts" },
    { tag: "#CulturalExchange", count: "156 posts" },
    { tag: "#SoloTravel", count: "189 posts" },
    { tag: "#TraditionalCrafts", count: "98 posts" },
    { tag: "#LocalFood", count: "167 posts" }
  ];

  const upcomingEvents = [
    {
      title: "Virtual Cooking Class",
      description: "Learn Peruvian cuisine",
      date: "Tomorrow, 3PM UTC",
      attendees: 23
    },
    {
      title: "Travel Photography Workshop",
      description: "Capture village life",
      date: "Sept 25, 2PM UTC",
      attendees: 45
    },
    {
      title: "Cultural Exchange Meetup",
      description: "Share your stories",
      date: "Oct 1, 7PM UTC",
      attendees: 67
    }
  ];

  const featuredGroups = [
    {
      name: "Mountain Village Explorers",
      members: "2.3k members",
      icon: "🏔️",
      description: "Discover alpine communities"
    },
    {
      name: "Culinary Travelers",
      members: "1.8k members",
      icon: "🍳",
      description: "Food experiences worldwide"
    },
    {
      name: "Craft Enthusiasts",
      members: "1.2k members",
      icon: "🎨",
      description: "Traditional arts and crafts"
    }
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      console.log("New post:", newPost);
      setNewPost("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-nunito font-bold text-charcoal mb-4">Travel Community Hub</h1>
        <p className="text-xl text-charcoal/70">Connect with fellow village wanderers, share experiences, and get local insights</p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {communityStats.map((stat, index) => (
          <Card key={index} className="text-center border border-amber/20">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-terra mb-2">{stat.number}</div>
              <div className="text-sm text-charcoal/70">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              variant="ghost"
              className={`px-6 py-3 border-b-2 ${
                selectedTab === tab.id 
                  ? "text-terra border-terra" 
                  : "text-charcoal/70 border-transparent hover:text-terra"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Discussion Feed */}
        <div className="lg:col-span-2">
          {/* Create Post */}
          <Card className="shadow-sm mb-6 border border-amber/20">
            <CardContent className="p-6">
              <form onSubmit={handlePostSubmit}>
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" />
                    <AvatarFallback>YU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share your village travel experience or ask the community..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="resize-none border-gray-200 focus:ring-terra focus:border-terra"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <Button type="button" variant="ghost" size="sm" className="text-charcoal/70 hover:text-terra">
                      <Camera className="w-4 h-4 mr-1" />
                      Photo
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="text-charcoal/70 hover:text-terra">
                      <MapPin className="w-4 h-4 mr-1" />
                      Location
                    </Button>
                  </div>
                  <Button type="submit" className="bg-terra text-white hover:bg-terra/90">
                    Share
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Discussion Posts */}
          <div className="space-y-6">
            {mockCommunityPosts.map((post) => {
              const author = mockUsers.find(u => u.id === post.userId);
              return (
                <Card key={post.id} className="shadow-sm border border-amber/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={author?.avatar} />
                        <AvatarFallback>
                          {author?.firstName?.[0]}{author?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-charcoal">
                            {author?.firstName} {author?.lastName}
                          </h4>
                          <span className="text-sm text-charcoal/50">•</span>
                          <span className="text-sm text-charcoal/70">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                          {author?.verified && (
                            <Badge className="bg-sage text-white text-xs">Verified</Badge>
                          )}
                        </div>
                        
                        {post.title && (
                          <h3 className="text-lg font-medium mb-2 text-charcoal">{post.title}</h3>
                        )}
                        
                        <p className="text-charcoal/80 mb-4">{post.content}</p>
                        
                        {post.images && post.images.length > 0 && (
                          <img 
                            src={post.images[0]} 
                            alt="Post image"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-6">
                            <Button variant="ghost" size="sm" className="text-charcoal/70 hover:text-red-500">
                              <Heart className="w-4 h-4 mr-1" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-charcoal/70 hover:text-terra">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-charcoal/70 hover:text-terra">
                              <Share2 className="w-4 h-4 mr-1" />
                              {post.shares}
                            </Button>
                          </div>
                          {post.location && (
                            <div className="flex items-center text-sm text-charcoal/70">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span>{post.location}</span>
                            </div>
                          )}
                        </div>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex space-x-2 mt-3">
                            {post.tags.map((tag) => (
                              <Badge key={tag} className="bg-terra/10 text-terra text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <Card className="shadow-sm border border-amber/20">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-terra mr-2" />
                <h3 className="text-lg font-semibold text-charcoal">Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <span className="text-sm font-medium text-terra">{topic.tag}</span>
                    <span className="text-xs text-charcoal/70">{topic.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="shadow-sm border border-amber/20">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-sage mr-2" />
                <h3 className="text-lg font-semibold text-charcoal">Upcoming Events</h3>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border-l-4 border-terra pl-4">
                    <h4 className="font-medium text-charcoal text-sm">{event.title}</h4>
                    <p className="text-xs text-charcoal/70 mb-1">{event.description}</p>
                    <p className="text-xs text-charcoal/60 mb-2">{event.date}</p>
                    <div className="flex items-center text-xs text-charcoal/70">
                      <Users className="w-3 h-3 mr-1" />
                      <span>{event.attendees} attending</span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-terra text-xs mt-1 px-0">
                      Join Event
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Communities */}
          <Card className="shadow-sm border border-amber/20">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Users className="w-5 h-5 text-amber mr-2" />
                <h3 className="text-lg font-semibold text-charcoal">Active Communities</h3>
              </div>
              <div className="space-y-3">
                {featuredGroups.map((group, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-terra/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{group.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-charcoal text-sm">{group.name}</h4>
                      <p className="text-xs text-charcoal/70">{group.members}</p>
                      <p className="text-xs text-charcoal/60">{group.description}</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      Join
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-terra text-sm">
                View All Groups →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
