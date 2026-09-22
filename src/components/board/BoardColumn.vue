<script setup>
defineProps({
  column: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="min-h-80 rounded-xl bg-slate-100 p-4 dark:bg-slate-900/70">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="font-semibold">{{ column.title }}</h2>
      <span class="rounded-full bg-white px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">0</span>
    </div>
    <p class="py-8 text-center text-sm text-slate-400">暂无任务</p>
  </section>
</template>
