<script setup lang="ts">
import { RouterView } from 'vue-router';

</script>

<template>
  <aside>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/login">Login</router-link>
      </li>
    </ul>
  </aside>
  <RouterView />
</template>

<style scoped></style>
