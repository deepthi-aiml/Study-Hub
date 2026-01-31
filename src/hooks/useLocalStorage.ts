import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}

export interface UserProgress {
  completedTasks: Record<string, boolean>;
  weekNotes: Record<string, string>;
  difficultyLevels: Record<string, { level: 'easy' | 'medium' | 'hard'; dates: string[] }>;
  customTasks: Record<string, { id: string, text: string, completed: boolean }[]>;
  assessmentDates: Record<string, string>;
  lastSaved: string;
}

export const defaultProgress: UserProgress = {
  completedTasks: {},
  weekNotes: {},
  difficultyLevels: {},
  customTasks: {},
  assessmentDates: {},
  lastSaved: new Date().toISOString()
};
