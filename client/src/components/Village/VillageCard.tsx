import { Heart, Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Village } from "../../types";

interface VillageCardProps {
  village: Village;
  onFavorite?: (villageId: string) => void;
}

export default function VillageCard({ village, onFavorite }: VillageCardProps) {
  return (
    <Card className="group overflow-hidden border-amber/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={village.image}
          alt={village.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {village.featured && (
          <Badge className="absolute top-3 left-3 bg-terracotta text-white">
            Featured
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
          onClick={() => onFavorite?.(village.id)}
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-serif font-bold text-charcoal">
            {village.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-amber fill-current" />
            <span className="text-sm font-medium">{village.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{village.location}, {village.country}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {village.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {village.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="text-right">
            <span className="text-terracotta font-semibold">
              From {village.currency} {village.priceFrom}/night
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
