import { useState } from "react";

interface EmailFormProps {
    onSubmit: (email: string) => void;
    error: string;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit, error }) => {
    const [email, setEmail] = useState<string>("");

    const handleSubmit = () => {
        onSubmit(email);
    };

    return (
        <div className="flex flex-col items-center">
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
        </div>
    );
};

export default EmailForm;
