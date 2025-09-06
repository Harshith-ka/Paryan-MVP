import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Clock, 
  BookOpen, 
  MapPin, 
  Filter,
  Search,
  Bookmark,
  Share2,
  ChevronRight,
  Award
} from "lucide-react";

interface Guide {
  id: string;
  title: string;
  description: string;
  destination: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    expertise: string;
  };
  coverImage: string;
  rating: number;
  reviewCount: number;
  readTime: number;
  tags: string[];
  lastUpdated: string;
  sections: number;
  featured: boolean;
}

export default function Guides() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Guides", count: 127 },
    { id: "cultural", label: "Cultural", count: 45 },
    { id: "culinary", label: "Culinary", count: 32 },
    { id: "nature", label: "Nature & Adventure", count: 28 },
    { id: "accommodation", label: "Accommodation", count: 22 }
  ];

  const mockGuides: Guide[] = [
    {
      id: "1",
      title: "Complete Guide to Tuscany Village Life",
      description: "Everything you need to know about experiencing authentic life in Tuscan villages - from wine making to cooking with local families.",
      destination: "Tuscany, Italy",
      author: {
        name: "Marco Benedetti",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        verified: true,
        expertise: "Local Cultural Expert"
      },
      coverImage: "https://images.unsplash.com/photo-1523503542537-0c2ea7f1f40c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      rating: 4.9,
      reviewCount: 234,
      readTime: 12,
      tags: ["Wine", "Cooking", "History", "Local Traditions"],
      lastUpdated: "March 2024",
      sections: 8,
      featured: true
    },
    {
      id: "2",
      title: "Alpine Village Adventures: A Hiker's Paradise",
      description: "Discover the best trails, mountain huts, and cultural experiences in traditional Swiss Alpine villages.",
      destination: "Swiss Alps, Switzerland",
      author: {
        name: "Klaus Weber",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        verified: true,
        expertise: "Mountain Guide"
      },
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      rating: 4.8,
      reviewCount: 189,
      readTime: 15,
      tags: ["Hiking", "Mountain Culture", "Eco-tourism", "Safety"],
      lastUpdated: "February 2024",
      sections: 10,
      featured: true
    },
    {
      id: "3",
      title: "Japanese Village Etiquette & Cultural Immersion",
      description: "Navigate traditional Japanese village customs, participate in local festivals, and understand the deeper cultural meanings.",
      destination: "Shirakawa-go, Japan",
      author: {
        name: "Akiko Tanaka",
        avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        verified: true,
        expertise: "Cultural Ambassador"
      },
      coverImage: "https://pixabay.com/get/gce39e3c5643acb40739d7ebe84cc5a5c03253d48131f61b1827600e2a0134b6be1ae795ce2ed0d34208070597581942148118738b2ba8ae6ea59a5b9afd2ccab_1280.jpg",
      rating: 4.9,
      reviewCount: 156,
      readTime: 10,
      tags: ["Etiquette", "Festivals", "Traditional Arts", "Language"],
      lastUpdated: "January 2024",
      sections: 7,
      featured: false
    },
    {
      id: "4",
      title: "Sustainable Travel in Village Communities",
      description: "How to travel responsibly, support local economies, and minimize your environmental impact while maximizing cultural exchange.",
      destination: "Global",
      author: {
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        verified: true,
        expertise: "Sustainable Tourism Expert"
      },
      coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      rating: 4.7,
      reviewCount: 203,
      readTime: 8,
      tags: ["Sustainability", "Community Impact", "Ethics", "Conservation"],
      lastUpdated: "March 2024",
      sections: 6,
      featured: false
    },
    {
      id: "5",
      title: "Traditional Craft Workshops: A Hands-On Guide",
      description: "Find the best pottery, weaving, and artisan workshops across village destinations worldwide.",
      destination: "Various Destinations",
      author: {
        name: "Carlos Mendoza",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        verified: true,
        expertise: "Master Artisan"
      },
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      rating: 4.8,
      reviewCount: 167,
      readTime: 11,
      tags: ["Pottery", "Weaving", "Crafts", "Learning"],
      lastUpdated: "February 2024",
      sections: 9,
      featured: false
    },
    {
      id: "6",
      title: "Village Homestay Essentials",
      description: "Everything you need to know about staying with local families, from cultural expectations to packing tips.",
      destination: "Global",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        verified: true,
        expertise: "Travel Writer"
      },
      coverImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      rating: 4.6,
      reviewCount: 142,
      readTime: 9,
      tags: ["Homestay", "Cultural Exchange", "Preparation", "Tips"],
      lastUpdated: "January 2024",
      sections: 5,
      featured: false
    }
  ];

  const topGuides = mockGuides
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const recentGuides = mockGuides
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-nunito font-bold text-charcoal mb-4">Travel Guides</h1>
        <p className="text-xl text-charcoal/70">Curated guides from local experts and experienced travelers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full md:w-auto">
                {categories.slice(0, 5).map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs md:text-sm">
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="flex space-x-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search guides..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent"
                  />
                </div>
                <Button size="icon" variant="outline" className="border-terra text-terra hover:bg-terra hover:text-white">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <TabsContent value={activeTab} className="space-y-6">
              {/* Featured Guides */}
              {activeTab === "all" && (
                <div className="mb-8">
                  <h2 className="text-2xl font-nunito font-bold text-charcoal mb-6">Featured Guides</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockGuides.filter(guide => guide.featured).map((guide) => (
                      <Card key={guide.id} className="shadow-lg overflow-hidden border border-amber/20 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                        <div className="relative h-48">
                          <img 
                            src={guide.coverImage} 
                            alt={guide.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-terra text-white">Featured</Badge>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h3 className="font-nunito font-bold text-lg mb-1">{guide.title}</h3>
                            <p className="text-sm opacity-90">{guide.destination}</p>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={guide.author.avatar} alt={guide.author.name} />
                                <AvatarFallback className="text-xs">
                                  {guide.author.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-charcoal/70">{guide.author.name}</span>
                              {guide.author.verified && (
                                <Badge className="bg-sage/10 text-sage text-xs">Verified</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-amber fill-current" />
                              <span className="text-sm font-medium">{guide.rating}</span>
                            </div>
                          </div>
                          <p className="text-charcoal/80 text-sm mb-3">{guide.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-charcoal/70">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{guide.readTime} min read</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <BookOpen className="w-3 h-3" />
                                <span>{guide.sections} sections</span>
                              </div>
                            </div>
                            <Button size="sm" className="bg-terra text-white hover:bg-terra/90">
                              Read Guide
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* All Guides List */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-nunito font-bold text-charcoal">
                    {activeTab === "all" ? "All Guides" : 
                     categories.find(c => c.id === activeTab)?.label + " Guides"}
                  </h2>
                  <select className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent">
                    <option>Most Popular</option>
                    <option>Newest</option>
                    <option>Highest Rated</option>
                    <option>Most Helpful</option>
                  </select>
                </div>

                <div className="space-y-6">
                  {mockGuides.map((guide) => (
                    <Card key={guide.id} className="shadow-sm border border-amber/20 hover:shadow-md transition-all cursor-pointer">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="w-48 h-32 flex-shrink-0">
                            <img 
                              src={guide.coverImage}
                              alt={guide.title}
                              className="w-full h-full object-cover rounded-l-lg"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-nunito font-bold text-charcoal hover:text-terra transition-colors">
                                {guide.title}
                              </h3>
                              <div className="flex items-center space-x-2 ml-4">
                                <Button size="icon" variant="ghost" className="text-charcoal/70 hover:text-terra">
                                  <Bookmark className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-charcoal/70 hover:text-terra">
                                  <Share2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 mb-3">
                              <MapPin className="w-4 h-4 text-charcoal/50" />
                              <span className="text-sm text-charcoal/70">{guide.destination}</span>
                            </div>
                            
                            <p className="text-charcoal/80 mb-4">{guide.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={guide.author.avatar} alt={guide.author.name} />
                                    <AvatarFallback className="text-xs">
                                      {guide.author.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium text-charcoal">{guide.author.name}</p>
                                    <p className="text-xs text-charcoal/70">{guide.author.expertise}</p>
                                  </div>
                                  {guide.author.verified && (
                                    <Badge className="bg-sage/10 text-sage text-xs">Verified</Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-6 text-sm text-charcoal/70">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-amber fill-current" />
                                  <span>{guide.rating} ({guide.reviewCount})</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{guide.readTime} min</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <BookOpen className="w-4 h-4" />
                                  <span>{guide.sections} sections</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4 pt-4 border-t">
                              <div className="flex flex-wrap gap-2">
                                {guide.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} className="bg-terra/10 text-terra text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <Button variant="ghost" className="text-terra hover:text-terra/80 p-0">
                                Read Guide <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Rated Guides */}
          <Card className="shadow-sm border border-amber/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-4">
                <Award className="w-5 h-5 inline mr-2" />
                Top Rated Guides
              </h3>
              <div className="space-y-3">
                {topGuides.map((guide, index) => (
                  <div key={guide.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="w-6 h-6 bg-terra text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-charcoal text-sm truncate">{guide.title}</h4>
                      <p className="text-xs text-charcoal/70">{guide.destination}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-3 h-3 text-amber fill-current" />
                        <span className="text-xs text-charcoal">{guide.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recently Updated */}
          <Card className="shadow-sm border border-amber/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-4">Recently Updated</h3>
              <div className="space-y-3">
                {recentGuides.map((guide) => (
                  <div key={guide.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="w-12 h-12 bg-cover bg-center rounded-lg" style={{backgroundImage: `url(${guide.coverImage})`}}></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-charcoal text-sm truncate">{guide.title}</h4>
                      <p className="text-xs text-charcoal/70">{guide.lastUpdated}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-3 h-3 text-charcoal/50" />
                        <span className="text-xs text-charcoal/70">{guide.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Write a Guide CTA */}
          <Card className="bg-gradient-to-br from-terra/5 to-amber/5 border border-amber/20">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-terra mx-auto mb-4" />
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-2">Share Your Expertise</h3>
              <p className="text-charcoal/70 text-sm mb-4">Have you discovered amazing village experiences? Share your knowledge with fellow travelers.</p>
              <Button className="bg-terra text-white hover:bg-terra/90 w-full">
                Write a Guide
              </Button>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="shadow-sm border border-amber/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-4">Browse by Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div 
                    key={category.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setActiveTab(category.id)}
                  >
                    <span className="text-sm text-charcoal">{category.label}</span>
                    <Badge className="bg-gray-100 text-charcoal text-xs">{category.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
