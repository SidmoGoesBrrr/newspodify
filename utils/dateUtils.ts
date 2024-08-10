// utils/dateUtils.ts
export function formatDateFromFilename(filename: string): string {
    // Remove the file extension
    const baseName = filename.replace('.mp3', '');
    
    // Extract date part and convert it
    const [dateStr] = baseName.split('_');
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10);
    const day = parseInt(dateStr.substring(6, 8), 10);
    
    // Create a Date object and format it
    const date = new Date(year, month - 1, day);
    
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    
    return date.toLocaleDateString('en-GB', options);
  }
  