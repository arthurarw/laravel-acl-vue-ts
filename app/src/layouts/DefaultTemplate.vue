<script lang="ts">
export default {
  name: 'DefaultTemplate',
};
</script>

<template>
  <div>
    <router-link :to="{ name: 'admin.home' }">Home</router-link>
    <router-link :to="{ name: 'users.index' }" v-can="'users.index'">Usuários</router-link>
    <router-link :to="{ name: 'users.index' }" v-can="'users.destroy'">Deletar usuários</router-link>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>
