// components/WeeklyPodcast.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { ScaleLoader } from 'react-spinners';
import { newsletters as allNewsletters } from '@/data/constants';

const BASE_URL = '/api/proxy-audio?filename=';

export const WeeklyPodcast: React.FC<{ filenamesMap: Record<string, string[]>; newsletters: string[]; }> = ({ filenamesMap, newsletters }) => {
  const [isCombining, setIsCombining] = useState(false);
  const router = useRouter(); // Initialize useRouter

  // Function to get current date in the format YYYYMMDD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  // Create the clipId based on date and newsletter codes
  const getClipId = (selectedNewsletterNames: string[]): string => {
    const date = getCurrentDate();
    const newsletterCodes = allNewsletters
      .filter(newsletter => selectedNewsletterNames.includes(newsletter.name))
      .map(newsletter => newsletter.code)
      .join('');

    return `${date}${newsletterCodes}`;
  };

  const handleCombineAudio = async () => {
    setIsCombining(true);
    const filenames = Object.values(filenamesMap).flat();
    const clipId = getClipId(newsletters);

    try {
      const response = await fetch('/api/combine-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Clip-ID': clipId,
        },
        body: JSON.stringify({ filenames, clip_id: clipId }),
      });

      const data = await response.json();
      if (data.url) {
        const combinedAudioUrl = `${BASE_URL}${data.url}`;
        // Redirect to podcast player page with the combined audio URL
        router.push(`/podcast_player?audioUrl=${encodeURIComponent(combinedAudioUrl)}`);
      } else {
        console.error('Failed to combine audio:', data.error);
      }
    } catch (error) {
      console.error('Error fetching combined audio:', error);
    } finally {
      setIsCombining(false);
    }
  };

  return (
    <section className="mt-10 flex flex-col mb-12">
      <h1 className="text-white text-3xl font-bold mb-4">Weekly Combined Podcast</h1>

      {/* Message for no selected newsletters */}
      {Object.keys(filenamesMap).length === 0 && (
        <p className="text-white mt-4">No newsletters selected or filenames not available.</p>
      )}

      {/* Combine Audio Button */}
      <button
        onClick={handleCombineAudio}
        className={`update-button mb-4 ${isCombining ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'}`}
        disabled={isCombining}
      >
        {isCombining ? 'Combining...' : 'Combine Audio'}
      </button>

      {/* Loading and combining audio */}
      {isCombining && (
        <div className="flex flex-col">
          <p className="text-white-40 text-lg font-medium">Combining audio...</p>
          <ScaleLoader color="#36d7b7" height={80} width={15} radius={2} margin={2} />
          <p className="mt-5 text-lg text-white-40 font-medium">This might take a minute...</p>
        </div>
      )}
    </section>
  );
};

export default WeeklyPodcast;
