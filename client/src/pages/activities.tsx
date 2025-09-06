import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Award, Filter } from "lucide-react";
import ActivityCard from "@/components/ui/activity-card";
import { mockActivities } from "@/lib/mock-data";

export default function Activities() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    { id: "all", label: "All Activities", icon: "🎯" },
    { id: "workshop", label: "Workshops", icon: "🛠️" },
    { id: "cultural", label: "Cultural Tours", icon: "🏛️" },
    { id: "food", label: "Food Experiences", icon: "🍽️" },
    { id: "nature", label: "Nature Activities", icon: "🌿" },
    { id: "festival", label: "Festivals", icon: "🎉" }
  ];

  const filteredActivities = mockActivities.filter(activity => 
    selectedCategory === "all" || activity.category === selectedCategory
  );

  const upcomingEvents = [
    {
      title: "Wine Harvest Festival",
      location: "Tuscany, Italy",
      date: "September 15-17, 2024",
      description: "Join the annual wine harvest celebration with grape picking and village feast."
    },
    {
      title: "Traditional Craft Fair",
      location: "Monsaraz, Portugal", 
      date: "October 5-7, 2024",
      description: "Showcase of local artisans and hands-on workshops."
    },
    {
      title: "Mountain Festival",
      location: "Grindelwald, Switzerland",
      date: "October 12-14, 2024",
      description: "Alpine celebration with traditional music and mountain activities."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-nunito font-bold text-charcoal mb-4">Cultural Activities & Experiences</h1>
        <p className="text-xl text-charcoal/70">Immerse yourself in authentic local traditions and activities</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`flex items-center space-x-2 ${
              selectedCategory === category.id 
                ? "bg-terra text-white hover:bg-terra/90" 
                : "border-terra text-terra hover:bg-terra hover:text-white"
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </Button>
        ))}
      </div>

      {/* Filters and Sort */}
      <Card className="shadow-sm mb-8 border border-amber/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Duration</label>
              <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent">
                <option>Any Duration</option>
                <option>1-3 hours</option>
                <option>Half day</option>
                <option>Full day</option>
                <option>Multi-day</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Difficulty</label>
              <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent">
                <option>Any Level</option>
                <option>Easy</option>
                <option>Moderate</option>
                <option>Challenging</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Group Size</label>
              <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent">
                <option>Any Size</option>
                <option>Small (1-6)</option>
                <option>Medium (7-15)</option>
                <option>Large (16+)</option>
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

      {/* Featured Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="border-2 border-terra/20 hover:border-terra transition-colors">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-terra/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛠️</span>
            </div>
            <h3 className="font-nunito font-semibold text-lg mb-2">Traditional Workshops</h3>
            <p className="text-charcoal/70 text-sm">Learn ancient crafts from master artisans</p>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-sage/20 hover:border-sage transition-colors">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍽️</span>
            </div>
            <h3 className="font-nunito font-semibold text-lg mb-2">Culinary Experiences</h3>
            <p className="text-charcoal/70 text-sm">Cook and dine with local families</p>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-amber/20 hover:border-amber transition-colors">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-amber/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎉</span>
            </div>
            <h3 className="font-nunito font-semibold text-lg mb-2">Cultural Festivals</h3>
            <p className="text-charcoal/70 text-sm">Join authentic celebrations and ceremonies</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Activities Grid */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-nunito font-bold text-charcoal">
              {selectedCategory === "all" ? "All Activities" : `${categories.find(c => c.id === selectedCategory)?.label}`}
            </h2>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredActivities.map((activity) => (
              <ActivityCard 
                key={activity.id} 
                activity={activity}
                onBook={(id) => console.log("Book activity:", id)}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card className="shadow-sm border border-amber/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-4">
                <Calendar className="w-5 h-5 inline mr-2" />
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border-l-4 border-terra pl-4">
                    <h4 className="font-medium text-charcoal">{event.title}</h4>
                    <p className="text-sm text-charcoal/70 mb-1">{event.location} • {event.date}</p>
                    <p className="text-sm text-charcoal/80">{event.description}</p>
                    <Button size="sm" variant="ghost" className="text-terra text-xs mt-1 px-0">
                      Learn More
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Activities */}
          <Card className="shadow-sm border border-amber/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-4">Most Popular This Month</h3>
              <div className="space-y-3">
                {mockActivities.slice(0, 3).map((activity, index) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="w-12 h-12 bg-cover bg-center rounded-lg" style={{backgroundImage: `url(${activity.image})`}}></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-charcoal text-sm">{activity.name}</h4>
                      <p className="text-xs text-charcoal/70">{activity.location}</p>
                      <div className="flex items-center space-x-1">
                        <Award className="w-3 h-3 text-amber" />
                        <span className="text-xs text-charcoal">{activity.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-terra">{activity.currency}{activity.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Booking Tips */}
          <Card className="bg-gradient-to-br from-terra/5 to-amber/5 border border-amber/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-4">💡 Booking Tips</h3>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li>• Book workshops 2-3 days in advance</li>
                <li>• Group activities often offer discounts</li>
                <li>• Check weather conditions for outdoor activities</li>
                <li>• Ask hosts about dietary restrictions</li>
                <li>• Bring comfortable clothing and shoes</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button className="bg-terra text-white hover:bg-terra/90 px-8 py-3">
          Load More Activities
        </Button>
      </div>
    </div>
  );
}
