'use client';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsAndConditionsPage = () => {
  return (
    <section>
      <Navbar />
      <div className="py-20 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">Terms and Conditions</h1>
          <p className="text-gray-700 mb-4">
            Welcome to Web Craft Kit! These terms and conditions outline the rules and regulations for the use of our website, located at <strong>webcraftkit.com</strong>.
          </p>
          <h2 className="text-xl font-bold mb-2">Acceptance of Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing this website, you accept these terms and conditions in full. If you do not agree with these terms and conditions or any part of these terms, you must not use our website.
          </p>
          <h2 className="text-xl font-bold mb-2">License to Use Website</h2>
          <p className="text-gray-700 mb-4">
            Unless otherwise stated, Web Craft Kit and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages from <strong>webcraftkit.com</strong> for your own personal use subject to restrictions set in these terms and conditions.
          </p>
          <h2 className="text-xl font-bold mb-2">User Responsibilities</h2>
          <p className="text-gray-700 mb-4">
            You must not:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Republish material from this website without prior written consent.</li>
            <li>Sell, rent, or sub-license material from the website.</li>
            <li>Reproduce, duplicate, or copy material from this website for commercial purposes.</li>
            <li>Redistribute content from this website, except for content specifically made for redistribution.</li>
          </ul>
          <h2 className="text-xl font-bold mb-2">Limitations of Liability</h2>
          <p className="text-gray-700 mb-4">
            In no event shall Web Craft Kit, nor any of its officers, directors, and employees, be liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort, or otherwise, and Web Craft Kit, including its officers, directors, and employees shall not be liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
          </p>
          <h2 className="text-xl font-bold mb-2">Indemnification</h2>
          <p className="text-gray-700 mb-4">
            You hereby indemnify to the fullest extent Web Craft Kit from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of these terms.
          </p>
          <h2 className="text-xl font-bold mb-2">Changes to Terms</h2>
          <p className="text-gray-700 mb-4">
            We may revise these terms and conditions from time to time. Revised terms and conditions will apply to the use of our website from the date of the publication of the revised terms on our website. Please check this page regularly to ensure you are familiar with the current version.
          </p>
          <h2 className="text-xl font-bold mb-2">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms and Conditions, please contact us at: 
            <a href="mailto:admin@webcraftkit.com" className="text-blue-500 hover:underline"> admin@webcraftkit.com</a>
          </p>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default TermsAndConditionsPage;

