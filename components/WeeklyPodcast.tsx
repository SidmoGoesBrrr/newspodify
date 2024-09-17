'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { useUser } from '@clerk/nextjs';
import React from 'react';
import { ScaleLoader } from 'react-spinners';

interface WeeklyPodcastProps {
  filenamesMap: Record<string, string[]>;
  triggerCombineAudio: boolean; // New prop to control when to combine
}

const BASE_URL = '/api/proxy-audio?filename=';

const WeeklyPodcast: React.FC<WeeklyPodcastProps> = ({ filenamesMap, triggerCombineAudio }) => {
  const [combinedAudioUrl, setCombinedAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!triggerCombineAudio) return; // Only run if the trigger is active

    const filenames = Object.values(filenamesMap).flat();

    fetch('/api/combine-audio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-ID': userId ?? '' },
      body: JSON.stringify({ filenames, user_id: userId ?? '' }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          setCombinedAudioUrl(`${BASE_URL}${data.url}`);
        } else {
          console.error('Failed to combine audio:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error fetching combined audio:', error);
      });
  }, [filenamesMap, triggerCombineAudio, userId]);

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

  // Calculate date range for the title
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
          >
            <div
              className="progress bg-teal-500 h-full rounded-full"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            ></div>
          </Progress>
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
      ) : (
        <div className="flex flex-col">
          <p className='text-white-40 text-lg font-medium'>Combining audio...</p>
      <ScaleLoader color="#36d7b7" height={80} width={15} radius={2} margin={2} />
      <p className="mt-5 text-lg text-white-40 font-medium">This might take a minute...</p>
    </div>
      )}
    </section>
  );
};

export default WeeklyPodcast;
