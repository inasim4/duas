"use client";

// app/page.tsx

import React, { useState, useEffect } from 'react';
import { PrayerTimes } from '@/components/prayer-times';
import { DuaDisplay } from '@/components/dua-display';
import { duas, tasbihat, sunnahActs } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Clock, Sun, Moon } from 'lucide-react';

interface Tasbih {
  arabic: string;
  english: string;
  count: number;
}

interface Dua {
  arabic: string;
  english: string;
  reference?: string;
}

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  dua?: Dua;
  tasbih?: Tasbih[];
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

interface Checklist {
  [key: string]: ChecklistSection;
}

const IslamicDailyChecklist = () => {
  const [expandedDuas, setExpandedDuas] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const date = new Date();
  const [checklist, setChecklist] = useState<Checklist>({
    preFajr: {
      title: "Pre-Fajr",
      items: [
        { 
          id: 'tahajjud', 
          label: 'Tahajjud Prayer', 
          completed: false,
          dua: duas.beforePrayer
        },
        { 
          id: 'wakeupDua', 
          label: 'Wake up Dua', 
          completed: false,
          dua: duas.wakeUp
        },
        { 
          id: 'wudu', 
          label: 'Perform Wudu', 
          completed: false,
          dua: duas.beforeWudu
        }
      ]
    },
    fajr: {
      title: "Fajr",
      items: [
        { 
          id: 'fajrSunnah', 
          label: 'Fajr Sunnah (2 rakats)', 
          completed: false,
          dua: duas.beforePrayer
        },
        { 
          id: 'fajrFard', 
          label: 'Fajr Prayer (2 rakats)', 
          completed: false,
          dua: duas.afterPrayer,
          tasbih: tasbihat.afterPrayer
        },
        { 
          id: 'morningAdhkar', 
          label: 'Morning Adhkar', 
          completed: false,
          tasbih: tasbihat.morningEvening
        }
      ]
    },
    duha: {
      title: "Duha (Sunrise + 20 minutes)",
      items: [
        {
          id: 'duhaPrayer',
          label: 'Duha Prayer (2-8 rakats)',
          completed: false,
          dua: duas.beforePrayer
        }
      ]
    },
    dhuhr: {
      title: "Dhuhr",
      items: [
        {
          id: 'dhuhrSunnahBefore',
          label: 'Dhuhr Sunnah Before (4 rakats)',
          completed: false,
          dua: duas.beforePrayer
        },
        {
          id: 'dhuhrFard',
          label: 'Dhuhr Prayer (4 rakats)',
          completed: false,
          dua: duas.afterPrayer,
          tasbih: tasbihat.afterPrayer
        },
        {
          id: 'dhuhrSunnahAfter',
          label: 'Dhuhr Sunnah After (2 rakats)',
          completed: false
        }
      ]
    },
    asr: {
      title: "Asr",
      items: [
        {
          id: 'asrSunnahBefore',
          label: 'Asr Sunnah (4 rakats)',
          completed: false,
          dua: duas.beforePrayer
        },
        {
          id: 'asrFard',
          label: 'Asr Prayer (4 rakats)',
          completed: false,
          dua: duas.afterPrayer,
          tasbih: tasbihat.afterPrayer
        }
      ]
    },
    maghrib: {
      title: "Maghrib",
      items: [
        {
          id: 'maghribFard',
          label: 'Maghrib Prayer (3 rakats)',
          completed: false,
          dua: duas.afterPrayer,
          tasbih: tasbihat.afterPrayer
        },
        {
          id: 'maghribSunnah',
          label: 'Maghrib Sunnah (2 rakats)',
          completed: false
        },
        {
          id: 'eveningAdhkar',
          label: 'Evening Adhkar',
          completed: false,
          dua: duas.morningEvening,
          tasbih: tasbihat.morningEvening
        }
      ]
    },
    isha: {
      title: "Isha",
      items: [
        {
          id: 'ishaSunnahBefore',
          label: 'Isha Sunnah Before (4 rakats)',
          completed: false,
          dua: duas.beforePrayer
        },
        {
          id: 'ishaFard',
          label: 'Isha Prayer (4 rakats)',
          completed: false,
          dua: duas.afterPrayer,
          tasbih: tasbihat.afterPrayer
        },
        {
          id: 'ishaSunnahAfter',
          label: 'Isha Sunnah After (2 rakats)',
          completed: false
        },
        {
          id: 'witr',
          label: 'Witr Prayer (3 rakats)',
          completed: false
        },
        {
          id: 'sleepingDua',
          label: 'Sleeping Dua',
          completed: false,
          dua: duas.beforeSleep
        }
      ]
    }
  });

  useEffect(() => {
    const calculateProgress = () => {
      let completed = 0;
      let total = 0;
      
      Object.values(checklist).forEach(section => {
        section.items.forEach((item: ChecklistItem) => {
          total++;
          if (item.completed) completed++;
        });
      });
      
      const newProgress = total > 0 ? (completed / total) * 100 : 0;
      setProgress(newProgress);
    };

    calculateProgress();
  }, [checklist]);

  const toggleDua = (duaId: string) => {
    setExpandedDuas(prev => 
      prev.includes(duaId) ? prev.filter(id => id !== duaId) : [...prev, duaId]
    );
  };

  const handleCheck = (sectionKey: string, itemId: string) => {
    setChecklist(prev => {
      const newChecklist = JSON.parse(JSON.stringify(prev));
      const section = newChecklist[sectionKey];
      const itemIndex = section.items.findIndex((item: ChecklistItem) => item.id === itemId);
      if (itemIndex !== -1) {
        section.items[itemIndex].completed = !section.items[itemIndex].completed;
      }
      return newChecklist;
    });
  };

  const getSectionIcon = (title: string) => {
    switch (title) {
      case 'Pre-Fajr':
      case 'Fajr':
        return <Moon className="w-5 h-5" />;
      case 'Morning':
      case 'Dhuhr':
      case 'Asr':
        return <Sun className="w-5 h-5" />;
      case 'Maghrib':
      case 'Isha':
        return <Moon className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <PrayerTimes />
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Daily Islamic Practices</span>
              <span className="text-sm">{date.toLocaleDateString()}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="mb-4" />
            <Alert className="mb-6">
              <AlertDescription>
                {progress === 100 ? (
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-2" />
                    Alhamdulillah! You&apos;ve completed all tasks for today.
                  </div>
                ) : (
                  `${Math.round(progress)}% of daily practices completed`
                )}
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              {Object.entries(checklist).map(([sectionKey, section]: [string, ChecklistSection]) => (
                <Card key={sectionKey} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getSectionIcon(section.title)}
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {section.items.map((item: ChecklistItem) => (
                        <div key={item.id} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={item.id}
                              checked={item.completed}
                              onCheckedChange={() => handleCheck(sectionKey, item.id)}
                            />
                            <label
                              htmlFor={item.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {item.label}
                            </label>
                          </div>
                          {item.dua && (
                            <DuaDisplay
                              title={`${item.label} Dua`}
                              dua={item.dua}
                              isExpanded={expandedDuas.includes(item.id)}
                              onToggle={() => toggleDua(item.id)}
                            />
                          )}
                          {item.tasbih && (
                            <div className="ml-6 space-y-2 mt-3">
                              {item.tasbih.map((t: Tasbih, idx: number) => (
                                <div key={idx} className="space-y-1">
                                  <div className="text-right font-arabic text-2xl leading-loose tracking-wider">
                                    {t.count}x {t.arabic}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {t.count}x {t.english}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Sunnah Acts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Daily Sunnah</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {sunnahActs.daily.map((act, index) => (
                    <li key={index} className="text-sm">{act}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Weekly Sunnah</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {sunnahActs.weekly.map((act, index) => (
                    <li key={index} className="text-sm">{act}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default IslamicDailyChecklist;