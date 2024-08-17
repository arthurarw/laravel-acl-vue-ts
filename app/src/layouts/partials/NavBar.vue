<script lang="ts">
import { useUsersStore } from '@/stores/users';
import { ref } from 'vue';

export default {
  setup() {
    const useStore = useUsersStore()

    const loadingLogout = ref(false)
    const logout = () => {
      loadingLogout.value = true
      //useStore.logout().then(() => router.push({ name: 'auth.login' }))
    }

    return { useStore, logout, loadingLogout }
  }
}
</script>

<template>
  <div class="flex items-center justify-center bg-slate-800 w-full p-2">
    <router-link :to="{ name: 'admin.home' }" class="text-white hover:text-white px-3 py-2 rounded transition duration-150 ease-in-out" active-class="text-white">
      Home
    </router-link>
    <router-link :to="{ name: 'users.index' }" v-can="'users.index'" class="text-white hover:text-white px-3 py-2 rounded transition duration-150 ease-in-out" active-class="text-white">
      Usuários
    </router-link>
  </div>
</template>
