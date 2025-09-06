import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Clock,
  Edit,
  Trash2,
  Share2,
  Download,
  Globe,
  Lock
} from "lucide-react";

interface TripPlan {
  id: string;
  title: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  currency: string;
  status: 'planning' | 'booked' | 'completed';
  isPublic: boolean;
  activities: Array<{
    id: string;
    name: string;
    date: string;
    location: string;
    price: number;
    booked: boolean;
  }>;
  stays: Array<{
    id: string;
    name: string;
    checkIn: string;
    checkOut: string;
    location: string;
    price: number;
    booked: boolean;
  }>;
}

export default function Planner() {
  const [activeTab, setActiveTab] = useState("my-trips");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const mockTrips: TripPlan[] = [
    {
      id: "1",
      title: "Tuscany Cultural Discovery",
      description: "10-day immersive experience in traditional Tuscan villages with cooking classes and wine tours",
      destination: "Tuscany, Italy",
      startDate: "2024-04-15",
      endDate: "2024-04-25", 
      travelers: 2,
      budget: 2800,
      currency: "EUR",
      status: "planning",
      isPublic: false,
      activities: [
        {
          id: "a1",
          name: "Traditional Pasta Making Class",
          date: "2024-04-16",
          location: "Montalcino",
          price: 75,
          booked: false
        },
        {
          id: "a2", 
          name: "Wine Tasting Tour",
          date: "2024-04-18",
          location: "Chianti Region",
          price: 120,
          booked: true
        }
      ],
      stays: [
        {
          id: "s1",
          name: "Casa Maria - Family Farm",
          checkIn: "2024-04-15",
          checkOut: "2024-04-20",
          location: "Montalcino",
          price: 89,
          booked: true
        },
        {
          id: "s2",
          name: "Historic Villa B&B",
          checkIn: "2024-04-20", 
          checkOut: "2024-04-25",
          location: "Siena",
          price: 145,
          booked: false
        }
      ]
    },
    {
      id: "2",
      title: "Alpine Village Adventure",
      description: "Mountain hiking and cultural experiences in Swiss alpine villages",
      destination: "Grindelwald, Switzerland",
      startDate: "2024-06-01",
      endDate: "2024-06-08",
      travelers: 4,
      budget: 4200,
      currency: "CHF",
      status: "booked",
      isPublic: true,
      activities: [
        {
          id: "a3",
          name: "Guided Mountain Hike",
          date: "2024-06-02",
          location: "Eiger Trail",
          price: 85,
          booked: true
        }
      ],
      stays: [
        {
          id: "s3",
          name: "Alpine Green Lodge",
          checkIn: "2024-06-01",
          checkOut: "2024-06-08", 
          location: "Grindelwald",
          price: 145,
          booked: true
        }
      ]
    }
  ];

  const inspirationTrips = [
    {
      id: "i1",
      title: "Japanese Village Immersion",
      destination: "Shirakawa-go, Japan",
      duration: "7 days",
      budget: "$1,800",
      image: "https://pixabay.com/get/gce39e3c5643acb40739d7ebe84cc5a5c03253d48131f61b1827600e2a0134b6be1ae795ce2ed0d34208070597581942148118738b2ba8ae6ea59a5b9afd2ccab_1280.jpg",
      highlights: ["Traditional Ryokan", "Tea Ceremony", "Sake Brewing"]
    },
    {
      id: "i2", 
      title: "Moroccan Desert Villages",
      destination: "Atlas Mountains, Morocco",
      duration: "10 days",
      budget: "$1,200",
      image: "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      highlights: ["Berber Culture", "Desert Camping", "Traditional Crafts"]
    },
    {
      id: "i3",
      title: "Peruvian Andes Experience", 
      destination: "Sacred Valley, Peru",
      duration: "12 days",
      budget: "$1,600",
      image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      highlights: ["Quechua Traditions", "Weaving Workshops", "Mountain Treks"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-nunito font-bold text-charcoal mb-4">Trip Planner</h1>
        <p className="text-xl text-charcoal/70">Plan, organize, and share your authentic village experiences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="my-trips">My Trips</TabsTrigger>
          <TabsTrigger value="create">Create Trip</TabsTrigger>
          <TabsTrigger value="inspiration">Inspiration</TabsTrigger>
        </TabsList>

        {/* My Trips Tab */}
        <TabsContent value="my-trips" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-nunito font-bold text-charcoal">Your Travel Plans</h2>
            <Button 
              onClick={() => setActiveTab("create")}
              className="bg-terra text-white hover:bg-terra/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Trip
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockTrips.map((trip) => (
              <Card key={trip.id} className="shadow-lg border border-amber/20 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-xl font-nunito">{trip.title}</CardTitle>
                        {trip.isPublic ? (
                          <Globe className="w-4 h-4 text-sage" title="Public" />
                        ) : (
                          <Lock className="w-4 h-4 text-charcoal/50" title="Private" />
                        )}
                      </div>
                      <p className="text-charcoal/70 mb-3">{trip.description}</p>
                      <Badge className={`${
                        trip.status === 'planning' ? 'bg-amber/10 text-amber' :
                        trip.status === 'booked' ? 'bg-sage/10 text-sage' :
                        'bg-terra/10 text-terra'
                      }`}>
                        {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost" className="text-charcoal/70 hover:text-terra">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-charcoal/70 hover:text-terra">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-charcoal/70">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{trip.travelers} travelers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{trip.currency} {trip.budget}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-charcoal mb-2">Planned Activities</h4>
                      <div className="space-y-2">
                        {trip.activities.map((activity) => (
                          <div key={activity.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{activity.name}</p>
                              <p className="text-xs text-charcoal/70">{activity.location} • {new Date(activity.date).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{trip.currency} {activity.price}</span>
                              <Badge className={activity.booked ? "bg-sage/10 text-sage" : "bg-amber/10 text-amber"}>
                                {activity.booked ? "Booked" : "Planned"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-charcoal mb-2">Accommodations</h4>
                      <div className="space-y-2">
                        {trip.stays.map((stay) => (
                          <div key={stay.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{stay.name}</p>
                              <p className="text-xs text-charcoal/70">{stay.location} • {new Date(stay.checkIn).toLocaleDateString()} - {new Date(stay.checkOut).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{trip.currency} {stay.price}/night</span>
                              <Badge className={stay.booked ? "bg-sage/10 text-sage" : "bg-amber/10 text-amber"}>
                                {stay.booked ? "Booked" : "Planned"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4 border-t">
                    <Button variant="outline" className="flex-1 border-terra text-terra hover:bg-terra hover:text-white">
                      View Details
                    </Button>
                    <Button variant="outline" size="icon" className="border-terra text-terra hover:bg-terra hover:text-white">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Create Trip Tab */}
        <TabsContent value="create" className="space-y-6">
          <Card className="shadow-lg border border-amber/20">
            <CardHeader>
              <CardTitle className="text-2xl font-nunito">Plan Your Village Adventure</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Trip Title</Label>
                    <Input 
                      id="title"
                      placeholder="e.g., Tuscany Cultural Discovery"
                      className="focus:ring-terra focus:border-terra"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input 
                      id="destination"
                      placeholder="e.g., Tuscany, Italy"
                      className="focus:ring-terra focus:border-terra"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Describe your planned trip..."
                    rows={3}
                    className="focus:ring-terra focus:border-terra"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input 
                      id="startDate"
                      type="date"
                      className="focus:ring-terra focus:border-terra"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input 
                      id="endDate"
                      type="date"
                      className="focus:ring-terra focus:border-terra"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelers">Travelers</Label>
                    <Input 
                      id="travelers"
                      type="number"
                      placeholder="2"
                      min="1"
                      className="focus:ring-terra focus:border-terra"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input 
                      id="budget"
                      type="number"
                      placeholder="2000"
                      className="focus:ring-terra focus:border-terra"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <input type="checkbox" id="public" className="rounded" />
                  <Label htmlFor="public" className="text-sm">Make this trip plan public (others can see and get inspired)</Label>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="bg-terra text-white hover:bg-terra/90">
                    Create Trip Plan
                  </Button>
                  <Button type="button" variant="outline" className="border-terra text-terra hover:bg-terra hover:text-white">
                    Save as Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Quick Add Suggestions */}
          <Card className="shadow-sm border border-amber/20">
            <CardHeader>
              <CardTitle className="text-lg font-nunito">Quick Add to Your Trip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-terra transition-colors cursor-pointer">
                  <h4 className="font-medium text-charcoal mb-2">Find Stays</h4>
                  <p className="text-sm text-charcoal/70">Browse authentic homestays and eco-lodges</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-terra transition-colors cursor-pointer">
                  <h4 className="font-medium text-charcoal mb-2">Add Activities</h4>
                  <p className="text-sm text-charcoal/70">Discover local workshops and experiences</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-terra transition-colors cursor-pointer">
                  <h4 className="font-medium text-charcoal mb-2">Get Guides</h4>
                  <p className="text-sm text-charcoal/70">Access curated travel guides</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inspiration Tab */}
        <TabsContent value="inspiration" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-nunito font-bold text-charcoal mb-4">Trip Inspiration</h2>
            <p className="text-charcoal/70">Discover amazing village experiences planned by fellow travelers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inspirationTrips.map((trip) => (
              <Card key={trip.id} className="shadow-lg overflow-hidden border border-amber/20 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <div className="relative h-48">
                  <img 
                    src={trip.image} 
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-nunito font-bold text-lg">{trip.title}</h3>
                    <p className="text-sm opacity-90">{trip.destination}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-sm text-charcoal/70">
                      <Clock className="w-4 h-4" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-charcoal/70">
                      <DollarSign className="w-4 h-4" />
                      <span>{trip.budget}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-charcoal text-sm">Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {trip.highlights.map((highlight, index) => (
                        <Badge key={index} className="bg-terra/10 text-terra text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-terra text-white hover:bg-terra/90"
                    size="sm"
                  >
                    Use as Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Planning Tips */}
          <Card className="bg-gradient-to-br from-terra/5 to-amber/5 border border-amber/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-nunito font-semibold text-charcoal mb-4">💡 Planning Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-charcoal/80">
                  <li>• Book village stays 2-3 weeks in advance</li>
                  <li>• Consider seasonal festivals and events</li>
                  <li>• Pack appropriate clothing for activities</li>
                  <li>• Learn basic local phrases</li>
                </ul>
                <ul className="space-y-2 text-sm text-charcoal/80">
                  <li>• Respect local customs and traditions</li>
                  <li>• Support local businesses and artisans</li>
                  <li>• Bring gifts for host families</li>
                  <li>• Keep travel documents secure</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
