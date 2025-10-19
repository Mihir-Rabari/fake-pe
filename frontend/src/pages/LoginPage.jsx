import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import { Button, Input, Card } from '../components/ui';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/login`, formData);
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Only allow merchants/developers
      if (response.data.user.role !== 'merchant') {
        setError('This portal is for developers/merchants only. Please use the FakePE mobile app.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return;
      }
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-fakepe-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-fakepe-primary rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-fakepe-accent rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse-slow"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo size="lg" showText={true} className="justify-center" />
          </Link>
        </div>

        {/* Login Card */}
        <Card variant="glass" className="p-8">
          <h2 className="text-3xl font-bold text-fakepe-text-primary mb-2">Developer Portal</h2>
          <p className="text-fakepe-text-secondary mb-8">Sign in to access your developer dashboard</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />

            <Input
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-fakepe-border text-fakepe-primary focus:ring-2 focus:ring-fakepe-primary focus:ring-offset-2 focus:ring-offset-fakepe-background" 
                />
                <span className="ml-2 text-sm text-fakepe-text-secondary">Remember me</span>
              </label>
              <a href="#" className="text-sm text-fakepe-primary hover:text-fakepe-success transition">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                'Signing in...'
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="bg-fakepe-primary/10 border border-fakepe-primary/30 rounded-lg p-3">
              <p className="text-xs text-fakepe-text-primary">
                <strong>Note:</strong> This portal is for developers & merchants only. End users should download the FakePE mobile app.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-fakepe-text-secondary">
              Need a developer account?{' '}
              <Link to="/register" className="text-fakepe-primary hover:text-fakepe-success font-medium transition">
                Sign up
              </Link>
            </p>
          </div>
        </Card>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-fakepe-text-secondary hover:text-fakepe-primary transition">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
