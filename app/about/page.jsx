import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AboutPage = () => {
  return (
    <section>
        <Navbar/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg ">
        <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
        <p className="text-gray-700 mb-4">
          Welcome to Web Craft Kit, your go-to destination for the latest online tools designed to simplify your digital experience. Our mission is to provide high-quality, user-friendly tools that empower individuals and businesses to create, manage, and enhance their online presence without the need for subscriptions or complicated setups.
        </p>
        <p className="text-gray-700 mb-4">
          At Web Craft Kit, we believe that everyone should have access to powerful tools that can help them succeed in the digital world. Whether you're a developer, designer, or just someone looking to improve your online projects, our suite of tools is here to help you achieve your goals.
        </p>
        <p className="text-gray-700 mb-4">
          Our team is passionate about technology and innovation, constantly working to bring you the best tools available. We value your feedback and are committed to continuously improving our offerings to meet your needs.
        </p>
        <p className="text-gray-700 mb-4">
          Thank you for choosing Web Craft Kit. We look forward to helping you craft your web experience!
        </p>
        <p className="text-gray-700 mb-4">
          If you have any questions or suggestions, feel free to <a href="/contact" className="text-blue-500 hover:underline">contact us</a>.
        </p>
      </div>
    </div>
    <Footer/>
    </section>
  )
}

export default AboutPage
