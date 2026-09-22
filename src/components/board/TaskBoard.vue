<script setup>
import { computed, ref } from 'vue'
import BoardColumn from './BoardColumn.vue'

const props = defineProps({ tasksForStatus: { type: Function, required: true }, searchQuery: { type: String, default: '' }, isTaskMatch: { type: Function, required: true } })
const emit = defineEmits(['edit-task', 'move-task'])
const draggedTaskId = ref(null)

const columns = [
  { id: 'todo', title: '待办' },
  { id: 'in-progress', title: '进行中' },
  { id: 'done', title: '已完成' },
]

const tasksByStatus = computed(() => Object.fromEntries(
  columns.map((column) => [column.id, props.tasksForStatus(column.id)]),
))

function startDrag(id, event) {
  draggedTaskId.value = id
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', id)
}
function dropTask(status, event) {
  const id = event.dataTransfer.getData('text/plain') || draggedTaskId.value
  if (id) emit('move-task', id, status)
  draggedTaskId.value = null
}
</script>

<template>
  <section aria-label="任务看板" class="grid w-full grid-cols-3 gap-4 px-4 py-6 sm:px-6 lg:px-8">
    <BoardColumn
      v-for="column in columns"
      :key="column.id"
      :column="column"
      :is-task-match="isTaskMatch"
      :search-query="searchQuery"
      :tasks="tasksByStatus[column.id]"
      @drag-start="startDrag"
      @drop-task="dropTask"
      @edit-task="emit('edit-task', $event)"
    />
  </section>
</template>
