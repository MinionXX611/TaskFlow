<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  open: Boolean,
  task: { type: Object, default: null },
})
const emit = defineEmits(['close', 'submit', 'delete'])
const error = ref('')
const form = reactive({ title: '', description: '', priority: 'medium', deadline: '' })

function resetForm(task) {
  form.title = task?.title ?? ''
  form.description = task?.description ?? ''
  form.priority = task?.priority ?? 'medium'
  form.deadline = task?.deadline ?? ''
  error.value = ''
}

watch(() => [props.open, props.task], ([isOpen, task]) => {
  if (isOpen) resetForm(task)
}, { immediate: true })

function submitForm() {
  if (!form.title.trim()) {
    error.value = '请输入任务标题。'
    return
  }
  emit('submit', { ...form })
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-10 flex items-center justify-center bg-slate-950/30 p-4" @click.self="emit('close')">
    <section
      aria-modal="true"
      class="no-window-drag w-full max-w-xl rounded-2xl bg-white/80 p-7 shadow-xl"
      role="dialog"
      :aria-label="task ? '编辑任务' : '新建任务'"
    >
      <div class="mb-5 flex items-center justify-between">
        <h2 class="text-3xl font-bold">{{ task ? '编辑任务' : '新建任务' }}</h2>
        <button class="rounded-lg px-3 py-1 text-2xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" type="button" aria-label="关闭" @click="emit('close')">×</button>
      </div>
      <form class="space-y-5" @submit.prevent="submitForm">
        <label class="block text-lg font-medium">
          标题 <span class="text-red-600">*</span>
          <input v-model="form.title" class="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-xl outline-none ring-indigo-500 focus:ring-2 dark:border-slate-700" maxlength="120" autofocus />
        </label>
        <label class="block text-lg font-medium">
          描述
          <textarea v-model="form.description" class="mt-2 min-h-28 w-full resize-y rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-xl outline-none ring-indigo-500 focus:ring-2 dark:border-slate-700" maxlength="2000" />
        </label>
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="block text-lg font-medium">
            优先级
            <select v-model="form.priority" class="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-xl outline-none ring-indigo-500 focus:ring-2 dark:border-slate-700">
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </label>
          <label class="block text-lg font-medium">
            DDL（可选）
            <input v-model="form.deadline" class="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-xl outline-none ring-indigo-500 focus:ring-2 dark:border-slate-700" type="date" />
          </label>
        </div>
        <p v-if="error" class="text-lg text-red-600">{{ error }}</p>
        <div class="flex items-center justify-between gap-3 pt-2">
          <button v-if="task" class="text-lg font-medium text-red-600 hover:text-red-500" type="button" @click="emit('delete')">删除任务</button>
          <span v-else />
          <div class="flex gap-2">
            <button class="rounded-xl px-4 py-3 text-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800" type="button" @click="emit('close')">取消</button>
            <button class="rounded-xl bg-indigo-600 px-4 py-3 text-lg font-semibold text-white hover:bg-indigo-500" type="submit">保存</button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>
