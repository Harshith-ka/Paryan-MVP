import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FollowButton } from "@/components/FollowButton";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";
import { 
  Edit, 
  MapPin, 
  Calendar,
  Award,
  Heart,
  MessageCircle,
  Camera,
  Bookmark,
  Settings,
  Shield,
  Bell,
  Globe,
  Users,
  Star,
  TrendingUp
} from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock current user - in real app this would come from auth context
  const currentUserId = "current-user-1";
  const profileUserId = "user-1"; // This would come from URL params

  // Mock user data
  const user = {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
    location: "San Francisco, USA",
    bio: "Passionate about authentic cultural experiences and sustainable travel. Love connecting with local communities and learning traditional crafts. Currently exploring European villages with a focus on culinary traditions.",
    joinDate: new Date("2023-01-15"),
    verified: true,
    badges: ["Verified Traveler", "Community Contributor", "Cultural Explorer", "Sustainable Traveler"],
    stats: {
      tripsDone: 12,
      reviewsWritten: 28,
      photosShared: 156,
      groupsJoined: 8,
      wishlistItems: 34,
      helpfulVotes: 89
    },
    interests: ["Cultural Immersion", "Cooking Classes", "Traditional Crafts", "Photography", "Local Festivals"],
    languages: ["English", "Spanish", "Italian (Basic)"]
  };

  const recentActivities = [
    {
      type: "review",
      title: "Wrote a review for Maria's Traditional Farm",
      location: "Tuscany, Italy", 
      date: "2 days ago",
      rating: 5
    },
    {
      type: "photo",
      title: "Shared 8 photos from Alpine Village Trek",
      location: "Grindelwald, Switzerland",
      date: "1 week ago"
    },
    {
      type: "wishlist",
      title: "Added Japanese Traditional Village Experience",
      location: "Shirakawa-go, Japan",
      date: "2 weeks ago"
    },
    {
      type: "group",
      title: "Joined Alpine Village Explorers",
      date: "3 weeks ago"
    }
  ];

  const wishlistItems = [
    {
      id: "1",
      name: "Traditional Pottery Workshop",
      location: "Monsaraz, Portugal",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
      type: "Activity",
      price: "$45"
    },
    {
      id: "2", 
      name: "Berber Desert Camp",
      location: "Sahara, Morocco",
      image: "https://pixabay.com/get/gc672f734a7f39ec402764e6a8b185ba08f343719ba95ac86d42cd9a760214d9d7fabf9fcd9a437bc9fe64ff9ec3483fdc56fedf682de78fa8cd052d04a54b1e9_1280.jpg",
      type: "Stay",
      price: "$65/night"
    },
    {
      id: "3",
      name: "Himalayan Heritage Village",
      location: "Annapurna, Nepal", 
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
      type: "Destination",
      price: "From $35/night"
    }
  ];

  const travelStats = [
    { label: "Countries Visited", value: "8", icon: Globe },
    { label: "Villages Explored", value: "24", icon: MapPin },
    { label: "Cultural Experiences", value: "47", icon: Award },
    { label: "Local Friends Made", value: "156", icon: Users }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <Card className="shadow-lg border border-amber/20 mb-8">
        <div className="relative">
          {/* Cover Image */}
          <div className="h-48 md:h-64 bg-cover bg-center rounded-t-lg" style={{backgroundImage: `url(${user.coverImage})`}}>
            <div className="absolute inset-0 bg-black/20 rounded-t-lg"></div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute top-4 right-4 bg-white/90 hover:bg-white"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>

          {/* Profile Info */}
          <CardContent className="relative p-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Avatar */}
              <div className="relative -mt-16 md:-mt-20">
                <Avatar className="w-24 h-24 md:w-32 h-32 border-4 border-white">
                  <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback className="text-2xl">
                    {user.firstName[0]}{user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-gray-200 hover:bg-gray-50"
                >
                  <Camera className="w-3 h-3" />
                </Button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-nunito font-bold text-charcoal">
                    {user.firstName} {user.lastName}
                  </h1>
                  {user.verified && (
                    <Badge className="bg-sage/10 text-sage">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-charcoal/70 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{user.location}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Member since {user.joinDate.getFullYear()}</span>
                </div>
                <p className="text-charcoal/80 max-w-2xl">{user.bio}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {currentUserId === profileUserId ? (
                  <>
                    <Button 
                      onClick={() => setIsEditing(true)}
                      variant="outline" 
                      className="border-terra text-terra hover:bg-terra hover:text-white"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-terra text-terra hover:bg-terra hover:text-white"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </>
                ) : (
                  <>
                    <FollowButton 
                      currentUserId={currentUserId}
                      targetUserId={profileUserId}
                      targetUserName={user.firstName}
                    />
                    <Button 
                      variant="outline"
                      className="border-terra text-terra hover:bg-terra hover:text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {user.badges.map((badge) => (
                <Badge key={badge} className="bg-terra/10 text-terra">
                  <Award className="w-3 h-3 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {travelStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="shadow-sm border border-amber/20">
              <CardContent className="p-4 text-center">
                <Icon className="w-8 h-8 text-terra mx-auto mb-2" />
                <div className="text-2xl font-bold text-charcoal">{stat.value}</div>
                <div className="text-sm text-charcoal/70">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activity */}
              <Card className="shadow-lg border border-amber/20">
                <CardHeader>
                  <CardTitle className="text-xl font-nunito">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'review' ? 'bg-star/10' :
                          activity.type === 'photo' ? 'bg-camera/10' :
                          activity.type === 'wishlist' ? 'bg-heart/10' :
                          'bg-users/10'
                        }`}>
                          {activity.type === 'review' && <Star className="w-4 h-4 text-amber" />}
                          {activity.type === 'photo' && <Camera className="w-4 h-4 text-terra" />}
                          {activity.type === 'wishlist' && <Heart className="w-4 h-4 text-red-500" />}
                          {activity.type === 'group' && <Users className="w-4 h-4 text-sage" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-charcoal">{activity.title}</h4>
                          {activity.location && (
                            <p className="text-sm text-charcoal/70">{activity.location}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-charcoal/50">{activity.date}</span>
                            {activity.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-amber fill-current" />
                                <span className="text-xs text-charcoal">{activity.rating}.0</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Travel Summary */}
              <Card className="shadow-lg border border-amber/20">
                <CardHeader>
                  <CardTitle className="text-xl font-nunito">Travel Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-terra">{user.stats.tripsDone}</div>
                      <div className="text-sm text-charcoal/70">Trips Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-sage">{user.stats.reviewsWritten}</div>
                      <div className="text-sm text-charcoal/70">Reviews Written</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber">{user.stats.photosShared}</div>
                      <div className="text-sm text-charcoal/70">Photos Shared</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-terra">{user.stats.groupsJoined}</div>
                      <div className="text-sm text-charcoal/70">Groups Joined</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-sage">{user.stats.wishlistItems}</div>
                      <div className="text-sm text-charcoal/70">Wishlist Items</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber">{user.stats.helpfulVotes}</div>
                      <div className="text-sm text-charcoal/70">Helpful Votes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Interests */}
              <Card className="shadow-sm border border-amber/20">
                <CardHeader>
                  <CardTitle className="text-lg font-nunito">Travel Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest) => (
                      <Badge key={interest} className="bg-terra/10 text-terra">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card className="shadow-sm border border-amber/20">
                <CardHeader>
                  <CardTitle className="text-lg font-nunito">Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {user.languages.map((language) => (
                      <li key={language} className="flex items-center justify-between">
                        <span className="text-charcoal">{language}</span>
                        <Badge className="bg-sage/10 text-sage text-xs">
                          {language.includes("Basic") ? "Basic" : "Fluent"}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Profile Completion */}
              <Card className="bg-gradient-to-br from-terra/5 to-amber/5 border border-amber/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-nunito font-semibold text-charcoal">Profile Strength</h3>
                    <span className="text-sm font-medium text-terra">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-terra h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li className="text-sage">✓ Profile photo added</li>
                    <li className="text-sage">✓ Bio completed</li>
                    <li className="text-sage">✓ Interests added</li>
                    <li className="text-charcoal/70">○ Phone number verification</li>
                    <li className="text-charcoal/70">○ Add travel photos</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist" className="space-y-6">
          <Card className="shadow-lg border border-amber/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-nunito">My Wishlist</CardTitle>
                <Badge className="bg-terra/10 text-terra">
                  {user.stats.wishlistItems} items
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="shadow-sm border border-amber/20 hover:shadow-md transition-all cursor-pointer">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-500"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                      <Badge className="absolute bottom-2 left-2 bg-white/90 text-charcoal text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-charcoal mb-1">{item.name}</h4>
                      <p className="text-sm text-charcoal/70 mb-2">{item.location}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-terra">{item.price}</span>
                        <Button size="sm" className="bg-terra text-white hover:bg-terra/90">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <Card className="shadow-lg border border-amber/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-nunito">My Reviews</CardTitle>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-amber/10 text-amber">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    4.8 avg rating
                  </Badge>
                  <Badge className="bg-terra/10 text-terra">
                    {user.stats.reviewsWritten} reviews
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-charcoal/30 mx-auto mb-4" />
                <h3 className="text-lg font-nunito font-semibold text-charcoal mb-2">Your reviews will appear here</h3>
                <p className="text-charcoal/70 mb-6">Share your experiences to help fellow travelers</p>
                <Button className="bg-terra text-white hover:bg-terra/90">
                  Write Your First Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Settings */}
            <Card className="shadow-lg border border-amber/20">
              <CardHeader>
                <CardTitle className="text-lg font-nunito">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} disabled className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    defaultValue={user.location}
                    className="focus:ring-terra focus:border-terra"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    defaultValue={user.bio}
                    rows={3}
                    className="focus:ring-terra focus:border-terra"
                  />
                </div>
                <Button className="bg-terra text-white hover:bg-terra/90">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Privacy & Notifications */}
            <div className="space-y-6">
              <Card className="shadow-lg border border-amber/20">
                <CardHeader>
                  <CardTitle className="text-lg font-nunito">Privacy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-charcoal">Profile Visibility</p>
                      <p className="text-sm text-charcoal/70">Who can see your profile</p>
                    </div>
                    <select className="p-2 border border-gray-200 rounded-lg">
                      <option>Everyone</option>
                      <option>Members Only</option>
                      <option>Private</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-charcoal">Activity Status</p>
                      <p className="text-sm text-charcoal/70">Show when you're online</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border border-amber/20">
                <CardHeader>
                  <CardTitle className="text-lg font-nunito">Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-charcoal">Email Notifications</p>
                      <p className="text-sm text-charcoal/70">Receive updates via email</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-charcoal">Push Notifications</p>
                      <p className="text-sm text-charcoal/70">Get notified on your device</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-charcoal">Group Invites</p>
                      <p className="text-sm text-charcoal/70">Allow group invitations</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
