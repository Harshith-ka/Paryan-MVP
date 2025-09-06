import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Star, Heart, Sliders, Map } from "lucide-react";
import DestinationCard from "@/components/ui/destination-card";
import { mockDestinations } from "@/lib/mock-data";

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const regions = ["all", "Europe", "Asia", "Africa", "Americas", "Oceania"];
  const types = ["all", "mountain", "coastal", "desert", "forest", "historic"];
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "rating", label: "Highest Rated" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "reviews", label: "Most Reviewed" }
  ];

  const filteredDestinations = mockDestinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "all" || destination.region === selectedRegion;
    const matchesType = selectedType === "all" || destination.type === selectedType;
    
    return matchesSearch && matchesRegion && matchesType;
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      case "price-low":
        return a.priceFrom - b.priceFrom;
      case "price-high":
        return b.priceFrom - a.priceFrom;
      case "reviews":
        return b.reviewCount - a.reviewCount;
      default:
        return b.featured ? 1 : -1;
    }
  });

  const quickFilters = [
    { label: "UNESCO Sites", icon: "🏛️", count: 4 },
    { label: "Mountain Villages", icon: "🏔️", count: 8 },
    { label: "Coastal Towns", icon: "🌊", count: 6 },
    { label: "Historic Villages", icon: "🏰", count: 5 },
    { label: "Cultural Immersion", icon: "🎭", count: 12 },
    { label: "Eco-Friendly", icon: "🌱", count: 7 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-nunito font-bold text-charcoal mb-4">Explore Village Destinations</h1>
        <p className="text-xl text-charcoal/70">Discover authentic communities and traditional cultures around the world</p>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-lg mb-8 border border-amber/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <Label className="block text-sm font-medium text-charcoal mb-2">Search Villages</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Village name, region, or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:ring-terra focus:border-terra"
                />
              </div>
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-charcoal mb-2">Region</Label>
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent"
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region === "all" ? "All Regions" : region}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-charcoal mb-2">Village Type</Label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full bg-terra text-white hover:bg-terra/90 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-charcoal mb-4">Popular Filters</h3>
        <div className="flex flex-wrap gap-3">
          {quickFilters.map((filter, index) => (
            <Button
              key={index}
              variant="outline"
              className="border-amber/20 text-charcoal hover:bg-terra/5 hover:border-terra transition-colors"
            >
              <span className="mr-2">{filter.icon}</span>
              {filter.label}
              <Badge className="ml-2 bg-terra/10 text-terra">{filter.count}</Badge>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Map Placeholder */}
        <Card className="lg:col-span-4 h-64 mb-8 border border-amber/20">
          <CardContent className="p-6 h-full flex items-center justify-center bg-gradient-to-br from-terra/5 to-sage/5">
            <div className="text-center">
              <Map className="w-16 h-16 text-terra mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-charcoal mb-2">Interactive Village Map</h3>
              <p className="text-charcoal/70">Explore destinations on an interactive map with filters and clustering</p>
              <Button className="mt-4 bg-terra text-white hover:bg-terra/90">
                View Full Map
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results and Sorting */}
        <div className="lg:col-span-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-charcoal/70">
                Showing {filteredDestinations.length} destinations
                {searchTerm && ` for "${searchTerm}"`}
                {selectedRegion !== "all" && ` in ${selectedRegion}`}
                {selectedType !== "all" && ` (${selectedType} villages)`}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Label className="text-sm font-medium text-charcoal">Sort by:</Label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <DestinationCard 
                  key={destination.id} 
                  destination={destination}
                  onViewDetails={(id) => console.log("View destination details:", id)}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-charcoal mb-2">No destinations found</h3>
                <p className="text-charcoal/70 mb-4">
                  Try adjusting your search criteria or browse all destinations
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedRegion("all");
                    setSelectedType("all");
                  }}
                  className="bg-terra text-white hover:bg-terra/90"
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Load More Button */}
      {filteredDestinations.length > 0 && (
        <div className="text-center mt-12">
          <Button className="bg-terra text-white hover:bg-terra/90 px-8 py-3">
            Load More Villages
          </Button>
        </div>
      )}

      {/* Destination Highlights */}
      <section className="mt-20">
        <h2 className="text-3xl font-nunito font-bold text-charcoal mb-8 text-center">Why Choose Village Tourism?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6 border border-amber/20">
            <div className="w-16 h-16 bg-gradient-to-br from-terra to-sage rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">Authentic Connections</h3>
            <p className="text-charcoal/70">Build meaningful relationships with local families and communities</p>
          </Card>
          
          <Card className="text-center p-6 border border-amber/20">
            <div className="w-16 h-16 bg-gradient-to-br from-sage to-amber rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">Cultural Immersion</h3>
            <p className="text-charcoal/70">Experience traditions, festivals, and daily life in authentic settings</p>
          </Card>
          
          <Card className="text-center p-6 border border-amber/20">
            <div className="w-16 h-16 bg-gradient-to-br from-amber to-terra rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">Off-the-Beaten-Path</h3>
            <p className="text-charcoal/70">Discover hidden gems and places untouched by mass tourism</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
