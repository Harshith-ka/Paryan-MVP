import { Heart, Star, Users, Bed, Bath } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stay } from "../../types";

interface StayCardProps {
  stay: Stay;
  onFavorite?: (stayId: string) => void;
}

export default function StayCard({ stay, onFavorite }: StayCardProps) {
  return (
    <Card className="group overflow-hidden border-amber/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={stay.images[0]}
          alt={stay.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-sage text-white capitalize">
          {stay.type.replace('-', ' ')}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
          onClick={() => onFavorite?.(stay.id)}
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-serif font-bold text-charcoal">
            {stay.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-amber fill-current" />
            <span className="text-sm font-medium">{stay.rating}</span>
            <span className="text-xs text-gray-500">({stay.reviewCount})</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">
          {stay.location}, {stay.country} • Hosted by {stay.host.name}
        </p>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {stay.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {stay.maxGuests} guests
            </div>
            <div className="flex items-center">
              <Bed className="w-3 h-3 mr-1" />
              {stay.bedrooms} bed
            </div>
            <div className="flex items-center">
              <Bath className="w-3 h-3 mr-1" />
              {stay.bathrooms} bath
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {stay.features.slice(0, 2).map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
          <div className="text-right">
            <span className="text-lg font-semibold text-charcoal">
              {stay.currency} {stay.pricePerNight}
            </span>
            <span className="text-sm text-gray-500">/night</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
