// components/WeeklyPodcast.tsx
'use client';
import { useEffect, useState } from 'react';
import { combineAudioClips } from '@/utils/fileUtils';

interface WeeklyPodcastProps {
  filenamesMap: Record<string, string[]>;
}

const WeeklyPodcast: React.FC<WeeklyPodcastProps> = ({ filenamesMap }) => {
  const [combinedAudioFile, setCombinedAudioFile] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchAndCombine = async () => {
      const allFilenames = Object.values(filenamesMap).flat();
      if (allFilenames.length > 0) {
        try {
          // Combine audio clips and get the URL of the combined audio
          const combinedAudioBlob = await combineAudioClips(allFilenames, 'http://65.20.81.185:3000');
          const combinedAudioURL = URL.createObjectURL(combinedAudioBlob);
          setCombinedAudioFile(combinedAudioURL);
        } catch (error) {
          console.error('Error combining audio clips:', error);
        }
      }
    };

    fetchAndCombine();
  }, [filenamesMap]);

  useEffect(() => {
    if (audioRef) {
      const updateCurrentTime = () => {
        if (audioRef) {
          setCurrentTime(audioRef.currentTime);
        }
      };

      audioRef.addEventListener('timeupdate', updateCurrentTime);

      return () => {
        audioRef.removeEventListener('timeupdate', updateCurrentTime);
      };
    }
  }, [audioRef]);

  const handleLoadedMetadata = () => {
    if (audioRef) {
      setDuration(audioRef.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (audioRef) {
      if (audioRef.paused) {
        audioRef.play();
        setIsPlaying(true);
      } else {
        audioRef.pause();
        setIsPlaying(false);
      }
    }
  };

  if (!combinedAudioFile) return <p className="text-white">Generating Weekly Podcast...</p>;

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-white text-3xl font-bold mb-4">Your Weekly Podcast</h1>
      <div className="cursor-pointer p-4 bg-gray-800 rounded-xl">
        <button onClick={togglePlayPause} className="text-white text-lg font-bold mb-4">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <audio
          ref={(ref) => setAudioRef(ref)}
          src={combinedAudioFile}
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div
            className="bg-green-500 h-full rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        <div className="flex-center cursor-pointer gap-3 md:gap-6">
          <button onClick={() => { if (audioRef) audioRef.currentTime -= 5; }}>Rewind 5s</button>
          <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={() => { if (audioRef) audioRef.currentTime += 5; }}>Forward 5s</button>
        </div>
      </div>
    </section>
  );
};

export default WeeklyPodcast;
