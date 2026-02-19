import { useCallback } from 'react';
import { useHookstate } from '@hookstate/core';
import { AppStateType, ReadingGoal } from '@mystacks/types';
import { request } from '@mystacks/utils';
import dayjs from 'dayjs';

const GET_GOALS_URL = 'https://getreadinggoals-u6erzcpcda-uc.a.run.app';
const SAVE_GOALS_URL = 'https://savereadinggoals-u6erzcpcda-uc.a.run.app';

const STORAGE_KEY_PREFIX = 'mystacks_reading_goals_';

function getStorageKey(userId: string): string {
  return `${STORAGE_KEY_PREFIX}${userId}`;
}

function loadGoalsFromStorage(userId: string): ReadingGoal[] {
  try {
    const raw = window.localStorage.getItem(getStorageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ReadingGoal[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveGoalsToStorage(userId: string, goals: ReadingGoal[]): void {
  try {
    window.localStorage.setItem(getStorageKey(userId), JSON.stringify(goals));
  } catch {
    // ignore
  }
}

/** Get start and end of goal period as Unix timestamps (start/end of period in local time). */
export function getGoalPeriodRange(goal: ReadingGoal): { start: number; end: number } {
  const { periodType, year, month, season } = goal;
  let start: dayjs.Dayjs;
  let end: dayjs.Dayjs;
  if (periodType === 'month' && month != null) {
    start = dayjs().year(year).month(month - 1).startOf('month');
    end = start.endOf('month');
  } else if (periodType === 'season' && season != null) {
    const seasonMonths: Record<string, number> = {
      winter: 0, spring: 3, summer: 6, fall: 9,
    };
    const m = seasonMonths[season] ?? 0;
    start = dayjs().year(year).month(m).startOf('month');
    end = start.add(2, 'month').endOf('month');
  } else {
    start = dayjs().year(year).startOf('year');
    end = dayjs().year(year).endOf('year');
  }
  return { start: start.unix(), end: end.unix() };
}

export function useReadingGoals(appState: AppStateType) {
  const globalState = useHookstate(appState);
  const userId = globalState.get().userId;
  const goals = (globalState.get().readingGoals ?? []) as ReadingGoal[];

  const persist = useCallback(
    (nextGoals: ReadingGoal[]) => {
      globalState.set((s) => ({ ...s, readingGoals: nextGoals }));
      if (userId) {
        saveGoalsToStorage(userId, nextGoals);
        request(
          `${SAVE_GOALS_URL}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, goals: nextGoals }),
          }
        )
          .then((res) => res.json())
          .catch((err) => console.error('saveReadingGoals failed', err));
      }
    },
    [globalState, userId]
  );

  const loadGoals = useCallback(() => {
    if (!userId) return;
    const url = `${GET_GOALS_URL}?${new URLSearchParams({ userId })}`;
    request(url, { method: 'GET' })
      .then((res) => res.json())
      .then((result) => {
        const fromApi = Array.isArray(result?.data) ? (result.data as ReadingGoal[]) : [];
        globalState.set((s) => ({ ...s, readingGoals: fromApi }));
        if (fromApi.length > 0) saveGoalsToStorage(userId, fromApi);
      })
      .catch(() => {
        const stored = loadGoalsFromStorage(userId);
        globalState.set((s) => ({ ...s, readingGoals: stored }));
      });
  }, [userId, globalState]);

  /** @deprecated Use loadGoals. Kept for backward compat; loads from API then falls back to localStorage. */
  const loadFromStorage = useCallback(() => {
    loadGoals();
  }, [loadGoals]);

  const addGoal = useCallback(
    (goal: Omit<ReadingGoal, 'id'>) => {
      const id = `goal_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      const newGoal: ReadingGoal = { ...goal, id };
      const next = [...goals, newGoal];
      persist(next);
      return newGoal;
    },
    [goals, persist]
  );

  return {
    goals,
    addGoal,
    persist,
    loadGoals,
    loadFromStorage,
    getGoalPeriodRange,
  };
}
