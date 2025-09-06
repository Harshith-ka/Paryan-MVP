import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Mountain, Bed, Camera, Users, BookOpen, User } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/explore", label: "Explore", icon: Mountain },
    { path: "/stays", label: "Stays", icon: Bed },
    { path: "/activities", label: "Activities", icon: Camera },
    { path: "/community", label: "Community", icon: Users },
    { path: "/guides", label: "Guides", icon: BookOpen },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-amber/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-terra to-sage rounded-full flex items-center justify-center">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-nunito font-bold text-charcoal">VillageConnect</span>
            </div>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? "text-terra bg-terra/10"
                        : "text-charcoal hover:text-terra hover:bg-terra/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/hosts">
              <Button variant="ghost" className="hidden md:block text-charcoal hover:text-terra">
                Become a Host
              </Button>
            </Link>
            <Link href="/profile">
              <Button className="bg-terra text-white hover:bg-terra/90">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
