import { Clock, Users, Star, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity } from "../../types";

interface ActivityCardProps {
  activity: Activity;
  onBook?: (activityId: string) => void;
}

export default function ActivityCard({ activity, onBook }: ActivityCardProps) {
  const categoryColors = {
    workshop: 'bg-sage',
    cultural: 'bg-terracotta',
    food: 'bg-amber',
    nature: 'bg-sage',
    festival: 'bg-terracotta',
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    challenging: 'bg-red-100 text-red-800',
  };

  return (
    <Card className="group overflow-hidden border-amber/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={activity.image}
          alt={activity.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className={`absolute top-3 left-3 text-white ${categoryColors[activity.category]}`}>
          {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
        </Badge>
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
          {activity.duration}
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-serif font-bold text-charcoal">
            {activity.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-amber fill-current" />
            <span className="text-sm font-medium">{activity.rating}</span>
            <span className="text-xs text-gray-500">({activity.reviewCount})</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">
          {activity.location}, {activity.country}
        </p>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {activity.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {activity.duration}
            </div>
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              Max {activity.maxParticipants}
            </div>
            <Badge className={`text-xs ${difficultyColors[activity.difficulty]}`}>
              {activity.difficulty}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-terracotta font-semibold">
            {activity.currency} {activity.price} per person
          </div>
          <Button
            size="sm"
            className="bg-terracotta hover:bg-terracotta/90"
            onClick={() => onBook?.(activity.id)}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
