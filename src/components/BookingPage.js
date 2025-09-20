import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, CheckCircle, Plane, Users, HelpCircle } from 'lucide-react';
import Header from './Header';
import { RAZORPAY_CONFIG, generateOrderId, formatAmount, validatePaymentResponse } from '../config/razorpay';
import PaymentInstructions from './PaymentInstructions';

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    passengers: [],
    contactInfo: {
      email: '',
      phone: '',
      firstName: '',
      lastName: ''
    }
  });
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);

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
          baggage: '25kg included'
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
          baggage: '15kg included'
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
          baggage: '20kg included'
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
          baggage: '30kg included'
        }
      };

      setFlight(flightData[id] || null);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === 'contactInfo') {
      setBookingData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [name]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...bookingData.passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setBookingData(prev => ({
      ...prev,
      passengers: updatedPassengers
    }));
  };

  const addPassenger = () => {
    setBookingData(prev => ({
      ...prev,
      passengers: [...prev.passengers, {
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        seatPreference: 'window'
      }]
    }));
  };

  const removePassenger = (index) => {
    setBookingData(prev => ({
      ...prev,
      passengers: prev.passengers.filter((_, i) => i !== index)
    }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Check if Razorpay is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      // Check if script is already being loaded
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        // Script is already in DOM, wait for it to load
        const checkRazorpay = () => {
          if (window.Razorpay) {
            resolve(true);
          } else {
            setTimeout(checkRazorpay, 100);
          }
        };
        checkRazorpay();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay SDK loaded successfully');
        resolve(true);
      };
      script.onerror = (error) => {
        console.error('Failed to load Razorpay SDK:', error);
        resolve(false);
      };
      document.head.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      console.log('Starting payment process...');
      
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        console.error('Razorpay SDK failed to load');
        // Fallback: Simulate successful payment for demo
        const useFallback = window.confirm('Razorpay is not available. Would you like to proceed with a demo payment?');
        if (useFallback) {
          setPaymentStatus('success');
          setCurrentStep(4);
          alert('Demo payment successful! Your booking has been confirmed.');
          return;
        }
        return;
      }

      if (!window.Razorpay) {
        console.error('Razorpay is not available');
        const useFallback = window.confirm('Razorpay is not available. Would you like to proceed with a demo payment?');
        if (useFallback) {
          setPaymentStatus('success');
          setCurrentStep(4);
          alert('Demo payment successful! Your booking has been confirmed.');
          return;
        }
        return;
      }

      const totalAmount = (flight.price + 2500) * bookingData.passengers.length;
      console.log('Total amount:', totalAmount);
      
      const options = {
        key: RAZORPAY_CONFIG.key,
        amount: formatAmount(totalAmount),
        currency: RAZORPAY_CONFIG.currency,
        name: RAZORPAY_CONFIG.name,
        description: `Flight booking - ${flight.airline} from ${flight.from} to ${flight.to}`,
        image: RAZORPAY_CONFIG.image,
        handler: function (response) {
          console.log('Payment successful:', response);
          setPaymentStatus('success');
          setCurrentStep(4);
          alert('Payment successful! Your booking has been confirmed.');
        },
        prefill: {
          name: `${bookingData.contactInfo.firstName} ${bookingData.contactInfo.lastName}`,
          email: bookingData.contactInfo.email,
          contact: bookingData.contactInfo.phone,
        },
        notes: {
          address: 'Flight booking payment',
          booking_id: generateOrderId(),
          flight_id: flight.id,
          passengers: bookingData.passengers.length
        },
        theme: RAZORPAY_CONFIG.theme,
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
          }
        },
        retry: RAZORPAY_CONFIG.retry
      };

      console.log('Opening Razorpay with options:', options);
      const rzp = new window.Razorpay(options);
      
      // Add error handling
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description || 'Unknown error occurred'}`);
      });

      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      const useFallback = window.confirm('An error occurred. Would you like to proceed with a demo payment?');
      if (useFallback) {
        setPaymentStatus('success');
        setCurrentStep(4);
        alert('Demo payment successful! Your booking has been confirmed.');
      } else {
        alert('Payment cancelled. Please try again.');
      }
    }
  };

  const totalPrice = flight ? (flight.price + 2500) : 0;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading booking details...</p>
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
    <div className="booking-page">
      {/* Header */}
      <Header />

      <div className="container">
        {/* Back Button */}
        <button onClick={() => navigate(`/flight/${id}`)} className="back-button">
          <ArrowLeft className="button-icon" />
          Back to Flight Details
        </button>

        {/* Progress Steps */}
        <div className="progress-steps">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Passenger Details</div>
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Contact Information</div>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Payment</div>
          </div>
          <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
            <div className="step-number">4</div>
            <div className="step-label">Confirmation</div>
          </div>
        </div>

        <div className="booking-container">
          {/* Flight Summary */}
          <div className="flight-summary">
            <h3>Flight Summary</h3>
            <div className="summary-card">
              <div className="airline-info">
                <span className="airline-logo">{flight.logo}</span>
                <div>
                  <h4>{flight.airline}</h4>
                  <p>{flight.aircraft}</p>
                </div>
              </div>
              <div className="route-info">
                <div className="time-location">
                  <div className="time">{flight.departure}</div>
                  <div className="location">{flight.from}</div>
                </div>
                <div className="route-line">
                  <div className="duration">{flight.duration}</div>
                  <div className="line"></div>
                </div>
                <div className="time-location">
                  <div className="time">{flight.arrival}</div>
                  <div className="location">{flight.to}</div>
                </div>
              </div>
              <div className="price-info">
                <div className="price">₹{flight.price.toLocaleString()}</div>
                <div className="per-person">per person</div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="booking-form">
            {currentStep === 1 && (
              <div className="step-content">
                <h3>Passenger Details</h3>
                <div className="passengers-section">
                  {bookingData.passengers.map((passenger, index) => (
                    <div key={index} className="passenger-card">
                      <div className="passenger-header">
                        <h4>Passenger {index + 1}</h4>
                        {bookingData.passengers.length > 1 && (
                          <button 
                            type="button" 
                            className="remove-passenger"
                            onClick={() => removePassenger(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            value={passenger.firstName}
                            onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            value={passenger.lastName}
                            onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Age</label>
                          <input
                            type="number"
                            value={passenger.age}
                            onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Gender</label>
                          <select
                            value={passenger.gender}
                            onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                            required
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Seat Preference</label>
                        <select
                          value={passenger.seatPreference}
                          onChange={(e) => handlePassengerChange(index, 'seatPreference', e.target.value)}
                        >
                          <option value="window">Window</option>
                          <option value="aisle">Aisle</option>
                          <option value="middle">Middle</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="add-passenger" onClick={addPassenger}>
                    <Users className="button-icon" />
                    Add Passenger
                  </button>
                </div>
                <button 
                  className="next-button"
                  onClick={() => setCurrentStep(2)}
                  disabled={bookingData.passengers.length === 0}
                >
                  Next: Contact Information
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-content">
                <h3>Contact Information</h3>
                <div className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={bookingData.contactInfo.firstName}
                        onChange={(e) => handleInputChange(e, 'contactInfo')}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={bookingData.contactInfo.lastName}
                        onChange={(e) => handleInputChange(e, 'contactInfo')}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.contactInfo.email}
                      onChange={(e) => handleInputChange(e, 'contactInfo')}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.contactInfo.phone}
                      onChange={(e) => handleInputChange(e, 'contactInfo')}
                      required
                    />
                  </div>
                </div>
                <div className="step-buttons">
                  <button 
                    className="back-button"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </button>
                  <button 
                    className="next-button"
                    onClick={() => setCurrentStep(3)}
                  >
                    Next: Payment
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-content">
                <h3>Payment</h3>
                <div className="payment-summary">
                  <div className="summary-item">
                    <span>Flight Price ({bookingData.passengers.length} passenger{bookingData.passengers.length > 1 ? 's' : ''})</span>
                    <span>₹{(flight.price * bookingData.passengers.length).toLocaleString()}</span>
                  </div>
                  <div className="summary-item">
                    <span>Taxes & Fees</span>
                    <span>₹{(2500 * bookingData.passengers.length).toLocaleString()}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Total Amount</span>
                    <span>₹{(totalPrice * bookingData.passengers.length).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="payment-methods">
                  <div className="payment-methods-header">
                    <h4>Payment Method</h4>
                    <button 
                      className="help-btn"
                      onClick={() => setShowPaymentInstructions(true)}
                    >
                      <HelpCircle className="help-icon" />
                      Test Instructions
                    </button>
                  </div>
                  <div className="payment-option selected">
                    <CreditCard className="payment-icon" />
                    <span>Razorpay (Cards, UPI, Net Banking)</span>
                  </div>
                </div>

                <div className="step-buttons">
                  <button 
                    className="back-button"
                    onClick={() => setCurrentStep(2)}
                  >
                    Back
                  </button>
                  <div className="payment-buttons">
                    <button 
                      className="pay-button"
                      onClick={handlePayment}
                    >
                      <CreditCard className="button-icon" />
                      Pay ₹{(totalPrice * bookingData.passengers.length).toLocaleString()}
                    </button>
                    <button 
                      className="demo-pay-button"
                      onClick={() => {
                        setPaymentStatus('success');
                        setCurrentStep(4);
                        alert('Demo payment successful! Your booking has been confirmed.');
                      }}
                    >
                      <CheckCircle className="button-icon" />
                      Demo Payment
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && paymentStatus === 'success' && (
              <div className="step-content success">
                <div className="success-icon">
                  <CheckCircle className="icon" />
                </div>
                <h3>Booking Confirmed!</h3>
                <p>Your flight has been successfully booked. You will receive a confirmation email shortly.</p>
                <div className="booking-details">
                  <h4>Booking Reference: FLT{Date.now().toString().slice(-6)}</h4>
                  <p>Please arrive at the airport 2 hours before departure time.</p>
                </div>
                <button 
                  className="home-button"
                  onClick={() => navigate('/')}
                >
                  Book Another Flight
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Instructions Modal */}
      <PaymentInstructions 
        isOpen={showPaymentInstructions}
        onClose={() => setShowPaymentInstructions(false)}
      />
    </div>
  );
}

export default BookingPage;
