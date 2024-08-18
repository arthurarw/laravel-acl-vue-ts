<script lang="ts">
import router from '@/router';
import { usePermissionsStore } from '@/stores/permissions';
import { reactive, ref } from 'vue';

export default {
  name: 'CreatePermission',
  setup() {
    const permissionStore = usePermissionsStore()
    const loading = ref(false)
    const name = ref('')
    const routeName = ref('')

    const errors = reactive({
      hasErrors: false,
      validations: {}
    })

    const createPermission = async () => {
      loading.value = true
      reset()
      await permissionStore.create({
        name: name.value,
        route_name: routeName.value,
      }).then(() => {
        router.push({ name: 'permissions.index' })
      }).catch((error: any) => {
        if (error.response.status === 422) {
          errors.hasErrors = true
          errors.validations = error.response.data.errors
        }
      })
        .finally(() => loading.value = false)
    }

    const reset = () => {
      errors.hasErrors = false
      errors.validations = {}
    }

    return {
      name, routeName, createPermission, loading, errors
    }
  },
}
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li class="inline-flex items-center">
        <router-link :to="{ name: 'admin.home' }" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black-600 dark:text-gray-400 dark:hover:text-black">
          <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          Home
        </router-link>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <svg class="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
          </svg>
          <span class="text-sm font-medium text-gray-500 ms-1 md:ms-2 dark:text-gray-400">Permissões</span>
        </div>
      </li>
    </ol>
  </nav>

  <h2 class="mt-4 text-4xl font-extrabold">Nova Permissão</h2>

  <div v-if="errors.hasErrors" class="alert" role="alert">
    <div class="px-4 py-2 font-bold text-white bg-yellow-500 rounded-t">
      Dados inválidos
    </div>
    <ul class="px-4 py-3 text-red-700 bg-yellow-100 border border-t-0 border-red-400 rounded-b">
      <li v-for="error in errors.validations" :key="error">{{ error[0] }}</li>
    </ul>
  </div>

  <form action="#" method="post" @submit.prevent="createPermission">
    <div class="mt-4">
      <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nome:</label>
      <input type="text" name="name" placeholder="Nome" v-model="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" :class="{ 'has-error': errors.validations.hasOwnProperty('name') }">
    </div>
    <div class="mt-4">
      <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Nome da rota:</label>
      <input type="text" name="description" placeholder="Ex: user.index" v-model="routeName" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" :class="{ 'has-error': errors.validations.hasOwnProperty('route_name') }">
    </div>
    <button type="submit" :disabled="loading" class="w-full px-4 py-2 mt-4 font-bold text-white border-b-4 rounded bg-slate-500 hover:bg-slate-400 border-slate-700 hover:border-slate-500">
      <span v-if="loading">Enviando...</span>
      <span v-else>Enviar</span>
    </button>
  </form>
</template>

<style scoped>
.has-error {
  color: red;
  border: 1px solid red;
}
</style>
