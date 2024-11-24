"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getPrayerTimes, getNextPrayer, formatPrayerTime } from '@/lib/prayerTimes';

export const PrayerTimes = () => {
  const [times, setTimes] = useState(getPrayerTimes());
  const [nextPrayer, setNextPrayer] = useState(getNextPrayer(times));
  const [timeUntilNext, setTimeUntilNext] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = getPrayerTimes();
      const newNextPrayer = getNextPrayer(newTimes);
      
      setTimes(newTimes);
      setNextPrayer(newNextPrayer);
      
      const now = new Date();
      const diff = newNextPrayer.time.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeUntilNext(`${hours}h ${minutes}m`);
    };

    // Initial update
    updateTimes();

    // Update times every minute
    const interval = setInterval(updateTimes, 60000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array since we're using setInterval

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Prayer Times - Dhaka</span>
          <span className="text-sm">Next: {nextPrayer.name} in {timeUntilNext}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(times).map(([name, time]) => (
            <div key={name} className={`p-3 rounded-lg ${
              nextPrayer.name.toLowerCase() === name.toLowerCase() ? 'bg-primary/10' : 'bg-muted'
            }`}>
              <div className="font-medium capitalize">{name}</div>
              <div className="text-sm">{formatPrayerTime(time)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
