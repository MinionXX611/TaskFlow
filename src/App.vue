<script setup>
import { ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import TaskBoard from './components/board/TaskBoard.vue'
import TaskEditorModal from './components/board/TaskEditorModal.vue'
import { useTasks } from './composables/useTasks'

const { searchQuery, matchedTaskCount, isTaskMatch, addTask, updateTask, deleteTask, moveTask, tasksForStatus } = useTasks()
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
  <main class="flex min-h-screen flex-col bg-slate-50 text-lg text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <AppHeader
      v-model:search-query="searchQuery"
      :matched-task-count="matchedTaskCount"
      @create="openCreate"
    />
    <TaskBoard
      :is-task-match="isTaskMatch"
      :search-query="searchQuery"
      :tasks-for-status="tasksForStatus"
      @edit-task="openEdit"
      @move-task="moveTask"
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
