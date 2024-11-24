import { PrayerTimes, Coordinates, CalculationMethod, Madhab } from 'adhan';

// Dhaka coordinates
const coordinates = new Coordinates(23.8103, 90.4125);

export const getPrayerTimes = (date: Date = new Date()) => {
  const params = CalculationMethod.MoonsightingCommittee();
  params.madhab = Madhab.Hanafi; // Can be changed based on user preference
  
  const prayerTimes = new PrayerTimes(coordinates, date, params);
  
  return {
    fajr: prayerTimes.fajr,
    sunrise: prayerTimes.sunrise,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha,
  };
};

export const getNextPrayer = (prayerTimes: ReturnType<typeof getPrayerTimes>) => {
  const now = new Date();
  const prayers = [
    { name: 'Fajr', time: prayerTimes.fajr },
    { name: 'Sunrise', time: prayerTimes.sunrise },
    { name: 'Dhuhr', time: prayerTimes.dhuhr },
    { name: 'Asr', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isha', time: prayerTimes.isha },
  ];

  for (const prayer of prayers) {
    if (prayer.time > now) {
      return prayer;
    }
  }

  // If all prayers have passed, return next day's Fajr
  return { name: 'Fajr', time: prayerTimes.fajr };
};

export const formatPrayerTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
