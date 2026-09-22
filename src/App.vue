<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import TaskBoard from './components/board/TaskBoard.vue'
</script>

<template>
  <main class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <AppHeader />
    <TaskBoard />
  </main>
</template>
