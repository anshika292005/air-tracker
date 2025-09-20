import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plane, MapPin, Star, Wifi, Utensils, Briefcase, Heart } from 'lucide-react';

function FlightPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch flight details
    setTimeout(() => {
      const flightData = {
        1: {
          id: 1,
          airline: 'Air India',
          price: 25000,
          departure: '08:30',
          arrival: '11:45',
          duration: '3h 15m',
          stops: 'Non-stop',
          rating: 4.2,
          logo: '✈️',
          from: 'Mumbai',
          to: 'Delhi',
          date: '2024-02-15',
          aircraft: 'Boeing 737-800',
          terminal: 'Terminal 2',
          gate: 'Gate A12',
          baggage: '25kg included',
          amenities: ['WiFi', 'Meals', 'Entertainment', 'Extra Legroom'],
          description: 'Experience comfort and reliability with Air India. Our non-stop service ensures you reach your destination on time with excellent service.',
          features: [
            { icon: Wifi, name: 'Free WiFi', available: true },
            { icon: Utensils, name: 'Complimentary Meals', available: true },
            { icon: Briefcase, name: 'Extra Baggage', available: true }
          ]
        },
        2: {
          id: 2,
          airline: 'IndiGo',
          price: 18000,
          departure: '14:20',
          arrival: '17:35',
          duration: '3h 15m',
          stops: 'Non-stop',
          rating: 4.5,
          logo: '✈️',
          from: 'Mumbai',
          to: 'Delhi',
          date: '2024-02-15',
          aircraft: 'Airbus A320',
          terminal: 'Terminal 1',
          gate: 'Gate B8',
          baggage: '15kg included',
          amenities: ['WiFi', 'Snacks', 'Entertainment'],
          description: 'IndiGo offers the best value for money with punctual service and modern aircraft. Perfect for business and leisure travelers.',
          features: [
            { icon: Wifi, name: 'Free WiFi', available: true },
            { icon: Utensils, name: 'Snacks', available: true },
            { icon: Briefcase, name: 'Standard Baggage', available: true }
          ]
        },
        3: {
          id: 3,
          airline: 'SpiceJet',
          price: 22000,
          departure: '06:45',
          arrival: '12:30',
          duration: '5h 45m',
          stops: '1 stop',
          rating: 4.0,
          logo: '✈️',
          from: 'Mumbai',
          to: 'Delhi',
          date: '2024-02-15',
          aircraft: 'Boeing 737 MAX',
          terminal: 'Terminal 2',
          gate: 'Gate C15',
          baggage: '20kg included',
          amenities: ['WiFi', 'Meals', 'Entertainment', 'Priority Boarding'],
          description: 'SpiceJet connects you to your destination with a short stopover, offering great value and comfort.',
          features: [
            { icon: Wifi, name: 'Free WiFi', available: true },
            { icon: Utensils, name: 'Complimentary Meals', available: true },
            { icon: Briefcase, name: 'Extra Baggage', available: true }
          ]
        },
        4: {
          id: 4,
          airline: 'Vistara',
          price: 28000,
          departure: '19:15',
          arrival: '22:30',
          duration: '3h 15m',
          stops: 'Non-stop',
          rating: 4.3,
          logo: '✈️',
          from: 'Mumbai',
          to: 'Delhi',
          date: '2024-02-15',
          aircraft: 'Airbus A321',
          terminal: 'Terminal 2',
          gate: 'Gate A5',
          baggage: '30kg included',
          amenities: ['WiFi', 'Premium Meals', 'Entertainment', 'Extra Legroom', 'Priority Check-in'],
          description: 'Vistara offers premium service with spacious seating, gourmet meals, and exceptional hospitality.',
          features: [
            { icon: Wifi, name: 'Free WiFi', available: true },
            { icon: Utensils, name: 'Premium Meals', available: true },
            { icon: Briefcase, name: 'Extra Baggage', available: true }
          ]
        }
      };

      setFlight(flightData[id] || null);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading flight details...</p>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="error-container">
        <h2>Flight not found</h2>
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft className="button-icon" />
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="flight-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <Plane className="logo-icon" />
            <h1>FlightTracker</h1>
          </div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/deals">Deals</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/signin">Sign In</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        {/* Back Button */}
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft className="button-icon" />
          Back to Search
        </button>

        {/* Flight Details */}
        <div className="flight-details-container">
          <div className="flight-main-info">
            <div className="flight-header">
              <div className="airline-section">
                <span className="airline-logo">{flight.logo}</span>
                <div className="airline-details">
                  <h2>{flight.airline}</h2>
                  <div className="rating">
                    <Star className="star-icon" />
                    <span>{flight.rating}</span>
                    <span className="rating-text">Excellent</span>
                  </div>
                </div>
              </div>
              <div className="price-section">
                <div className="price">
                  <span className="currency">₹</span>
                  <span className="amount">{flight.price.toLocaleString()}</span>
                </div>
                <p className="price-per-person">per person</p>
              </div>
            </div>

            <div className="flight-route">
              <div className="route-details">
                <div className="time-location">
                  <div className="time">{flight.departure}</div>
                  <div className="location">{flight.from}</div>
                  <div className="date">{flight.date}</div>
                </div>
                
                <div className="route-line">
                  <div className="duration">{flight.duration}</div>
                  <div className="line"></div>
                  <div className="stops">{flight.stops}</div>
                </div>
                
                <div className="time-location">
                  <div className="time">{flight.arrival}</div>
                  <div className="location">{flight.to}</div>
                  <div className="date">{flight.date}</div>
                </div>
              </div>
            </div>

            <div className="flight-info-grid">
              <div className="info-item">
                <Plane className="info-icon" />
                <div>
                  <div className="info-label">Aircraft</div>
                  <div className="info-value">{flight.aircraft}</div>
                </div>
              </div>
              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <div className="info-label">Terminal</div>
                  <div className="info-value">{flight.terminal}</div>
                </div>
              </div>
              <div className="info-item">
                <Briefcase className="info-icon" />
                <div>
                  <div className="info-label">Baggage</div>
                  <div className="info-value">{flight.baggage}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Features */}
          <div className="flight-features">
            <h3>Included Features</h3>
            <div className="features-grid">
              {flight.features.map((feature, index) => (
                <div key={index} className={`feature-item ${feature.available ? 'available' : 'not-available'}`}>
                  <feature.icon className="feature-icon" />
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Flight Description */}
          <div className="flight-description">
            <h3>About this flight</h3>
            <p>{flight.description}</p>
          </div>

          {/* Booking Section */}
          <div className="booking-section">
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <div className="summary-item">
                <span>Flight Price</span>
                <span>₹{flight.price.toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span>Taxes & Fees</span>
                <span>₹2,500</span>
              </div>
              <div className="summary-item total">
                <span>Total Price</span>
                <span>₹{(flight.price + 2500).toLocaleString()}</span>
              </div>
            </div>
            
            <button className="book-now-button" onClick={handleBookNow}>
              <Heart className="button-icon" />
              Book This Flight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightPage;
