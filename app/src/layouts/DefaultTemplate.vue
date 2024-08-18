<script lang="ts">
import NavBar from './partials/NavBar.vue'

export default {
  name: 'DefaultTemplate',
  components: {
    NavBar
  }
}
</script>

<template>
  <NavBar />
  <div class="flex items-center justify-center w-full font-sans h-max bg-teal-lightest">
    <div class="w-full p-6 m-4 rounded">
      <router-view></router-view>
    </div>
  </div>
</template>
