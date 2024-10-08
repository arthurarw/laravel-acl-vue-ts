<script lang="ts">
import User from '@/entities/User';
import router from '@/router';
import { useUsersStore } from '@/stores/users';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'DetailUser',
  setup() {
    const route = useRoute();
    const userId = computed(() => route.params.id.toString());
    const useStore = useUsersStore();
    const user = ref<User | null>(null);

    const loading = ref(false);

    onMounted(async () => {
      loading.value = true;
      await useStore.getById(userId.value)
        .then((data: User) => {
          console.log(data);
          user.value = data;
        })
        .catch(() => router.push({ name: 'users.index' }))
        .finally(() => loading.value = false);
    });

    const loadingDelete = ref(false)
    const deleteUser = () => {
      loadingDelete.value = true;
      useStore.destroy(userId.value).then(() => {
        router.push({ name: 'users.index' })
      }).finally(() => loadingDelete.value = false);
    }

    return {
      loading, user, deleteUser, loadingDelete
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
          <span class="text-sm font-medium text-gray-500 ms-1 md:ms-2 dark:text-gray-400">Usuários</span>
        </div>
      </li>
    </ol>
  </nav>

  <h2 class="mt-4 text-4xl font-extrabold">Detalhes do Usuário</h2>

  <div v-if="loading">Carregando...</div>
  <ul class="mt-4">
    <li><strong>Nome: </strong>{{ user?.name }}</li>
    <li><strong>E-mail: </strong>{{ user?.email }}</li>
  </ul>

  <div v-if="user" class="mt-4" :class="{ 'disabled': loadingDelete }">
    <span v-if="loadingDelete">Deletando...</span>
    <a v-else href="#" v-can="'users.destroy'" @click.prevent="deleteUser" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Deletar o Usuário {{ user.name }}</a>
  </div>
</template>
