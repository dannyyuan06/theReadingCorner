export function getLastOnlineStatus(inputDate: Date): string {
    // Get the current time
    const currentTime: Date = new Date();
  
    // Calculate the time difference in milliseconds between current time and input time
    const timeDifferenceMs: number =  currentTime.getTime() - inputDate.getTime();
  
    // Calculate the time difference in hours
    const timeDifferenceHours: number = timeDifferenceMs / (1000 * 60 * 60);
  
    // If the time difference is less than one hour, status is "Now"
    if (timeDifferenceHours < 1) {
      return "Now";
    }
  
    // Calculate the time difference in days
    const timeDifferenceDays: number = timeDifferenceMs / (1000 * 60 * 60 * 24);
  
    // If the time difference is exactly one day, return "Yesterday"
    if (timeDifferenceDays >= 1 && timeDifferenceDays < 2) {
      return "Yesterday";
    }
  
    // If the time difference is less than one day and greater than or equal to zero (today), status is "Today at HH:mm"
    if (timeDifferenceDays >= 0 && timeDifferenceDays < 1) {
      const formattedTime: string = inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      return `Today at ${formattedTime}`;
    }
  
    // If the time difference is more than one day, return the shorthand date
    const daysAgo: number = Math.floor(timeDifferenceDays);
    return `${daysAgo}d ago`;
  }