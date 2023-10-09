export function getLastOnlineStatus(inputDate: Date): string {
    // Get the current time
    const currentTime: Date = new Date();
  
    // Calculate the time difference in milliseconds between current time and input time
    const timeDifferenceMs: number =  currentTime.getTime() - inputDate.getTime();

    if (timeDifferenceMs <= 0) return "Now"
    // Calculate the time difference in days
    const timeDifferenceDays: number = timeDifferenceMs / (1000 * 60 * 60 * 24);
    
    // Anything within an hour then return Now.
    if (timeDifferenceMs <= 900000) return "Now"
  
    const timeZoneOptions:Intl.DateTimeFormatOptions = { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false }

    // If the time difference is less than one day and greater than or equal to zero (today), return "Today at HH:mm"
    if (timeDifferenceDays >= 0 && timeDifferenceDays < 1) {
      const formattedTime: string = inputDate.toLocaleTimeString([], timeZoneOptions);
      return `Today at ${formattedTime}`;
    }
  
    // If the time difference is exactly one day (yesterday), return "Yesterday at HH:mm"
    if (timeDifferenceDays >= 1 && timeDifferenceDays < 2) {
      const formattedTime: string = inputDate.toLocaleTimeString([], timeZoneOptions);
      return `Yesterday at ${formattedTime}`;
    }
  
    // For all other cases, return the date in British form (dd/mm/yyyy) and time with just the hour and minutes (HH:mm)
    const formattedDate: string = inputDate.toLocaleDateString('en-GB');
    const formattedTime: string = inputDate.toLocaleTimeString([], timeZoneOptions);
    return `${formattedDate} at ${formattedTime}`;
  }
  