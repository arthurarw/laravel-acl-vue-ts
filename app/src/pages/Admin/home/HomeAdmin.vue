<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { onMounted } from 'vue';

const useUserStore = useUsersStore();

onMounted(() => {
  useUserStore.getMe();
});

</script>

<template>
  <p>Olá, {{ useUserStore.me?.name }}</p>
  <div>HomePage</div>
</template>
