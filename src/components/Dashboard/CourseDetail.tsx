import { Course } from '@/data/courseData';
import { UserProgress } from '@/hooks/useLocalStorage';
import { WeekView } from './WeekView';
import { ExternalLink, Target, Award, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseDetailProps {
  course: Course;
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
}

export const CourseDetail = ({ course, progress, onUpdateProgress }: CourseDetailProps) => {
  const getCourseColor = (colorClass: string) => {
    const colorMap: Record<string, string> = {
      'course-card-programming': 'from-course-programming/20 to-transparent border-course-programming/30',
      'course-card-systems': 'from-course-systems/20 to-transparent border-course-systems/30',
      'course-card-web': 'from-course-web/20 to-transparent border-course-web/30',
      'course-card-math': 'from-course-math/20 to-transparent border-course-math/30',
      'course-card-communication': 'from-course-communication/20 to-transparent border-course-communication/30',
      'course-card-ict': 'from-course-ict/20 to-transparent border-course-ict/30',
    };
    return colorMap[colorClass] || 'from-primary/20 to-transparent border-primary/30';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Course Header */}
      <div className={cn(
        "glass-panel p-6 bg-gradient-to-r border-l-4",
        getCourseColor(course.colorClass)
      )}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-sm font-mono text-primary">{course.code}</span>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {course.name}
            </h2>
          </div>
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Open in CODL</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Course Learning Outcomes */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Course Learning Outcomes
          </h3>
          <ul className="space-y-2">
            {course.learningOutcomes.map((lo, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary font-semibold">LO{index + 1}:</span>
                <span>{lo}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Assessments Summary */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            Assessments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {course.assessments.map((assessment) => (
              <div
                key={assessment.id}
                className={cn(
                  "p-3 rounded-lg border",
                  assessment.isExam
                    ? "bg-destructive/5 border-destructive/30"
                    : "bg-accent/30 border-border/50"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-foreground">{assessment.name}</span>
                  <span className="text-xs font-bold text-primary">{assessment.weight}</span>
                </div>
                <p className="text-xs text-muted-foreground">{assessment.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  📅 {assessment.date} {assessment.time && `• ${assessment.time}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Content */}
      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Weekly Content ({course.weeks.length} weeks)
        </h3>
        <div className="space-y-3">
          {course.weeks.map((week) => (
            <WeekView
              key={week.id}
              week={week}
              courseId={course.id}
              progress={progress}
              onUpdateProgress={onUpdateProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
