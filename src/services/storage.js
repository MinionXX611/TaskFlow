import { PRIORITY, TASK_STATUS } from '../constants/task'

export const STORAGE_KEY = 'taskflow:tasks'

const validStatuses = new Set(Object.values(TASK_STATUS))
const validPriorities = new Set(Object.values(PRIORITY))

function normalizeTask(value) {
  if (!value || typeof value !== 'object' || typeof value.id !== 'string' || typeof value.title !== 'string') return null
  if (!validStatuses.has(value.status) || !validPriorities.has(value.priority)) return null
  return { id: value.id, title: value.title, description: typeof value.description === 'string' ? value.description : '', priority: value.priority, status: value.status, deadline: typeof value.deadline === 'string' ? value.deadline : '' }
}

export function loadTasks() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed.map(normalizeTask).filter(Boolean) : []
  } catch { return [] }
}

export function saveTasks(tasks) {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) } catch { /* localStorage 不可用时保留内存状态 */ }
}
