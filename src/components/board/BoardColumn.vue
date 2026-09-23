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

const emit = defineEmits(['drag-start', 'drop-task', 'edit-task', 'delete-task'])
const isDragOver = ref(false)

function onDrop(column, event) {
  isDragOver.value = false
  emit('drop-task', column.id, event)
}
</script>

<template>
  <section
    :class="{ 'ring-2 ring-indigo-400': isDragOver }"
    class="h-full min-h-0 overflow-hidden rounded-2xl bg-slate-100/70 p-5 transition"
    @dragenter.prevent="isDragOver = true"
    @dragover.prevent
    @dragleave="isDragOver = false"
    @drop.prevent="onDrop(column, $event)"
  >
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-xl font-semibold">{{ column.title }}</h2>
      <span class="rounded-full bg-white/70 px-3 py-1 text-sm text-slate-500">{{ tasks.length }}</span>
    </div>
    <div v-if="tasks.length" class="space-y-2 overflow-hidden">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @drag-start="emit('drag-start', task.id, $event)"
        @edit="emit('edit-task', task)"
        @delete="emit('delete-task', task.id)"
      />
    </div>
    <p v-else class="py-8 text-center text-base text-slate-400">暂无任务</p>
  </section>
</template>
