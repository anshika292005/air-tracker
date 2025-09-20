// Razorpay Configuration
export const RAZORPAY_CONFIG = {
  // Test Key - Use this for testing (this is a demo key)
  key: 'rzp_test_1DP5mmOlF5G5ag',
  
  // Production key (uncomment when ready for production)
  // key: 'rzp_live_YOUR_LIVE_KEY_HERE',
  
  // Company details
  name: 'FlightTracker',
  description: 'Flight Booking Platform',
  image: 'https://via.placeholder.com/150',
  
  // Theme configuration
  theme: {
    color: '#667eea'
  },
  
  // Currency
  currency: 'INR',
  
  // Retry configuration
  retry: {
    enabled: true,
    max_count: 3
  }
};

// Test payment data for development
export const TEST_PAYMENT_DATA = {
  // Test card details for Razorpay test mode
  testCards: {
    success: {
      number: '4111 1111 1111 1111',
      cvv: '123',
      expiry: '12/25',
      name: 'Test User'
    },
    failure: {
      number: '4000 0000 0000 0002',
      cvv: '123',
      expiry: '12/25',
      name: 'Test User'
    }
  },
  
  // Test UPI IDs
  testUpiIds: [
    'success@razorpay',
    'failure@razorpay'
  ]
};

// Helper function to generate order ID
export const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `order_${timestamp}_${random}`;
};

// Helper function to format amount for Razorpay (convert to paise)
export const formatAmount = (amount) => {
  return Math.round(amount * 100);
};

// Helper function to validate Razorpay response
export const validatePaymentResponse = (response) => {
  // In a real application, you would verify the signature here
  // For now, we'll just check if the response has required fields
  return response && response.razorpay_payment_id && response.razorpay_order_id;
};
