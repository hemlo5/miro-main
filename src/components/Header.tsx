import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { LogOut, Crown, User as UserIcon } from 'lucide-react';

const navItems = [
  { path: '/features', label: 'Features' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/', label: 'Home' },
  { path: '/vision', label: 'Vision' },
  { path: '/founders', label: 'Founders' },
];

export default function Header() {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [plan, setPlan] = useState<string>('Standard');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchUserPlan(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchUserPlan(session.user.id);
      else setPlan('Standard');
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchUserPlan = async (userId: string) => {
    try {
      // First try to fetch from a common 'profiles' or 'users' schema
      const { data, error } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', userId)
        .single();
      
      if (data && data.plan) {
        setPlan(data.plan);
      } else {
        // Fallback to checking metadata if custom table fails
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.user_metadata?.plan) setPlan(user.user_metadata.plan);
        else if (user?.app_metadata?.plan) setPlan(user.app_metadata.plan);
        else setPlan('Standard'); // Default generic fallback
      }
    } catch {
      setPlan('Standard');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsDropdownOpen(false);
  };

  // Use their google avatar if available, otherwise just use their initial
  const avatarUrl = user?.user_metadata?.avatar_url;
  const initial = user?.email ? user.email.charAt(0).toUpperCase() : '?';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-center px-4 py-3 relative">
        <nav className="flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap rounded-full ${
                  isActive ? 'text-black' : 'text-white/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile - Absolute positioned to keep nav perfectly centered */}
        <div className="absolute right-4 md:right-8" ref={dropdownRef}>
          {user ? (
            <>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 hover:bg-white/5 rounded-full p-1 pr-3 transition-colors outline-none"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-white text-sm font-medium leading-none mb-1">
                    {user.user_metadata?.full_name || 'User'}
                  </div>
                  <div className="text-white/50 text-[10px] uppercase tracking-widest">{plan}</div>
                </div>
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full border border-white/20 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                    {initial}
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-56 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 transform origin-top-right"
                  >
                    <div className="px-4 py-3 border-b border-white/5 mb-2 block sm:hidden">
                      <p className="text-sm font-medium text-white truncate">{user.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs text-white/50 truncate">{user.email}</p>
                    </div>
                    
                    <div className="px-2">
                      <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/5 mb-2">
                        <div className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-white">Current Plan</span>
                        </div>
                        <span className="text-xs font-bold text-white/70 uppercase tracking-wider">{plan}</span>
                      </div>

                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                        <UserIcon className="w-4 h-4" />
                        Account Settings
                      </button>
                      
                      <button 
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-500/80 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <button 
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <UserIcon className="w-5 h-5 text-white/70" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
