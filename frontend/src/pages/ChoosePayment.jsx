import React, { useState } from 'react';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';

const ChoosePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { totalAmount, days, perDayCharge, workerName, serviceType } = location.state || {};

  const API_BASE_URL = 'http://localhost:5000/api/payment';

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (paymentMethod) => {
    if (paymentMethod === 'cash') {
      navigate('/successful', { 
        state: { 
          paymentMethod: 'Cash on Service',
          amount: totalAmount,
          workerName,
          serviceType,
          days
        }
      });
      return;
    }

    try {
      setLoading(true);
      
      // Load Razorpay script first
      const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      // Create order
      const orderData = {
        amount: Math.round(totalAmount * 100), // Convert to paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`
      };

      console.log('Creating order with data:', orderData);

      const response = await fetch(`${API_BASE_URL}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Order creation response:', result);

      if (!result.success) {
        throw new Error(result.message || 'Could not create order');
      }

      const { order, key_id } = result;

      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'GetWork',
        description: `${serviceType} Service Booking`,
        order_id: order.id,
        prefill: {
          name: workerName || 'Customer Name',
          contact: '',
          email: ''
        },
        handler: async function (response) {
          try {
            console.log('Payment success response:', response);
            
            // Verify payment
            const verifyResponse = await fetch(`${API_BASE_URL}/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderCreationId: order.id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              const errorData = await verifyResponse.json();
              throw new Error(errorData.message || `HTTP error! status: ${verifyResponse.status}`);
            }

            const verifyResult = await verifyResponse.json();
            console.log('Payment verification result:', verifyResult);

            if (verifyResult.success) {
              navigate('/successful', {
                state: {
                  paymentMethod: paymentMethod === 'upi' ? 'UPI' : 'Card',
                  transactionId: response.razorpay_payment_id,
                  amount: totalAmount,
                  workerName,
                  serviceType,
                  days
                }
              });
            } else {
              throw new Error(verifyResult.message || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Verification error:', error);
            alert(`Payment verification failed: ${error.message}`);
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            console.log('Payment modal closed');
          }
        },
        theme: {
          color: '#F59E0B'
        }
      };

      console.log('Initializing Razorpay with options:', { ...options, key: '***' });
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className='bg-gradient-to-b from-amber-500 to-white'>
      <Header />
      <div className='w-full h-screen p-4'>
        {/* Booking Summary Card */}
        <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-6'>
          <h2 className='text-2xl font-bold mb-4'>Booking Summary</h2>
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <span className='font-semibold'>Worker Name:</span>
              <span>{workerName}</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='font-semibold'>Service Type:</span>
              <span>{serviceType}</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='font-semibold'>Duration:</span>
              <span>{days} days</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='font-semibold'>Per Day Charge:</span>
              <span>₹{perDayCharge}</span>
            </div>
            <div className='flex justify-between items-center text-lg font-bold border-t pt-3'>
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6'>
          <h2 className='text-2xl font-bold mb-4'>Choose Payment Method</h2>
          <div className='space-y-4'>
            <button 
              onClick={() => handlePayment('upi')}
              disabled={loading}
              className='w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <div className='flex items-center'>
                <img src="/upi.png" alt="UPI" className='w-8 h-8 mr-3' />
                <span>UPI Payment</span>
              </div>
              <span>→</span>
            </button>
            
            <button 
              onClick={() => handlePayment('card')}
              disabled={loading}
              className='w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <div className='flex items-center'>
                <img src="/credit-card.png" alt="Card" className='w-8 h-8 mr-3' />
                <span>Credit/Debit Card</span>
              </div>
              <span>→</span>
            </button>
            
            <button 
              onClick={() => handlePayment('cash')}
              disabled={loading}
              className='w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <div className='flex items-center'>
                <img src="/cash.png" alt="Cash" className='w-8 h-8 mr-3' />
                <span>Cash on Service</span>
              </div>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoosePayment;