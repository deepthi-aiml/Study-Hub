import { useState, useEffect } from 'react';
import { Calendar, Clock, GraduationCap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <header className="glass-panel p-4 md:p-6 mb-6 animate-fade-in relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0">
            <GraduationCap className="h-7 w-7 md:h-8 md:w-8 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-gradient truncate">
              Study Hub
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm truncate">
              ITE 25S1 • University of Moratuwa
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-8">
          <div className="flex items-center justify-between sm:justify-start gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-foreground/80">
              <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">{formatDate(currentTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <span className="text-sm md:text-lg font-mono font-semibold text-foreground whitespace-nowrap">
                {formatTime(currentTime)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
