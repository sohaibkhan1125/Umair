'use client'
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <section>
      <Navbar />
      <div className="py-20 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg  w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
          <p className="text-gray-700 mb-4">
            If you have any questions, suggestions, or feedback, feel free to reach out to us. We value your input and are here to help!
          </p>
          <p className="text-gray-700 mb-4">
            You can contact us via email at: 
            <a href="mailto:admin@webcraftkit.com" className="text-blue-500 hover:underline"> admin@webcraftkit.com</a>
          </p>
          <p className="text-gray-700">
            We look forward to hearing from you!
          </p>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ContactPage;
