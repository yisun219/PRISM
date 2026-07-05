import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void; // toggles between light/dark (explicit override)
}

const noopStorage: Storage = {
  getItem: () => null,
  setItem: () => { },
  removeItem: () => { },
  clear: () => { },
  key: () => null,
  length: 0,
};

function getThemeStorage(): Storage {
  if (typeof window === 'undefined') {
    return noopStorage;
  }

  const storage = window.localStorage;
  if (
    storage &&
    typeof storage.getItem === 'function' &&
    typeof storage.setItem === 'function' &&
    typeof storage.removeItem === 'function'
  ) {
    return storage;
  }

  return noopStorage;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // Default to system preference
      theme: 'system',
      setTheme: (theme: Theme) => {
        set({ theme });
        updateTheme(theme);
      },
      toggleTheme: () => {
        const current = get().theme;
        // When in system mode, first toggle explicitly to light
        const newTheme = current === 'dark' ? 'light' : 'dark';
        set({ theme: newTheme });
        updateTheme(newTheme);
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(getThemeStorage),
      skipHydration: true,
    }
  )
);

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return getSystemPrefersDark() ? 'dark' : 'light';
  }
  return theme;
}

function updateTheme(theme: Theme) {
  const effective = resolveTheme(theme);
  // Update DOM
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(effective);
  root.setAttribute('data-theme', effective);
}
