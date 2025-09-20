import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  Settings, 
  Bell, 
  Mail, 
  Phone,
  Award,
  Heart,
  Search,
  Filter
} from 'lucide-react';
import Header from './Header';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock booking data
  const mockBookings = [
    {
      id: 'BK001',
      flight: 'AI 101',
      from: 'Delhi',
      to: 'Mumbai',
      date: '2024-02-15',
      time: '10:30 AM',
      status: 'confirmed',
      price: 8500,
      passengers: 2
    },
    {
      id: 'BK002',
      flight: 'SG 205',
      from: 'Mumbai',
      to: 'Bangalore',
      date: '2024-02-20',
      time: '2:15 PM',
      status: 'confirmed',
      price: 6200,
      passengers: 1
    },
    {
      id: 'BK003',
      flight: '6E 456',
      from: 'Bangalore',
      to: 'Delhi',
      date: '2024-02-25',
      time: '6:45 PM',
      status: 'pending',
      price: 4800,
      passengers: 1
    }
  ];

  // no-op

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <Header />

      {/* Deals Hero with route animation and video background */}
      <section className="dashboard-hero">
        <div className="video-wrap" aria-hidden="true">
          <video className="bg-video" autoPlay muted loop playsInline>
            <source src="https://videos.pexels.com/video-files/854257/854257-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>

        <div className="hero-content container">
          <div className="hero-text">
            <h2>Find the Best Flight Deals</h2>
            <p>Track prices, explore destinations, and book smarter—fast.</p>
            <div className="hero-actions">
              <button 
                className="action-btn primary"
                onClick={() => navigate('/')}
              >
                <Search className="btn-icon" />
                Start Searching
              </button>
              <button 
                className="action-btn secondary"
                onClick={() => navigate('/deals')}
              >
                <Star className="btn-icon" />
                View Top Deals
              </button>
            </div>
          </div>

          <div className="route-visual">
            <div className="city start">
              <span className="code">DEL</span>
              <span className="name">New Delhi</span>
            </div>
            <div className="route-line">
              <div className="progress"></div>
              <div className="plane">✈️</div>
            </div>
            <div className="city end">
              <span className="code">BOM</span>
              <span className="name">Mumbai</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <h2>Welcome back, {user?.firstName}!</h2>
            <p>Here's what's happening with your flights today</p>
          </div>
          <div className="quick-actions">
            <button 
              className="action-btn primary"
              onClick={() => navigate('/')}
            >
              <Search className="btn-icon" />
              Search Flights
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => navigate('/deals')}
            >
              <Star className="btn-icon" />
              View Deals
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <Plane className="icon" />
            </div>
            <div className="stat-content">
              <h3>{user?.bookings?.length || 0}</h3>
              <p>Total Bookings</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Award className="icon" />
            </div>
            <div className="stat-content">
              <h3>{user?.loyaltyPoints || 0}</h3>
              <p>Loyalty Points</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Calendar className="icon" />
            </div>
            <div className="stat-content">
              <h3>{mockBookings.filter(b => b.status === 'confirmed').length}</h3>
              <p>Upcoming Trips</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <MapPin className="icon" />
            </div>
            <div className="stat-content">
              <h3>5</h3>
              <p>Cities Visited</p>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Plane className="tab-icon" />
            My Bookings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="tab-icon" />
            Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <Settings className="tab-icon" />
            Preferences
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="bookings-section">
              <div className="section-header">
                <h3>Recent Bookings</h3>
                <button className="filter-btn">
                  <Filter className="btn-icon" />
                  Filter
                </button>
              </div>
              
              <div className="bookings-list">
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-header">
                      <div className="flight-info">
                        <h4>{booking.flight}</h4>
                        <span className="booking-id">#{booking.id}</span>
                      </div>
                      <div 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(booking.status) }}
                      >
                        {booking.status}
                      </div>
                    </div>
                    
                    <div className="booking-details">
                      <div className="route">
                        <div className="airport">
                          <MapPin className="icon" />
                          <div>
                            <strong>{booking.from}</strong>
                            <span>DEL</span>
                          </div>
                        </div>
                        <div className="flight-path">
                          <div className="line"></div>
                          <Plane className="plane-icon" />
                        </div>
                        <div className="airport">
                          <MapPin className="icon" />
                          <div>
                            <strong>{booking.to}</strong>
                            <span>BOM</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="booking-meta">
                        <div className="meta-item">
                          <Calendar className="icon" />
                          <span>{formatDate(booking.date)}</span>
                        </div>
                        <div className="meta-item">
                          <Clock className="icon" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="meta-item">
                          <User className="icon" />
                          <span>{booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="booking-footer">
                      <div className="price">
                        <span className="amount">₹{booking.price.toLocaleString()}</span>
                        <span className="per-person">per person</span>
                      </div>
                      <div className="booking-actions">
                        <button className="action-btn">View Details</button>
                        <button className="action-btn secondary">Download</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="profile-header">
                <div className="profile-avatar">
                  <User className="avatar-icon" />
                </div>
                <div className="profile-info">
                  <h3>{user?.firstName} {user?.lastName}</h3>
                  <p>{user?.email}</p>
                  <span className="member-since">Member since {formatDate(user?.joinDate)}</span>
                </div>
              </div>
              
              <div className="profile-details">
                <div className="detail-group">
                  <h4>Contact Information</h4>
                  <div className="detail-item">
                    <Mail className="icon" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="detail-item">
                    <Phone className="icon" />
                    <span>{user?.phone || 'Not provided'}</span>
                  </div>
                </div>
                
                <div className="detail-group">
                  <h4>Account Statistics</h4>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <span className="label">Total Bookings</span>
                      <span className="value">{user?.bookings?.length || 0}</span>
                    </div>
                    <div className="stat-item">
                      <span className="label">Loyalty Points</span>
                      <span className="value">{user?.loyaltyPoints || 0}</span>
                    </div>
                    <div className="stat-item">
                      <span className="label">Last Login</span>
                      <span className="value">{formatDate(user?.lastLogin)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="preferences-section">
              <h3>Account Preferences</h3>
              
              <div className="preference-groups">
                <div className="preference-group">
                  <h4>Notifications</h4>
                  <div className="preference-item">
                    <div className="preference-info">
                      <Bell className="icon" />
                      <div>
                        <strong>Email Notifications</strong>
                        <p>Receive updates about your bookings and deals</p>
                      </div>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="preference-item">
                    <div className="preference-info">
                      <Mail className="icon" />
                      <div>
                        <strong>Newsletter</strong>
                        <p>Get weekly deals and travel tips</p>
                      </div>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="preference-group">
                  <h4>Travel Preferences</h4>
                  <div className="preference-item">
                    <div className="preference-info">
                      <Heart className="icon" />
                      <div>
                        <strong>Seat Preference</strong>
                        <p>Default seat preference for bookings</p>
                      </div>
                    </div>
                    <select className="preference-select">
                      <option value="window">Window</option>
                      <option value="aisle">Aisle</option>
                      <option value="middle">Middle</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
