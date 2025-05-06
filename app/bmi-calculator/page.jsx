'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../../components/ui/button';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  const calculateBMI = () => {
    if (!height || !weight || isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      alert('Please enter valid values for height and weight');
      return;
    }

    let heightInMeters;
    let weightInKg;

    // Convert height to meters
    if (heightUnit === 'cm') {
      heightInMeters = height / 100;
    } else if (heightUnit === 'ft') {
      heightInMeters = height * 0.3048;
    } else {
      heightInMeters = height;
    }

    // Convert weight to kg
    if (weightUnit === 'lbs') {
      weightInKg = weight * 0.453592;
    } else {
      weightInKg = weight;
    }

    // Calculate BMI
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmi * 10) / 10;
    setBmiResult(roundedBMI);

    // Determine BMI category
    if (roundedBMI < 18.5) {
      setBmiCategory('Underweight');
    } else if (roundedBMI >= 18.5 && roundedBMI <= 24.9) {
      setBmiCategory('Normal weight');
    } else if (roundedBMI >= 25 && roundedBMI <= 29.9) {
      setBmiCategory('Overweight');
    } else {
      setBmiCategory('Obesity');
    }
  };

  const resetCalculator = () => {
    setHeight('');
    setWeight('');
    setHeightUnit('cm');
    setWeightUnit('kg');
    setBmiResult(null);
    setBmiCategory('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            BMI Calculator Tool
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your height"
              />
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value)}
                className="mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="cm">Centimeters (cm)</option>
                <option value="m">Meters (m)</option>
                <option value="ft">Feet (ft)</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your weight"
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
                className="mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="lbs">Pounds (lbs)</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mb-8">
            <Button 
              onClick={calculateBMI}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
            >
              Calculate BMI
            </Button>
            <Button 
              onClick={resetCalculator}
              variant="outline"
              className="w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Reset
            </Button>
          </div>

          {bmiResult !== null && (
            <div className="mt-8 p-6 border rounded-lg bg-blue-50 border-blue-200">
              <h2 className="text-xl font-semibold mb-4 text-center">Your BMI Result</h2>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2 text-blue-600">{bmiResult}</div>
                <div className="text-lg font-medium mb-4 text-gray-700">{bmiCategory}</div>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                  <div 
                    className={`h-4 rounded-full ${
                      bmiCategory === 'Underweight' ? 'bg-yellow-400 w-1/4' : 
                      bmiCategory === 'Normal weight' ? 'bg-green-500 w-2/4' : 
                      bmiCategory === 'Overweight' ? 'bg-orange-500 w-3/4' : 
                      'bg-red-500 w-full'
                    }`}
                  ></div>
                </div>
                <div className="w-full flex justify-between text-xs text-gray-600 mt-1">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obesity</span>
                </div>
              </div>
              <div className="mt-6 text-gray-600 text-sm">
                <p className="mb-2"><strong>BMI Categories:</strong></p>
                <ul className="list-disc list-inside">
                  <li>Underweight: BMI less than 18.5</li>
                  <li>Normal weight: BMI 18.5 to 24.9</li>
                  <li>Overweight: BMI 25 to 29.9</li>
                  <li>Obesity: BMI 30 or greater</li>
                </ul>
                <p className="mt-4 text-sm italic">Note: BMI is a screening tool but is not diagnostic of body fatness or health.</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BMICalculator;
