import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plane, Clock, MapPin, Star, Percent, Calendar, Users, Heart, Zap } from 'lucide-react';

function DealsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const deals = [
    {
      id: 1,
      title: 'Early Bird Special',
      airline: 'Air India',
      discount: '25%',
      originalPrice: 30000,
      discountedPrice: 22500,
      route: 'Mumbai → Delhi',
      validUntil: '2024-03-15',
      description: 'Book 30 days in advance and save big!',
      category: 'early-bird',
      logo: '✈️',
      rating: 4.2,
      features: ['Free Cancellation', 'Meals Included', 'Extra Baggage']
    },
    {
      id: 2,
      title: 'Weekend Getaway',
      airline: 'IndiGo',
      discount: '30%',
      originalPrice: 20000,
      discountedPrice: 14000,
      route: 'Delhi → Bangalore',
      validUntil: '2024-02-28',
      description: 'Perfect for weekend trips!',
      category: 'weekend',
      logo: '✈️',
      rating: 4.5,
      features: ['Weekend Travel', 'No Change Fees', 'Priority Boarding']
    },
    {
      id: 3,
      title: 'Business Class Upgrade',
      airline: 'Vistara',
      discount: '40%',
      originalPrice: 50000,
      discountedPrice: 30000,
      route: 'Mumbai → Singapore',
      validUntil: '2024-04-10',
      description: 'Experience luxury at a fraction of the cost!',
      category: 'business',
      logo: '✈️',
      rating: 4.7,
      features: ['Lounge Access', 'Premium Meals', 'Extra Legroom']
    },
    {
      id: 4,
      title: 'Student Special',
      airline: 'SpiceJet',
      discount: '35%',
      originalPrice: 15000,
      discountedPrice: 9750,
      route: 'Chennai → Hyderabad',
      validUntil: '2024-03-30',
      description: 'Exclusive deals for students!',
      category: 'student',
      logo: '✈️',
      rating: 4.0,
      features: ['Student ID Required', 'Flexible Dates', 'Group Bookings']
    },
    {
      id: 5,
      title: 'Last Minute Deals',
      airline: 'Air India',
      discount: '50%',
      originalPrice: 25000,
      discountedPrice: 12500,
      route: 'Delhi → Goa',
      validUntil: '2024-02-20',
      description: 'Spontaneous travel made affordable!',
      category: 'last-minute',
      logo: '✈️',
      rating: 4.1,
      features: ['Immediate Travel', 'Limited Seats', 'No Refunds']
    },
    {
      id: 6,
      title: 'Family Package',
      airline: 'IndiGo',
      discount: '20%',
      originalPrice: 80000,
      discountedPrice: 64000,
      route: 'Mumbai → Dubai',
      validUntil: '2024-05-15',
      description: 'Perfect for family vacations!',
      category: 'family',
      logo: '✈️',
      rating: 4.3,
      features: ['Family Discount', 'Child Seats', 'Group Check-in']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Deals', icon: Zap },
    { id: 'early-bird', name: 'Early Bird', icon: Calendar },
    { id: 'weekend', name: 'Weekend', icon: Clock },
    { id: 'business', name: 'Business', icon: Star },
    { id: 'student', name: 'Student', icon: Users },
    { id: 'last-minute', name: 'Last Minute', icon: Zap },
    { id: 'family', name: 'Family', icon: Heart }
  ];

  const filteredDeals = selectedCategory === 'all' 
    ? deals 
    : deals.filter(deal => deal.category === selectedCategory);

  const handleDealClick = (dealId) => {
    navigate(`/flight/${dealId}`);
  };

  return (
    <div className="deals-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <Plane className="logo-icon" />
            <h1>FlightTracker</h1>
          </div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/deals" className="active">Deals</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/signin">Sign In</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        {/* Back Button */}
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft className="button-icon" />
          Back to Home
        </button>

        {/* Hero Section */}
        <section className="deals-hero">
          <h2>Exclusive Flight Deals</h2>
          <p>Discover amazing discounts and special offers on flights worldwide</p>
        </section>

        {/* Category Filter */}
        <section className="category-filter">
          <h3>Filter by Category</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="category-icon" />
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Deals Grid */}
        <section className="deals-grid">
          {filteredDeals.map(deal => (
            <div key={deal.id} className="deal-card" onClick={() => handleDealClick(deal.id)}>
              <div className="deal-header">
                <div className="deal-badge">
                  <Percent className="badge-icon" />
                  {deal.discount} OFF
                </div>
                <div className="deal-title">
                  <h4>{deal.title}</h4>
                  <p>{deal.description}</p>
                </div>
              </div>

              <div className="deal-airline">
                <span className="airline-logo">{deal.logo}</span>
                <div className="airline-info">
                  <h5>{deal.airline}</h5>
                  <div className="rating">
                    <Star className="star-icon" />
                    <span>{deal.rating}</span>
                  </div>
                </div>
              </div>

              <div className="deal-route">
                <MapPin className="route-icon" />
                <span>{deal.route}</span>
              </div>

              <div className="deal-pricing">
                <div className="price-comparison">
                  <span className="original-price">₹{deal.originalPrice.toLocaleString()}</span>
                  <span className="discounted-price">₹{deal.discountedPrice.toLocaleString()}</span>
                </div>
                <div className="savings">
                  Save ₹{(deal.originalPrice - deal.discountedPrice).toLocaleString()}
                </div>
              </div>

              <div className="deal-features">
                {deal.features.map((feature, index) => (
                  <span key={index} className="feature-tag">{feature}</span>
                ))}
              </div>

              <div className="deal-footer">
                <div className="valid-until">
                  <Calendar className="calendar-icon" />
                  Valid until {deal.validUntil}
                </div>
                <button className="book-deal-btn">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Newsletter Signup */}
        <section className="newsletter-section">
          <div className="newsletter-card">
            <h3>Never Miss a Deal!</h3>
            <p>Subscribe to our newsletter and get exclusive flight deals delivered to your inbox</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DealsPage;
