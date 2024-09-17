'use client';
import { useEffect, useState } from 'react';
import NewsletterSelector from '@/components/NewsletterSelector';
import AuthHandler from '@/components/AuthHandler';
import PodcastSnippets from '@/components/PodcastSnippets';
import { getFilenamesMap } from '@/utils/fileUtils'; // Import your utility function

export default function MainPage() {
  const [newsletters, setNewsletters] = useState<string[]>([]);
  const [filenamesMap, setFilenamesMap] = useState<Record<string, string[]>>({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Fetch the initial newsletters using the new API endpoint
    const fetchNewsletters = async () => {
      const res = await fetch('/api/get-newsletters');
      if (!res.ok) {
        console.error('Error fetching newsletters');
        return;
      }
      const data = await res.json();
      setNewsletters(data.newsletters || []);
    };

    fetchNewsletters();
  }, []);

  const handleUpdateNewsletters = async () => {
    setIsUpdating(true);
    try {
      const map = await getFilenamesMap(newsletters);
      setFilenamesMap(map);
    } catch (error) {
      console.error('Error fetching filenames map:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  async function updateNewsletter(newsletter: string, action: 'add' | 'remove') {
    const res = await fetch('/api/update-newsletters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newsletter,
        action,
      }),
    });
  
    if (!res.ok) {
      console.error('Error updating newsletters');
      return;
    }
  
    const data = await res.json();
    setNewsletters(data.newsletters || []);
  }
  
  return (
    <div id="dashboard">
      <AuthHandler onUserLoaded={(data) => setNewsletters(data.newsletters || [])} />
      <NewsletterSelector
        selectedNewsletters={newsletters}
        onUpdateNewsletter={updateNewsletter}
      />
      <button
        onClick={handleUpdateNewsletters}
        className={`update-button ${isUpdating ? 'loading' : ''}`}
      >
        {isUpdating ? 'Updating...' : 'Update Newsletters'}
      </button>
      <PodcastSnippets filenamesMap={filenamesMap} />
    </div>
  );
}
