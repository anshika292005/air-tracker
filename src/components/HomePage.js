import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Plane, Calendar, Users, MapPin, Clock, DollarSign, Star, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'roundtrip'
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          airline: 'Air India',
          price: 25000,
          departure: '08:30',
          arrival: '11:45',
          duration: '3h 15m',
          stops: 'Non-stop',
          rating: 4.2,
          logo: '✈️',
          from: searchForm.from,
          to: searchForm.to
        },
        {
          id: 2,
          airline: 'IndiGo',
          price: 18000,
          departure: '14:20',
          arrival: '17:35',
          duration: '3h 15m',
          stops: 'Non-stop',
          rating: 4.5,
          logo: '✈️',
          from: searchForm.from,
          to: searchForm.to
        },
        {
          id: 3,
          airline: 'SpiceJet',
          price: 22000,
          departure: '06:45',
          arrival: '12:30',
          duration: '5h 45m',
          stops: '1 stop',
          rating: 4.0,
          logo: '✈️',
          from: searchForm.from,
          to: searchForm.to
        },
        {
          id: 4,
          airline: 'Vistara',
          price: 28000,
          departure: '19:15',
          arrival: '22:30',
          duration: '3h 15m',
          stops: 'Non-stop',
          rating: 4.3,
          logo: '✈️',
          from: searchForm.from,
          to: searchForm.to
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const handleBookFlight = (flightId) => {
    navigate(`/flight/${flightId}`);
  };

  return (
    <div className="App">
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
            {user ? (
              <div className="user-menu">
                <Link to="/dashboard" className="user-link">
                  <User className="user-icon" />
                  {user.firstName}
                </Link>
                <button onClick={logout} className="logout-btn">
                  <LogOut className="logout-icon" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Find the Best Flight Deals</h2>
          <p>Compare prices from multiple airlines and book your perfect journey</p>
        </div>
      </section>

      {/* Search Form */}
      <section className="search-section">
        <div className="container">
          <div className="search-card">
            <form onSubmit={handleSearch} className="search-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tripType">Trip Type</label>
                  <select 
                    name="tripType" 
                    value={searchForm.tripType} 
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="roundtrip">Round Trip</option>
                    <option value="oneway">One Way</option>
                    <option value="multicity">Multi City</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="from">From</label>
                  <div className="input-group">
                    <MapPin className="input-icon" />
                    <input
                      type="text"
                      name="from"
                      placeholder="Departure city"
                      value={searchForm.from}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="to">To</label>
                  <div className="input-group">
                    <MapPin className="input-icon" />
                    <input
                      type="text"
                      name="to"
                      placeholder="Destination city"
                      value={searchForm.to}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="departureDate">Departure</label>
                  <div className="input-group">
                    <Calendar className="input-icon" />
                    <input
                      type="date"
                      name="departureDate"
                      value={searchForm.departureDate}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                {searchForm.tripType === 'roundtrip' && (
                  <div className="form-group">
                    <label htmlFor="returnDate">Return</label>
                    <div className="input-group">
                      <Calendar className="input-icon" />
                      <input
                        type="date"
                        name="returnDate"
                        value={searchForm.returnDate}
                        onChange={handleInputChange}
                        className="form-input"
                        required={searchForm.tripType === 'roundtrip'}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="passengers">Passengers</label>
                  <div className="input-group">
                    <Users className="input-icon" />
                    <select
                      name="passengers"
                      value={searchForm.passengers}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value={1}>1 Passenger</option>
                      <option value={2}>2 Passengers</option>
                      <option value={3}>3 Passengers</option>
                      <option value={4}>4 Passengers</option>
                      <option value={5}>5+ Passengers</option>
                    </select>
                  </div>
                </div>

                <div className="form-group search-button-group">
                  <button type="submit" className="search-button" disabled={isSearching}>
                    <Search className="button-icon" />
                    {isSearching ? 'Searching...' : 'Search Flights'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section className="results-section">
          <div className="container">
            <h3>Available Flights</h3>
            <div className="results-grid">
              {searchResults.map(flight => (
                <div key={flight.id} className="flight-card">
                  <div className="flight-header">
                    <div className="airline-info">
                      <span className="airline-logo">{flight.logo}</span>
                      <div>
                        <h4>{flight.airline}</h4>
                        <div className="rating">
                          <Star className="star-icon" />
                          <span>{flight.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="price">
                      <span className="currency">₹</span>
                      <span className="amount">{flight.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flight-details">
                    <div className="time-info">
                      <div className="time">
                        <span className="time-value">{flight.departure}</span>
                        <span className="airport">{flight.from}</span>
                      </div>
                      <div className="duration">
                        <div className="duration-line"></div>
                        <span className="duration-text">{flight.duration}</span>
                        <div className="duration-line"></div>
                      </div>
                      <div className="time">
                        <span className="time-value">{flight.arrival}</span>
                        <span className="airport">{flight.to}</span>
                      </div>
                    </div>
                    <div className="flight-info">
                      <div className="info-item">
                        <Clock className="info-icon" />
                        <span>{flight.stops}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    className="book-button"
                    onClick={() => handleBookFlight(flight.id)}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h3>Why Choose FlightTracker?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <DollarSign className="feature-icon" />
              <h4>Best Prices</h4>
              <p>Compare prices from multiple airlines to find the best deals</p>
            </div>
            <div className="feature-card">
              <Clock className="feature-icon" />
              <h4>Real-time Updates</h4>
              <p>Get instant updates on flight schedules and price changes</p>
            </div>
            <div className="feature-card">
              <Star className="feature-icon" />
              <h4>Verified Reviews</h4>
              <p>Read authentic reviews from fellow travelers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>FlightTracker</h4>
              <p>Your trusted partner for finding the best flight deals</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/deals">Deals</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/signin">Sign In</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 FlightTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
