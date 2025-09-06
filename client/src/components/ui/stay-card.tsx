import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Heart, Users, Bed, Bath } from "lucide-react";
import type { Stay } from "@/lib/mock-data";

interface StayCardProps {
  stay: Stay;
  onBook: (id: string) => void;
}

export default function StayCard({ stay, onBook }: StayCardProps) {
  const getStayTypeColor = (type: string) => {
    switch (type) {
      case "homestay": return "bg-terra/10 text-terra";
      case "eco-lodge": return "bg-sage/10 text-sage";
      case "guesthouse": return "bg-amber/10 text-amber";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img 
          src={stay.images[0]} 
          alt={stay.name} 
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
          <Heart className="w-5 h-5 text-charcoal" />
        </button>
        <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
          {stay.type.replace('-', ' ')}
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-nunito font-bold text-charcoal">{stay.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-amber fill-current" />
            <span className="text-sm font-medium text-charcoal">{stay.rating}</span>
            <span className="text-xs text-gray-500">({stay.reviewCount})</span>
          </div>
        </div>
        
        <p className="text-sm text-charcoal/70 mb-3">
          {stay.location}, {stay.country} • Hosted by {stay.host.name}
        </p>
        
        <p className="text-charcoal/70 text-sm mb-4">{stay.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-charcoal/70">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{stay.maxGuests} guests</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4" />
              <span>{stay.bedrooms} bed</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="w-4 h-4" />
              <span>{stay.bathrooms} bath</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            {stay.features.slice(0, 2).map((feature) => (
              <Badge key={feature} className={getStayTypeColor(stay.type)}>
                {feature}
              </Badge>
            ))}
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-charcoal">
              {stay.currency} {stay.pricePerNight}
            </span>
            <span className="text-sm text-charcoal/70">/night</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={stay.host.avatar} alt={stay.host.name} />
              <AvatarFallback>{stay.host.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {stay.host.verified && (
              <Badge className="bg-sage/10 text-sage text-xs">Verified Host</Badge>
            )}
          </div>
          <button 
            onClick={() => onBook(stay.id)}
            className="bg-terra text-white px-4 py-2 rounded-lg hover:bg-terra/90 transition-colors font-medium text-sm"
          >
            Book Now
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
