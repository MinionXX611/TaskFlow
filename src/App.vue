<script setup>
import { ref } from 'vue'
import TaskBoard from './components/board/TaskBoard.vue'
import TaskEditorModal from './components/board/TaskEditorModal.vue'
import { useTasks } from './composables/useTasks'

const { addTask, updateTask, deleteTask, moveTask, tasksForStatus } = useTasks()
const isEditorOpen = ref(false)
const editingTask = ref(null)

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
</script>

<template>
  <main class="flex min-h-screen flex-col bg-slate-50 text-lg text-slate-900">
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
