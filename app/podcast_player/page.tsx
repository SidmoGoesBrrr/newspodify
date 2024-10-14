// app/podcast_player/page.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { ScaleLoader } from 'react-spinners';

const PodcastDisplay: React.FC<{ audioUrl: string }> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
  }, [audioUrl]);

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
  }, [audioUrl]);

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
    if (audioElement && duration !== null) {
      audioElement.currentTime = Math.min(audioElement.currentTime + 5, duration);
    }
  };

  const rewind = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.currentTime = Math.max(audioElement.currentTime - 5, 0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="podcast-card bg-gray-800 rounded-lg p-4 shadow-md">
      <audio
        ref={audioRef}
        src={audioUrl}
        className="hidden"
        onEnded={() => setIsPlaying(false)}
      />
      <Progress
        value={duration ? (currentTime / duration) * 100 : 0}
        className="progress-bar bg-gray-700 rounded-full h-1 w-full mt-2"
        max={100}
      />
      <div className="audio-controls flex items-center justify-between mt-2">
        <span className="text-white">{formatTime(currentTime)} / {formatTime(duration || 0)}</span>
        <div className="flex items-center gap-2">
          <button onClick={rewind} className="icon-button p-2 rounded-full hover:bg-gray-700">
            <Image src="/icons/reverse.svg" alt="Rewind" width={24} height={24} />
          </button>
          <button onClick={handlePlayPause} className={`icon-button p-2 rounded-full hover:bg-gray-700 ${isPlaying ? 'font-bold' : ''}`}>
            <Image src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"} alt={isPlaying ? "Pause" : "Play"} width={24} height={24} />
          </button>
          <button onClick={forward} className="icon-button p-2 rounded-full hover:bg-gray-700">
            <Image src="/icons/forward.svg" alt="Forward" width={24} height={24} />
          </button>
        </div>
        <button onClick={toggleMute} className="icon-button p-2 rounded-full hover:bg-gray-700">
          <Image src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"} alt={isMuted ? "Unmute" : "Mute"} width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

const PodcastPlayerPage: React.FC = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const url = query.get('audioUrl');
    if (url) {
      setAudioUrl(decodeURIComponent(url));
    }
  }, []);

  return (
    <div className="p-6">
      {audioUrl ? (
        <PodcastDisplay audioUrl={audioUrl} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <ScaleLoader color="#36d7b7" height={80} width={15} radius={2} margin={2} />
          <p className="mt-5 text-lg text-white-40 font-medium">No audio available. Please go back.</p>
        </div>
      )}
    </div>
  );
};

export default PodcastPlayerPage;
