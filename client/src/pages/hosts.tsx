import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageCircle, Home, Award, Clock, Users, Filter, Search } from "lucide-react";

export default function Hosts() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const categories = [
    { id: "all", label: "All Hosts", icon: Users },
    { id: "homestay", label: "Homestay Hosts", icon: Home },
    { id: "activity", label: "Activity Guides", icon: Award },
    { id: "cultural", label: "Cultural Experts", icon: MessageCircle }
  ];

  const hosts = [
    {
      id: "1",
      name: "Maria Rossi",
      location: "Tuscany, Italy",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
      rating: 4.9,
      reviewCount: 127,
      verified: true,
      superhost: true,
      yearStarted: 2019,
      totalGuests: 450,
      responseTime: "1 hour",
      description: "Third-generation farmer offering authentic Tuscan farm experiences. Specializes in traditional cooking, wine-making, and organic farming practices.",
      specialties: ["Cooking Classes", "Wine Tours", "Organic Farming"],
      languages: ["Italian", "English", "Spanish"],
      accommodation: "Traditional Farmhouse",
      type: "homestay"
    },
    {
      id: "2", 
      name: "Klaus Weber",
      location: "Grindelwald, Switzerland",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
      rating: 4.8,
      reviewCount: 89,
      verified: true,
      superhost: false,
      yearStarted: 2020,
      totalGuests: 280,
      responseTime: "2 hours",
      description: "Experienced mountain guide and eco-lodge owner. Offers trekking adventures and insights into Alpine culture and sustainable living.",
      specialties: ["Mountain Guiding", "Eco-Lodge", "Sustainable Tourism"],
      languages: ["German", "English", "French"],
      accommodation: "Alpine Eco-Lodge",
      type: "activity"
    },
    {
      id: "3",
      name: "Akiko Tanaka", 
      location: "Shirakawa-go, Japan",
      avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
      rating: 4.9,
      reviewCount: 203,
      verified: true,
      superhost: true,
      yearStarted: 2017,
      totalGuests: 890,
      responseTime: "30 minutes",
      description: "Traditional ryokan owner and tea ceremony master. Offers authentic Japanese cultural experiences in a historic mountain village.",
      specialties: ["Tea Ceremony", "Traditional Arts", "Cultural Heritage"],
      languages: ["Japanese", "English"],
      accommodation: "Traditional Ryokan",
      type: "cultural"
    },
    {
      id: "4",
      name: "Carlos Mendoza",
      location: "Oaxaca, Mexico", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
      rating: 4.9,
      reviewCount: 156,
      verified: true,
      superhost: true,
      yearStarted: 2018,
      totalGuests: 620,
      responseTime: "1 hour",
      description: "Master potter and cultural educator. Teaches traditional pottery techniques passed down through 5 generations of his family.",
      specialties: ["Pottery", "Cultural Workshops", "Traditional Crafts"],
      languages: ["Spanish", "English"],
      accommodation: "Artisan Workshop & Guesthouse",
      type: "cultural"
    },
    {
      id: "5",
      name: "Ahmed Hassan",
      location: "Siwa Oasis, Egypt",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
      rating: 4.7,
      reviewCount: 94,
      verified: true,
      superhost: false,
      yearStarted: 2021,
      totalGuests: 180,
      responseTime: "3 hours",
      description: "Desert guide and traditional Berber camp owner. Offers authentic Sahara experiences with camel trekking and stargazing.",
      specialties: ["Desert Tours", "Camel Trekking", "Berber Culture"],
      languages: ["Arabic", "English", "French"],
      accommodation: "Traditional Desert Camp",
      type: "activity"
    },
    {
      id: "6",
      name: "Elena Vasquez",
      location: "Monsaraz, Portugal",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
      rating: 4.8,
      reviewCount: 112,
      verified: true,
      superhost: true,
      yearStarted: 2019,
      totalGuests: 340,
      responseTime: "45 minutes",
      description: "Heritage preservation specialist and guesthouse owner. Expert in medieval architecture and traditional Portuguese crafts.",
      specialties: ["Heritage Tours", "Traditional Crafts", "Architecture"],
      languages: ["Portuguese", "English", "Spanish"],
      accommodation: "Historic Guesthouse",
      type: "homestay"
    }
  ];

  const filteredHosts = hosts.filter(host => 
    activeCategory === "all" || host.type === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-nunito font-bold text-charcoal mb-4">Local Hosts</h1>
        <p className="text-xl text-charcoal/70">Connect with experienced local hosts who will make your village stay unforgettable</p>
      </div>

      {/* Host Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          return (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={isActive ? "default" : "outline"}
              className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                isActive 
                  ? "bg-terra text-white hover:bg-terra/90" 
                  : "border-terra text-terra hover:bg-terra hover:text-white"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm">{category.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Filters and Search */}
      <Card className="shadow-sm mb-8 border border-amber/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-charcoal mb-2">Search Hosts</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Location</label>
              <select className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent">
                <option>All Locations</option>
                <option>Europe</option>
                <option>Asia</option>
                <option>Africa</option>
                <option>Americas</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Rating</label>
              <select className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent">
                <option>All Ratings</option>
                <option>4.8+ Stars</option>
                <option>4.5+ Stars</option>
                <option>4.0+ Stars</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full bg-terra text-white hover:bg-terra/90">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Become a Host CTA */}
      <Card className="bg-gradient-to-br from-terra/5 to-amber/5 border border-amber/20 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-2">Share Your Village with Travelers</h3>
              <p className="text-charcoal/70">Join our community of hosts and showcase your local culture</p>
            </div>
            <Button className="bg-terra text-white hover:bg-terra/90">
              Become a Host
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hosts Grid */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-nunito font-bold text-charcoal">
              {filteredHosts.length} {activeCategory === "all" ? "Hosts" : categories.find(c => c.id === activeCategory)?.label}
            </h2>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="response">Fastest Response</option>
              <option value="guests">Most Experienced</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHosts.map((host) => (
              <Card key={host.id} className="shadow-lg overflow-hidden border border-amber/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-terra/10 to-sage/10 flex items-center justify-center">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={host.avatar} alt={host.name} />
                      <AvatarFallback className="text-2xl">
                        {host.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  {host.superhost && (
                    <div className="absolute top-3 left-3 bg-amber text-white px-2 py-1 rounded-full text-xs font-medium">
                      Superhost
                    </div>
                  )}
                  {host.verified && (
                    <div className="absolute top-3 right-3 bg-sage text-white px-2 py-1 rounded-full text-xs font-medium">
                      Verified
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-nunito font-bold text-charcoal">{host.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-amber fill-current" />
                      <span className="font-semibold">{host.rating}</span>
                      <span className="text-sm text-charcoal/70">({host.reviewCount})</span>
                    </div>
                  </div>
                  
                  <p className="text-charcoal/70 mb-3">{host.location}</p>
                  <p className="text-charcoal/80 text-sm mb-4">{host.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {host.specialties.slice(0, 2).map((specialty) => (
                      <Badge key={specialty} className="bg-terra/10 text-terra text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-charcoal/70">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Responds in {host.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{host.totalGuests}+ guests hosted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Home className="w-4 h-4" />
                      <span>Host since {host.yearStarted}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>{host.languages.join(", ")}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-terra text-white hover:bg-terra/90">
                      View Profile
                    </Button>
                    <Button variant="outline" className="flex-1 border-terra text-terra hover:bg-terra hover:text-white">
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Host Success Stories */}
          <Card className="shadow-sm border border-amber/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-4">Host Success Stories</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-charcoal/80 mb-2">"Hosting travelers has enriched my life immensely. Every guest brings new perspectives to our village."</p>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" />
                    </Avatar>
                    <span className="text-xs text-charcoal/70">Maria R., Superhost</span>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-charcoal/80 mb-2">"Through VillageWander, I've been able to share my passion for mountain culture with people from around the world."</p>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" />
                    </Avatar>
                    <span className="text-xs text-charcoal/70">Klaus W., Mountain Guide</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Host Resources */}
          <Card className="shadow-sm border border-amber/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-4">Host Resources</h3>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li><a href="#" className="hover:text-terra transition-colors">Getting Started Guide</a></li>
                <li><a href="#" className="hover:text-terra transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-terra transition-colors">Photography Tips</a></li>
                <li><a href="#" className="hover:text-terra transition-colors">Pricing Your Experience</a></li>
                <li><a href="#" className="hover:text-terra transition-colors">Host Community Forum</a></li>
                <li><a href="#" className="hover:text-terra transition-colors">Insurance & Protection</a></li>
              </ul>
            </CardContent>
          </Card>

          {/* Host Benefits */}
          <Card className="bg-gradient-to-br from-sage/5 to-terra/5 border border-amber/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-4">Why Become a Host?</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-terra/10 rounded-full flex items-center justify-center">
                    <span className="text-terra">💰</span>
                  </div>
                  <span className="text-sm text-charcoal/80">Earn income sharing your culture</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-sage/10 rounded-full flex items-center justify-center">
                    <span className="text-sage">🌍</span>
                  </div>
                  <span className="text-sm text-charcoal/80">Connect with global travelers</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber/10 rounded-full flex items-center justify-center">
                    <span className="text-amber">🏆</span>
                  </div>
                  <span className="text-sm text-charcoal/80">Preserve local traditions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-terra/10 rounded-full flex items-center justify-center">
                    <span className="text-terra">🤝</span>
                  </div>
                  <span className="text-sm text-charcoal/80">Build lasting friendships</span>
                </li>
              </ul>
              <Button className="w-full mt-4 bg-terra text-white hover:bg-terra/90">
                Start Hosting Today
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button className="bg-terra text-white hover:bg-terra/90 px-8 py-3">
          Load More Hosts
        </Button>
      </div>
    </div>
  );
}
