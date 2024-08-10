'use client'
import { FC, useState, useEffect } from 'react';
import { AVAILABLE_NEWSLETTERS } from '@/data/constants'; // Adjust the path as necessary

interface NewsletterSelectorProps {
  selectedNewsletters: string[];
  onUpdateNewsletter: (newsletter: string, action: 'add' | 'remove') => void;
}

const NewsletterSelector: FC<NewsletterSelectorProps> = ({
  selectedNewsletters,
  onUpdateNewsletter
}) => {
  const [availableNewsletters, setAvailableNewsletters] = useState<string[]>([]);

  useEffect(() => {
    setAvailableNewsletters(AVAILABLE_NEWSLETTERS);
  }, []);

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-white text-3xl font-bold mb-4">Your Newsletters</h1>
      <div className="p-4 bg-black-2 rounded-lg">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {availableNewsletters.map((newsletter) => (
            <li key={newsletter} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedNewsletters.includes(newsletter)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onUpdateNewsletter(newsletter, 'add');
                  } else {
                    onUpdateNewsletter(newsletter, 'remove');
                  }
                }}
                className="form-checkbox text-orange-1"
              />
              <label className="text-white text-lg">{newsletter}</label>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NewsletterSelector;
