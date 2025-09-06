import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface SearchBarProps {
  onSearch?: (filters: any) => void;
  compact?: boolean;
}

export default function SearchBar({ onSearch, compact = false }: SearchBarProps) {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");

  const handleSearch = () => {
    onSearch?.({
      destination,
      checkIn,
      checkOut,
      guests: parseInt(guests),
    });
  };

  if (compact) {
    return (
      <div className="flex w-full max-w-md">
        <Input
          placeholder="Search villages..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="rounded-r-none"
        />
        <Button onClick={handleSearch} className="rounded-l-none bg-terracotta hover:bg-terracotta/90">
          <Search className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-amber/20">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Where to?</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search villages..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Check-in</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Check-out</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Guests</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>
          </div>
        </div>
        <Button onClick={handleSearch} className="w-full mt-4 bg-terracotta hover:bg-terracotta/90">
          <Search className="w-4 h-4 mr-2" />
          Search Experiences
        </Button>
      </CardContent>
    </Card>
  );
}
