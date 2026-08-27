import React from 'react';
import Navbar from './components/Navbar'; // Adjust path as needed

export default function App() {
  return (
    <div className="min-h-screen bg-[#FCF8F5]">
      {/* Navbar placed at the top */}
      <Navbar />

      {/* Rest of your page content goes here */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-slate-800">Welcome to HomeService</h1>
      </main>
    </div>
  );
}
