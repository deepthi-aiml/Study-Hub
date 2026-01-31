import { useMemo } from 'react';
import { ExternalLink, BookOpen, CheckCircle2, Circle } from 'lucide-react';
import { Course } from '@/data/courseData';
import { cn } from '@/lib/utils';
import { UserProgress } from '@/hooks/useLocalStorage';

interface CourseCardProps {
  course: Course;
  progress: UserProgress;
  onSelect: (courseId: string) => void;
  isSelected: boolean;
}

export const CourseCard = ({ course, progress, onSelect, isSelected }: CourseCardProps) => {
  const progressStats = useMemo(() => {
    let totalTasks = 0;
    let completedTasks = 0;
    let totalLOs = 0;
    let loScore = 0;

    course.weeks.forEach(week => {
      // Core tasks
      week.tasks.forEach(task => {
        totalTasks++;
        if (progress.completedTasks[task.id]) {
          completedTasks++;
        }
      });

      // Custom tasks
      const customTasks = progress.customTasks[`${course.id}-w${week.weekNumber}`] || [];
      customTasks.forEach(task => {
        totalTasks++;
        if (progress.completedTasks[task.id]) {
          completedTasks++;
        }
      });

      week.learningOutcomes.forEach(lo => {
        totalLOs++;
        const level = progress.difficultyLevels[lo.id]?.level || 'hard';
        if (level === 'easy') loScore += 1;
        else if (level === 'medium') loScore += 0.5;
      });
    });

    const totalWeight = totalTasks + totalLOs;
    const earnedWeight = completedTasks + loScore;
    const percentage = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

    return { totalTasks, completedTasks, percentage };
  }, [course, progress.completedTasks, progress.difficultyLevels, progress.customTasks]);

  const getCourseIcon = (id: string) => {
    const icons: Record<string, string> = {
      programming: '🐍',
      systems: '💻',
      web: '🌐',
      math: '🧮',
      communication: '💬',
      ict: '📱'
    };
    return icons[id] || '📚';
  };

  return (
    <div
      onClick={() => onSelect(course.id)}
      className={cn(
        "glass-panel-hover p-4 md:p-5 cursor-pointer flex flex-col h-full transition-all duration-300",
        course.colorClass,
        isSelected && "ring-2 ring-primary shadow-lg shadow-primary/20 bg-primary/5"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-secondary/50 flex items-center justify-center text-xl md:text-2xl shrink-0">
            {getCourseIcon(course.id)}
          </div>
          <div className="min-w-0">
            <span className="text-[10px] md:text-xs font-mono text-primary font-bold uppercase tracking-wider">{course.code}</span>
            <h3 className="font-heading font-bold text-sm md:text-base text-foreground leading-tight truncate pr-1">
              {course.name}
            </h3>
          </div>
        </div>
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/10 shrink-0"
        >
          <ExternalLink className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </a>
      </div>

      <div className="mt-auto space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] md:text-sm mb-1.5 md:mb-2">
            <span className="text-muted-foreground font-medium uppercase tracking-tighter">Current Progress</span>
            <span className="font-bold text-foreground">{progressStats.percentage}%</span>
          </div>
          <div className="progress-bar h-1.5 md:h-2">
            <div
              className="progress-fill"
              style={{ width: `${progressStats.percentage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] md:text-sm pt-3 border-t border-border/10">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="font-medium">{course.weeks.length} Weeks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-success font-bold">
              <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>{progressStats.completedTasks}</span>
            </div>
            <span className="text-muted-foreground/30">|</span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Circle className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>{progressStats.totalTasks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
