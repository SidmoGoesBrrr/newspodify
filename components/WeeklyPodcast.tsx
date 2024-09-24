'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import React from 'react';
import { ScaleLoader } from 'react-spinners';
import {newsletters as allNewsletters} from '@/data/constants'

interface WeeklyPodcastProps {
  filenamesMap: Record<string, string[]>;
  newsletters: string[];
}

const BASE_URL = '/api/proxy-audio?filename=';

const WeeklyPodcast: React.FC<WeeklyPodcastProps> = ({ filenamesMap, newsletters }) => {
  const [combinedAudioUrl, setCombinedAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isCombining, setIsCombining] = useState(false); // New state for combining trigger
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    
    // Filter the newsletter codes based on the names in selectedNewsletterNames
    const newsletterCodes = allNewsletters
        .filter(newsletter => selectedNewsletterNames.includes(newsletter.name))
        .map(newsletter => newsletter.code)
        .join('');
    
    return `${date}${newsletterCodes}`;
  };

  const handleCombineAudio = async () => {
    setIsCombining(true); // Show combining status
    const filenames = Object.values(filenamesMap).flat();
    const clipId = getClipId(newsletters); // Generate clipId

    try {
      const response = await fetch('/api/combine-audio', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Clip-ID': clipId, // Pass clipId in the headers
        },
        body: JSON.stringify({ filenames, clip_id: clipId }),
      });

      const data = await response.json();
      if (data.url) {
        setCombinedAudioUrl(`${BASE_URL}${data.url}`);
      } else {
        console.error('Failed to combine audio:', data.error);
      }
    } catch (error) {
      console.error('Error fetching combined audio:', error);
    } finally {
      setIsCombining(false);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const updateCurrentTime = () => {
        setCurrentTime(audioElement.currentTime);
      };
      audioElement.addEventListener('timeupdate', updateCurrentTime);
      return () => {
        audioElement.removeEventListener('timeupdate', updateCurrentTime);
      };
    }
  }, [combinedAudioUrl]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const onLoadedMetadata = () => {
        setDuration(audioElement.duration);
      };
      audioElement.addEventListener('loadedmetadata', onLoadedMetadata);
      return () => {
        audioElement.removeEventListener('loadedmetadata', onLoadedMetadata);
      };
    }
  }, [combinedAudioUrl]);

  const handlePlayPause = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play().catch((err) => console.error('Error playing audio:', err));
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const forward = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.currentTime += 5;
    }
  };

  const rewind = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.currentTime -= 5;
    }
  };

  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const title = `${formatDate(lastWeek)} - ${formatDate(today)}`;

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-white text-3xl font-bold mb-4">Weekly Combined Podcast</h1>
      <button
        onClick={handleCombineAudio}
        className={`update-button mb-4 ${isCombining ? 'loading' : ''}`}
      >
        {isCombining ? 'Combining...' : 'Combine Audio'}
      </button>
      {combinedAudioUrl ? (
        <div className="podcast-card bg-gray-800 rounded-lg p-4 shadow-md">
          <h2 className="podcast-title text-xl font-bold text-white">{title}</h2>
          <audio
            ref={audioRef}
            src={combinedAudioUrl}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
          <Progress
            value={duration ? (currentTime / duration) * 100 : 0}
            className="progress-bar bg-gray-700 rounded-full h-1 w-full mt-2"
            max={100}
          />
          <div className="audio-controls flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={rewind}
                className="icon-button p-2 rounded-full hover:bg-gray-700"
              >
                <Image
                  src="/icons/reverse.svg"
                  alt="Rewind"
                  width={24}
                  height={24}
                />
              </button>
              <button
                onClick={handlePlayPause}
                className={`icon-button p-2 rounded-full hover:bg-gray-700 ${isPlaying ? 'font-bold' : ''}`}
              >
                <Image
                  src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"}
                  alt={isPlaying ? "Pause" : "Play"}
                  width={24}
                  height={24}
                />
              </button>
              <button
                onClick={forward}
                className="icon-button p-2 rounded-full hover:bg-gray-700"
              >
                <Image
                  src="/icons/forward.svg"
                  alt="Forward"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <button
              onClick={toggleMute}
              className="icon-button p-2 rounded-full hover:bg-gray-700"
            >
              <Image
                src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
                alt={isMuted ? "Unmute" : "Mute"}
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      ) : isCombining ? (
        <div className="flex flex-col">
          <p className="text-white-40 text-lg font-medium">Combining audio...</p>
          <ScaleLoader color="#36d7b7" height={80} width={15} radius={2} margin={2} />
          <p className="mt-5 text-lg text-white-40 font-medium">This might take a minute...</p>
        </div>
      ) : null}
    </section>
  );
};

export default WeeklyPodcast;
