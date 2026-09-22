<script setup>
import { computed } from 'vue'

const props = defineProps({ task: { type: Object, required: true } })
const emit = defineEmits(['drag-start', 'edit'])
const priority = computed(() => ({
  high: 'bg-red-500/15 ring-1 ring-red-500/25 dark:bg-red-400/15',
  medium: 'bg-amber-400/20 ring-1 ring-amber-500/25 dark:bg-amber-300/15',
  low: 'bg-emerald-500/15 ring-1 ring-emerald-500/25 dark:bg-emerald-400/15',
}[props.task.priority]))
</script>

<template>
  <article
    :class="priority"
    class="flex cursor-grab items-center gap-2 rounded-lg p-3 shadow-sm transition hover:shadow-md active:cursor-grabbing"
    draggable="true"
    @dragstart="emit('drag-start', $event)"
  >
    <p class="min-w-0 flex-1 break-words text-sm font-medium">{{ task.title }}</p>
    <button :aria-label="`编辑任务：${task.title}`" class="rounded p-1 text-slate-600 hover:bg-white/45 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-950/25 dark:hover:text-white" type="button" @click="emit('edit')">编辑</button>
  </article>
</template>
