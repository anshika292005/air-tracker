import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plane, Mail, Lock, Eye, EyeOff, User, LogIn, Facebook, Twitter, Github } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';

function SignInPage() {
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      let result;
      if (isSignUp) {
        result = await register(formData);
      } else {
        result = await login(formData);
      }

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(result.error || 'Authentication failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleSocialLogin = async (provider) => {
    setError('');
    setSuccess(false);

    try {
      // Simulate social login with mock data
      const socialUserData = {
        firstName: 'John',
        lastName: 'Doe',
        email: `john.doe.${provider}@example.com`,
        phone: '+1234567890'
      };

      const result = await login(socialUserData);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError('Social login failed. Please try again.');
      }
    } catch (error) {
      setError('Social login failed. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="signin-page">
        <header className="header">
          <div className="container">
            <div className="logo">
              <Plane className="logo-icon" />
              <h1>FlightTracker</h1>
            </div>
          </div>
        </header>
        
        <div className="container">
          <div className="success-container">
            <div className="success-icon">
              <User className="icon" />
            </div>
            <h2>Welcome to FlightTracker!</h2>
            <p>You have successfully {isSignUp ? 'signed up' : 'signed in'} to your account.</p>
            <p>Redirecting you to your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signin-page">
      {/* Header */}
      <Header />

      <div className="container">
        {/* Back Button */}
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft className="button-icon" />
          Back to Home
        </button>

        <div className="auth-container">
          {/* Auth Form */}
          <div className="auth-form-container">
            <div className="auth-header">
              <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
              <p>
                {isSignUp 
                  ? 'Join FlightTracker and start booking amazing flights!' 
                  : 'Sign in to your account to continue booking flights'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {/* Error Message */}
              {error && (
                <div className="error-message">
                  <span>{error}</span>
                </div>
              )}

              {isSignUp && (
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <div className="input-group">
                      <User className="input-icon" />
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required={isSignUp}
                        placeholder="Enter your first name"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <div className="input-group">
                      <User className="input-icon" />
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required={isSignUp}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <div className="input-group">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {isSignUp && (
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="input-group">
                    <User className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="input-group">
                  <Lock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <div className="input-group">
                    <Lock className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={isSignUp}
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              )}

              {isSignUp && (
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="checkmark"></span>
                    I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
                  </label>
                </div>
              )}

              <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                <LogIn className="button-icon" />
                {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </button>
            </form>

            {/* Social Login */}
            <div className="social-login">
              <div className="divider">
                <span>Or continue with</span>
              </div>
              <div className="social-buttons">
                <button 
                  className="social-btn facebook"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading}
                >
                  <Facebook className="social-icon" />
                  Facebook
                </button>
                <button 
                  className="social-btn twitter"
                  onClick={() => handleSocialLogin('twitter')}
                  disabled={isLoading}
                >
                  <Twitter className="social-icon" />
                  Twitter
                </button>
                <button 
                  className="social-btn github"
                  onClick={() => handleSocialLogin('github')}
                  disabled={isLoading}
                >
                  <Github className="social-icon" />
                  GitHub
                </button>
              </div>
            </div>

            {/* Toggle between Sign In and Sign Up */}
            <div className="auth-toggle">
              <p>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button 
                  type="button" 
                  className="toggle-btn"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>

          {/* Auth Benefits */}
          <div className="auth-benefits">
            <h3>Why Join FlightTracker?</h3>
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Plane className="icon" />
                </div>
                <div className="benefit-content">
                  <h4>Exclusive Deals</h4>
                  <p>Get access to member-only flight deals and discounts</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <User className="icon" />
                </div>
                <div className="benefit-content">
                  <h4>Personalized Experience</h4>
                  <p>Save your preferences and get personalized recommendations</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Lock className="icon" />
                </div>
                <div className="benefit-content">
                  <h4>Secure Booking</h4>
                  <p>Your personal and payment information is always secure</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Mail className="icon" />
                </div>
                <div className="benefit-content">
                  <h4>Booking History</h4>
                  <p>Keep track of all your bookings and travel history</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
