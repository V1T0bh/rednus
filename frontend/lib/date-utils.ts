/**
 * Format a date string to a more readable format
 * @param dateString - ISO date string from the backend
 * @returns Formatted date like "25/01/2026, 5:26:47 pm"
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // Format as DD/MM/YYYY, HH:MM:SS AM/PM
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const hoursStr = hours.toString();
    
    return `${day}/${month}/${year}, ${hoursStr}:${minutes}:${seconds} ${ampm}`;
  } catch {
    return dateString;
  }
}

/**
 * Format date to short format (without seconds)
 * @param dateString - ISO date string from the backend
 * @returns Formatted date like "25/01/2026, 5:26 pm"
 */
export function formatDateShort(dateString?: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = hours.toString();
    
    return `${day}/${month}/${year}, ${hoursStr}:${minutes} ${ampm}`;
  } catch {
    return dateString;
  }
}
