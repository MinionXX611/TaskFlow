<script setup>
defineProps({ searchQuery: { type: String, default: '' }, matchedTaskCount: { type: Number, default: 0 } })
const emit = defineEmits(['update:searchQuery', 'create'])
</script>

<template>
  <header class="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
    <div class="flex w-full flex-wrap items-center gap-3 px-5 py-5 sm:px-8 lg:px-10">
      <h1 class="mr-3 shrink-0 text-3xl font-bold tracking-tight">TaskFlow</h1>
      <input
        :value="searchQuery"
        aria-label="搜索任务"
        class="min-w-48 flex-1 rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-lg outline-none ring-indigo-500 transition focus:ring-2 dark:border-slate-700"
        placeholder="搜索任务标题…"
        type="search"
        @input="emit('update:searchQuery', $event.target.value)"
        @search="emit('update:searchQuery', $event.target.value)"
      />
      <span v-if="searchQuery" class="shrink-0 text-base text-slate-500 dark:text-slate-400">匹配 {{ matchedTaskCount }} 项</span>
      <button v-if="searchQuery" class="shrink-0 rounded-lg px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" type="button" @click="emit('update:searchQuery', '')">清除</button>
      <button
        class="rounded-xl bg-indigo-600 px-5 py-3 text-lg font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        type="button"
        @click="emit('create')"
      >
        新建任务
      </button>
    </div>
  </header>
</template>
