<script lang="ts">
import router from '@/router';
import { useUsersStore } from '@/stores/users';
import { ref } from 'vue';

export default {
  setup() {
    const useStore = useUsersStore()

    const loadingLogout = ref(false)
    const logout = () => {
      loadingLogout.value = true
      useStore.logout().then(() => router.push({ name: 'auth.login' }))
    }

    return { useStore, logout, loadingLogout }
  }
}
</script>

<template>
  <div class="flex items-center justify-center w-full p-2 bg-slate-800">
    <router-link :to="{ name: 'admin.home' }" class="px-3 py-2 text-white transition duration-150 ease-in-out rounded hover:text-white" active-class="text-white">
      Home
    </router-link>
    <router-link :to="{ name: 'users.index' }" v-can="'users.index'" class="px-3 py-2 text-white transition duration-150 ease-in-out rounded hover:text-white" active-class="text-white">
      Usuários
    </router-link>
    <!--<router-link :to="{ name: 'permissions.index' }" v-can="'permissions.index'" class="px-3 py-2 text-white transition duration-150 ease-in-out rounded hover:text-white" active-class="text-white">
      Permissões
    </router-link>-->
    <a href="#" @click.prevent="logout" class="px-3 py-2 text-white transition duration-150 ease-in-out rounded hover:text-white">
      Olá, {{ useStore.me?.name }}!
      (<span v-if="loadingLogout">Saindo</span><span v-else>Sair</span>)
    </a>
  </div>
</template>
