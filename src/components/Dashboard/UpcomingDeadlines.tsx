import { useMemo, useState } from 'react';
import { AlertTriangle, Calendar, Clock, Plus, Info, CheckCircle2 } from 'lucide-react';
import { courses, getAllExams } from '@/data/courseData';
import { cn } from '@/lib/utils';
import { UserProgress } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UpcomingDeadlinesProps {
  progress?: UserProgress;
  onUpdateProgress?: (updates: Partial<UserProgress>) => void;
}

export const UpcomingDeadlines = ({ progress, onUpdateProgress }: UpcomingDeadlinesProps) => {
  const [newTaskText, setNewTaskText] = useState<Record<string, string>>({});

  const { criticalItems, workloadItems, weekEndDate } = useMemo(() => {
    const now = new Date();
    const startDate = new Date('2026-02-09');
    const diffTime = now.getTime() - startDate.getTime();
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    const currentWeek = Math.max(1, Math.min(14, diffWeeks + 1));

    // Calculate the Sunday of the current week (deadline)
    const sunday = new Date(startDate.getTime());
    sunday.setDate(startDate.getDate() + (currentWeek * 7) - 1);
    const weekEndStr = sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Critical Items: Exams and Summative Assignments
    const criticalItems = courses.flatMap(course =>
      course.assessments.map(a => {
        const customDate = progress?.assessmentDates?.[a.id];
        const displayDate = customDate || (isNaN(new Date(a.date).getTime()) ? null : a.date);

        return {
          ...a,
          courseCode: course.code,
          courseName: course.name,
          courseColor: course.colorClass,
          type: 'exam' as const,
          urgencyTag: 'PREP REQ',
          displayDate: displayDate,
          isMissingDate: !displayDate
        };
      })
    ).filter(item => {
      if (!item.isExam && !item.name.toLowerCase().includes('summative')) return false;
      if (!item.displayDate) return true; // Show items with missing dates so user can set them

      const itemDate = new Date(item.displayDate);
      return isNaN(itemDate.getTime()) || itemDate >= now;
    }).sort((a, b) => {
      if (a.isMissingDate && !b.isMissingDate) return 1;
      if (!a.isMissingDate && b.isMissingDate) return -1;
      if (a.isMissingDate && b.isMissingDate) return 0;

      const dateA = new Date(a.displayDate!).getTime();
      const dateB = new Date(b.displayDate!).getTime();
      return dateA - dateB;
    });

    // Workload Items: All 6 courses for the CURRENT week
    const workloadItems = courses.map(course => {
      const week = course.weeks.find(w => w.weekNumber === currentWeek);

      const coreTasks = week?.tasks || [];
      const customTasks = progress?.customTasks[`${course.id}-w${currentWeek}`] || [];

      // All tasks for this course/week
      const allTasks = [
        ...coreTasks.map(t => ({ id: t.id, text: t.text, isCustom: false })),
        ...customTasks.map(t => ({ id: t.id, text: t.text, isCustom: true }))
      ];

      const pendingTasks = allTasks.filter(t => !progress?.completedTasks[t.id]);

      const pendingLOs = week
        ? (progress
          ? week.learningOutcomes.filter(lo => (progress.difficultyLevels[lo.id]?.level || 'hard') !== 'easy')
          : week.learningOutcomes)
        : [];

      return {
        id: course.id,
        courseName: course.name,
        courseCode: course.code,
        courseColor: course.colorClass,
        pendingTasks,
        pendingLOs,
        weekNumber: currentWeek,
        totalRemaining: pendingTasks.length + pendingLOs.length
      };
    });

    return {
      criticalItems,
      workloadItems,
      weekEndDate: weekEndStr
    };
  }, [progress]);

  const handleUpdateAssessmentDate = (id: string, date: string) => {
    if (!onUpdateProgress || !progress) return;

    onUpdateProgress({
      assessmentDates: {
        ...(progress.assessmentDates || {}),
        [id]: date
      }
    });
  };

  const handleAddTask = (courseId: string, weekNumber: number) => {
    const text = newTaskText[courseId];
    if (!text || !onUpdateProgress || !progress) return;

    const key = `${courseId}-w${weekNumber}`;
    const newCustomTasks = { ...(progress.customTasks || {}) };
    const courseWeekTasks = [...(newCustomTasks[key] || [])];

    courseWeekTasks.push({
      id: `custom-${Date.now()}`,
      text: text,
      completed: false
    });

    newCustomTasks[key] = courseWeekTasks;

    onUpdateProgress({
      customTasks: newCustomTasks
    });

    setNewTaskText(prev => ({ ...prev, [courseId]: '' }));
  };

  const markAllDone = (courseId: string, weekNumber: number, taskIds: string[], loIds: string[]) => {
    if (!onUpdateProgress || !progress) return;

    const newCompletedTasks = { ...progress.completedTasks };
    taskIds.forEach(id => {
      newCompletedTasks[id] = true;
    });

    const newDifficultyLevels = { ...progress.difficultyLevels };
    loIds.forEach(id => {
      newDifficultyLevels[id] = {
        level: 'easy',
        dates: [...(progress.difficultyLevels[id]?.dates || []), new Date().toISOString()]
      };
    });

    onUpdateProgress({
      completedTasks: newCompletedTasks,
      difficultyLevels: newDifficultyLevels
    });
  };

  const getDaysUntil = (dateStr: string | null) => {
    if (!dateStr) return null;
    const examDate = new Date(dateStr);
    if (isNaN(examDate.getTime())) return null;
    const now = new Date();
    const diffTime = examDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* 1. Critical Deadlines (List View) */}
      <div className="glass-panel p-4 md:p-6 border-l-4 border-l-destructive shadow-lg">
        <h2 className="font-heading text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 md:gap-3 text-destructive">
          <AlertTriangle className="h-5 w-5 md:h-6 md:w-6" />
          Critical Academic Deadlines
        </h2>

        <div className="space-y-3">
          {criticalItems.length > 0 ? (
            criticalItems.map((item) => {
              const daysUntil = getDaysUntil(item.displayDate);
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 rounded-lg bg-background/40 border border-border/50 hover:bg-background/60 transition-colors group gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={cn("h-10 md:h-12 w-1 rounded-full shrink-0",
                      item.courseColor === 'course-card-programming' ? 'bg-course-programming' :
                        item.courseColor === 'course-card-systems' ? 'bg-course-systems' :
                          item.courseColor === 'course-card-web' ? 'bg-course-web' :
                            item.courseColor === 'course-card-math' ? 'bg-course-math' :
                              item.courseColor === 'course-card-communication' ? 'bg-course-communication' : 'bg-course-ict'
                    )} />
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground text-sm md:text-lg group-hover:text-primary transition-colors truncate">{item.name}</h3>
                      <p className="text-[10px] md:text-sm text-muted-foreground flex items-center gap-1 md:gap-2 truncate">
                        {item.courseCode} • {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-6 ml-4 sm:ml-0">
                    <div className="flex-1 sm:flex-none">
                      {!item.displayDate ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap">Set Date:</span>
                          <Input
                            type="date"
                            className="h-7 md:h-8 text-[10px] w-28 md:w-32 bg-background/50 border-destructive/30 focus-visible:ring-destructive/30"
                            onChange={(e) => handleUpdateAssessmentDate(item.id, e.target.value)}
                          />
                        </div>
                      ) : (
                        <div className="text-left sm:text-right">
                          <div className="text-[10px] md:text-sm font-bold text-destructive flex items-center gap-1 sm:justify-end">
                            <Calendar className="h-3 w-3 md:h-3.5 md:w-3.5" />
                            {daysUntil !== null ? (daysUntil <= 0 ? 'DUE TODAY' : `${daysUntil} DAYS LEFT`) : 'DATE SET'}
                          </div>
                          <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase font-black mt-0.5 tracking-wider">
                            {item.displayDate} • Prep required
                          </p>
                        </div>
                      )}
                    </div>

                    {item.time && (
                      <div className="hidden sm:flex flex-col text-right border-l border-border/50 pl-4 md:pl-6">
                        <span className="text-[10px] md:text-xs font-bold text-foreground">{item.time}</span>
                        <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase">{item.venue || 'TBA'}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-muted-foreground text-center py-4 text-xs md:text-sm italic">No critical exams scheduled at this time.</p>
          )}
        </div>
      </div>

      {/* 2. Weekly Workload (Grid Cards) */}
      <div className="glass-panel p-4 md:p-6 border-t border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="font-heading text-lg md:text-xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Week 1 Workload Dashboard
            </h2>
            <p className="text-[10px] md:text-sm text-muted-foreground mt-1 italic sm:not-italic">
              Deadline: <span className="text-primary font-bold">Sunday, {weekEndDate}</span>
            </p>
          </div>
          <div className="flex gap-2 self-start sm:self-auto">
            <span className="px-2 md:px-3 py-1 bg-primary/10 text-primary text-[9px] md:text-[10px] font-bold rounded-full uppercase tracking-tighter">Current Week Only</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {workloadItems.map((course) => (
            <div
              key={course.id}
              className="flex flex-col bg-background/40 border border-border/50 rounded-xl p-4 md:p-5 hover:border-primary/30 transition-all group relative overflow-hidden h-full shadow-sm hover:shadow-md"
            >
              <div className={cn("absolute top-0 left-0 w-full h-1 opacity-60",
                course.courseColor === 'course-card-programming' ? 'bg-course-programming' :
                  course.courseColor === 'course-card-systems' ? 'bg-course-systems' :
                    course.courseColor === 'course-card-web' ? 'bg-course-web' :
                      course.courseColor === 'course-card-math' ? 'bg-course-math' :
                        course.courseColor === 'course-card-communication' ? 'bg-course-communication' : 'bg-course-ict'
              )} />

              <div className="flex items-start justify-between mb-4">
                <div className="min-w-0">
                  <h3 className="font-bold text-xs md:text-sm truncate pr-2">{course.courseName}</h3>
                  <p className="text-[9px] md:text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{course.courseCode}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 md:h-8 md:w-8 p-0 rounded-full hover:bg-success/20 hover:text-success shrink-0"
                  onClick={() => markAllDone(course.id, course.weekNumber, course.pendingTasks.map(t => t.id), course.pendingLOs.map(lo => lo.id))}
                  title="Mark Week as Done"
                >
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>

              <div className="flex-1 space-y-3 mb-6">
                <div>
                  <h4 className="text-[9px] md:text-[10px] uppercase font-black text-muted-foreground mb-2 flex items-center gap-1.5 leading-none">
                    <Info className="h-3 w-3" /> Remaining Work
                  </h4>
                  <div className="space-y-1.5">
                    {course.pendingTasks.length === 0 && course.pendingLOs.length === 0 ? (
                      <p className="text-[9px] md:text-[10px] italic text-success border border-success/30 bg-success/5 p-2 rounded text-center">Week completed!</p>
                    ) : (
                      <>
                        {course.pendingTasks.map(task => (
                          <div key={task.id} className="flex items-start gap-2 text-[11px] md:text-xs text-foreground group/item">
                            <div className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-primary mt-1.5 md:mt-1.25 shrink-0" />
                            <span className="leading-tight">{task.text}</span>
                          </div>
                        ))}
                        {course.pendingLOs.map(lo => (
                          <div key={lo.id} className="flex items-start gap-2 text-[11px] md:text-xs text-foreground/80 group/item italic">
                            <div className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-success mt-1.5 md:mt-1.25 shrink-0" />
                            <span className="leading-tight">Lesson: {lo.text}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-auto space-y-3 pt-3 border-t border-border/20">
                <div className="flex gap-2">
                  <Input
                    placeholder="Quick task..."
                    value={newTaskText[course.id] || ''}
                    onChange={(e) => setNewTaskText(prev => ({ ...prev, [course.id]: e.target.value }))}
                    className="h-7 md:h-8 text-[10px] bg-background/50 border-border/40 focus-visible:ring-primary/30"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddTask(course.id, course.weekNumber);
                    }}
                  />
                  <Button
                    size="sm"
                    className="h-7 md:h-8 px-2 bg-primary/20 text-primary hover:bg-primary/30 text-[10px]"
                    onClick={() => handleAddTask(course.id, course.weekNumber)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[9px] md:text-[10px] font-black uppercase text-muted-foreground/60 tracking-wider">Overall Status</span>
                  <span className="text-[9px] md:text-[10px] font-black text-primary uppercase">
                    {course.totalRemaining === 0 ? '100% COMPLETE' : `${course.totalRemaining} ITEMS TO GO`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
