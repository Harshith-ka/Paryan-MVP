import { Link, useLocation } from "wouter";
import { Button } from "./button";
import { Input } from "./input";
import { Search, Menu, User, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white shadow-sm border-b border-amber/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-terra to-sage rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            </div>
            <h1 className="text-xl font-nunito font-bold text-charcoal">VillageConnect</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/explore">
              <span className={`text-charcoal hover:text-terra transition-colors font-medium ${isActive('/explore') ? 'text-terra' : ''}`}>
                Explore
              </span>
            </Link>
            <Link href="/stays">
              <span className={`text-charcoal hover:text-terra transition-colors font-medium ${isActive('/stays') ? 'text-terra' : ''}`}>
                Stays
              </span>
            </Link>
            <Link href="/activities">
              <span className={`text-charcoal hover:text-terra transition-colors font-medium ${isActive('/activities') ? 'text-terra' : ''}`}>
                Activities
              </span>
            </Link>
            <Link href="/community">
              <span className={`text-charcoal hover:text-terra transition-colors font-medium ${isActive('/community') ? 'text-terra' : ''}`}>
                Community
              </span>
            </Link>
            <Link href="/guides">
              <span className={`text-charcoal hover:text-terra transition-colors font-medium ${isActive('/guides') ? 'text-terra' : ''}`}>
                Guides
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search villages, stays, experiences..."
                className="pl-10 bg-warm-gray border-amber/20 focus:ring-terra focus:border-terra"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-charcoal hover:text-terra transition-colors p-2">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-charcoal hover:text-terra transition-colors p-2">
              <MessageCircle className="w-5 h-5" />
            </button>
            <Link href="/hosts">
              <span className="hidden md:block text-charcoal hover:text-terra transition-colors font-medium">
                Become a Host
              </span>
            </Link>
            <Link href="/profile">
              <Button className="bg-terra text-white hover:bg-terra/90">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-charcoal hover:text-terra"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber/20">
            <div className="flex flex-col space-y-4">
              <Link href="/explore">
                <span className="text-charcoal hover:text-terra transition-colors font-medium">Explore</span>
              </Link>
              <Link href="/stays">
                <span className="text-charcoal hover:text-terra transition-colors font-medium">Stays</span>
              </Link>
              <Link href="/activities">
                <span className="text-charcoal hover:text-terra transition-colors font-medium">Activities</span>
              </Link>
              <Link href="/community">
                <span className="text-charcoal hover:text-terra transition-colors font-medium">Community</span>
              </Link>
              <Link href="/guides">
                <span className="text-charcoal hover:text-terra transition-colors font-medium">Guides</span>
              </Link>
              <div className="pt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 bg-warm-gray border-amber/20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
