import { ref } from 'vue'

export const THEME_STORAGE_KEY = 'taskflow:theme'

function readThemePreference() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark'
  } catch {
    return false
  }
}

function applyTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark)
}

export function useTheme() {
  const isDark = ref(readThemePreference())
  applyTheme(isDark.value)

  function setTheme(value) {
    isDark.value = value
    applyTheme(value)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, value ? 'dark' : 'light')
    } catch {
      // 浏览器禁用 localStorage 时，仍在当前会话中完成主题切换。
    }
  }

  function toggleTheme() {
    setTheme(!isDark.value)
  }

  return { isDark, toggleTheme }
}
