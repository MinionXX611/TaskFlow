<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: { type: Object, required: true },
})
const emit = defineEmits(['drag-start', 'edit', 'delete'])
const priority = computed(() => ({
  high: 'bg-red-500/15 ring-1 ring-red-500/25',
  medium: 'bg-amber-400/20 ring-1 ring-amber-500/25',
  low: 'bg-emerald-500/15 ring-1 ring-emerald-500/25',
}[props.task.priority]))
</script>

<template>
  <article
    :class="priority"
    class="no-window-drag flex cursor-grab items-center gap-3 rounded-xl p-5 shadow-sm transition hover:shadow-md active:cursor-grabbing"
    draggable="true"
    @dragstart="emit('drag-start', $event)"
  >
    <p class="min-w-0 flex-1 break-words text-lg font-medium">{{ task.title }}</p>
    <time v-if="task.deadline" class="shrink-0 text-base text-slate-600" :datetime="task.deadline">{{ task.deadline }}</time>
    <button :aria-label="`编辑任务：${task.title}`" class="rounded-lg px-3 py-2 text-base text-slate-600 hover:bg-white/45 hover:text-slate-950" type="button" @click="emit('edit')">编辑</button>
    <button :aria-label="`删除任务：${task.title}`" class="rounded-lg px-3 py-2 text-base text-red-600 hover:bg-red-500/10 hover:text-red-700" type="button" @click.stop="emit('delete')">删除</button>
  </article>
</template>
