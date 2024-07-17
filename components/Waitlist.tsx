import { useState } from "react";

import EmailForm from "./EmailForm";
import ResponseMessage from "./ResponseMessage";

const Waitlist: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [responseMessage, setResponseMessage] = useState<string>("");

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (email: string) => {
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
        <div className="flex flex-col items-center" id="waitlist">
            <EmailForm onSubmit={handleSubmit} error={error} />
            <ResponseMessage message={responseMessage} />
        </div>
    );
};

export default Waitlist;
