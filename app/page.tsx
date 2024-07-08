"use client";

import { useState } from "react";

export default function Home() {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [responseMessage, setResponseMessage] = useState<string>("");

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async () => {
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");
        setResponseMessage("");

        try {
            const response = await fetch('/api/addemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.message === 'Email already exists') {
                setResponseMessage(`Subscription failed: ${data.message}`);
            } else if (response.ok) {
                setResponseMessage('Subscription successful!');
            } else {
                setResponseMessage('Subscription failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('An error occurred while subscribing.');
        }
    };

    return (
        <main>
            <div></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 align-center items-center justify-center flex flex-col">
                <h1 className="text-3xl font-bold text-emerald-800 mb-5">Home</h1>
                <input 
                    className="p-2 mb-5 bg-transparent text-lg border-2 border-emerald-800 focus:outline-none focus:border-emerald-600 transition duration-300 ease-in-out text-white placeholder:text-white"
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className="text-red-500 mb-5">{error}</p>}
                <button
                    className="bg-emerald-800 text-blue-900 font-bold py-2 px-4 rounded hover:bg-emerald-600 transition duration-300 ease-in-out"
                    onClick={handleSubmit}
                >
                    Subscribe
                </button>
                {responseMessage && <p className="text-white mt-5">{responseMessage}</p>}
            </div>
        </main>
    );
}
