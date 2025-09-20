import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plane, Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Star } from 'lucide-react';

function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: ['+91 98765 43210', '+91 98765 43211'],
      description: '24/7 customer support'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: ['support@flighttracker.com', 'help@flighttracker.com'],
      description: 'We respond within 2 hours'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['123 Aviation Street', 'Mumbai, Maharashtra 400001', 'India'],
      description: 'Visit us during business hours'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed'],
      description: 'IST Time Zone'
    }
  ];

  const faqs = [
    {
      question: 'How do I book a flight?',
      answer: 'Simply search for flights using our search form, select your preferred option, and follow the booking process.'
    },
    {
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel or modify your booking up to 24 hours before departure, subject to airline policies.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, UPI, net banking, and digital wallets through Razorpay.'
    },
    {
      question: 'How do I get my boarding pass?',
      answer: 'You will receive your boarding pass via email after successful booking. You can also download it from our website.'
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, we use industry-standard encryption and security measures to protect your personal and payment information.'
    }
  ];

  return (
    <div className="contact-page">
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
            <Link to="/contact" className="active">Contact</Link>
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
        <section className="contact-hero">
          <h2>Get in Touch</h2>
          <p>We're here to help you with all your travel needs. Reach out to us anytime!</p>
        </section>

        <div className="contact-container">
          {/* Contact Form */}
          <section className="contact-form-section">
            <h3>Send us a Message</h3>
            {isSubmitted ? (
              <div className="success-message">
                <MessageCircle className="success-icon" />
                <h4>Message Sent Successfully!</h4>
                <p>Thank you for contacting us. We'll get back to you within 2 hours.</p>
                <button onClick={() => setIsSubmitted(false)} className="send-another-btn">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inquiryType">Inquiry Type</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Support</option>
                      <option value="cancellation">Cancellation/Refund</option>
                      <option value="technical">Technical Issue</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe your inquiry in detail..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  <Send className="button-icon" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </section>

          {/* Contact Information */}
          <section className="contact-info-section">
            <h3>Contact Information</h3>
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-card">
                  <div className="info-icon">
                    <info.icon className="icon" />
                  </div>
                  <div className="info-content">
                    <h4>{info.title}</h4>
                    <p className="info-description">{info.description}</p>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="info-detail">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question">
                  <HelpCircle className="faq-icon" />
                  <h4>{faq.question}</h4>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="reviews-section">
          <h3>What Our Customers Say</h3>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon filled" />
                ))}
              </div>
              <p>"Excellent service! The booking process was smooth and the customer support was very helpful."</p>
              <div className="review-author">
                <strong>Sarah Johnson</strong>
                <span>Mumbai</span>
              </div>
            </div>
            <div className="review-card">
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon filled" />
                ))}
              </div>
              <p>"Great deals and easy to use website. Found the perfect flight for my family vacation."</p>
              <div className="review-author">
                <strong>Rajesh Kumar</strong>
                <span>Delhi</span>
              </div>
            </div>
            <div className="review-card">
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon filled" />
                ))}
              </div>
              <p>"Fast and reliable booking system. The payment process was secure and hassle-free."</p>
              <div className="review-author">
                <strong>Priya Sharma</strong>
                <span>Bangalore</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactPage;
