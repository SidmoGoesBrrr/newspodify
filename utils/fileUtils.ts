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
  console.log('Starting getFilenamesMap with newsletters:', newsletters);

  const map: Record<string, string[]> = {};
  
  // Fetch filenames from VPS
  const filenames = await getFilteredFilenamesFromVPS();
  
  // Check if filenames are fetched correctly
  console.log('Fetched filenames:', filenames);

  if (!filenames || filenames.length === 0) {
    console.warn("No filenames returned from VPS.");
    return map;
  }

  const now = new Date();
  const lastWeekStart = new Date(now.setDate(now.getDate() - 7));
  const lastWeekEnd = new Date();

  console.log('Filtering between:', lastWeekStart, lastWeekEnd);

  newsletters.forEach(newsletter => {
    const filteredFilenames = filenames.filter(filename => {
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
    }).sort((a, b) => {
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

    if (filteredFilenames.length > 0) {
      map[newsletter] = filteredFilenames;
      console.log(`Added to map for newsletter "${newsletter}":`, filteredFilenames);
    } else {
      console.warn(`No matching files found for newsletter: ${newsletter}`);
    }
  });

  console.log('Generated Filenames Map:', map);
  return map;
}
