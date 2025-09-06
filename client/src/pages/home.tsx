import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Users, MessageCircle, Calendar, Palette, Camera, Utensils, Mountain } from "lucide-react";
import SearchBar from "@/components/ui/search-bar";
import DestinationCard from "@/components/ui/destination-card";
import { mockDestinations } from "@/lib/mock-data";

export default function Home() {
  const handleSearch = (searchData: any) => {
    console.log("Search data:", searchData);
    // Handle search functionality
  };

  const experienceCategories = [
    {
      icon: Palette,
      title: "Cultural Workshops",
      description: "Learn traditional crafts, pottery, weaving, and artistic techniques from local masters.",
      count: "235+ experiences",
      color: "from-terra to-amber"
    },
    {
      icon: Utensils,
      title: "Local Cuisine",
      description: "Cook with families, visit local markets, and discover secret recipes passed down generations.",
      count: "180+ experiences",
      color: "from-sage to-terra"
    },
    {
      icon: Mountain,
      title: "Nature & Adventure",
      description: "Guided hikes, wildlife tracking, and eco-adventures with local guides who know every trail.",
      count: "150+ experiences",
      color: "from-amber to-sage"
    },
    {
      icon: Users,
      title: "Community Events",
      description: "Join festivals, ceremonies, harvest celebrations, and seasonal gatherings with locals.",
      count: "95+ experiences",
      color: "from-terra to-sage"
    }
  ];

  const communityStats = [
    { number: "50,000+", label: "Active Travelers", color: "terra" },
    { number: "1,200+", label: "Travel Groups", color: "sage" },
    { number: "25,000+", label: "Shared Stories", color: "amber" },
    { number: "500+", label: "Local Hosts", color: "terra" }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Verified Traveler",
      content: "Found my travel family here! The connections I've made have enriched every journey.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "Marco R.",
      role: "Local Host", 
      content: "Sharing our village culture with travelers brings so much joy to our community.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-terra/5 to-sage/5 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml;base64,${btoa('<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D2691E" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>')}")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-nunito font-bold text-charcoal leading-tight">
                  Discover 
                  <span className="text-terra"> Authentic</span> 
                  Village Life
                </h1>
                <p className="text-xl text-charcoal/80 leading-relaxed">
                  Connect with local communities, experience traditional cultures, and create meaningful travel memories in hidden villages around the world.
                </p>
              </div>

              <SearchBar onSearch={handleSearch} />

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 text-charcoal/70">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-amber fill-current" />
                  <span className="font-medium">4.8 (12k+ reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-sage" />
                  <span className="font-medium">500+ Villages</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-terra" />
                  <span className="font-medium">50k+ Travelers</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Hero image collage */}
              <div className="grid grid-cols-2 gap-4 transform rotate-3">
                <img 
                  src="https://pixabay.com/get/g88ba387dd67f0e1e11f97e499c1f51bd9274c01a461528066ac8954adcc4eff914b341926bb09489e6fc3dc73f7fc5f7b74c97ea370a33a9ff8e4ea5f42f62ee_1280.jpg" 
                  alt="Traditional village scene" 
                  className="rounded-2xl shadow-xl col-span-2 h-48 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                  alt="Traditional crafts workshop" 
                  className="rounded-2xl shadow-lg h-32 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                  alt="Village homestay" 
                  className="rounded-2xl shadow-lg h-32 object-cover"
                />
              </div>
              
              {/* Floating community stat card */}
              <Card className="absolute -bottom-6 -left-6 shadow-xl border border-amber/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-sage to-terra rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-charcoal/70">Active Communities</p>
                      <p className="font-bold text-charcoal">245+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-nunito font-bold text-charcoal mb-4">Featured Village Destinations</h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Discover authentic communities where traditions thrive and travelers become family
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockDestinations.map((destination) => (
              <DestinationCard 
                key={destination.id} 
                destination={destination}
                onViewDetails={(id) => console.log("View destination:", id)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-terra text-white hover:bg-terra/90">
              <Link href="/explore">Explore All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Categories */}
      <section className="py-20 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-nunito font-bold text-charcoal mb-4">Authentic Experiences</h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Participate in traditional activities and connect with local communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experienceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.title} className="border border-amber/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-nunito font-bold text-charcoal mb-2">{category.title}</h3>
                    <p className="text-charcoal/70 mb-4">{category.description}</p>
                    <div className="text-terra font-semibold">{category.count}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-nunito font-bold text-charcoal mb-4">Thriving Travel Communities</h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Connect with like-minded travelers and share unforgettable experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Community Stats */}
              <div className="grid grid-cols-2 gap-6">
                {communityStats.map((stat, index) => (
                  <Card key={index} className="border border-amber/20">
                    <CardContent className="p-6">
                      <div className="text-3xl font-nunito font-bold text-terra mb-2">{stat.number}</div>
                      <div className="text-charcoal/70">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Community Features */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-terra/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-terra" />
                  </div>
                  <div>
                    <h3 className="text-xl font-nunito font-bold text-charcoal mb-2">Travel Forums & Discussions</h3>
                    <p className="text-charcoal/70">Ask questions, share tips, and get advice from experienced travelers and local hosts.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="text-xl font-nunito font-bold text-charcoal mb-2">Join Travel Groups</h3>
                    <p className="text-charcoal/70">Find travel buddies, plan group trips, and join interest-based communities.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-amber" />
                  </div>
                  <div>
                    <h3 className="text-xl font-nunito font-bold text-charcoal mb-2">Connect with Local Hosts</h3>
                    <p className="text-charcoal/70">Message hosts directly, get local insights, and build meaningful connections.</p>
                  </div>
                </div>
              </div>

              <Button asChild className="bg-terra text-white hover:bg-terra/90">
                <Link href="/community">Join Our Community</Link>
              </Button>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Community gathering" 
                className="rounded-2xl shadow-xl w-full h-96 object-cover"
              />
              
              {/* Floating testimonial cards */}
              {testimonials.map((testimonial, index) => (
                <Card key={index} className={`absolute ${index === 0 ? '-top-6 -right-6' : '-bottom-6 -left-6'} shadow-xl max-w-xs border border-amber/20`}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-terra to-sage rounded-full">
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-charcoal">{testimonial.name}</div>
                        <div className="text-sm text-charcoal/70">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="text-sm text-charcoal/80">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-terra/10 to-sage/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-terra/5 to-sage/5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl lg:text-5xl font-nunito font-bold text-charcoal mb-6">
            Ready to Connect with 
            <span className="text-terra"> Village Life</span>?
          </h2>
          <p className="text-xl text-charcoal/70 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers discovering authentic experiences and building meaningful connections in villages around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-terra text-white hover:bg-terra/90 text-lg px-8 py-4">
              <Link href="/explore">Start Your Journey</Link>
            </Button>
            <Button asChild variant="outline" className="border-2 border-sage text-sage hover:bg-sage hover:text-white text-lg px-8 py-4">
              <Link href="/hosts">Become a Host</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
