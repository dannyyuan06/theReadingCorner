export default function convertMinutes(minutes: number) {
    if (minutes < 0) {
        return "Invalid input: Minutes must be a positive number.";
    }
    if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? "s": ""}`;
    }
    if (minutes < 1440) { // 60 minutes * 24 hours
        const hours = Math.floor(minutes / 60);
        return `${hours} hour${hours > 1 ? "s": ""}`;
    }
    const days = Math.floor(minutes / 1440);
    return `${days} day${days > 1 ? "s": ""}`;
}
  