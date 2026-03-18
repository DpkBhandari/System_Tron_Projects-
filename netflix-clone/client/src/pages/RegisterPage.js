import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register(formData.username, formData.email, formData.password);
      toast.success('Account created! Welcome to Netflix.');
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const update = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e5-06f77c84c656/web/IN-en-20250310-TRIFECTA-perspective_63e8fa77-b90e-4b10-8fd8-f92d37f84b90_large.jpg)' }}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 w-full max-w-md bg-black/75 rounded-lg p-10 md:p-16">
        <svg className="w-32 mb-8" viewBox="0 0 111 30" fill="#E50914">
          <path d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.937 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 8 .405v4.657zM64.375 10.187v4.594h-6.687v7.938h-4.594V0h13.125v4.656H57.688v5.531h6.687zm-17.5-5.594h-5.875V28c-1.563 0-3.125 0-4.656.062V4.593h-5.844V0h16.375v4.593zM29.1 23.22c-1.563.125-3.125.281-4.656.5V0h4.657v23.22zm-8.72 1.5c-3.563.5-7.094 1.125-10.625 1.938V0h4.687v21.875c1.969-.406 3.969-.75 5.938-1.032V24.72zM0 30V0h4.656v25.344C3.094 25.75 1.562 26.375 0 27V30z"/>
        </svg>
        <h1 className="text-white text-3xl font-bold mb-8">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'username', type: 'text', placeholder: 'Username' },
            { key: 'email', type: 'email', placeholder: 'Email address' },
            { key: 'password', type: 'password', placeholder: 'Password (min 6 chars)' },
            { key: 'confirm', type: 'password', placeholder: 'Confirm password' },
          ].map(({ key, type, placeholder }) => (
            <input key={key} type={type} placeholder={placeholder} value={formData[key]}
              onChange={update(key)} required
              className="w-full bg-[#333] text-white rounded px-5 py-4 focus:outline-none focus:bg-[#444] placeholder-gray-500 transition-colors" />
          ))}
          <button type="submit" disabled={loading}
            className="w-full bg-[#E50914] text-white py-4 rounded font-semibold hover:bg-[#c40812] transition-colors disabled:opacity-70 mt-2">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-8 text-gray-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:underline font-semibold">Sign in.</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
