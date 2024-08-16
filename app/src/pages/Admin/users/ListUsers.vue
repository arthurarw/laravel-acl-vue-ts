<script setup lang="ts">
import PaginationComponent from '@/components/PaginationComponent.vue';
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

</script>

<template>
  <div>List Users</div>

  <router-link :to="{ name: 'users.create' }" v-can="'users.store'">Criar novo usuário</router-link>

  <div v-if="loading">Carregando...</div>

  <form action="#" method="get" @submit.prevent="loadUsers(1)">
    <input type="text" name="filter" placeholder="Busque pelo nome" v-model="filter">
    <select name="per_page" v-model="totalPerPage">
      <option value="5">5</option>
      <option value="15">15</option>
      <option value="30">30</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
    <button type="submit">Filtrar</button>
  </form>

  <table v-if="!loading">
    <thead>
      <tr>
        <td>ID</td>
        <td>Name</td>
        <td>E-mail</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in userStore.users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
      </tr>
    </tbody>
  </table>

  <pagination-component :data="userStore.meta" @loadPage="loadUsers"></pagination-component>
</template>
