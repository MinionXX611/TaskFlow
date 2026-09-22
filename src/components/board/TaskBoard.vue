<script setup>
import BoardColumn from './BoardColumn.vue'

const columns = [
  { id: 'todo', title: '待办' },
  { id: 'in-progress', title: '进行中' },
  { id: 'done', title: '已完成' },
]
</script>

<template>
  <section aria-label="任务看板" class="mx-auto grid max-w-7xl gap-5 p-4 sm:p-6 lg:grid-cols-3 lg:p-8">
    <BoardColumn v-for="column in columns" :key="column.id" :column="column" />
  </section>
</template>
