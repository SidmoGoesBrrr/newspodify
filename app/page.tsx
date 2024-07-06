"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
      const response = await fetch('/api/addemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': apiKey
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        alert('Subscription successful!');
      } else {
        alert('Subscription failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while subscribing.');
    }
  };

  return (
    <main className="bg-blue-400 h-screen">
      <div>

      </div>
     
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 align-center items-center justify-center flex flex-col">
      <h1 className="text-3xl font-bold text-emerald-800 mb-5">Home</h1>
        <input 
        className="p-2 mb-5 bg-transparent text-lg border-2 border-emerald-800 focus:outline-none focus:border-emerald-600 transition duration-300 ease-in-out text-white placeholder:text-white"
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
        className="bg-emerald-800 text-white font-bold py-2 px-4 rounded hover:bg-emerald-600 transition duration-300 ease-in-out"
         onClick={handleSubmit}>Subscribe</button>
         
      </div>
    </main>
  );
}
