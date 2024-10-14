'use client';
import { useEffect, useState } from 'react';
import NewsletterSelector from '@/components/NewsletterSelector';
import AuthHandler from '@/components/AuthHandler';
import Link from 'next/link'; // Import Link from Next.js
import { getFilenamesMap } from '@/utils/fileUtils';

export default function MainPage() {
  const [newsletters, setNewsletters] = useState<string[]>([]);
  const [localNewsletters, setLocalNewsletters] = useState<string[]>([]);
  const [filenamesMap, setFilenamesMap] = useState<Record<string, string[]>>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/get-newsletters');
        if (!res.ok) {
          throw new Error('Error fetching newsletters');
        }
        const data = await res.json();
        setNewsletters(data.newsletters || []);
        setLocalNewsletters(data.newsletters || []); // Initialize local state with fetched newsletters
      } catch (err) {
        console.error('Error fetching newsletters:', err);
      }
    };

    fetchData();
  }, []);

  const handleUpdateNewsletters = async () => {
    setIsUpdating(true);
    setUpdateSuccess(false);

    try {
      const res = await fetch('/api/update-newsletters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newsletters: localNewsletters,
        }),
      });

      if (!res.ok) {
        console.error('Error updating newsletters');
        return;
      }

      const data = await res.json();
      setNewsletters(data.newsletters || []);

      // Generate filenames map after successful update
      const map = await getFilenamesMap(data.newsletters || []);
      console.log('Filenames Map:', map);
      setFilenamesMap(map);

      setUpdateSuccess(true); 
    } catch (error) {
      console.error('Error updating newsletters:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleNewsletterSelection = (newsletter: string, action: "add" | "remove") => {
    console.log("Toggle:", newsletter, action); // Log the newsletter and action
    setLocalNewsletters((prev) => {
      if (action === "remove") {
        return prev.filter((n) => n !== newsletter); 
      } else {
        return [...prev, newsletter]; 
      }
    });
  };

  return (
    <div id="main" className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
      <AuthHandler onUserLoaded={(data) => setLocalNewsletters(data.newsletters || [])} />
      <button
        onClick={handleUpdateNewsletters}
        className={`update-button ${isUpdating ? 'loading' : ''}`}
      >
        {isUpdating ? 'Updating...' : 'Update Newsletters'}
      </button>
      {updateSuccess && (
        <div className="confirmation-message text-green-600">
          Newsletters updated successfully!<br />
          <Link href="/podcast_player" className="mt-4 inline-block text-blue-500 underline">
            Go to Weekly Podcast
          </Link>
        </div>
      )}
      {/* Link to the Weekly Podcast page */}
      <NewsletterSelector
        selectedNewsletters={localNewsletters} 
        onUpdateNewsletter={toggleNewsletterSelection} 
      />
    </div>
  );
}
