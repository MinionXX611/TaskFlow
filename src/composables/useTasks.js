import { computed, ref, watch } from 'vue'
import { PRIORITY, TASK_STATUS } from '../constants/task'
import { loadTasks, saveTasks } from '../services/storage'

const priorityOrder = { [PRIORITY.HIGH]: 0, [PRIORITY.MEDIUM]: 1, [PRIORITY.LOW]: 2 }
function createId() { return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}` }
function normalizeInput(input) {
  const title = input.title?.trim() ?? ''
  if (!title) throw new Error('任务标题不能为空')
  return { title, description: input.description?.trim() ?? '', priority: Object.values(PRIORITY).includes(input.priority) ? input.priority : PRIORITY.MEDIUM, deadline: input.deadline ?? '' }
}

export function useTasks() {
  const tasks = ref(loadTasks())
  const searchQuery = ref('')
  watch(tasks, (currentTasks) => saveTasks(currentTasks), { deep: true })
  const visibleTasks = computed(() => {
    const keyword = searchQuery.value.trim().toLocaleLowerCase()
    return keyword ? tasks.value.filter((task) => task.title.toLocaleLowerCase().includes(keyword)) : tasks.value
  })
  function addTask(input) { tasks.value.push({ id: createId(), ...normalizeInput(input), status: TASK_STATUS.TODO }) }
  function updateTask(id, input) {
    const task = tasks.value.find((item) => item.id === id)
    if (task) Object.assign(task, normalizeInput(input))
  }
  function deleteTask(id) { tasks.value = tasks.value.filter((task) => task.id !== id) }
  function moveTask(id, status) {
    if (!Object.values(TASK_STATUS).includes(status)) return
    const task = tasks.value.find((item) => item.id === id)
    if (task) task.status = status
  }
  function tasksForStatus(status) {
    return visibleTasks.value.filter((task) => task.status === status).toSorted((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  }
  return { searchQuery, addTask, updateTask, deleteTask, moveTask, tasksForStatus }
}
