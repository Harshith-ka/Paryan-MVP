import { Star, Clock, Users, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@shared/schema";

interface HostCardProps {
  host: User;
  specialties?: string[];
  guestCount?: number;
  hostSince?: string;
  onViewProfile?: (id: string) => void;
  onMessage?: (id: string) => void;
}

export default function HostCard({ 
  host, 
  specialties = [], 
  guestCount = 0,
  hostSince = "2023",
  onViewProfile, 
  onMessage 
}: HostCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img 
          src={host.avatar || "/api/placeholder/400/300"} 
          alt={`${host.firstName} ${host.lastName}`}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-charcoal">
              {host.firstName} {host.lastName}
            </h3>
            <p className="text-gray-600">{host.location}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-amber fill-current" />
            <span className="text-sm font-medium text-charcoal">4.9</span>
            <span className="text-xs text-gray-500">(127)</span>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{host.bio}</p>
        
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          {specialties.slice(0, 3).map((specialty) => (
            <span key={specialty} className="flex items-center">
              <span className="w-2 h-2 bg-terra rounded-full mr-1"></span>
              {specialty}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>Host since {hostSince}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Users className="w-4 h-4 text-gray-500" />
            <span>{guestCount}+ guests</span>
          </div>
        </div>
        
        <div className="flex space-x-2 mb-4">
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Superhost
          </Badge>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={() => onViewProfile?.(host.id)}
            className="flex-1 bg-terra text-white hover:bg-terra/90"
          >
            View Profile
          </Button>
          <Button 
            onClick={() => onMessage?.(host.id)}
            variant="outline" 
            className="flex-1 border-sage text-sage hover:bg-sage hover:text-white"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Message
          </Button>
        </div>
      </div>
    </div>
  );
}
