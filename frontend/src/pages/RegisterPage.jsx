import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import { Button, Input, Card } from '../components/ui';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'merchant'
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to dashboard (merchant only)
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
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

        {/* Register Card */}
        <Card variant="glass" className="p-8">
          <h2 className="text-3xl font-bold text-fakepe-text-primary mb-2">Create Developer Account</h2>
          <p className="text-fakepe-text-secondary mb-8">Build and integrate payment solutions with FakePE</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="text"
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />

            <Input
              type="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />

            <div>
              <Input
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
              <p className="text-xs text-fakepe-text-secondary mt-2">Must be at least 8 characters</p>
            </div>

            <Input
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                'Creating account...'
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Developer Account
                </>
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="bg-fakepe-primary/10 border border-fakepe-primary/30 rounded-lg p-3">
              <p className="text-xs text-fakepe-text-primary">
                <strong>Note:</strong> This is for developers & merchants only. End users should use the FakePE mobile app.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-fakepe-text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-fakepe-primary hover:text-fakepe-success font-medium transition">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-fakepe-border">
            <p className="text-xs text-fakepe-text-secondary text-center">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-fakepe-primary hover:text-fakepe-success transition">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-fakepe-primary hover:text-fakepe-success transition">Privacy Policy</a>
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

export default RegisterPage;
