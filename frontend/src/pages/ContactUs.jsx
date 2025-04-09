import React from 'react'
import Header from '../components/Header'

const ContactUs = () => {
  return (
    <div className="bg-gradient-to-b from-amber-500 to-white min-h-screen p-2">
      <Header />

      <div className="flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-4xl font-bold text-black mb-2">Contact Us</h1>
        <p className="text-gray-700 mb-8 text-center max-w-xl">
          Have questions, suggestions, or need help? We're here to help you anytime. Fill the form below and our team will reach out to you.
        </p>

        <form className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Send Message
          </button>
        </form>

        <p className="text-gray-600 mt-8 text-center">
          Or reach us directly at: <span className="font-semibold text-black">support@getwork.com</span>
        </p>
      </div>
    </div>
  )
}

export default ContactUs
