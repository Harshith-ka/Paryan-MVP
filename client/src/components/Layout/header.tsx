import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Search, Bell, User } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  const navItems = [
    { label: "Explore", path: "/explore" },
    { label: "Stays", path: "/stays" },
    { label: "Activities", path: "/activities" },
    { label: "Community", path: "/community" },
    { label: "Guides", path: "/guides" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-amber/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-terra to-sage rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            </div>
            <h1 className="text-xl font-nunito font-bold text-charcoal">Paryan</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors ${
                  location === item.path
                    ? "text-terra"
                    : "text-charcoal hover:text-terra"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-charcoal hover:text-terra">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-charcoal hover:text-terra">
              <Bell className="w-5 h-5" />
            </Button>
            <Link href="/hosts" className="hidden md:block text-charcoal hover:text-terra text-sm font-medium">
              Become a Host
            </Link>
            <Link href="/profile">
              <Button className="bg-terra text-white hover:bg-terra/90">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
