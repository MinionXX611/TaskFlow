<script setup>
import { computed, ref } from 'vue'
import BoardColumn from './BoardColumn.vue'

const props = defineProps({ tasksForStatus: { type: Function, required: true } })
const emit = defineEmits(['create', 'edit-task', 'delete-task', 'move-task'])
const draggedTaskId = ref(null)

const columns = [
  { id: 'todo', title: '未完成' },
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
  <section aria-label="任务看板" class="flex min-h-0 w-full flex-1 flex-col overflow-hidden px-4 pb-6 pt-5">
    <div class="no-window-drag mb-4 flex justify-end">
      <button class="rounded-xl bg-indigo-600 px-4 py-2 text-base font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="button" @click="emit('create')">新建任务</button>
    </div>
    <div class="grid min-h-0 flex-1 grid-cols-1 grid-rows-2 gap-4">
      <BoardColumn
        v-for="column in columns"
        :key="column.id"
        :column="column"
        :tasks="tasksByStatus[column.id]"
        @drag-start="startDrag"
        @drop-task="dropTask"
        @edit-task="emit('edit-task', $event)"
        @delete-task="emit('delete-task', $event)"
      />
    </div>
  </section>
</template>
