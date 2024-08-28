'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { formatDateFromFilename } from '@/utils/dateUtils';

const BASE_URL = '/api/proxy-audio?filename=';

interface PodcastSnippetsProps {
  filenamesMap: Record<string, string[]>;
}

const PodcastSnippets: React.FC<PodcastSnippetsProps> = ({ filenamesMap }) => {
  const [playingFile, setPlayingFile] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    if (playingFile) {
      const audioElement = audioRefs.current[playingFile];
      if (audioElement) {
        audioElement.play().then(() => setIsPlaying(playingFile)).catch(err => {
          console.error('Error playing audio:', err);
          setIsPlaying(null);
        });
      }
    }
  }, [playingFile]);

  useEffect(() => {
    const audioElement = audioRefs.current[playingFile || ''];
    if (audioElement) {
      const updateCurrentTime = () => {
        setCurrentTime(audioElement.currentTime);
      };
      audioElement.addEventListener('timeupdate', updateCurrentTime);
      return () => {
        audioElement.removeEventListener('timeupdate', updateCurrentTime);
      };
    }
  }, [playingFile]);

  useEffect(() => {
    const audioElement = audioRefs.current[playingFile || ''];
    if (audioElement) {
      setDuration(audioElement.duration);
    }
  }, [playingFile]);

  const handlePlayPause = (filename: string) => {
    const fullUrl = `${BASE_URL}${filename}`;

    if (playingFile === fullUrl) {
      const audioElement = audioRefs.current[fullUrl];
      if (audioElement) {
        if (isPlaying === fullUrl) {
          audioElement.pause();
          setIsPlaying(null);
        } else {
          audioElement.play();
          setIsPlaying(fullUrl);
        }
      }
    } else {
      const audioElement = audioRefs.current[playingFile || ''];
      if (audioElement) {
        audioElement.pause();
      }
      setPlayingFile(fullUrl);
    }
  };

  const toggleMute = () => {
    const audioElement = audioRefs.current[playingFile || ''];
    if (audioElement) {
      audioElement.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const forward = () => {
    const audioElement = audioRefs.current[playingFile || ''];
    if (audioElement) {
      audioElement.currentTime += 5;
    }
  };

  const rewind = () => {
    const audioElement = audioRefs.current[playingFile || ''];
    if (audioElement) {
      audioElement.currentTime -= 5;
    }
  };

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-white text-3xl font-bold mb-4">Podcast Snippets</h1>
      {Object.entries(filenamesMap).map(([newsletter, filenames]) => (
        <div key={newsletter} className="mb-6">
          <h2 className="text-xl font-bold text-white">{newsletter}</h2>
          {filenames.map((filename) => {
            const formattedDate = formatDateFromFilename(filename);
            const fullUrl = `${BASE_URL}${filename}`;
            return (
              <div key={filename} className="mb-6">
                <div className="podcast-card bg-gray-800 rounded-lg p-4 shadow-md">
                  <h2 className="podcast-title text-xl font-bold text-white">{formattedDate}</h2>
                  <audio
                    ref={el => { if (el) audioRefs.current[fullUrl] = el; }}
                    src={fullUrl}
                    onLoadedMetadata={() => setDuration(audioRefs.current[fullUrl]?.duration || 0)}
                    onEnded={() => setIsPlaying(null)}
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
                        onClick={() => handlePlayPause(filename)}
                        className={`icon-button p-2 rounded-full hover:bg-gray-700 ${isPlaying === fullUrl ? 'font-bold' : ''}`}
                      >
                        <Image
                          src={isPlaying === fullUrl ? "/icons/Pause.svg" : "/icons/Play.svg"}
                          alt={isPlaying === fullUrl ? "Pause" : "Play"}
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
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
};

export default PodcastSnippets;
