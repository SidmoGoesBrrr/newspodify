'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

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

  useEffect(() => {
    if (!triggerCombineAudio) return; // Only run if the trigger is active

    const filenames = Object.values(filenamesMap).flat();

    fetch('/api/combine-audio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filenames }),
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
  }, [filenamesMap, triggerCombineAudio]);

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
      setDuration(audioElement.duration);
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

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-white text-3xl font-bold mb-4">Weekly Combined Podcast</h1>
      {combinedAudioUrl ? (
        <div className="podcast-card bg-gray-800 rounded-lg p-4 shadow-md">
          <audio
            ref={audioRef}
            src={combinedAudioUrl}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
          <Progress
            value={(currentTime / (duration || 1)) * 100}
            className="progress-bar bg-gray-700 rounded-full h-1 w-full mt-2"
            max={duration || 1}
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
        <p>Loading combined audio...</p>
      )}
    </section>
  );
};

export default WeeklyPodcast;
