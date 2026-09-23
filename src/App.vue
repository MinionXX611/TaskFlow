<script setup>
import { ref } from 'vue'
import TaskBoard from './components/board/TaskBoard.vue'
import TaskEditorModal from './components/board/TaskEditorModal.vue'
import { useTasks } from './composables/useTasks'

const { addTask, updateTask, deleteTask, moveTask, tasksForStatus } = useTasks()
const isEditorOpen = ref(false)
const editingTask = ref(null)
let moveTimer = null
let suppressNextClick = false
let isMovingWindow = false

function openCreate() {
  editingTask.value = null
  isEditorOpen.value = true
}
function openEdit(task) {
  editingTask.value = task
  isEditorOpen.value = true
}
function closeEditor() {
  isEditorOpen.value = false
  editingTask.value = null
}
function saveTask(payload) {
  if (editingTask.value) updateTask(editingTask.value.id, payload)
  else addTask(payload)
  closeEditor()
}
function removeTask() {
  if (editingTask.value) deleteTask(editingTask.value.id)
  closeEditor()
}

function isWindowMoveTarget(target) {
  return !target.closest('button, input, textarea, select, option, article, [data-no-window-move]')
}
function startWindowMove(event) {
  if (event.button !== 0 || !isWindowMoveTarget(event.target)) return
  const point = { x: event.screenX, y: event.screenY }
  moveTimer = window.setTimeout(() => {
    isMovingWindow = true
    window.desktopWindow?.startMove(point)
  }, 260)
}
function moveWindow(event) {
  if (isMovingWindow) window.desktopWindow?.move({ x: event.screenX, y: event.screenY })
}
function stopWindowMove(event) {
  if (moveTimer) window.clearTimeout(moveTimer)
  moveTimer = null
  if (isMovingWindow) {
    window.desktopWindow?.endMove()
    suppressNextClick = true
    event?.preventDefault()
    window.setTimeout(() => { suppressNextClick = false }, 0)
  }
  isMovingWindow = false
}
function preventCreateAfterMove(event) {
  if (!suppressNextClick) return
  event.preventDefault()
  event.stopPropagation()
}
</script>

<template>
  <main
    class="window-drag-surface flex min-h-screen flex-col overflow-hidden bg-slate-50/75 text-lg text-slate-900"
    @pointercancel="stopWindowMove"
    @pointerdown="startWindowMove"
    @click.capture="preventCreateAfterMove"
    @pointermove="moveWindow"
    @pointerup="stopWindowMove"
  >
    <div aria-label="拖动窗口" class="window-drag-handle" />
    <TaskBoard
      :tasks-for-status="tasksForStatus"
      @edit-task="openEdit"
      @delete-task="deleteTask"
      @move-task="moveTask"
      @create="openCreate"
    />
    <TaskEditorModal
      :open="isEditorOpen"
      :task="editingTask"
      @close="closeEditor"
      @submit="saveTask"
      @delete="removeTask"
    />
  </main>
</template>
