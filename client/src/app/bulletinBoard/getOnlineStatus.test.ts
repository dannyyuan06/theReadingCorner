import { getLastOnlineStatus } from './getOnlineStatus'; // Import your module here

describe('getLastOnlineStatus', () => {
  // Define a constant current time for testing purposes
  const currentTime = new Date('2023-10-03T12:00:00Z'); // Adjust the time as needed

  // Mock the Date constructor to always return the fixed current time
  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(currentTime);
});

  it('should return "Now" if the input date is in the future', () => {
    const futureDate = new Date('2023-10-04T12:00:00Z');
    expect(getLastOnlineStatus(futureDate)).toBe('Now');
  });

  it('should return "Now" if the input date is very close to the current time', () => {
    const veryCloseDate = new Date(currentTime.getTime() - 1); // 1 millisecond in the past
    expect(getLastOnlineStatus(veryCloseDate)).toBe('Now');
  });

  it('should return "Today at HH:mm" if the input date is today', () => {
    const todayDate = new Date(currentTime.getTime() - 1000 * 60 * 30); // 30 minutes ago
    expect(getLastOnlineStatus(todayDate)).toMatch(/^Today at \d{2}:\d{2}$/);
  });

  it('should return "Yesterday at HH:mm" if the input date is yesterday', () => {
    const yesterdayDate = new Date(currentTime.getTime() - 1000 * 60 * 60 * 24); // 1 day ago
    expect(getLastOnlineStatus(yesterdayDate)).toMatch(/^Yesterday at \d{2}:\d{2}$/);
  });

  it('should return a formatted date and time for other cases', () => {
    const olderDate = new Date('2023-09-30T09:30:00Z');
    expect(getLastOnlineStatus(olderDate)).toMatch(/^\d{2}\/\d{2}\/\d{4} at \d{2}:\d{2}$/);
  });
});
