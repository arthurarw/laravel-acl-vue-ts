<script lang="ts">
import { reactive, ref } from 'vue';
import { useUsersStore } from '@/stores/users';
import router from '@/router';

export default {
  setup() {
    const usersStore = useUsersStore();
    const loading = ref(false);
    const email = ref('');
    const password = ref('');
    const error = reactive({
      errorMessage: '',
      status: 0,
      active: false
    });

    const auth = () => {
      loading.value = true;
      usersStore.auth(email.value, password.value).then(() => {
        router.push({ name: 'admin.home' });
      }).catch(err => {
        error.errorMessage = err.response.data.message;
        error.status = err.response.status;
        error.active = true;
      }).finally(() => loading.value = false);
    }

    return {
      email,
      password,
      loading,
      auth,
      error
    }
  },
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form action="#" method="post" @submit.prevent="auth">
      <div v-if="error.active">
        <p>{{ error.errorMessage }}</p>
      </div>
      <input type="text" name="email" placeholder="E-mail" v-model="email">
      <input type="password" name="password" placeholder="Senha" v-model="password">
      <button type="submit" :disabled="loading">
        <span v-if="loading">Logando...</span>
        <span v-else>Login</span>
      </button>
    </form>
    <a href="/forgot-password">Esqueci a senha</a>
  </div>
</template>
