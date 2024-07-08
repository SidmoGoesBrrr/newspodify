'use client';

import { useState, useEffect, FormEvent } from 'react';
import { sendFeedback } from '@/app/actions';
import { name_placeholders, feature_placeholders, newsletter_placeholders, price_placeholders } from '@/data/constants';

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    features: '',
    newsletters: '',
    price: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formElement = e.currentTarget as HTMLFormElement;
    const formDataObj = new FormData(formElement);

    try {
      await sendFeedback(formDataObj);
      setSuccess('Feedback submitted successfully!');
      setFormData({ name: '', features: '', newsletters: '', price: '' });
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setSuccess(null);
    }
  };

  const cyclePlaceholders = (element: HTMLInputElement | HTMLTextAreaElement, placeholders: string[]) => {
    let index = 0;
    setInterval(() => {
      element.placeholder = placeholders[index];
      index = (index + 1) % placeholders.length;
    }, 1500); // Change placeholder every 3 seconds
  };

  useEffect(() => {
    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    const featuresTextarea = document.querySelector('textarea[name="features"]') as HTMLTextAreaElement;
    const newslettersTextarea = document.querySelector('textarea[name="newsletters"]') as HTMLTextAreaElement;
    const priceInput = document.querySelector('input[name="price"]') as HTMLInputElement;
    if (nameInput) cyclePlaceholders(nameInput, name_placeholders);
    if (featuresTextarea) cyclePlaceholders(featuresTextarea, feature_placeholders);
    if (newslettersTextarea) cyclePlaceholders(newslettersTextarea, newsletter_placeholders);
    if (priceInput) cyclePlaceholders(priceInput, price_placeholders);
  }, []);

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">We&apos;d love your feedback!</h2>
      {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">What features of Newspodify are you most excited about?</label>
          <textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Which newsletters would you like us to add?</label>
          <textarea
            name="newsletters"
            value={formData.newsletters}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">How much would you be willing to pay to use this product?</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
