import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaCaretDown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileMenu, setProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 py-4 transition-all duration-500 ${scrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      {/* Logo */}
      <div className="flex items-center gap-8">
        <Link to="/home">
          <svg className="w-24 h-8 md:w-32" viewBox="0 0 111 30" fill="#E50914">
            <path d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.937 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 8 .405v4.657zM64.375 10.187v4.594h-6.687v7.938h-4.594V0h13.125v4.656H57.688v5.531h6.687zm-17.5-5.594h-5.875V28c-1.563 0-3.125 0-4.656.062V4.593h-5.844V0h16.375v4.593zM29.1 23.22c-1.563.125-3.125.281-4.656.5V0h4.657v23.22zm-8.72 1.5c-3.563.5-7.094 1.125-10.625 1.938V0h4.687v21.875c1.969-.406 3.969-.75 5.938-1.032V24.72zM0 30V0h4.656v25.344C3.094 25.75 1.562 26.375 0 27V30z"/>
          </svg>
        </Link>
        <div className="hidden md:flex gap-4 text-sm text-gray-300">
          <Link to="/home" className="hover:text-white transition-colors">Home</Link>
          <Link to="/movies" className="hover:text-white transition-colors">Movies</Link>
          <Link to="/tv" className="hover:text-white transition-colors">TV Shows</Link>
          <Link to="/my-list" className="hover:text-white transition-colors">My List</Link>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center bg-black/80 border border-white/50 px-3 py-1 rounded">
              <FaSearch className="text-white mr-2" size={14} />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Titles, people, genres"
                className="bg-transparent text-white text-sm outline-none w-48"
                onBlur={() => !searchQuery && setSearchOpen(false)}
              />
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-white hover:text-gray-300 transition-colors">
              <FaSearch size={18} />
            </button>
          )}
        </div>

        <FaBell className="text-white hover:text-gray-300 cursor-pointer" size={18} />

        {/* Profile */}
        <div className="relative" onMouseEnter={() => setProfileMenu(true)} onMouseLeave={() => setProfileMenu(false)}>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: user?.profileColor || '#E50914' }}>
              {user?.avatar || user?.username?.[0]?.toUpperCase()}
            </div>
            <FaCaretDown className={`text-white transition-transform ${profileMenu ? 'rotate-180' : ''}`} size={12} />
          </div>

          {profileMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#141414] border border-gray-700 rounded shadow-xl z-50">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-white text-sm font-semibold">{user?.username}</p>
                <p className="text-gray-400 text-xs">{user?.email}</p>
              </div>
              <Link to="/profile" className="block px-4 py-2 text-gray-300 text-sm hover:text-white hover:bg-gray-800 transition-colors">
                Account
              </Link>
              <Link to="/my-list" className="block px-4 py-2 text-gray-300 text-sm hover:text-white hover:bg-gray-800 transition-colors">
                My List
              </Link>
              <button onClick={logout} className="w-full text-left px-4 py-2 text-gray-300 text-sm hover:text-white hover:bg-gray-800 transition-colors border-t border-gray-700">
                Sign out of Netflix
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
