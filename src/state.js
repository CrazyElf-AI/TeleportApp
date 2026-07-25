import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'tpToPanvel';

const MAGE_TIERS = [
  'Novice',
  'Trainee',
  'Journeyman',
  'Adept',
  'Expert',
  'Master',
  'Grand Master',
  'Elder',
];

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const initialState = {
  profile: null,
  mageLevel: 1,
  mana: 0,
  screen: 'onboarding',
};

export function useGameState() {
  const [state, setState] = useState(() => {
    const saved = loadState();
    if (saved && saved.profile) {
      return { ...initialState, ...saved, screen: 'home' };
    }
    return initialState;
  });

  useEffect(() => {
    if (state.profile) {
      saveState(state);
    }
  }, [state]);

  const setScreen = useCallback((screen) => {
    setState((s) => ({ ...s, screen }));
  }, []);

  const setProfile = useCallback((profile) => {
    setState((s) => ({ ...s, profile, screen: 'home' }));
  }, []);

  const setMageLevel = useCallback((level) => {
    setState((s) => ({ ...s, mageLevel: Math.min(8, Math.max(1, level)) }));
  }, []);

  const setMana = useCallback((mana) => {
    setState((s) => ({ ...s, mana: Math.min(1000, Math.max(0, mana)) }));
  }, []);

  const resetTeleport = useCallback(() => {
    setState((s) => ({ ...s, mana: 0, screen: 'teleport' }));
  }, []);

  const fullReset = useCallback(() => {
    setState((s) => ({
      ...s,
      mana: 0,
      screen: 'home',
    }));
  }, []);

  return {
    ...state,
    mageTierName: MAGE_TIERS[state.mageLevel - 1] || 'Unknown',
    isElder: state.mageLevel >= 8,
    setScreen,
    setProfile,
    setMageLevel,
    setMana,
    resetTeleport,
    fullReset,
  };
}

export { MAGE_TIERS };
