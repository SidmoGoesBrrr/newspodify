"use client";
import { useState } from "react";
import React from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "./ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCheckCircle, FaBell, FaLightbulb } from "react-icons/fa";
import { Button } from "./ui/moving-border";

interface EmailFormProps {
    onSubmit: (email: string) => void;
    error: string;
    responseMessage: string;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit, error, responseMessage }) => {
    const [email, setEmail] = useState<string>("");

    const handleSubmit = () => {
        onSubmit(email);
    };

    const images = [
        "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    return (
        <div className="flex flex-col items-center">
            <div className="py-12 flex items-center justify-center">
                <Modal>
                    <ModalTrigger className="bg-emerald-800 text-white flex justify-center group/modal-btn px-4 py-2 rounded font-bold hover:bg-emerald-600 hover:scale-110 transition duration-300 ease-in-out">
                        Join Newspodify Now
                    </ModalTrigger>
                    <ModalBody>
                        <ModalContent>
                            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                                Be the first to know when{" "}
                                <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                                    Newspodify
                                </span>{" "}
                                is out! 🎧
                            </h4>
                            <div className="flex justify-center items-center mb-3">
                                {images.map((image, idx) => (
                                    <motion.div
                                        key={"images" + idx}
                                        style={{
                                            rotate: 0.7 * 20 - 10,
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 0,
                                            zIndex: 100,
                                        }}
                                        
                                        className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                                    >
                                        <Image
                                            src={image}
                                            alt="newspodify images"
                                            width="500"
                                            height="500"
                                            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex flex-col items-center">
                                <input
                                    className="p-2 mb-5 bg-transparent text-lg border-4 border-emerald-800 focus:outline-none focus:border-emerald-600 transition duration-300 ease-in-out text-white placeholder:text-white rounded"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {error && <p className="text-red-500 mb-5">{error}</p>}
                                {responseMessage && <p className="text-white mb-5">{responseMessage}</p>}
                                <Button
                                    className="bg-emerald-800 text-white font-bold py-2 px-4 rounded hover:bg-emerald-600 transition duration-300 ease-in-out"
                                    onClick={handleSubmit}
                                >
                                    Subscribe
                                </Button>

                                
                            </div>
                            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                                <div className="flex items-center justify-center">
                                    <FaBell className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                        Get exclusive updates
                                    </span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <FaLightbulb className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                        First preference to recommend features
                                    </span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <FaCheckCircle className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                        Preference to the podcasts you give
                                    </span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <FaBell className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                        Notified first when Newspodify is released
                                    </span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <FaCheckCircle className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                        Automatically upgraded to the premium plan at 500 users
                                    </span>
                                </div>
                            </div>
                        </ModalContent>
                        
                    </ModalBody>
                </Modal>
            </div>
        </div>
    );
};

export default EmailForm;
