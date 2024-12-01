// Format a date to "YYYY-MM-DD" for API compatibility
export const formatDateForAPI = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format a full date for user-friendly display
export const formatFullDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
  };
  return new Intl.DateTimeFormat('fr-FR', options).format(date);
};

// Format a time from an ISO string to "HH:mm"
export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
  }).format(date);
};
