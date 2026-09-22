<template>
  <header class="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
    <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <h1 class="shrink-0 text-xl font-bold tracking-tight">TaskFlow</h1>
      <input
        aria-label="搜索任务"
        class="min-w-0 flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none ring-indigo-500 transition focus:ring-2 dark:border-slate-700"
        placeholder="搜索任务…"
        type="search"
      />
      <button
        class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium dark:border-slate-700"
        type="button"
      >
        深色模式
      </button>
    </div>
  </header>
</template>
