import { useMemo } from 'react';
import { TrendingUp, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { courses } from '@/data/courseData';
import { UserProgress } from '@/hooks/useLocalStorage';

interface ProgressOverviewProps {
  progress: UserProgress;
}

export const ProgressOverview = ({ progress }: ProgressOverviewProps) => {
  const stats = useMemo(() => {
    let totalTasks = 0;
    let completedTasks = 0;
    let totalLOs = 0;
    let easyLOs = 0;
    let mediumLOs = 0;
    let hardLOs = 0;

    courses.forEach(course => {
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
          const difficulty = progress.difficultyLevels[lo.id]?.level || 'hard';
          if (difficulty === 'easy') easyLOs++;
          else if (difficulty === 'medium') mediumLOs++;
          else hardLOs++;
        });
      });
    });

    const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const masteryScore = totalLOs > 0
      ? Math.round(((easyLOs * 100 + mediumLOs * 50 + hardLOs * 0) / (totalLOs * 100)) * 100)
      : 0;

    return {
      totalTasks,
      completedTasks,
      overallProgress,
      totalLOs,
      easyLOs,
      mediumLOs,
      hardLOs,
      masteryScore
    };
  }, [progress]);

  const lastSavedDate = progress.lastSaved
    ? new Date(progress.lastSaved).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    : 'Never';

  return (
    <div className="glass-panel p-4 md:p-6 animate-fade-in">
      <h2 className="font-heading text-lg md:text-xl font-semibold mb-4 md:mb-6 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        Progress Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-accent/30 border border-border/50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-success" />
            <span className="text-[10px] md:text-sm text-muted-foreground font-medium uppercase tracking-wider">Tasks Done</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold text-foreground">{stats.completedTasks}</span>
            <span className="text-xs md:text-sm text-muted-foreground font-medium">/ {stats.totalTasks}</span>
          </div>
          <div className="progress-bar mt-3 h-1.5 md:h-2">
            <div
              className="progress-fill"
              style={{ width: `${stats.overallProgress}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-lg bg-accent/30 border border-border/50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <span className="text-[10px] md:text-sm text-muted-foreground font-medium uppercase tracking-wider">Mastery Hub</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold text-foreground">{stats.masteryScore}%</span>
          </div>
          <div className="flex gap-1 mt-3">
            <div className="flex-1 h-1.5 md:h-2 rounded-full bg-success/30 overflow-hidden">
              <div
                className="h-full bg-success"
                style={{ width: `${(stats.easyLOs / Math.max(stats.totalLOs, 1)) * 100}%` }}
              />
            </div>
            <div className="flex-1 h-1.5 md:h-2 rounded-full bg-warning/30 overflow-hidden">
              <div
                className="h-full bg-warning"
                style={{ width: `${(stats.mediumLOs / Math.max(stats.totalLOs, 1)) * 100}%` }}
              />
            </div>
            <div className="flex-1 h-1.5 md:h-2 rounded-full bg-destructive/30 overflow-hidden">
              <div
                className="h-full bg-destructive"
                style={{ width: `${(stats.hardLOs / Math.max(stats.totalLOs, 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-3">
        <div className="text-center p-2 md:p-3 rounded-lg difficulty-easy border shadow-sm">
          <span className="text-lg md:text-2xl font-bold block leading-none">{stats.easyLOs}</span>
          <p className="text-[10px] mt-1 font-bold uppercase tracking-tighter opacity-70">Mastered</p>
        </div>
        <div className="text-center p-2 md:p-3 rounded-lg difficulty-medium border shadow-sm">
          <span className="text-lg md:text-2xl font-bold block leading-none">{stats.mediumLOs}</span>
          <p className="text-[10px] mt-1 font-bold uppercase tracking-tighter opacity-70">Learning</p>
        </div>
        <div className="text-center p-2 md:p-3 rounded-lg difficulty-hard border shadow-sm">
          <span className="text-lg md:text-2xl font-bold block leading-none">{stats.hardLOs}</span>
          <p className="text-[10px] mt-1 font-bold uppercase tracking-tighter opacity-70">To Learn</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground order-2 md:order-1">
          <Clock className="h-4 w-4" />
          <span className="text-[11px] md:text-xs">Last saved: {lastSavedDate}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground order-1 md:order-2">
          <AlertTriangle className="h-3.5 w-3.5 text-warning" />
          <span className="text-[11px] md:text-xs font-medium">Press Enter to save in notes</span>
        </div>
      </div>
    </div>
  );
};
