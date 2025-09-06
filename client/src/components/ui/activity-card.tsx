import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, Award } from "lucide-react";
import type { Activity } from "@/lib/mock-data";

interface ActivityCardProps {
  activity: Activity;
  onBook: (id: string) => void;
}

export default function ActivityCard({ activity, onBook }: ActivityCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "workshop": return "bg-terra/10 text-terra";
      case "cultural": return "bg-sage/10 text-sage";
      case "food": return "bg-amber/10 text-amber";
      case "nature": return "bg-green-100 text-green-700";
      case "festival": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "🟢";
      case "moderate": return "🟡";
      case "challenging": return "🔴";
      default: return "🟢";
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img 
          src={activity.image} 
          alt={activity.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className={getCategoryColor(activity.category)}>
            {activity.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
          {activity.duration}
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-nunito font-bold text-charcoal">{activity.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-amber fill-current" />
            <span className="text-sm font-medium text-charcoal">{activity.rating}</span>
            <span className="text-xs text-gray-500">({activity.reviewCount})</span>
          </div>
        </div>
        
        <p className="text-sm text-charcoal/70 mb-3">
          {activity.location}, {activity.country}
        </p>
        
        <p className="text-charcoal/70 text-sm mb-4">{activity.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-charcoal/70">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{activity.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Max {activity.maxParticipants}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>{getDifficultyIcon(activity.difficulty)}</span>
              <span className="capitalize">{activity.difficulty}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-left">
            <span className="text-lg font-bold text-charcoal">
              {activity.currency} {activity.price}
            </span>
            <span className="text-sm text-charcoal/70"> per person</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-charcoal/70">
            <Award className="w-3 h-3" />
            <span>Includes: {activity.included.slice(0, 2).join(", ")}</span>
          </div>
        </div>
        
        <button 
          onClick={() => onBook(activity.id)}
          className="w-full bg-terra text-white py-2 rounded-lg hover:bg-terra/90 transition-colors font-medium"
        >
          Book Experience
        </button>
      </CardContent>
    </Card>
  );
}
