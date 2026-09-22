<script setup>
import { computed } from 'vue'

const props = defineProps({ task: { type: Object, required: true } })
const emit = defineEmits(['drag-start', 'edit'])
const priority = computed(() => ({
  high: { label: '高', className: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' },
  medium: { label: '中', className: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  low: { label: '低', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
}[props.task.priority]))
</script>

<template>
  <article
    class="flex cursor-grab items-start gap-2 rounded-lg bg-white p-3 shadow-sm transition hover:shadow-md active:cursor-grabbing dark:bg-slate-800"
    draggable="true"
    @dragstart="emit('drag-start', $event)"
  >
    <div class="min-w-0 flex-1">
      <p class="break-words text-sm font-medium">{{ task.title }}</p>
      <div class="mt-2 flex flex-wrap items-center gap-2 text-xs">
        <span :class="priority.className" class="rounded-full px-2 py-0.5 font-medium">{{ priority.label }}优先级</span>
        <time v-if="task.deadline" class="text-slate-500 dark:text-slate-400" :datetime="task.deadline">DDL {{ task.deadline }}</time>
      </div>
    </div>
    <button :aria-label="`编辑任务：${task.title}`" class="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white" type="button" @click="emit('edit')">编辑</button>
  </article>
</template>
