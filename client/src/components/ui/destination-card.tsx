import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Heart } from "lucide-react";
import type { Destination } from "@/lib/mock-data";

interface DestinationCardProps {
  destination: Destination;
  onViewDetails: (id: string) => void;
}

export default function DestinationCard({ destination, onViewDetails }: DestinationCardProps) {
  return (
    <Card className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-amber/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="relative overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {destination.featured && (
          <div className="absolute top-4 left-4 bg-terra text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
          <Heart className="w-5 h-5 text-charcoal hover:text-terra cursor-pointer" />
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-nunito font-bold text-charcoal">{destination.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-amber fill-current" />
            <span className="text-sm font-medium text-charcoal">{destination.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-charcoal/70 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{destination.location}, {destination.country}</span>
        </div>
        
        <p className="text-charcoal/70 mb-4 text-sm">{destination.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-1">
            {destination.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} className="bg-terra/10 text-terra hover:bg-terra/20 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <span className="text-terra font-semibold">
            From {destination.currency} {destination.priceFrom}/night
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-charcoal/70">{destination.reviewCount} reviews</span>
          <button 
            onClick={() => onViewDetails(destination.id)}
            className="text-terra hover:text-terra/80 font-medium text-sm"
          >
            View Details →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
