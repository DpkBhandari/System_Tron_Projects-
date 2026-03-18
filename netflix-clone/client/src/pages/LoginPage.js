import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!');
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e5-06f77c84c656/web/IN-en-20250310-TRIFECTA-perspective_63e8fa77-b90e-4b10-8fd8-f92d37f84b90_large.jpg)' }}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 w-full max-w-md bg-black/75 rounded-lg p-10 md:p-16">
        {/* Netflix Logo */}
        <svg className="w-32 mb-8" viewBox="0 0 111 30" fill="#E50914">
          <path d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.937 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 8 .405v4.657zM64.375 10.187v4.594h-6.687v7.938h-4.594V0h13.125v4.656H57.688v5.531h6.687zm-17.5-5.594h-5.875V28c-1.563 0-3.125 0-4.656.062V4.593h-5.844V0h16.375v4.593zM29.1 23.22c-1.563.125-3.125.281-4.656.5V0h4.657v23.22zm-8.72 1.5c-3.563.5-7.094 1.125-10.625 1.938V0h4.687v21.875c1.969-.406 3.969-.75 5.938-1.032V24.72zM0 30V0h4.656v25.344C3.094 25.75 1.562 26.375 0 27V30z"/>
        </svg>

        <h1 className="text-white text-3xl font-bold mb-8">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full bg-[#333] text-white rounded px-5 py-4 focus:outline-none focus:bg-[#444] placeholder-gray-500 transition-colors"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full bg-[#333] text-white rounded px-5 py-4 focus:outline-none focus:bg-[#444] placeholder-gray-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E50914] text-white py-4 rounded font-semibold text-base hover:bg-[#c40812] transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-gray-400" />
            <span>Remember me</span>
          </label>
          <a href="#!" className="hover:underline">Need help?</a>
        </div>

        <p className="mt-8 text-gray-500 text-sm">
          New to Netflix?{' '}
          <Link to="/register" className="text-white hover:underline font-semibold">Sign up now.</Link>
        </p>

        <p className="mt-4 text-xs text-gray-600">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
