// utils/fileUtils.ts
// utils/fileUtils.ts
export async function getFilteredFilenamesFromVPS(): Promise<string[]> {
  try {
    const response = await fetch('/api/proxy-filenames'); // Fetching from the Vercel proxy API route
    if (!response.ok) {
      console.error(`Failed to fetch filenames: ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    console.log('Fetched filenames from proxy:', data);
    return data || []; // Ensure data structure matches what you expect
  } catch (error) {
    console.error('Error fetching filenames:', error);
    return [];
  }
}


export async function getFilenamesMap(newsletters: string[]): Promise<Record<string, string[]>> {
  const map: Record<string, string[]> = {};
  const filenames = await getFilteredFilenamesFromVPS();

  const now = new Date();
  const lastWeekStart = new Date(now.setDate(now.getDate() - 7));
  const lastWeekEnd = new Date();
  
  console.log('Filtering between:', lastWeekStart, lastWeekEnd);

  newsletters.forEach(newsletter => {
    map[newsletter] = filenames.filter(filename => {
      console.log('Processing Filename:', filename);
      const parts = filename.split('_');
      if (parts.length < 2) return false;

      const [dateStr, nameWithExt] = parts;
      const name = nameWithExt.split('.')[0]; // Remove file extension

      // Parse the date in YYYYMMDD format
      const year = parseInt(dateStr.substring(0, 4), 10);
      const month = parseInt(dateStr.substring(4, 6), 10) - 1; // Month is 0-indexed in JS
      const day = parseInt(dateStr.substring(6, 8), 10);

      const fileDate = new Date(year, month, day);

      console.log('Parsed Date:', fileDate, 'Name:', name);

      if (isNaN(fileDate.getTime())) return false;

      return name === newsletter && fileDate >= lastWeekStart && fileDate <= lastWeekEnd;
    })
    .sort((a, b) => {
      const aDateStr = a.split('_')[0];
      const bDateStr = b.split('_')[0];
      
      // Parse the dates from the filenames
      const aDate = new Date(
        parseInt(aDateStr.substring(0, 4), 10),
        parseInt(aDateStr.substring(4, 6), 10) - 1,
        parseInt(aDateStr.substring(6, 8), 10)
      );

      const bDate = new Date(
        parseInt(bDateStr.substring(0, 4), 10),
        parseInt(bDateStr.substring(4, 6), 10) - 1,
        parseInt(bDateStr.substring(6, 8), 10)
      );

      // Sort by date, most recent first
      return bDate.getTime() - aDate.getTime();
    });
  });

  console.log('Generated Filenames Map:', map);
  return map;
}





// Add other utility functions here if needed, such as `combineAudioClips`

// utils/combineAudio.ts
/*
export async function combineAudioClips(filenames: string[], baseURL: string): Promise<Blob> {
  // Create an AudioContext
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

  // Fetch and decode all audio files
  const audioBuffers = await Promise.all(filenames.map(async (filename) => {
    const response = await fetch(`${baseURL}/${filename}`);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
  }));

  // Create a new buffer to hold the combined audio
  const totalLength = audioBuffers.reduce((sum, buffer) => sum + buffer.length, 0);
  const combinedBuffer = audioContext.createBuffer(
    audioBuffers[0].numberOfChannels,
    totalLength,
    audioBuffers[0].sampleRate
  );

  // Copy each buffer into the combined buffer
  let offset = 0;
  for (const buffer of audioBuffers) {
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      combinedBuffer.getChannelData(channel).set(buffer.getChannelData(channel), offset);
    }
    offset += buffer.length;
  }

  // Convert the combined buffer to audio file
  const offlineContext = new OfflineAudioContext(
    audioBuffers[0].numberOfChannels,
    totalLength,
    audioBuffers[0].sampleRate
  );
  const source = offlineContext.createBufferSource();
  source.buffer = combinedBuffer;
  source.connect(offlineContext.destination);
  source.start(0);

  // Render the audio to an array buffer
  const renderedBuffer = await offlineContext.startRendering();

  // Convert the rendered buffer to a Blob
  const wavBlob = bufferToWave(renderedBuffer, 0, renderedBuffer.length);

  return wavBlob;
}

// Helper function to convert an AudioBuffer to a WAV Blob
function bufferToWave(abuffer: AudioBuffer, offset: number, len: number): Blob {
  const numOfChan = abuffer.numberOfChannels,
    length = len * numOfChan * 2 + 44,
    type = 'audio/wav',
    view = new DataView(new ArrayBuffer(length)),
    channels = [],
    sampleRate = abuffer.sampleRate,
    samples = new Int16Array(abuffer.getChannelData(0).length);

  let pos = 0,
    i, j;

  // RIFF chunk descriptor
  writeUTFBytes(view, 0, 'RIFF');
  view.setUint32(4, length - 8, true);
  writeUTFBytes(view, 8, 'WAVE');
  writeUTFBytes(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true);  // AudioFormat (1 for PCM)
  view.setUint16(22, numOfChan, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * 2 * numOfChan, true); // ByteRate
  view.setUint16(32, numOfChan * 2, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample

  writeUTFBytes(view, 36, 'data');
  view.setUint32(40, length - 44, true);

  // Write audio data
  for (i = 0; i < numOfChan; i++) {
    channels.push(abuffer.getChannelData(i));
  }

  while (pos < length - 44) {
    for (i = 0; i < numOfChan; i++) {
      view.setInt16(pos, channels[i][j] * 0x7fff, true);
      pos += 2;
    }
    j++;
  }

  function writeUTFBytes(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  return new Blob([view], { type });
} */
