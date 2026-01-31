import { useEffect, useCallback } from 'react';
import { courses, getAllExams } from '@/data/courseData';

export const useNotifications = () => {
  const requestPermission = useCallback(async () => {
    // Permission requests disabled as per user request
    return false;
  }, []);

  const sendNotification = useCallback((title: string, body: string, tag?: string) => {
    // Browser notifications disabled as per user request
    // Notifications are now displayed passively on the dashboard
    console.log(`Passive Alert: ${title} - ${body}`);
  }, []);

  const checkUpcomingDeadlines = useCallback(() => {
    const now = new Date();
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneMonthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Check exams coming up in the next month
    const exams = getAllExams();
    exams.forEach(exam => {
      const examDate = new Date(exam.date);
      if (examDate >= now && examDate <= oneMonthFromNow) {
        const daysUntil = Math.ceil((examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (daysUntil === 30 || daysUntil === 14 || daysUntil === 7 || daysUntil === 1) {
          sendNotification(
            `📚 Exam Reminder: ${exam.name}`,
            `${exam.courseName} - ${daysUntil} day${daysUntil > 1 ? 's' : ''} remaining!`,
            `exam-${exam.id}-${daysUntil}`
          );
        }
      }
    });

    // Weekly task reminders
    const currentWeek = getCurrentWeekFromDate(now);
    const nextWeek = currentWeek + 1;

    if (nextWeek <= 14) {
      courses.forEach(course => {
        const week = course.weeks.find(w => w.weekNumber === nextWeek);
        if (week && week.tasks.length > 0) {
          const pendingTasks = week.tasks.filter(t => !t.completed).length;
          if (pendingTasks > 0) {
            sendNotification(
              `📋 Week ${nextWeek} Tasks Coming Up`,
              `${course.name}: ${pendingTasks} task${pendingTasks > 1 ? 's' : ''} to complete`,
              `week-${course.id}-${nextWeek}`
            );
          }
        }
      });
    }
  }, [sendNotification]);

  /* 
  useEffect(() => {
    requestPermission();
  }, [requestPermission]);
  */

  return {
    requestPermission,
    sendNotification,
    checkUpcomingDeadlines
  };
};

function getCurrentWeekFromDate(date: Date): number {
  const startDate = new Date('2026-02-09');
  const diffTime = date.getTime() - startDate.getTime();
  const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
  return Math.max(1, Math.min(14, diffWeeks + 1));
}
