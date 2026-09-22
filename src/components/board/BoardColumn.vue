<script setup>
import { ref } from 'vue'
import TaskCard from './TaskCard.vue'

defineProps({
  column: {
    type: Object,
    required: true,
  },
  tasks: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['drag-start', 'drop-task', 'edit-task'])
const isDragOver = ref(false)

function onDrop(column, event) {
  isDragOver.value = false
  emit('drop-task', column.id, event)
}
</script>

<template>
  <section
    :class="{ 'ring-2 ring-indigo-400': isDragOver }"
    class="min-h-80 rounded-xl bg-slate-100 p-4 transition dark:bg-slate-900/70"
    @dragenter.prevent="isDragOver = true"
    @dragover.prevent
    @dragleave="isDragOver = false"
    @drop.prevent="onDrop(column, $event)"
  >
    <div class="mb-4 flex items-center justify-between">
      <h2 class="font-semibold">{{ column.title }}</h2>
      <span class="rounded-full bg-white px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">{{ tasks.length }}</span>
    </div>
    <div v-if="tasks.length" class="space-y-2">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @drag-start="emit('drag-start', task.id, $event)"
        @edit="emit('edit-task', task)"
      />
    </div>
    <p v-else class="py-8 text-center text-sm text-slate-400">暂无任务</p>
  </section>
</template>
