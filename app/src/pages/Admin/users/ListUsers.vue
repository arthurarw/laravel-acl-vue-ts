<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { ref } from 'vue';
import { onMounted } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const userStore = useUsersStore();
const loading = ref(false);
onMounted(async () => {
  await loadUsers();
});

const loadUsers = async (page: number = 1, perPage: number = 15) => {
  loading.value = true;
  await userStore.getPaginate(page, perPage).finally(() => loading.value = false);
}

</script>

<template>
  <div>List Users</div>
  <div v-if="loading">Carregando...</div>
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
