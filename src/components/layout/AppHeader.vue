<script setup>
defineProps({ searchQuery: { type: String, default: '' } })
const emit = defineEmits(['update:searchQuery', 'create'])
</script>

<template>
  <header class="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
    <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
      <h1 class="mr-2 shrink-0 text-xl font-bold tracking-tight">TaskFlow</h1>
      <input
        :value="searchQuery"
        aria-label="搜索任务"
        class="min-w-48 flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none ring-indigo-500 transition focus:ring-2 dark:border-slate-700"
        placeholder="搜索任务标题…"
        type="search"
        @input="emit('update:searchQuery', $event.target.value)"
      />
      <button
        class="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        type="button"
        @click="emit('create')"
      >
        新建任务
      </button>
    </div>
  </header>
</template>
