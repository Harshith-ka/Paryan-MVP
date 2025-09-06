import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Users, Search } from "lucide-react";

interface SearchData {
  destination: string;
  checkIn: string;
  guests: string;
}

interface SearchBarProps {
  onSearch: (data: SearchData) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [guests, setGuests] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination, checkIn, guests });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber/20">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
        <div>
          <Label className="block text-sm font-medium text-charcoal mb-2">Where to?</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search villages..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-charcoal mb-2">Check-in</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-charcoal mb-2">Guests</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terra focus:border-transparent"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3+ Guests</option>
            </select>
          </div>
        </div>
      </form>
      
      <Button 
        onClick={() => onSearch({ destination, checkIn, guests })}
        className="w-full mt-4 bg-terra text-white hover:bg-terra/90"
      >
        <Search className="w-4 h-4 mr-2" />
        Search Experiences
      </Button>
    </div>
  );
}
