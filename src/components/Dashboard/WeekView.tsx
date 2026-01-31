import { useState, useCallback, KeyboardEvent } from 'react';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  FileText,
  Pencil,
  Save,
  X,
  Zap,
  AlertCircle,
  CheckCheck
} from 'lucide-react';
import { Week, LearningOutcome } from '@/data/courseData';
import { UserProgress } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface WeekViewProps {
  week: Week;
  courseId: string;
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
}

export const WeekView = ({ week, courseId, progress, onUpdateProgress }: WeekViewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState(progress.weekNotes[week.id] || '');

  const handleTaskToggle = (taskId: string) => {
    const newCompletedTasks = {
      ...progress.completedTasks,
      [taskId]: !progress.completedTasks[taskId]
    };
    onUpdateProgress({
      completedTasks: newCompletedTasks,
      lastSaved: new Date().toISOString()
    });
  };

  const handleDifficultyChange = (loId: string, level: 'easy' | 'medium' | 'hard') => {
    const currentData = progress.difficultyLevels[loId] || { level: 'hard', dates: [] };
    const newDates = [...currentData.dates, new Date().toISOString()];

    const newDifficultyLevels = {
      ...progress.difficultyLevels,
      [loId]: { level, dates: newDates }
    };

    onUpdateProgress({
      difficultyLevels: newDifficultyLevels,
      lastSaved: new Date().toISOString()
    });
  };

  const handleSaveNotes = useCallback(() => {
    const newWeekNotes = {
      ...progress.weekNotes,
      [week.id]: notesValue
    };
    onUpdateProgress({
      weekNotes: newWeekNotes,
      lastSaved: new Date().toISOString()
    });
    setIsEditingNotes(false);
  }, [notesValue, progress.weekNotes, week.id, onUpdateProgress]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveNotes();
    }
  };

  const customTasksForWeek = progress.customTasks[`${courseId}-w${week.weekNumber}`] || [];

  const coreTasksCompleted = week.tasks.filter(t => progress.completedTasks[t.id]).length;
  const customTasksCompleted = customTasksForWeek.filter(t => progress.completedTasks[t.id]).length;

  const completedTasksCount = coreTasksCompleted + customTasksCompleted;
  const totalTasks = week.tasks.length + customTasksForWeek.length;
  const totalLOs = week.learningOutcomes.length;

  let loScore = 0;
  week.learningOutcomes.forEach(lo => {
    const level = progress.difficultyLevels[lo.id]?.level || 'hard';
    if (level === 'easy') loScore += 1;
    else if (level === 'medium') loScore += 0.5;
  });

  const totalWeight = totalTasks + totalLOs;
  const earnedWeight = completedTasksCount + loScore;
  const completionPercentage = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

  const getDifficultyForLO = (loId: string): 'easy' | 'medium' | 'hard' => {
    return progress.difficultyLevels[loId]?.level || 'hard';
  };

  const getDifficultyIcon = (level: 'easy' | 'medium' | 'hard') => {
    switch (level) {
      case 'easy': return <CheckCheck className="h-4 w-4" />;
      case 'medium': return <Zap className="h-4 w-4" />;
      case 'hard': return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className="glass-panel overflow-hidden transition-all duration-300">
        <CollapsibleTrigger asChild>
          <button className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-primary" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-primary">Week {week.weekNumber}</span>
                  <span className="text-xs text-muted-foreground">• {week.dateRange}</span>
                </div>
                <h4 className="font-semibold text-foreground">{week.title}</h4>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {totalTasks > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {completedTasksCount}/{totalTasks}
                  </span>
                </div>
              )}
            </div>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-4 animate-fade-in">
            {week.description && (
              <p className="text-sm text-muted-foreground pl-8">
                {week.description}
              </p>
            )}

            {/* Learning Outcomes with Difficulty */}
            {week.learningOutcomes.length > 0 && (
              <div className="pl-8">
                <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Learning Outcomes
                </h5>
                <div className="space-y-2">
                  {week.learningOutcomes.map((lo) => {
                    const difficulty = getDifficultyForLO(lo.id);
                    return (
                      <div
                        key={lo.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border/50"
                      >
                        <span className="text-sm text-foreground flex-1 pr-4">{lo.text}</span>
                        <div className="flex items-center gap-1">
                          {(['hard', 'medium', 'easy'] as const).map((level) => (
                            <button
                              key={level}
                              onClick={() => handleDifficultyChange(lo.id, level)}
                              className={cn(
                                "px-2 py-1 rounded text-xs font-medium border transition-all duration-200",
                                difficulty === level
                                  ? `difficulty-${level}`
                                  : "bg-secondary/50 text-muted-foreground border-transparent hover:border-border"
                              )}
                            >
                              {getDifficultyIcon(level)}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tasks (Core + Custom) */}
            {(week.tasks.length > 0 || customTasksForWeek.length > 0) && (
              <div className="pl-8">
                <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Tasks
                </h5>
                <div className="space-y-2">
                  {/* Core Tasks */}
                  {week.tasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => handleTaskToggle(task.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left",
                        progress.completedTasks[task.id]
                          ? "bg-success/10 border border-success/30"
                          : "bg-accent/30 border border-border/50 hover:border-border"
                      )}
                    >
                      {progress.completedTasks[task.id] ? (
                        <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                      <span className={cn(
                        "text-sm",
                        progress.completedTasks[task.id]
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      )}>
                        {task.text}
                      </span>
                    </button>
                  ))}

                  {/* Custom Tasks */}
                  {customTasksForWeek.map((task) => (
                    <div key={task.id} className="relative group">
                      <button
                        onClick={() => handleTaskToggle(task.id)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left",
                          progress.completedTasks[task.id]
                            ? "bg-success/10 border border-success/30"
                            : "bg-accent/30 border border-border/50 hover:border-border"
                        )}
                      >
                        {progress.completedTasks[task.id] ? (
                          <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                        )}
                        <span className={cn(
                          "text-sm pr-10",
                          progress.completedTasks[task.id]
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        )}>
                          {task.text}
                          <span className="ml-2 text-[10px] uppercase text-primary font-bold opacity-70">(Your Task)</span>
                        </span>
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          const key = `${courseId}-w${week.weekNumber}`;
                          const newCustomTasks = { ...progress.customTasks };
                          newCustomTasks[key] = (newCustomTasks[key] || []).filter(t => t.id !== task.id);
                          onUpdateProgress({ customTasks: newCustomTasks });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Section */}
            <div className="pl-8">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Notes
                </h5>
                {!isEditingNotes ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingNotes(true)}
                    className="h-8"
                  >
                    <Pencil className="h-3 w-3 mr-1" />
                    {progress.weekNotes[week.id] ? 'Edit' : 'Add Notes'}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setNotesValue(progress.weekNotes[week.id] || '');
                        setIsEditingNotes(false);
                      }}
                      className="h-8"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveNotes}
                      className="h-8"
                    >
                      <Save className="h-3 w-3 mr-1" />
                      Save (Enter)
                    </Button>
                  </div>
                )}
              </div>

              {isEditingNotes ? (
                <Textarea
                  value={notesValue}
                  onChange={(e) => setNotesValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add your notes here... Press Enter to save, Shift+Enter for new line"
                  className="min-h-[100px] bg-accent/30 border-border/50 focus:border-primary"
                  autoFocus
                />
              ) : progress.weekNotes[week.id] ? (
                <div className="p-3 rounded-lg bg-accent/30 border border-border/50">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {progress.weekNotes[week.id]}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No notes added yet. Click "Add Notes" to start.
                </p>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
