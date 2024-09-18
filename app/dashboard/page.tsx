'use client';
import { useEffect, useState } from 'react';
import NewsletterSelector from '@/components/NewsletterSelector';
import AuthHandler from '@/components/AuthHandler';
import WeeklyPodcast from '@/components/WeeklyPodcast';
import { getFilenamesMap } from '@/utils/fileUtils';

export default function MainPage() {
  const [newsletters, setNewsletters] = useState<string[]>([]);
  const [filenamesMap, setFilenamesMap] = useState<Record<string, string[]>>({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
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
    <div id="main" className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
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
      <WeeklyPodcast filenamesMap={filenamesMap} newsletters={newsletters}/>
    </div>
  );
}
