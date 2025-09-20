import React, { useState } from 'react';
import { CreditCard, Info, Copy, Check } from 'lucide-react';

function PaymentInstructions({ isOpen, onClose }) {
  const [copied, setCopied] = useState('');

  const testCards = [
    {
      type: 'Success',
      number: '4111 1111 1111 1111',
      cvv: '123',
      expiry: '12/25',
      name: 'Test User',
      color: 'green'
    },
    {
      type: 'Failure',
      number: '4000 0000 0000 0002',
      cvv: '123',
      expiry: '12/25',
      name: 'Test User',
      color: 'red'
    }
  ];

  const testUpiIds = [
    'success@razorpay',
    'failure@razorpay'
  ];

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="payment-instructions-overlay">
      <div className="payment-instructions-modal">
        <div className="modal-header">
          <h3>Payment Test Instructions</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="modal-content">
          <div className="info-section">
            <Info className="info-icon" />
            <p>This is a demo payment system. Use the test details below to simulate payments.</p>
          </div>

          <div className="test-cards">
            <h4>Test Card Details</h4>
            {testCards.map((card, index) => (
              <div key={index} className={`test-card ${card.color}`}>
                <div className="card-header">
                  <h5>{card.type} Payment</h5>
                  <CreditCard className="card-icon" />
                </div>
                <div className="card-details">
                  <div className="detail-row">
                    <span>Card Number:</span>
                    <div className="detail-value">
                      <code>{card.number}</code>
                      <button 
                        onClick={() => copyToClipboard(card.number, `card-${index}`)}
                        className="copy-btn"
                      >
                        {copied === `card-${index}` ? <Check className="copy-icon" /> : <Copy className="copy-icon" />}
                      </button>
                    </div>
                  </div>
                  <div className="detail-row">
                    <span>CVV:</span>
                    <div className="detail-value">
                      <code>{card.cvv}</code>
                      <button 
                        onClick={() => copyToClipboard(card.cvv, `cvv-${index}`)}
                        className="copy-btn"
                      >
                        {copied === `cvv-${index}` ? <Check className="copy-icon" /> : <Copy className="copy-icon" />}
                      </button>
                    </div>
                  </div>
                  <div className="detail-row">
                    <span>Expiry:</span>
                    <div className="detail-value">
                      <code>{card.expiry}</code>
                      <button 
                        onClick={() => copyToClipboard(card.expiry, `expiry-${index}`)}
                        className="copy-btn"
                      >
                        {copied === `expiry-${index}` ? <Check className="copy-icon" /> : <Copy className="copy-icon" />}
                      </button>
                    </div>
                  </div>
                  <div className="detail-row">
                    <span>Name:</span>
                    <div className="detail-value">
                      <code>{card.name}</code>
                      <button 
                        onClick={() => copyToClipboard(card.name, `name-${index}`)}
                        className="copy-btn"
                      >
                        {copied === `name-${index}` ? <Check className="copy-icon" /> : <Copy className="copy-icon" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="test-upi">
            <h4>Test UPI IDs</h4>
            <div className="upi-list">
              {testUpiIds.map((upiId, index) => (
                <div key={index} className="upi-item">
                  <code>{upiId}</code>
                  <button 
                    onClick={() => copyToClipboard(upiId, `upi-${index}`)}
                    className="copy-btn"
                  >
                    {copied === `upi-${index}` ? <Check className="copy-icon" /> : <Copy className="copy-icon" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="instructions">
            <h4>How to Test:</h4>
            <ol>
              <li>Click "Pay Now" to open the Razorpay payment modal</li>
              <li>Choose "Card" payment method</li>
              <li>Use the test card details above</li>
              <li>For UPI, use the test UPI IDs provided</li>
              <li>Complete the payment to see success confirmation</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentInstructions;
