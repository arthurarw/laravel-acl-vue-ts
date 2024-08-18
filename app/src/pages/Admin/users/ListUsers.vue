<script setup lang="ts">
import PaginationComponent from '@/components/PaginationComponent.vue';
import User from '@/entities/User';
import router from '@/router';
import { useUsersStore } from '@/stores/users';
import { onMounted, ref } from 'vue';

const userStore = useUsersStore();
const loading = ref(false);
onMounted(async () => {
  await loadUsers();
});

const filter = ref('');
const totalPerPage = ref(5);

const loadUsers = async (page: number = 1) => {
  loading.value = true;
  await userStore.getPaginate(page, totalPerPage.value, filter.value).finally(() => loading.value = false);
}

const redirectToPageListPermissions = (user: User) => {
  userStore.addUserInView(user);
  router.push({ name: 'users.permissions' });
}
</script>

<template>
  <h2 class="mt-4 text-4xl font-extrabold">Usuários</h2>
  <div class="flex">
    <router-link :to="{ name: 'users.create' }" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Criar
      Novo Usuário</router-link>
  </div>

  <div v-if="loading">Carregando...</div>

  <form action="#" method="get" @submit.prevent="loadUsers(1)" class="flex mt-4">
    <input type="text" name="filter" placeholder="Filtrar" v-model="filter" class="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker">
    <select name="totalPerPage" v-model="totalPerPage" class="px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker">
      <option value="4">4</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
    <button type="submit" class="p-2 border-2 rounded flex-no-shrink text-teal border-teal hover:text-white hover:bg-teal">Filtrar</button>
  </form>

  <div class="mt-4 overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Name</th>
          <th class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">E-mail</th>
          <th class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
        <tr v-for="user in userStore.users" :key="user.id">
          <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">{{ user.name }}</td>
          <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">{{ user.email }}</td>
          <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
            <router-link :to="{ name: 'users.show', params: { id: user.id } }" class="p-2 mr-2 border-2 rounded flex-no-shrink hover:text-white text-green border-green hover:bg-slate-500">Detalhes</router-link>
            <router-link :to="{ name: 'users.edit', params: { id: user.id } }" class="p-2 ml-1 mr-2 border-2 rounded flex-no-shrink hover:text-white text-green border-green hover:bg-slate-500">Editar</router-link>
            <a href="#" @click.prevent="redirectToPageListPermissions(user)" class="p-2 ml-1 mr-2 border-2 rounded flex-no-shrink hover:text-white text-green border-green hover:bg-slate-500">
              Permissões
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <pagination-component :data="userStore.meta" @loadPage="loadUsers"></pagination-component>
</template>
