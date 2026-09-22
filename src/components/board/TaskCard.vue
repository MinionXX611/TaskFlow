<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: { type: Object, required: true },
  hasActiveSearch: { type: Boolean, default: false },
  isSearchMatch: { type: Boolean, default: true },
})
const emit = defineEmits(['drag-start', 'edit'])
const priority = computed(() => ({
  high: 'bg-red-500/15 ring-1 ring-red-500/25 dark:bg-red-400/15',
  medium: 'bg-amber-400/20 ring-1 ring-amber-500/25 dark:bg-amber-300/15',
  low: 'bg-emerald-500/15 ring-1 ring-emerald-500/25 dark:bg-emerald-400/15',
}[props.task.priority]))
</script>

<template>
  <article
    :class="[priority, { 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-950': hasActiveSearch && isSearchMatch, 'opacity-35': hasActiveSearch && !isSearchMatch }]"
    class="flex cursor-grab items-center gap-3 rounded-xl p-4 shadow-sm transition hover:shadow-md active:cursor-grabbing"
    draggable="true"
    @dragstart="emit('drag-start', $event)"
  >
    <p class="min-w-0 flex-1 break-words text-base font-medium">{{ task.title }}</p>
    <time v-if="task.deadline" class="shrink-0 text-sm text-slate-600 dark:text-slate-300" :datetime="task.deadline">{{ task.deadline }}</time>
    <button :aria-label="`编辑任务：${task.title}`" class="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-white/45 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-950/25 dark:hover:text-white" type="button" @click="emit('edit')">编辑</button>
  </article>
</template>
