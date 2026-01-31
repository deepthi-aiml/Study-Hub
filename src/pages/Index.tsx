import { useState, useEffect, useCallback } from 'react';
import { courses } from '@/data/courseData';
import { useLocalStorage, UserProgress, defaultProgress } from '@/hooks/useLocalStorage';
import { useNotifications } from '@/hooks/useNotifications';
import { Header } from '@/components/Dashboard/Header';
import { CourseCard } from '@/components/Dashboard/CourseCard';
import { CourseDetail } from '@/components/Dashboard/CourseDetail';
import { UpcomingDeadlines } from '@/components/Dashboard/UpcomingDeadlines';
import { ProgressOverview } from '@/components/Dashboard/ProgressOverview';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [progress, setProgress] = useLocalStorage<UserProgress>('course-tracker-progress', defaultProgress);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const { checkUpcomingDeadlines } = useNotifications();

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  const handleUpdateProgress = useCallback((updates: Partial<UserProgress>) => {
    setProgress(prev => ({
      ...prev,
      ...updates,
      lastSaved: new Date().toISOString()
    }));
  }, [setProgress]);

  // Check for notifications on mount and periodically
  useEffect(() => {
    const checkNotifications = () => {
      checkUpcomingDeadlines();
    };

    // Initial check
    checkNotifications();

    // Check every hour
    const interval = setInterval(checkNotifications, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [checkUpcomingDeadlines]);

  return (
    <div className="min-h-screen bg-background p-3 md:p-6 lg:p-8 pb-10 md:pb-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <Header />

        {selectedCourse ? (
          <div className="space-y-4 md:space-y-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedCourseId(null)}
              className="h-9 px-3 text-xs md:text-sm hover:bg-accent/50 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Button>
            <CourseDetail
              course={selectedCourse}
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            {/* Top Row - Stats */}
            <ProgressOverview progress={progress} />

            {/* Middle Row - Courses */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg md:text-2xl font-bold text-foreground">
                  Academic Focus
                </h2>
                <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-accent/50 px-2 py-1 rounded">S1 2026 Core</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className="animate-fade-in opacity-0"
                    style={{
                      animationDelay: `${index * 80}ms`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <CourseCard
                      course={course}
                      progress={progress}
                      onSelect={setSelectedCourseId}
                      isSelected={selectedCourseId === course.id}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row - Deadlines (Full Width) */}
            <div
              className="animate-fade-in opacity-0"
              style={{
                animationDelay: '500ms',
                animationFillMode: 'forwards'
              }}
            >
              <UpcomingDeadlines
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
