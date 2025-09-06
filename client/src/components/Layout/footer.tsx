import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-terra to-sage rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-nunito font-bold">VillageWander</h3>
            </div>
            <p className="text-white/70">Connecting travelers with authentic village experiences and local communities worldwide.</p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-terra transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-terra transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-terra transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-nunito font-bold text-lg mb-4">Explore</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/explore" className="hover:text-terra transition-colors">Destinations</Link></li>
              <li><Link href="/activities" className="hover:text-terra transition-colors">Experiences</Link></li>
              <li><Link href="/stays" className="hover:text-terra transition-colors">Village Stays</Link></li>
              <li><Link href="/guides" className="hover:text-terra transition-colors">Travel Guides</Link></li>
              <li><Link href="/reviews" className="hover:text-terra transition-colors">Reviews</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-nunito font-bold text-lg mb-4">Community</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/community" className="hover:text-terra transition-colors">Travel Forums</Link></li>
              <li><Link href="/groups" className="hover:text-terra transition-colors">Join Groups</Link></li>
              <li><Link href="/hosts" className="hover:text-terra transition-colors">Local Hosts</Link></li>
              <li><Link href="/planner" className="hover:text-terra transition-colors">Trip Planner</Link></li>
              <li><a href="#" className="hover:text-terra transition-colors">Travel Stories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-nunito font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-terra transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-terra transition-colors">Host Resources</a></li>
              <li><a href="#" className="hover:text-terra transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="hover:text-terra transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-terra transition-colors">About Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70">&copy; 2024 VillageWander. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/70 hover:text-terra transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/70 hover:text-terra transition-colors">Terms of Service</a>
            <a href="#" className="text-white/70 hover:text-terra transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
