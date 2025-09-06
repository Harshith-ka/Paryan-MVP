import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreateGroupModal } from "@/components/CreateGroupModal";
import { GroupChatModal } from "@/components/GroupChatModal";
import { useQuery } from "@tanstack/react-query";
import type { GroupChat } from "@shared/schema";
import { 
  Plus, 
  Users, 
  MessageCircle, 
  Calendar,
  Globe,
  Lock,
  Search,
  Filter,
  Utensils,
  Camera,
  Mountain,
  Palette,
  Sprout
} from "lucide-react";

interface TravelGroup {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  category: string;
  memberCount: number;
  isPublic: boolean;
  createdBy: string;
  tags: string[];
  recentActivity: string;
  upcomingEvents: number;
  members: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
}

export default function Groups() {
  const [activeTab, setActiveTab] = useState("discover");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [showGroupChat, setShowGroupChat] = useState(false);
  
  // Mock current user - in real app this would come from auth context
  const currentUserId = "user-1";

  // Get user's groups
  const { data: userGroups = [] } = useQuery<GroupChat[]>({
    queryKey: ['/api/users', currentUserId, 'groups'],
    enabled: activeTab === "my-groups",
  });

  const categories = [
    { id: "all", label: "All Groups", icon: Users },
    { id: "cultural", label: "Cultural Exchange", icon: Palette },
    { id: "culinary", label: "Food & Culture", icon: Utensils },
    { id: "adventure", label: "Adventure", icon: Mountain },
    { id: "photography", label: "Photography", icon: Camera },
    { id: "sustainable", label: "Sustainable Travel", icon: Sprout }
  ];

  const mockGroups: TravelGroup[] = [
    {
      id: "1",
      name: "Alpine Village Explorers",
      description: "Dedicated to exploring authentic mountain villages across Europe. Join us for guided tours, cultural exchanges, and alpine adventures.",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      category: "adventure",
      memberCount: 1234,
      isPublic: true,
      createdBy: "Klaus Weber",
      tags: ["Mountains", "Europe", "Hiking", "Culture"],
      recentActivity: "2 hours ago",
      upcomingEvents: 3,
      members: [
        { id: "1", name: "Sarah", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" },
        { id: "2", name: "Marco", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" },
        { id: "3", name: "Elena", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" }
      ]
    },
    {
      id: "2",
      name: "Village Food Experiences",
      description: "Discover authentic village cuisines, traditional cooking methods, and food festivals. Perfect for culinary enthusiasts and food photographers.",
      coverImage: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      category: "culinary",
      memberCount: 2156,
      isPublic: true,
      createdBy: "Maria Rossi",
      tags: ["Food", "Cooking", "Traditions", "Festivals"],
      recentActivity: "1 day ago",
      upcomingEvents: 5,
      members: [
        { id: "4", name: "Carlos", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" },
        { id: "5", name: "Akiko", avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" }
      ]
    },
    {
      id: "3",
      name: "Sustainable Village Tourism",
      description: "Focus on eco-friendly village tourism, supporting local communities, and minimizing environmental impact while traveling.",
      coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      category: "sustainable",
      memberCount: 892,
      isPublic: true,
      createdBy: "Elena Rodriguez",
      tags: ["Sustainability", "Eco-travel", "Community", "Conservation"],
      recentActivity: "3 hours ago",
      upcomingEvents: 2,
      members: [
        { id: "6", name: "Ahmed", avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" }
      ]
    },
    {
      id: "4",
      name: "Village Photography Club",
      description: "Capture the beauty of village life, traditional architecture, and local culture. Share your photos, get feedback, and learn new techniques.",
      coverImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      category: "photography",
      memberCount: 567,
      isPublic: true,
      createdBy: "David Chen",
      tags: ["Photography", "Culture", "Architecture", "Learning"],
      recentActivity: "5 hours ago",
      upcomingEvents: 1,
      members: [
        { id: "7", name: "Sophie", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" }
      ]
    },
    {
      id: "5",
      name: "Traditional Crafts Circle",
      description: "Learn and share traditional crafts from around the world. Find workshops, share your creations, and preserve cultural heritage.",
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      category: "cultural",
      memberCount: 934,
      isPublic: true,
      createdBy: "Carlos Mendoza",
      tags: ["Crafts", "Traditional", "Learning", "Heritage"],
      recentActivity: "1 day ago",
      upcomingEvents: 4,
      members: [
        { id: "8", name: "Yuki", avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" }
      ]
    },
    {
      id: "6",
      name: "Asian Village Wanderers",
      description: "Explore traditional Asian villages, temples, rice terraces, and ancient cultural practices across Southeast Asia and East Asia.",
      coverImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      category: "cultural",
      memberCount: 1089,
      isPublic: true,
      createdBy: "Akiko Tanaka",
      tags: ["Asia", "Temples", "Rice Terraces", "Culture"],
      recentActivity: "6 hours ago",
      upcomingEvents: 2,
      members: [
        { id: "9", name: "Lin", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" }
      ]
    }
  ];

  const filteredGroups = mockGroups.filter(group => 
    selectedCategory === "all" || group.category === selectedCategory
  );

  const myGroups = mockGroups.slice(0, 2); // Mock user's groups

  const popularGroups = mockGroups
    .sort((a, b) => b.memberCount - a.memberCount)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-nunito font-bold text-charcoal mb-4">Travel Groups</h1>
        <p className="text-xl text-charcoal/70">Create or join groups to connect with like-minded village travelers</p>
      </div>

      {/* Create Group CTA */}
      <Card className="bg-gradient-to-br from-terra/5 to-amber/5 border border-amber/20 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-2">Start Your Own Travel Group</h3>
              <p className="text-charcoal/70">Organize village visits, cultural exchanges, or themed travel experiences</p>
            </div>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-terra text-white hover:bg-terra/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover Groups</TabsTrigger>
          <TabsTrigger value="my-groups">My Groups</TabsTrigger>
          <TabsTrigger value="create">Create Group</TabsTrigger>
        </TabsList>

        {/* Discover Groups Tab */}
        <TabsContent value="discover" className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={isActive ? "default" : "outline"}
                  className={`flex items-center space-x-2 ${
                    isActive 
                      ? "bg-terra text-white hover:bg-terra/90" 
                      : "border-terra text-terra hover:bg-terra hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search groups..."
                className="pl-10 focus:ring-terra focus:border-terra"
              />
            </div>
            <Button size="icon" variant="outline" className="border-terra text-terra hover:bg-terra hover:text-white">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="shadow-lg overflow-hidden border border-amber/20 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="relative h-32">
                  <img 
                    src={group.coverImage} 
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    {group.isPublic ? (
                      <Badge className="bg-sage text-white">
                        <Globe className="w-3 h-3 mr-1" />
                        Public
                      </Badge>
                    ) : (
                      <Badge className="bg-charcoal text-white">
                        <Lock className="w-3 h-3 mr-1" />
                        Private
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-terra/10 rounded-lg flex items-center justify-center mr-3">
                      {categories.find(c => c.id === group.category)?.icon && 
                        (() => {
                          const Icon = categories.find(c => c.id === group.category)!.icon;
                          return <Icon className="w-6 h-6 text-terra" />;
                        })()
                      }
                    </div>
                    <div>
                      <h3 className="font-nunito font-semibold text-charcoal">{group.name}</h3>
                      <p className="text-sm text-charcoal/70">{group.memberCount.toLocaleString()} members • {group.upcomingEvents} events</p>
                    </div>
                  </div>
                  
                  <p className="text-charcoal/80 text-sm mb-4">{group.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      {group.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} className="bg-terra/10 text-terra text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs">
                            {member.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {group.members.length > 3 && (
                        <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-gray-600">+</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 text-xs text-charcoal/70">
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>Active {group.recentActivity}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{group.upcomingEvents} upcoming events</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-terra text-white hover:bg-terra/90">
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Groups Tab */}
        <TabsContent value="my-groups" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-nunito font-bold text-charcoal">Your Groups</h2>
            <Button 
              onClick={() => setActiveTab("create")}
              className="bg-terra text-white hover:bg-terra/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Group
            </Button>
          </div>

          {myGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myGroups.map((group) => (
                <Card key={group.id} className="shadow-lg border border-amber/20">
                  <div className="relative h-32">
                    <img 
                      src={group.coverImage} 
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-sage text-white">Admin</Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-nunito font-semibold text-charcoal mb-2">{group.name}</h3>
                    <p className="text-charcoal/80 text-sm mb-4">{group.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-terra">{group.memberCount}</div>
                        <div className="text-xs text-charcoal/70">Members</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-sage">{group.upcomingEvents}</div>
                        <div className="text-xs text-charcoal/70">Events</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-amber">12</div>
                        <div className="text-xs text-charcoal/70">Posts</div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-terra text-white hover:bg-terra/90">
                        Manage
                      </Button>
                      <Button variant="outline" className="flex-1 border-terra text-terra hover:bg-terra hover:text-white">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="shadow-sm border border-amber/20">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-charcoal/30 mx-auto mb-4" />
                <h3 className="text-lg font-nunito font-semibold text-charcoal mb-2">No Groups Yet</h3>
                <p className="text-charcoal/70 mb-6">You haven't joined or created any groups yet. Start connecting with fellow travelers!</p>
                <div className="flex space-x-4 justify-center">
                  <Button 
                    onClick={() => setActiveTab("discover")}
                    variant="outline" 
                    className="border-terra text-terra hover:bg-terra hover:text-white"
                  >
                    Discover Groups
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("create")}
                    className="bg-terra text-white hover:bg-terra/90"
                  >
                    Create Group
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Create Group Tab */}
        <TabsContent value="create" className="space-y-6">
          <Card className="shadow-lg border border-amber/20">
            <CardHeader>
              <CardTitle className="text-2xl font-nunito">Create Your Travel Group</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="groupName">Group Name</Label>
                    <Input 
                      id="groupName"
                      placeholder="e.g., Alpine Village Explorers"
                      className="focus:ring-terra focus:border-terra"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select 
                      id="category"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      <option value="cultural">Cultural Exchange</option>
                      <option value="culinary">Food & Culture</option>
                      <option value="adventure">Adventure</option>
                      <option value="photography">Photography</option>
                      <option value="sustainable">Sustainable Travel</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Describe your group's purpose and activities..."
                    rows={4}
                    className="focus:ring-terra focus:border-terra"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input 
                    id="tags"
                    placeholder="e.g., Mountains, Europe, Hiking, Culture"
                    className="focus:ring-terra focus:border-terra"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input type="radio" id="public" name="visibility" value="public" defaultChecked className="text-terra" />
                    <Label htmlFor="public" className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span>Public - Anyone can join</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input type="radio" id="private" name="visibility" value="private" className="text-terra" />
                    <Label htmlFor="private" className="flex items-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>Private - Approval required to join</span>
                    </Label>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="bg-terra text-white hover:bg-terra/90">
                    Create Group
                  </Button>
                  <Button type="button" variant="outline" className="border-terra text-terra hover:bg-terra hover:text-white">
                    Save as Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Group Creation Tips */}
          <Card className="bg-gradient-to-br from-sage/5 to-terra/5 border border-amber/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-4">💡 Tips for Creating a Successful Group</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-charcoal/80">
                  <li>• Choose a clear, descriptive name</li>
                  <li>• Define your group's specific focus</li>
                  <li>• Add relevant tags for discoverability</li>
                  <li>• Set clear guidelines and expectations</li>
                </ul>
                <ul className="space-y-2 text-sm text-charcoal/80">
                  <li>• Plan regular events and activities</li>
                  <li>• Encourage member participation</li>
                  <li>• Share valuable travel resources</li>
                  <li>• Foster a welcoming community</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Popular Groups Sidebar would go here in a full layout */}
      {activeTab === "discover" && (
        <Card className="shadow-sm border border-amber/20 mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-nunito font-semibold text-charcoal mb-4">Most Popular Groups</h3>
            <div className="space-y-3">
              {popularGroups.map((group) => (
                <div key={group.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-cover bg-center rounded-lg" style={{backgroundImage: `url(${group.coverImage})`}}></div>
                    <div>
                      <h4 className="font-medium text-charcoal text-sm">{group.name}</h4>
                      <p className="text-xs text-charcoal/70">{group.memberCount.toLocaleString()} members</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-terra text-terra hover:bg-terra hover:text-white">
                    Join
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Group Chat Modal */}
      {selectedGroupId && (
        <GroupChatModal
          isOpen={showGroupChat}
          onClose={() => {
            setShowGroupChat(false);
            setSelectedGroupId(null);
          }}
          groupId={selectedGroupId!}
          currentUserId={currentUserId}
        />
      )}

      {/* Create Group Modal */}
      <CreateGroupModal
        currentUserId={currentUserId}
        onGroupCreated={(groupId) => {
          setSelectedGroupId(groupId);
          setShowGroupChat(true);
        }}
      />
    </div>
  );
}
