'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { formatDateFromFilename } from '@/utils/dateUtils'; // Import the utility function

const IP = process.env.NEXT_PUBLIC_IP!
const BASE_URL = 'http://' + IP + '/audio_clips';

interface PodcastSnippetsProps {
  filenamesMap: Record<string, string[]>;
}

const PodcastSnippets: React.FC<PodcastSnippetsProps> = ({ filenamesMap }) => {
  const [playingFile, setPlayingFile] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && playingFile) {
      audioRef.current.src = playingFile;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => {
        console.error('Error playing audio:', err);
        setIsPlaying(false);
      });
    }
  }, [playingFile]);

  useEffect(() => {
    if (audioRef.current) {
      const updateCurrentTime = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      };
      audioRef.current.addEventListener('timeupdate', updateCurrentTime);
      return () => {
        audioRef.current?.removeEventListener('timeupdate', updateCurrentTime);
      };
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, [audioRef.current?.duration]);

  const handlePlayPause = (filename: string) => {
    const fullUrl = `${BASE_URL}/${filename}`;

    if (audioRef.current) {
      if (playingFile === fullUrl) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        audioRef.current.pause();
        setPlayingFile(fullUrl);
      }
    } else {
      setPlayingFile(fullUrl);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const forward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 5;
    }
  };

  const rewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 5;
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
            return (
              <div key={filename} className="mb-6">
                <div className="podcast-card bg-gray-800 rounded-lg p-4 shadow-md">
                  <h2 className="podcast-title text-xl font-bold text-white">{formattedDate}</h2>
                  {/* Render audio element only if playingFile is not null */}
                  {playingFile && (
                    <audio
                      ref={audioRef}
                      src={playingFile}
                      onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                      onEnded={() => setIsPlaying(false)}
                      className="hidden"
                    />
                  )}
                  <Progress
                    value={(currentTime / duration) * 100}
                    className="progress-bar bg-gray-700 rounded-full h-1 w-full mt-2"
                    max={duration}
                  >
                    <div
                      className="progress bg-teal-500 h-full rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
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
                          width={24} // Adjust width as needed
                          height={24} // Adjust height as needed
                        />
                      </button>
                      <button
                        onClick={() => handlePlayPause(filename)}
                        className={`icon-button p-2 rounded-full hover:bg-gray-700 ${isPlaying ? 'font-bold' : ''}`}
                      >
                        <Image
                          src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"}
                          alt={isPlaying ? "Pause" : "Play"}
                          width={24} // Adjust width as needed
                          height={24} // Adjust height as needed
                        />
                      </button>
                      <button
                        onClick={forward}
                        className="icon-button p-2 rounded-full hover:bg-gray-700"
                      >
                        <Image
                          src="/icons/forward.svg"
                          alt="Forward"
                          width={24} // Adjust width as needed
                          height={24} // Adjust height as needed
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
                        width={24} // Adjust width as needed
                        height={24} // Adjust height as needed
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
