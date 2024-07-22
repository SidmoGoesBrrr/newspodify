import { useState } from "react";
import EmailForm from "./EmailForm";
import { Meteors } from "./ui/meteors";
import SectionHeader from "./ui/section-headers";

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
        
        <div className="flex flex-col relative px-4 py-8 h-full overflow-hidden justify-end items-center">     
            <SectionHeader text="Be The First To Know" />
            <p className="text-center lg:text-4xl md:text-3xl sm:text-xl font-bold mb-2">
                Join now to get notified when Newspodify is out.
            </p>
            <p className="text-center lg:text-xl md:text-base sm:text-sm mb-1">
                We are still working on finishing the product and if you sign up on the waitlist, you&apos;ll be the first to get notified.
            </p>
            <EmailForm onSubmit={handleSubmit} error={error} responseMessage={responseMessage} />
            <Meteors number={60}/>
        </div>
        
    );
};

export default Waitlist;

interface ResponseMessageProps {
    message: string;
}

